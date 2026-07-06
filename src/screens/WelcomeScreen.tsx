import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton, Mascot, ScreenContainer } from '@/components';
import { colors, palette, spacing, typography } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

/**
 * Welcome screen. Big friendly mascot, the stuAP wordmark + tagline, and the
 * two entry actions. Primary starts setup; secondary is the returning-user path.
 */
export function WelcomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <View style={styles.hero}>
        <Mascot size={180} expression="happy" animated />
        <Text style={styles.wordmark}>stuAP</Text>
        <Text style={styles.tagline}>Master AP classes one quest at a time.</Text>
      </View>

      <View style={styles.actions}>
        <AppButton label="Get started" onPress={() => navigation.navigate('Intro')} />
        <View style={styles.gap} />
        <AppButton
          label="I already have an account"
          variant="secondary"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  wordmark: { ...typography.display, color: colors.primary, marginTop: spacing.lg, letterSpacing: 0.5 },
  tagline: {
    ...typography.tagline,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  actions: { paddingBottom: spacing.md },
  gap: { height: spacing.md },
});
