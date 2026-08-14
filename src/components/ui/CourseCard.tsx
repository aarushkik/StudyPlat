import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { accents, colors, fonts } from '@/theme';
import type { APCourse } from '@/types';
import { SelectRow } from './SelectRow';

/**
 * A selectable AP course.
 *
 * Led by a three-letter mark in the course's own colour rather than an
 * illustration. The detailed icons this replaced were the only art in the app
 * not drawn in flat ink, and against the rest of the palette they looked
 * borrowed. A lettered tile also scales: an eight-course list stays legible,
 * and adding a ninth costs a string rather than a drawing.
 *
 * The subtitle stays the blurb alone. It briefly carried the stop count too,
 * but every course is the same size, so eight identical "180 stops" told the
 * reader nothing and wrapped every row onto a second line.
 */
export function CourseCard({
  course,
  selected,
  onPress,
}: {
  course: APCourse;
  selected: boolean;
  onPress: () => void;
}) {
  const accent = accents[course.accent];

  return (
    <SelectRow
      leading={<Text style={[styles.abbr, { color: accent.deep }]}>{course.abbr}</Text>}
      title={course.name}
      subtitle={course.blurb}
      selected={selected}
      onPress={onPress}
      accent={accent.deep}
      tint={accent.soft}
    />
  );
}

const styles = StyleSheet.create({
  abbr: { fontFamily: fonts.displayHeavy, fontSize: 16, letterSpacing: 0.4, color: colors.ink },
});
