/** Route map for the app. Choices flow through OnboardingContext / QuestContext. */
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Intro: undefined;
  CourseSelection: undefined;
  SubjectExperience: undefined;
  GoalScore: undefined;
  ExamTimeline: undefined;
  AchievementPreview: undefined;
  /**
   * The question engine. With no params it runs the placement quest; with
   * params it runs one map stop or one training drill.
   */
  Quiz:
    | {
        /** Set when the session came from a stop on the map, so it can be cleared. */
        nodeId?: string;
        /** Which unit the stop belongs to, so its questions match its plaque. */
        unit?: number;
        title?: string;
        xp?: number;
        count?: number;
      }
    | undefined;
  PlacementResult: undefined;
  LessonComplete: { title: string; correct: number; total: number; xp: number };
  Home: undefined;
  /** The companion roster, reached from the HUD avatar and from Profile. */
  Characters: undefined;
};

// Enables typed navigation with the untyped `useNavigation()` hook.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
