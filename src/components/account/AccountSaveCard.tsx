import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Glyph } from '@/components/icons';
import { useAuth } from '@/state/AuthContext';
import { useQuest } from '@/state/QuestContext';
import { deviceStorage } from '@/lib/storage';
import { colors, fonts } from '@/theme';

const REMINDER_KEY = 'studyplat.account-reminder';
/** Permanent in Profile; a dismissible reminder after the first study session
 * and then after five more sessions, at most once per day. No modal interrupts. */
export function AccountSaveCard({ reminder = false, compact = false }: { reminder?: boolean; compact?: boolean }) {
  const { isGuest } = useAuth();
  const { sessions } = useQuest();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(!reminder);
  useEffect(() => {
    let alive = true;
    if (reminder && isGuest) {
      void deviceStorage.getItem(REMINDER_KEY).then((raw) => {
        const last = raw ? JSON.parse(raw) as { sessions: number; at: number } : null;
        if (alive) setVisible(sessions > 0 && (!last || (sessions - last.sessions >= 5 && Date.now() - last.at >= 86400000)));
      }).catch(() => { /* A reminder must never block study. */ });
    }
    return () => { alive = false; };
  }, [reminder, sessions, isGuest]);
  if (!isGuest || !visible) return null;
  const dismiss = () => {
    setVisible(false);
    void deviceStorage.setItem(REMINDER_KEY, JSON.stringify({ sessions, at: Date.now() })).catch(() => undefined);
  };
  return <View style={[styles.card, compact && styles.compact]}>
    <View style={styles.heading}>
      <Glyph name="shield" size={compact ? 18 : 23} color={colors.primaryDeep} />
      <Text style={styles.title}>{compact ? 'Your quest lives on this device' : 'Take your quest with you'}</Text>
      {reminder && <Pressable accessibilityRole="button" accessibilityLabel="Remind me later" onPress={dismiss} style={styles.close}><Glyph name="close" size={17} color={colors.textSecondary} /></Pressable>}
    </View>
    {!compact && <Text style={styles.body}>Create an account or sign in to save your progress across devices. You can keep studying here without one.</Text>}
    <Pressable accessibilityRole="button" accessibilityLabel="Save my progress across devices" onPress={() => { if (reminder) dismiss(); navigation.navigate('SignIn'); }} style={({ pressed }) => [styles.action, pressed && { opacity: 0.65 }]}>
      <Text style={styles.actionText}>Save across devices</Text><Glyph name="arrow-right" size={16} color={colors.primaryDeep} />
    </Pressable>
  </View>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.primaryTint, borderWidth: 2, borderColor: colors.ink, borderRadius: 20, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4, marginVertical: 12 },
  compact: { marginHorizontal: 18, marginTop: 0 },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  title: { flex: 1, fontFamily: fonts.displayBold, fontSize: 17, lineHeight: 22, color: colors.ink },
  body: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.textSecondary, marginTop: 7 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 44 },
  actionText: { fontFamily: fonts.bodyHeavy, fontSize: 13, color: colors.primaryDeep },
  close: { width: 44, height: 44, marginRight: -10, marginTop: -9, marginBottom: -9, alignItems: 'center', justifyContent: 'center' },
});
