import { useAppTheme, useThemedStyles, type AppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Glyph } from '@/components/icons';
import { useProfileSync } from '@/state/ProfileSync';
import { colors, fonts } from '@/theme';

/** Persistence failures belong beside progress, not hidden inside settings. */
export function SaveStatusNotice() {
  const appTheme = useAppTheme();
  const { colors, palette, typography, chunky } = appTheme;
  const styles = useThemedStyles(createStyles);

  const { offline, error, retry } = useProfileSync();
  if (!offline && !error) return null;
  return <View style={styles.notice}>
    <Glyph name="refresh" size={20} color={colors.ink} />
    <View style={styles.copy} accessibilityLiveRegion="polite">
      <Text style={styles.title}>{error ? 'Your progress needs a save' : 'Saved here. Sync will catch up.'}</Text>
      <Text style={styles.detail}>{error ?? 'Keep studying. Your account will update when you reconnect.'}</Text>
    </View>
    <Pressable accessibilityRole="button" accessibilityLabel="Retry saving progress" onPress={retry} style={({ pressed }) => [styles.retry, pressed && { opacity: 0.6 }]}>
      <Text style={styles.title}>Retry</Text>
    </Pressable>
  </View>;
}

const createStyles = ({ colors, palette, typography }: AppTheme) => StyleSheet.create({
  notice: { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 18, marginBottom: 14, padding: 12, borderRadius: 17, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.primaryTint },
  copy: { flex: 1 },
  title: { fontFamily: fonts.bodyHeavy, fontSize: 12, color: colors.ink },
  detail: { fontFamily: fonts.body, fontSize: 11, lineHeight: 16, marginTop: 3, color: colors.ink },
  retry: { minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 13, backgroundColor: colors.surface },
});
