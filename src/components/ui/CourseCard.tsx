import React, { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { accents, colors, radius, shadows, spacing, typography } from '@/theme';
import { CourseIcon } from '@/components/icons';
import type { APCourse } from '@/types';

interface CourseCardProps {
  course: APCourse;
  selected: boolean;
  onPress: () => void;
}

/**
 * Selectable AP course row. Shows an accent-colored icon badge, the course
 * name + blurb, and a check when chosen. Gives a subtle pop on selection.
 */
export function CourseCard({ course, selected, onPress }: CourseCardProps) {
  const accent = accents[course.accent];
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1.02 : 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 10,
    }).start();
  }, [selected, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        onPress={onPress}
        style={[
          styles.card,
          selected ? shadows.sm : shadows.none,
          selected && { borderColor: accent.base, backgroundColor: accent.soft },
        ]}
      >
        <View style={styles.badge}>
          <CourseIcon courseId={course.id} size={46} />
        </View>
        <View style={styles.body}>
          <Text style={typography.subtitle} numberOfLines={1}>
            {course.name}
          </Text>
          <Text style={typography.caption} numberOfLines={1}>
            {course.blurb}
          </Text>
        </View>
        <View style={[styles.check, selected ? { backgroundColor: accent.base } : styles.checkEmpty]}>
          {selected ? <Ionicons name="checkmark" size={18} color={colors.white} /> : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  badge: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  body: { flex: 1, paddingRight: spacing.sm },
  check: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkEmpty: { borderWidth: 2, borderColor: colors.border },
});
