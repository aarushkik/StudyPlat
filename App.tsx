import React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme, type Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';
import { OnboardingProvider } from '@/state/OnboardingContext';
import { QuestProvider } from '@/state/QuestContext';
import { RootNavigator } from '@/navigation/RootNavigator';
import { colors } from '@/theme';

/**
 * App entry point. Loads the Fredoka brand font, then wires up providers, the
 * navigation theme, and the stack. Setup choices live in <OnboardingProvider>
 * and map progress in <QuestProvider>, which reads from it — swap either for a
 * backend profile later without touching a screen.
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
  const [fontsLoaded] = useFonts({
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  // Hold on the brand background until the font is ready (avoids a flash).
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <SafeAreaProvider>
      <OnboardingProvider>
        <QuestProvider>
          <NavigationContainer theme={navTheme}>
            <RootNavigator />
          </NavigationContainer>
        </QuestProvider>
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}
