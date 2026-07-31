import React from 'react';
import { accents } from '@/theme';
import { CourseIcon } from '@/components/icons';
import type { APCourse } from '@/types';
import { SelectRow } from './SelectRow';

interface CourseCardProps {
  course: APCourse;
  selected: boolean;
  onPress: () => void;
}

/** Selectable AP course row, color-coded and led by the course's illustration. */
export function CourseCard({ course, selected, onPress }: CourseCardProps) {
  const accent = accents[course.accent];
  return (
    <SelectRow
      leading={<CourseIcon courseId={course.id} size={46} />}
      title={course.name}
      subtitle={course.blurb}
      selected={selected}
      onPress={onPress}
      accent={accent.deep}
      tint={accent.soft}
      bareLeading
    />
  );
}
