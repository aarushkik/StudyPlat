import React from 'react';
import { SelectRow } from '@/components/ui/SelectRow';

interface ChoiceCardProps {
  /** A custom icon element, rendered inside a tinted tile. */
  icon: React.ReactNode;
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}

/** Generic icon + label + description selection card used across setup steps. */
export function ChoiceCard({ icon, label, description, selected, onPress }: ChoiceCardProps) {
  return <SelectRow leading={icon} title={label} subtitle={description} selected={selected} onPress={onPress} />;
}
