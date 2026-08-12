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
import { LessonCompleteScreen } from '@/screens/LessonCompleteScreen';
import { QuizScreen } from '@/screens/QuizScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { CharactersScreen } from '@/screens/CharactersScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * One stack for the whole app.
 *
 * Setup runs linearly — Splash → Welcome → Intro → CourseSelection →
 * SubjectExperience → GoalScore → ExamTimeline → AchievementPreview → Quiz →
 * PlacementResult — and lands on Home, the quest map. From there the map opens
 * Quiz again as a session and comes back through LessonComplete. Headers are
 * hidden; every screen supplies its own back or close control.
 */
export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="CourseSelection" component={CourseSelectionScreen} />
      <Stack.Screen name="SubjectExperience" component={SubjectExperienceScreen} />
      <Stack.Screen name="GoalScore" component={GoalScoreScreen} />
      <Stack.Screen name="ExamTimeline" component={ExamTimelineScreen} />
      <Stack.Screen name="AchievementPreview" component={AchievementPreviewScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="PlacementResult" component={PlacementResultScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="LessonComplete" component={LessonCompleteScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Characters" component={CharactersScreen} />
    </Stack.Navigator>
  );
}
