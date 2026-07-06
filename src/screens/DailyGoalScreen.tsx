import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, DailyGoalCard, ScreenContainer, SetupQuestionHeader } from '@/components';
import { spacing } from '@/theme';
import { dailyGoals } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import type { DailyGoalId } from '@/types';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'DailyGoal'>;

/** Setup screen 2: pick a daily study-time commitment. */
export function DailyGoalScreen() {
  const navigation = useNavigation<Nav>();
  const { setDailyGoalId } = useOnboarding();
  const [selected, setSelected] = useState<DailyGoalId | null>(null);

  const onContinue = () => {
    if (!selected) return;
    setDailyGoalId(selected);
    navigation.navigate('AchievementPreview');
  };

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <SetupQuestionHeader
        onBack={() => navigation.goBack()}
        progress={0.4}
        question="What’s your daily AP study goal?"
        mascotExpression="happy"
        mascotAccessory="pencil"
      />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {dailyGoals.map((goal) => (
          <DailyGoalCard
            key={goal.id}
            minutes={goal.minutes}
            tag={goal.tag}
            selected={selected === goal.id}
            onPress={() => setSelected(goal.id)}
          />
        ))}
        <View style={styles.pad} />
      </ScrollView>

      <AppButton label="I’m committed" disabled={!selected} onPress={onContinue} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  pad: { height: spacing.md },
});
