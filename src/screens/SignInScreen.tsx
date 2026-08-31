import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
 * they closed the app.
 *
 * Email sits above the providers rather than below them. Most students will
 * tap Google, but the email form is the one that still works when a school
 * blocks third-party sign-in, and burying it under a divider makes it look
 * like an afterthought rather than a supported route.
 *
 * On the night ground, like the splash it follows, so the app opens on one
 * continuous dark beat before the map's daylight.
 */
export function SignInScreen() {
  const {
    signIn,
    signInWithEmail,
    signUpWithEmail,
    emailPending,
    pending,
    error,
    clearError,
    canPreview,
    previewSignIn,
  } = useAuth();

  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState<string | null>(null);

  const rise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rise, {
      toValue: 1,
      duration: duration.slow,
      easing: easing.out,
      useNativeDriver: true,
    }).start();
  }, [rise]);

  const busy = pending !== null || emailPending;
  const signingUp = mode === 'signUp';

  const submit = async () => {
    setNote(null);
    const message = signingUp
      ? await signUpWithEmail(email, password)
      : await signInWithEmail(email, password);
    if (message) setNote(message);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={[
                styles.hero,
                {
                  opacity: rise,
                  transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
                },
              ]}
            >
              <Image source={MASCOT_ART.wave} style={styles.mascot} resizeMode="contain" />
              <Wordmark size={34} variant="light" />
              <Text style={styles.tagline}>
                {signingUp
                  ? 'Make an account to keep your map, your streak and your XP.'
                  : 'Sign in to pick up where you left off.'}
              </Text>
            </Animated.View>

            <Animated.View style={[styles.form, { opacity: rise }]}>
              {error ? (
                <Pressable onPress={clearError} accessibilityRole="button" style={styles.error}>
                  <Text style={styles.errorText}>{error}</Text>
                  <Text style={styles.errorDismiss}>Tap to dismiss</Text>
                </Pressable>
              ) : null}

              {note ? (
                <View style={styles.note}>
                  <Text style={styles.noteText}>{note}</Text>
                </View>
              ) : null}

              <Field
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="you@school.edu"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
              />
              <Field
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder={signingUp ? 'At least 6 characters' : 'Your password'}
                secureTextEntry
                textContentType={signingUp ? 'newPassword' : 'password'}
                autoComplete={signingUp ? 'new-password' : 'current-password'}
                onSubmitEditing={submit}
                returnKeyType="go"
              />

              <ChunkyButton
                label={signingUp ? 'Create account' : 'Sign in'}
                busy={emailPending}
                disabled={busy}
                onPress={submit}
                fill={colors.primary}
                text={colors.ink}
              />

              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  setMode(signingUp ? 'signIn' : 'signUp');
                  clearError();
                  setNote(null);
                }}
                hitSlop={10}
                style={styles.switch}
              >
                <Text style={styles.switchText}>
                  {signingUp ? 'Already have an account? Sign in' : 'New here? Create an account'}
                </Text>
              </Pressable>

              <View style={styles.dividerRow}>
                <View style={styles.rule} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.rule} />
              </View>

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

              {canPreview ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Preview the app without signing in"
                  onPress={previewSignIn}
                  style={({ pressed }) => [styles.preview, pressed && styles.previewPressed]}
                >
                  <Text style={styles.previewText}>Preview without an account</Text>
                  <Text style={styles.previewNote}>
                    Development builds only. Disappears once Supabase keys are set.
                  </Text>
                </Pressable>
              ) : null}

              <Text style={styles.legal}>
                By continuing you agree to the Terms and Privacy Policy.
              </Text>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

/** One labelled input, drawn in the app's ink. */
function Field({
  label,
  ...input
}: { label: string } & React.ComponentProps<typeof TextInput>) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label.toUpperCase()}</Text>
      <TextInput
        {...input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#5E7880"
        style={[styles.input, focused && styles.inputFocused]}
      />
    </View>
  );
}

/** The app's chunky button, on the dark ground. */
function ChunkyButton({
  label,
  busy,
  disabled,
  onPress,
  fill,
  text,
}: {
  label: string;
  busy: boolean;
  disabled: boolean;
  onPress: () => void;
  fill: string;
  text: string;
}) {
  const press = useRef(new Animated.Value(0)).current;
  const c = chunky({ depth: 6, radius: 26, shadow: colors.ink, background: fill });
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
          <ActivityIndicator color={text} />
        ) : (
          <Text style={[styles.buttonText, { color: text }]}>{label}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

/**
 * One provider button.
 *
 * White face with the provider's own mark, which is what both Google and
 * Microsoft's brand guidelines ask for and what a user recognises without
 * reading. It still sits on the app's ink border and hard lip, so it belongs
 * here rather than looking like a pasted-in widget.
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
          styles.providerButton,
          { transform: [{ translateY: press.interpolate({ inputRange: [0, 1], outputRange: [0, c.press] }) }] },
        ]}
      >
        {busy ? (
          <ActivityIndicator color={colors.ink} />
        ) : (
          <>
            {provider === 'google' ? <GoogleMark /> : <MicrosoftMark />}
            <Text style={[styles.buttonText, styles.providerText]}>{label}</Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
}

/** Google's four-colour G, drawn to their brand geometry. */
function GoogleMark() {
  return (
    <Svg width={21} height={21} viewBox="0 0 48 48">
      <Path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <Path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <Path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <Path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </Svg>
  );
}

/** Microsoft's four squares. */
function MicrosoftMark() {
  return (
    <Svg width={19} height={19} viewBox="0 0 23 23">
      <Path fill="#F25022" d="M1 1h10v10H1z" />
      <Path fill="#7FBA00" d="M12 1h10v10H12z" />
      <Path fill="#00A4EF" d="M1 12h10v10H1z" />
      <Path fill="#FFB900" d="M12 12h10v10H12z" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.night },
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 28 },

  hero: { alignItems: 'center', gap: 4 },
  mascot: { width: 132, height: 132 },
  tagline: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    lineHeight: 19,
    color: '#A9C3C9',
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 290,
  },

  form: { marginTop: 20 },

  field: { marginBottom: 12 },
  fieldLabel: {
    fontFamily: fonts.bodyBlack,
    fontSize: 10,
    letterSpacing: 1.4,
    color: '#7C9199',
    marginBottom: 6,
    marginLeft: 4,
  },
  // Ink-bordered like every other surface, but on a lifted dark fill rather
  // than cream: a white field on the night ground would out-shout the buttons.
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.bodySemibold,
    fontSize: 15.5,
    color: colors.white,
  },
  inputFocused: { borderColor: colors.primary, backgroundColor: 'rgba(5,177,201,0.10)' },

  buttonWrap: { marginBottom: 12 },
  dimmed: { opacity: 0.5 },
  button: { alignItems: 'center', justifyContent: 'center', paddingVertical: 15 },
  providerButton: { flexDirection: 'row', gap: 11 },
  buttonText: { fontFamily: fonts.bodyBlack, fontSize: 15.5, letterSpacing: 0.3 },
  providerText: { color: colors.ink, fontSize: 15 },

  switch: { alignSelf: 'center', paddingVertical: 8, paddingHorizontal: 12, marginBottom: 4 },
  switchText: { fontFamily: fonts.bodyHeavy, fontSize: 13.5, color: colors.primary },

  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 14 },
  rule: { flex: 1, height: 2, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.14)' },
  dividerText: { fontFamily: fonts.bodyBlack, fontSize: 10, letterSpacing: 1.6, color: '#6D858C' },

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

  note: {
    backgroundColor: 'rgba(5,177,201,0.16)',
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
  },
  noteText: { fontFamily: fonts.bodyHeavy, fontSize: 13.5, lineHeight: 18, color: '#BDF0F7' },

  // Visually quieter than everything else on the screen, and it says what it
  // is. A dev door should never look like a supported option.
  preview: {
    marginTop: 6,
    alignItems: 'center',
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.22)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  previewPressed: { backgroundColor: 'rgba(255,255,255,0.05)' },
  previewText: { fontFamily: fonts.bodyHeavy, fontSize: 13.5, color: '#A9C3C9' },
  previewNote: { fontFamily: fonts.body, fontSize: 11, color: '#6D858C', marginTop: 3, textAlign: 'center' },

  legal: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 16,
    color: '#6D858C',
    textAlign: 'center',
    marginTop: 16,
  },
});
