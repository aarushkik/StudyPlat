import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AchievementRow, AppButton, ScreenContainer, SetupQuestionHeader } from '@/components';
import { accents, spacing } from '@/theme';
import { achievementsByCategory, getCourse } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AchievementPreview'>;

/** Setup screen 3: preview what the student can achieve, tailored per subject. */
export function AchievementPreviewScreen() {
  const navigation = useNavigation<Nav>();
  const { courseId } = useOnboarding();

  const course = getCourse(courseId);
  const accent = course ? accents[course.accent] : accents.pink;
  const achievements = achievementsByCategory[course?.category ?? 'stem'];

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <SetupQuestionHeader
        onBack={() => navigation.goBack()}
        progress={0.6}
        question="Here’s what you can achieve in 3 months!"
        mascotExpression="excited"
        mascotAccessory="book"
      />

      <View style={styles.rows}>
        {achievements.map((a) => (
          <AchievementRow
            key={a.title}
            icon={a.icon}
            title={a.title}
            description={a.description}
            color={accent.base}
            tint={accent.soft}
          />
        ))}
      </View>

      <View style={styles.spacer} />
      <AppButton label="Continue" onPress={() => navigation.navigate('StartChoice')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  rows: { marginTop: spacing.sm },
  spacer: { flex: 1 },
});
