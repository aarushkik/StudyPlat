import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type {
  ExamTimeframeId,
  ExperienceLevelId,
  OnboardingState,
  PlacementLevelId,
  ScoreGoalId,
  StartChoice,
} from '@/types';

/**
 * Local onboarding state for the session.
 *
 * Holds every choice the student makes during setup + placement so they carry
 * through to the placeholder home screen. In-memory by design for this
 * milestone — it's the seam where persistence (AsyncStorage) or a backend
 * profile plugs in later without changing any screen.
 */
interface OnboardingContextValue extends OnboardingState {
  setCourseId: (id: string) => void;
  setExperienceLevelId: (id: ExperienceLevelId) => void;
  setGoalScoreId: (id: ScoreGoalId) => void;
  setExamTimeframeId: (id: ExamTimeframeId) => void;
  setStartChoice: (choice: StartChoice) => void;
  setPlacementLevelId: (id: PlacementLevelId) => void;
  /** True once setup has been finished and saved. */
  onboarded: boolean;
  markOnboarded: () => void;
  /** Replace the whole state from a stored profile. */
  hydrate: (next: Partial<OnboardingState> & { onboarded?: boolean }) => void;
  reset: () => void;
}

const EMPTY: OnboardingState = {
  courseId: null,
  experienceLevelId: null,
  goalScoreId: null,
  examTimeframeId: null,
  startChoice: null,
  placementLevelId: null,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>(EMPTY);
  const [onboarded, setOnboarded] = useState(false);

  /**
   * Adopt a profile loaded from the server.
   *
   * Only keys actually present are copied, so a partial row cannot blank a
   * choice the student has already made in this session.
   */
  const hydrate = useCallback((next: Partial<OnboardingState> & { onboarded?: boolean }) => {
    const { onboarded: done, ...rest } = next;
    setState((prev) => ({ ...prev, ...rest }));
    if (done !== undefined) setOnboarded(done);
  }, []);
  const patch = useCallback((p: Partial<OnboardingState>) => setState((s) => ({ ...s, ...p })), []);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      ...state,
      setCourseId: (courseId) => patch({ courseId }),
      setExperienceLevelId: (experienceLevelId) => patch({ experienceLevelId }),
      setGoalScoreId: (goalScoreId) => patch({ goalScoreId }),
      setExamTimeframeId: (examTimeframeId) => patch({ examTimeframeId }),
      setStartChoice: (startChoice) => patch({ startChoice }),
      setPlacementLevelId: (placementLevelId) => patch({ placementLevelId }),
      onboarded,
      markOnboarded: () => setOnboarded(true),
      hydrate,
      reset: () => {
        setState(EMPTY);
        setOnboarded(false);
      },
    }),
    [state, patch, onboarded, hydrate],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

/** Access onboarding choices + setters. Must be used under <OnboardingProvider>. */
export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within an OnboardingProvider');
  return ctx;
}
