import React from 'react';
import { NavigationContainer, DefaultTheme, type Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OnboardingProvider } from '@/state/OnboardingContext';
import { RootNavigator } from '@/navigation/RootNavigator';
import { colors } from '@/theme';

/**
 * App entry point. Wires up providers, the navigation theme, and the onboarding
 * stack. Onboarding choices live in <OnboardingProvider> — swap it for a
 * backend profile / persistence later without touching screens.
 */

// Match the navigation background to our themed cream to avoid white flashes.
const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    primary: colors.primary,
    text: colors.textPrimary,
    border: colors.border,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <OnboardingProvider>
        <NavigationContainer theme={navTheme}>
          <RootNavigator />
        </NavigationContainer>
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}
