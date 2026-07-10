import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '@/screens/SplashScreen';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { IntroScreen } from '@/screens/IntroScreen';
import { CourseSelectionScreen } from '@/screens/CourseSelectionScreen';
import { SubjectExperienceScreen } from '@/screens/SubjectExperienceScreen';
import { GoalScoreScreen } from '@/screens/GoalScoreScreen';
import { ExamTimelineScreen } from '@/screens/ExamTimelineScreen';
import { AchievementPreviewScreen } from '@/screens/AchievementPreviewScreen';
import { PlacementResultScreen } from '@/screens/PlacementResultScreen';
import { HomePlaceholderScreen } from '@/screens/HomePlaceholderScreen';
import { PlacementQuizScreen } from '@/components/quiz';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Onboarding + placement stack. A linear flow:
 * Splash → Welcome → Intro → CourseSelection → SubjectExperience → GoalScore
 *   → ExamTimeline → AchievementPreview → PlacementQuiz → PlacementResult → Home.
 * The quiz intro lets the student either take the placement quest or skip
 * straight to Unit 1. Headers are hidden; screens use TopBackButton / close.
 */
export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: 'transparent' } }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="CourseSelection" component={CourseSelectionScreen} />
      <Stack.Screen name="SubjectExperience" component={SubjectExperienceScreen} />
      <Stack.Screen name="GoalScore" component={GoalScoreScreen} />
      <Stack.Screen name="ExamTimeline" component={ExamTimelineScreen} />
      <Stack.Screen name="AchievementPreview" component={AchievementPreviewScreen} />
      <Stack.Screen name="PlacementQuiz" component={PlacementQuizScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="PlacementResult" component={PlacementResultScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Home" component={HomePlaceholderScreen} options={{ animation: 'fade' }} />
    </Stack.Navigator>
  );
}
