import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '@/screens/SplashScreen';
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
import { SignInScreen } from '@/screens/SignInScreen';
import { useAuth } from '@/state/AuthContext';
import { useOnboarding } from '@/state/OnboardingContext';
import { useProfileSync } from '@/state/ProfileSync';
import { palette } from '@/theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * One stack for the whole app.
 *
 * Signed out you get Splash → SignIn and nothing else. Signed in, setup runs
 * linearly — Intro → CourseSelection →
 * SubjectExperience → GoalScore → ExamTimeline → AchievementPreview → Quiz →
 * PlacementResult — and lands on Home, the quest map. From there the map opens
 * Quiz again as a session and comes back through LessonComplete. Headers are
 * hidden; every screen supplies its own back or close control.
 */
export function RootNavigator() {
  const { session, restoring } = useAuth();
  const { loading } = useProfileSync();
  const { onboarded } = useOnboarding();

  // Hold on the brand ground while the keychain is read and the profile is
  // fetched. Rendering a stack first and swapping it a frame later shows a
  // returning student either a login form or a setup flow they already
  // finished — and a navigator swap mid-flight loses their place.
  if (restoring || (session && loading)) {
    return <View style={styles.holding} />;
  }

  /**
   * Two separate stacks rather than one with a guard.
   *
   * A signed-out user has no Home route in their navigator at all, so there is
   * nothing to deep-link into, nothing to `navigate` to by mistake, and no
   * frame where a protected screen mounts before a redirect fires. Signing out
   * swaps the stack, which unmounts everything behind it.
   */
  if (!session) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={onboarded ? 'Home' : 'Intro'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
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

const styles = StyleSheet.create({
  holding: { flex: 1, backgroundColor: palette.night },
});
