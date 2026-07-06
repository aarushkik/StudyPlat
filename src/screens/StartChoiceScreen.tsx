import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, ScreenContainer, SetupQuestionHeader, StartChoiceCard } from '@/components';
import { spacing } from '@/theme';
import { getCourse } from '@/data';
import { useOnboarding } from '@/state/OnboardingContext';
import type { StartChoice } from '@/types';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'StartChoice'>;

/** Setup screen 4: start from scratch, or take the placement quiz. */
export function StartChoiceScreen() {
  const navigation = useNavigation<Nav>();
  const { courseId, setStartChoice, setPlacementLevelId } = useOnboarding();
  const [selected, setSelected] = useState<StartChoice | null>(null);

  const course = getCourse(courseId);

  const onContinue = () => {
    if (!selected) return;
    setStartChoice(selected);
    if (selected === 'find_level') {
      navigation.navigate('PlacementQuiz');
    } else {
      // Starting from scratch places the student at the beginning.
      setPlacementLevelId('beginner');
      navigation.navigate('PlacementResult');
    }
  };

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <SetupQuestionHeader
        onBack={() => navigation.goBack()}
        progress={0.8}
        question="Where would you like to start?"
        mascotExpression="happy"
        mascotAccessory="pencil"
      />

      <View style={styles.cards}>
        <StartChoiceCard
          icon="book-outline"
          title="Start from scratch"
          subtitle={`Begin with the first unit of ${course?.name ?? 'the course'}.`}
          selected={selected === 'scratch'}
          onPress={() => setSelected('scratch')}
        />
        <StartChoiceCard
          icon="compass-outline"
          title="Find my level"
          subtitle="Let stuAP recommend where you should start."
          recommended
          selected={selected === 'find_level'}
          onPress={() => setSelected('find_level')}
        />
      </View>

      <View style={styles.spacer} />
      <AppButton label="Continue" disabled={!selected} onPress={onContinue} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cards: { marginTop: spacing.sm },
  spacer: { flex: 1 },
});
