import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { EMPTY_PROFILE, fetchProfile, saveProfile, type Profile } from '@/lib/profile';
import { useAuth } from './AuthContext';
import { useOnboarding } from './OnboardingContext';
import { useQuest } from './QuestContext';

interface ProfileSyncValue {
  /** True until the profile has been loaded (or failed) for this session. */
  loading: boolean;
  /**
   * Set when the profile could not be read. The app still works from local
   * state; this only drives a quiet warning, never a blocked screen.
   */
  offline: boolean;
}

const ProfileSyncContext = createContext<ProfileSyncValue>({ loading: true, offline: false });

/** How long changes settle before a write. */
const DEBOUNCE_MS = 900;

/**
 * Keeps the signed-in student's profile and the app's local state in step.
 *
 * Load once per sign-in, then mirror changes back on a debounce. The debounce
 * matters: finishing a lesson moves XP, gems, the streak and the cleared list
 * in the same tick, and writing on each would be four round trips for one
 * event.
 *
 * Writes are fire-and-forget on purpose. A student who answers a question
 * should never wait on the network, and the local state is already correct —
 * a failed write costs at most the last session, which the next successful
 * write restores, because the whole profile is sent rather than a delta.
 */
export function ProfileSync({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const onboarding = useOnboarding();
  const quest = useQuest();

  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  // Which user's profile is currently loaded, so a sign-out/sign-in as a
  // different person cannot leave the previous student's progress on screen.
  const loadedFor = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let alive = true;

    if (!user) {
      // Signed out: clear everything so nothing leaks into the next session.
      if (loadedFor.current !== null) {
        onboarding.reset();
        quest.reset();
        loadedFor.current = null;
      }
      setLoading(false);
      return;
    }

    if (loadedFor.current === user.id) return;

    setLoading(true);
    fetchProfile(user.id).then(({ ok, profile }) => {
      if (!alive) return;
      loadedFor.current = user.id;
      setOffline(!ok);

      const p: Profile = profile ?? EMPTY_PROFILE;
      onboarding.hydrate({
        courseId: p.courseId,
        experienceLevelId: p.experienceLevelId as never,
        goalScoreId: p.goalScoreId as never,
        examTimeframeId: p.examTimeframeId as never,
        placementLevelId: p.placementLevelId as never,
        onboarded: p.onboarded,
      });
      quest.hydrate({
        xp: p.xp,
        gems: p.gems,
        streakDays: p.streakDays,
        completedStops: p.completedStops,
        lastSessionOn: p.lastSessionOn,
      });

      // A brand-new student gets a row immediately, so a crash mid-onboarding
      // does not leave them with no profile at all.
      if (ok && !profile) void saveProfile(user.id, EMPTY_PROFILE);
      setLoading(false);
    });

    return () => {
      alive = false;
    };
    // Only the identity of the signed-in user should trigger a load; the
    // context objects change on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Mirror local changes back, once they settle.
  useEffect(() => {
    if (!user || loading || loadedFor.current !== user.id) return;

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      void saveProfile(user.id, {
        courseId: onboarding.courseId,
        experienceLevelId: onboarding.experienceLevelId,
        goalScoreId: onboarding.goalScoreId,
        examTimeframeId: onboarding.examTimeframeId,
        placementLevelId: onboarding.placementLevelId,
        onboarded: onboarding.onboarded,
        xp: quest.xp,
        gems: quest.gems,
        streakDays: quest.streakDays,
        lastSessionOn: quest.lastSessionOn,
        // `earned`, not `completed`: the placement head start is recomputed
        // from `placementLevelId` on load, so saving it too would double-count
        // it on every sign-in.
        completedStops: quest.earned,
      });
    }, DEBOUNCE_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user?.id,
    loading,
    onboarding.courseId,
    onboarding.experienceLevelId,
    onboarding.goalScoreId,
    onboarding.examTimeframeId,
    onboarding.placementLevelId,
    onboarding.onboarded,
    quest.xp,
    quest.gems,
    quest.streakDays,
    quest.lastSessionOn,
    quest.earned.length,
  ]);

  return (
    <ProfileSyncContext.Provider value={{ loading, offline }}>{children}</ProfileSyncContext.Provider>
  );
}

export function useProfileSync(): ProfileSyncValue {
  return useContext(ProfileSyncContext);
}
