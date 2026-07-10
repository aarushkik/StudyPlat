import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, Mascot, ScreenContainer, SpeechBubble, TopBackButton } from '@/components';
import { spacing } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Intro'>;

/**
 * Friendly hand-off before setup: Stu introduces what's about to happen via a
 * speech bubble, then a single CONTINUE moves into the questions.
 */
export function IntroScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <TopBackButton onPress={() => navigation.goBack()} />

      <View style={styles.center}>
        <SpeechBubble
          text="Hi, I’m Stu! Let’s build your AP quest — just a few quick questions."
          tail="bottom"
          style={styles.bubble}
        />
        <View style={styles.gap} />
        <Mascot size={170} expression="excited" animated />
      </View>

      <AppButton label="Continue" onPress={() => navigation.navigate('CourseSelection')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bubble: { marginHorizontal: spacing.sm },
  gap: { height: spacing.xxl },
});
