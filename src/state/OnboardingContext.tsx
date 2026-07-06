import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type {
  DailyGoalId,
  ExperienceLevelId,
  OnboardingState,
  PlacementLevelId,
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
  setDailyGoalId: (id: DailyGoalId) => void;
  setStartChoice: (choice: StartChoice) => void;
  setPlacementLevelId: (id: PlacementLevelId) => void;
  reset: () => void;
}

const EMPTY: OnboardingState = {
  courseId: null,
  experienceLevelId: null,
  dailyGoalId: null,
  startChoice: null,
  placementLevelId: null,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>(EMPTY);
  const patch = useCallback((p: Partial<OnboardingState>) => setState((s) => ({ ...s, ...p })), []);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      ...state,
      setCourseId: (courseId) => patch({ courseId }),
      setExperienceLevelId: (experienceLevelId) => patch({ experienceLevelId }),
      setDailyGoalId: (dailyGoalId) => patch({ dailyGoalId }),
      setStartChoice: (startChoice) => patch({ startChoice }),
      setPlacementLevelId: (placementLevelId) => patch({ placementLevelId }),
      reset: () => setState(EMPTY),
    }),
    [state, patch],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

/** Access onboarding choices + setters. Must be used under <OnboardingProvider>. */
export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within an OnboardingProvider');
  return ctx;
}
