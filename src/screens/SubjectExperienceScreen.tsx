import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, LevelOptionCard, ScreenContainer, SetupQuestionHeader } from '@/components';
import { spacing } from '@/theme';
import { experienceLevels, getCourse } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import type { ExperienceLevelId } from '@/types';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SubjectExperience'>;

/** Setup screen 1: how much of the chosen subject the student already knows. */
export function SubjectExperienceScreen() {
  const navigation = useNavigation<Nav>();
  const { courseId, setExperienceLevelId } = useOnboarding();
  const [selected, setSelected] = useState<ExperienceLevelId | null>(null);

  const course = getCourse(courseId);
  const question = `How much ${course?.name ?? 'this course'} is already in your head?`;

  const onContinue = () => {
    if (!selected) return;
    setExperienceLevelId(selected);
    navigation.navigate('GoalScore');
  };

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <SetupQuestionHeader
        onBack={() => navigation.goBack()}
        step={2}
        total={5}
        question={question}
        subtitle="Be honest — it just helps Stu place you."
        mascotPose="thinking"
      />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {experienceLevels.map((level) => (
          <LevelOptionCard
            key={level.id}
            label={level.label}
            hint={level.hint}
            bars={level.bars}
            selected={selected === level.id}
            onPress={() => setSelected(level.id)}
          />
        ))}
        <View style={styles.pad} />
      </ScrollView>

      <AppButton label="Continue" disabled={!selected} onPress={onContinue} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  pad: { height: spacing.giant },
});
