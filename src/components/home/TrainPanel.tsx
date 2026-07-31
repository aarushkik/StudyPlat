import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Glyph, type GlyphName } from '@/components/icons';
import { Mascot } from '@/components/Mascot';
import { colors, radius, shadows, spacing, typography } from '@/theme';
import { useQuest } from '@/state/QuestContext';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Drill {
  id: string;
  glyph: GlyphName;
  title: string;
  blurb: string;
  count: number;
  xp: number;
  tint: string;
  color: string;
}

/**
 * Training ground — practice that isn't on the trail.
 *
 * The map is where progress happens; this is where you sharpen something
 * specific without spending a stop. Each drill is the same question engine
 * pointed at a different slice and length.
 */
const DRILLS: Drill[] = [
  {
    id: 'weak',
    glyph: 'target',
    title: 'Weak spots',
    blurb: 'Only the skills you have been getting wrong.',
    count: 6,
    xp: 30,
    tint: '#FFE3E6',
    color: '#D53344',
  },
  {
    id: 'timed',
    glyph: 'clock',
    title: 'Timed drill',
    blurb: 'No hints, and the clock keeps running.',
    count: 8,
    xp: 40,
    tint: '#DDEEFF',
    color: '#1173C4',
  },
  {
    id: 'recall',
    glyph: 'bolt',
    title: 'Flash recall',
    blurb: 'Fast questions on the terms this unit leans on.',
    count: 5,
    xp: 20,
    tint: '#FCEBD4',
    color: '#C4740F',
  },
  {
    id: 'mock',
    glyph: 'page',
    title: 'Mock section',
    blurb: 'A full practice section under exam conditions.',
    count: 8,
    xp: 70,
    tint: '#E7E3FF',
    color: '#5E4BD6',
  },
];

export function TrainPanel() {
  const navigation = useNavigation<Nav>();
  const { xp } = useQuest();

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={typography.title}>Training ground</Text>
          <Text style={[typography.body, styles.heroBody]}>
            Sharpen one thing at a time. Nothing here costs you a stop on the map.
          </Text>
        </View>
        <Mascot size={84} expression="focused" />
      </View>

      <View style={styles.earned}>
        <Glyph name="star" size={20} color={colors.gold} />
        <Text style={styles.earnedText}>{xp} XP earned in this session</Text>
      </View>

      {DRILLS.map((drill) => (
        <Pressable
          key={drill.id}
          accessibilityRole="button"
          onPress={() =>
            navigation.navigate('Quiz', { title: drill.title, xp: drill.xp, count: drill.count })
          }
          style={({ pressed }) => [styles.card, shadows.xs, pressed && styles.pressed]}
        >
          <View style={[styles.tile, { backgroundColor: drill.tint }]}>
            <Glyph name={drill.glyph} size={26} color={drill.color} strokeWidth={2.2} />
          </View>
          <View style={styles.body}>
            <Text style={typography.subtitle}>{drill.title}</Text>
            <Text style={typography.caption} numberOfLines={2}>
              {drill.blurb}
            </Text>
            <View style={styles.meta}>
              <Text style={styles.metaText}>{drill.count} questions</Text>
              <View style={styles.dot} />
              <Text style={[styles.metaText, { color: colors.goldDark }]}>{drill.xp} XP</Text>
            </View>
          </View>
          <Glyph name="chevron-right" size={20} color={colors.textMuted} strokeWidth={2.4} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: spacing.xl, paddingBottom: spacing.huge },
  hero: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  heroText: { flex: 1 },
  heroBody: { marginTop: spacing.xs },
  earned: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceSunken,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginVertical: spacing.lg,
  },
  earnedText: { ...typography.caption, color: colors.textSecondary },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  pressed: { transform: [{ scale: 0.985 }], opacity: 0.92 },
  tile: { width: 52, height: 52, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, gap: 1 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
  metaText: { ...typography.label, color: colors.textMuted },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.textMuted },
});
