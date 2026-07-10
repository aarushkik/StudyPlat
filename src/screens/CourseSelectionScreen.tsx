import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, CourseCard, ScreenContainer, SetupQuestionHeader } from '@/components';
import { spacing } from '@/theme';
import { apCourses } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'CourseSelection'>;

/** Setup step 1: pick the AP course to study. */
export function CourseSelectionScreen() {
  const navigation = useNavigation<Nav>();
  const { setCourseId } = useOnboarding();
  const [selected, setSelected] = useState<string | null>(null);

  const onContinue = () => {
    if (!selected) return;
    setCourseId(selected);
    navigation.navigate('SubjectExperience');
  };

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <SetupQuestionHeader
        onBack={() => navigation.goBack()}
        progress={0.12}
        question="Which AP are we taking on?"
        subtitle="Pick your course — you can add more later."
        mascotExpression="happy"
        mascotAccessory="book"
      />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {apCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            selected={selected === course.id}
            onPress={() => setSelected(course.id)}
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
  pad: { height: spacing.md },
});
