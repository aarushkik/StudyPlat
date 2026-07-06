import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  /** Scroll the content (default) or lay it out in a plain flex View. */
  scroll?: boolean;
  /** Horizontal screen padding. */
  padded?: boolean;
  background?: string;
  contentStyle?: ViewStyle;
  edges?: Edge[];
}

/**
 * Standard screen shell: safe-area aware, themed background, optional scroll.
 * Every screen renders inside one so padding and safe areas stay consistent.
 */
export function ScreenContainer({
  children,
  scroll = false,
  padded = true,
  background = colors.background,
  contentStyle,
  edges = ['top', 'bottom'],
}: ScreenContainerProps) {
  const pad = padded ? styles.padded : undefined;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: background }]} edges={edges}>
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scrollContent, pad, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, pad, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingVertical: spacing.lg },
  padded: { paddingHorizontal: spacing.xl },
});
