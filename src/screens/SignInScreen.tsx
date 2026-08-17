import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { MASCOT_ART } from '@/components/Mascot';
import { Wordmark } from '@/components/ui';
import { chunky, colors, duration, easing, fonts, palette, spring } from '@/theme';
import { useAuth, type AuthProvider } from '@/state/AuthContext';

/**
 * The way in.
 *
 * There is deliberately no guest path. The whole app is built around a chosen
 * course — the map, the question bank, the progress — so a guest would land on
 * a map belonging to nobody, and anything they earned would vanish the moment
 * they closed the app. Making the account the first step is also what lets a
 * student keep a streak across a phone and a tablet, which is the entire point
 * of a streak.
 *
 * On the night ground, like the splash it follows, so the app opens on one
 * continuous dark beat before the map's daylight.
 */
export function SignInScreen() {
  const { signIn, pending, error, clearError } = useAuth();

  const rise = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rise, {
      toValue: 1,
      duration: duration.slow,
      easing: easing.out,
      useNativeDriver: true,
    }).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 1900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 1900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [rise, bob]);

  const busy = pending !== null;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Animated.View
          style={[
            styles.hero,
            {
              opacity: rise,
              transform: [
                { translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
              ],
            },
          ]}
        >
          <Animated.View
            style={{
              transform: [{ translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }],
            }}
          >
            <Image source={MASCOT_ART.wave} style={styles.mascot} resizeMode="contain" />
          </Animated.View>

          <Wordmark size={38} variant="light" />
          <Text style={styles.tagline}>Sign in to keep your map, your streak and your XP.</Text>
        </Animated.View>

        <Animated.View style={[styles.actions, { opacity: rise }]}>
          {error ? (
            <Pressable onPress={clearError} accessibilityRole="button" style={styles.error}>
              <Text style={styles.errorText}>{error}</Text>
              <Text style={styles.errorDismiss}>Tap to dismiss</Text>
            </Pressable>
          ) : null}

          <ProviderButton
            provider="google"
            label="Continue with Google"
            busy={pending === 'google'}
            disabled={busy}
            onPress={() => signIn('google')}
          />
          <ProviderButton
            provider="azure"
            label="Continue with Microsoft"
            busy={pending === 'azure'}
            disabled={busy}
            onPress={() => signIn('azure')}
          />

          <Text style={styles.legal}>
            By continuing you agree to the Terms and Privacy Policy.
          </Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

/**
 * One provider button.
 *
 * White face with the provider's own mark, because that is what both Google
 * and Microsoft's brand guidelines ask for and what a user recognises without
 * reading. It still sits on the app's ink border and hard lip, so it belongs
 * to this app rather than looking like a pasted-in widget.
 */
function ProviderButton({
  provider,
  label,
  busy,
  disabled,
  onPress,
}: {
  provider: AuthProvider;
  label: string;
  busy: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  const press = useRef(new Animated.Value(0)).current;
  const c = chunky({ depth: 6, radius: 26, shadow: colors.ink, background: colors.white });

  const to = (v: number) =>
    Animated.spring(press, {
      toValue: v,
      useNativeDriver: true,
      ...(v === 1 ? spring.press : spring.release),
    }).start();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled, busy }}
      disabled={disabled}
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      onPress={onPress}
      style={[c.wrap, styles.buttonWrap, disabled && !busy && styles.dimmed]}
    >
      <View style={c.lip} />
      <Animated.View
        style={[
          c.face,
          styles.button,
          { transform: [{ translateY: press.interpolate({ inputRange: [0, 1], outputRange: [0, c.press] }) }] },
        ]}
      >
        {busy ? (
          <ActivityIndicator color={colors.ink} />
        ) : (
          <>
            {provider === 'google' ? <GoogleMark /> : <MicrosoftMark />}
            <Text style={styles.buttonText}>{label}</Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
}

/** Google's four-colour G, drawn to their brand geometry. */
function GoogleMark() {
  return (
    <Svg width={22} height={22} viewBox="0 0 48 48">
      <Path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <Path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <Path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <Path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </Svg>
  );
}

/** Microsoft's four squares. */
function MicrosoftMark() {
  return (
    <Svg width={20} height={20} viewBox="0 0 23 23">
      <Path fill="#F25022" d="M1 1h10v10H1z" />
      <Path fill="#7FBA00" d="M12 1h10v10H12z" />
      <Path fill="#00A4EF" d="M1 12h10v10H1z" />
      <Path fill="#FFB900" d="M12 12h10v10H12z" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.night },
  // The hero takes the slack and centres in it. `space-between` pushed the
  // two blocks to opposite ends and left a void down the middle of a tall
  // phone.
  safe: { flex: 1, paddingHorizontal: 24 },

  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, paddingBottom: 12 },
  mascot: { width: 190, height: 190 },
  tagline: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14.5,
    lineHeight: 20,
    color: '#A9C3C9',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 290,
  },

  actions: { paddingBottom: 12, gap: 4 },
  buttonWrap: { marginBottom: 12 },
  dimmed: { opacity: 0.5 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 15 },
  buttonText: { fontFamily: fonts.bodyBlack, fontSize: 15.5, letterSpacing: 0.3, color: colors.ink },

  error: {
    backgroundColor: 'rgba(217,85,47,0.16)',
    borderWidth: 3,
    borderColor: palette.ember,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
  },
  errorText: { fontFamily: fonts.bodyHeavy, fontSize: 13.5, lineHeight: 18, color: '#FFD9CD' },
  errorDismiss: { fontFamily: fonts.bodySemibold, fontSize: 11.5, color: '#E0A08C', marginTop: 4 },

  legal: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 16,
    color: '#6D858C',
    textAlign: 'center',
    marginTop: 6,
  },
});
