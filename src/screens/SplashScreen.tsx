import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Mascot } from '@/components';
import { palette, spacing, typography } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const HOLD_MS = 1900;

/**
 * Brand splash. A warm rose backdrop with Stu popping in (scale + fade) and the
 * stuAP wordmark settling in below, then it hands off to Welcome.
 */
export function SplashScreen() {
  const navigation = useNavigation<Nav>();

  const mascotScale = useRef(new Animated.Value(0.7)).current;
  const mascotOpacity = useRef(new Animated.Value(0)).current;
  const wordOpacity = useRef(new Animated.Value(0)).current;
  const wordShift = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(mascotScale, { toValue: 1, useNativeDriver: true, speed: 8, bounciness: 9 }),
      Animated.timing(mascotOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(350),
        Animated.parallel([
          Animated.timing(wordOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.spring(wordShift, { toValue: 0, useNativeDriver: true, speed: 10, bounciness: 6 }),
        ]),
      ]),
    ]).start();

    const timer = setTimeout(() => navigation.replace('Welcome'), HOLD_MS);
    return () => clearTimeout(timer);
  }, [navigation, mascotScale, mascotOpacity, wordOpacity, wordShift]);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[palette.rose400, palette.rose600]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      />

      <View style={styles.center}>
        <Animated.View
          style={[styles.halo, { opacity: mascotOpacity, transform: [{ scale: mascotScale }] }]}
        >
          <Mascot size={168} expression="happy" />
        </Animated.View>
      </View>

      <Animated.View
        style={[styles.wordWrap, { opacity: wordOpacity, transform: [{ translateY: wordShift }] }]}
      >
        <Text style={styles.wordmark}>stuAP</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.rose500 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  halo: {
    width: 240,
    height: 240,
    borderRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  wordWrap: { alignItems: 'center', paddingBottom: spacing.giant },
  wordmark: { ...typography.display, color: palette.white, letterSpacing: 1 },
});
