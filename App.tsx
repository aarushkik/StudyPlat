import React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme, type Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from '@expo-google-fonts/baloo-2';
import {
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
  Figtree_800ExtraBold,
  Figtree_900Black,
} from '@expo-google-fonts/figtree';
import { AuthProviderComponent } from '@/state/AuthContext';
import { OnboardingProvider } from '@/state/OnboardingContext';
import { ProfileSync } from '@/state/ProfileSync';
import { QuestProvider } from '@/state/QuestContext';
import { RootNavigator } from '@/navigation/RootNavigator';
import { colors } from '@/theme';

/**
 * App entry point. Loads the brand fonts, then wires up providers, the
 * navigation theme, and the stack.
 *
 * Provider order matters: auth is outermost because everything below it is
 * scoped to a signed-in user. Setup choices live in <OnboardingProvider> and
 * map progress in <QuestProvider>, which reads from it.
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
    // Baloo 2 carries headings, buttons and labels; Figtree carries body copy.
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Figtree_800ExtraBold,
    Figtree_900Black,
  });

  // Hold on the brand background until the font is ready (avoids a flash).
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <SafeAreaProvider>
      {/* Auth wraps everything: the navigator decides which stack exists at
          all from the session, so there is no route a signed-out user could
          reach even by deep link. */}
      <AuthProviderComponent>
        <OnboardingProvider>
          <QuestProvider>
            {/* Inside both state providers, because it hydrates them. */}
            <ProfileSync>
              <NavigationContainer theme={navTheme}>
                <RootNavigator />
              </NavigationContainer>
            </ProfileSync>
          </QuestProvider>
        </OnboardingProvider>
      </AuthProviderComponent>
    </SafeAreaProvider>
  );
}
