import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AppButton,
  CourseCard,
  Mascot,
  ProgressBar,
  ScreenContainer,
  SpeechBubble,
  TopBackButton,
} from '@/components';
import { spacing, typography } from '@/theme';
import { apCourses } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'CourseSelection'>;

/** Step 1 of setup: pick the AP course to study. */
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

      <View style={styles.header}>
        <TopBackButton onPress={() => navigation.goBack()} style={styles.back} />
        <ProgressBar progress={0.1} />
      </View>

      <View style={styles.mascotRow}>
        <Mascot size={92} expression="thinking" accessory="book" />
        <SpeechBubble text="Which AP course are you studying?" tail="left" style={styles.bubble} />
      </View>

      <Text style={[typography.heading, styles.title]}>Choose your AP course</Text>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {apCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            selected={selected === course.id}
            onPress={() => setSelected(course.id)}
          />
        ))}
        <View style={styles.listPad} />
      </ScrollView>

      <AppButton label="Continue" disabled={!selected} onPress={onContinue} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  back: { marginLeft: -spacing.sm, marginRight: spacing.sm },
  mascotRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  bubble: { flex: 1, marginLeft: spacing.md },
  title: { marginBottom: spacing.md },
  list: { flex: 1 },
  listPad: { height: spacing.md },
});
