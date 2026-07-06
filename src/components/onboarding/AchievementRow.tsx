import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';

interface AchievementRowProps {
  /** Ionicons name. */
  icon: string;
  title: string;
  description: string;
  /** Accent color for the icon badge. */
  color: string;
  tint: string;
}

/** A single "what you'll achieve" row: icon badge + title + description. */
export function AchievementRow({ icon, title, description, color, tint }: AchievementRowProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.badge, { backgroundColor: tint }]}>
        <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={24} color={color} />
      </View>
      <View style={styles.text}>
        <Text style={typography.subtitle}>{title}</Text>
        <Text style={[typography.body, styles.desc]}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  badge: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  text: { flex: 1 },
  desc: { marginTop: 2 },
});
