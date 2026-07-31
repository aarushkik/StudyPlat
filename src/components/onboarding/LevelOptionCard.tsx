import React from 'react';
import { SelectRow } from '@/components/ui/SelectRow';
import { colors } from '@/theme';
import { LevelBars } from './LevelBars';

interface LevelOptionCardProps {
  label: string;
  /** 1–5 filled bars for this level. */
  bars: number;
  /** Short read on what this level means, shown under the label. */
  hint?: string;
  selected: boolean;
  onPress: () => void;
}

/** Experience-level option: rising signal bars beside the label. */
export function LevelOptionCard({ label, bars, hint, selected, onPress }: LevelOptionCardProps) {
  return (
    <SelectRow
      leading={<LevelBars filled={bars} color={selected ? colors.primary : colors.textMuted} />}
      title={label}
      subtitle={hint}
      selected={selected}
      onPress={onPress}
    />
  );
}
