/** Route map for the onboarding + placement stack. Choices flow through OnboardingContext. */
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Intro: undefined;
  CourseSelection: undefined;
  SubjectExperience: undefined;
  GoalScore: undefined;
  ExamTimeline: undefined;
  AchievementPreview: undefined;
  PlacementQuiz: undefined;
  PlacementResult: undefined;
  Home: undefined;
};

// Enables typed navigation with the untyped `useNavigation()` hook.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
