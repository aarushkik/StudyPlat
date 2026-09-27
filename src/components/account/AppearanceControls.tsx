import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme, useAppearancePreference, type AppearancePreference } from '@/theme/ThemeProvider';
import { fonts } from '@/theme';
import { useHaptics } from '@/hooks/useHaptics';

const options: { value: AppearancePreference; label: string; detail: string }[] = [
  { value: 'light', label: 'Light', detail: 'A fresh start' },
  { value: 'dark', label: 'Dark', detail: 'After hours' },
  { value: 'system', label: 'System', detail: 'Follow device' },
];

export function AppearanceControls() {
  const { colors, isDark } = useAppTheme();
  const { preference, setPreference, error } = useAppearancePreference();
  const haptic = useHaptics();
  return <View style={{ marginBottom: 24 }}>
    <Text style={{ fontFamily: fonts.bodyHeavy, fontSize: 11, letterSpacing: 1.4, color: colors.textSecondary, marginBottom: 12 }}>MAKE IT YOURS</Text>
    <View style={{ flexDirection: 'row', gap: 9 }}>
      {options.map(({ value, label, detail }) => <Pressable key={value} accessibilityRole="radio" accessibilityState={{ checked: preference === value }} aria-checked={preference === value} accessibilityLabel={`${label} appearance`} onPress={() => { haptic(); setPreference(value); }} style={({ pressed }) => ({ flex: 1, borderRadius: 20, padding: 10, borderWidth: 1.5, borderColor: preference === value ? colors.primaryDeep : colors.border, backgroundColor: preference === value ? colors.surfaceSelected : colors.surface, transform: [{ scale: pressed ? 0.97 : 1 }] })}>
        <View aria-hidden style={{ height: 48, borderRadius: 11, padding: 7, backgroundColor: value === 'dark' ? '#0A1922' : value === 'light' ? '#EDF3EF' : isDark ? '#193841' : '#DCECF0', overflow: 'hidden', marginBottom: 9 }}>
          <View style={{ height: 5, width: '45%', borderRadius: 3, backgroundColor: value === 'dark' ? '#6BCEDB' : '#238596' }} />
          <View style={{ height: 17, marginTop: 6, borderRadius: 5, backgroundColor: value === 'dark' ? '#284854' : '#FFFFFF', borderWidth: 1, borderColor: 'rgba(120,160,166,0.2)' }} />
        </View>
        <Text style={{ color: colors.textPrimary, fontFamily: fonts.bodyHeavy, fontSize: 13 }}>{label}</Text>
        <Text style={{ color: colors.textSecondary, fontFamily: fonts.body, fontSize: 10, lineHeight: 15, marginTop: 3 }}>{detail}</Text>
      </Pressable>)}
    </View>
    {error ? <Text accessibilityRole="alert" style={{ color: colors.danger, fontFamily: fonts.body, marginTop: 10 }}>{error}</Text> : null}
  </View>;
}
