import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useMotionPreference } from './useMotionPreference';

/** Optional, quiet feedback. Never blocks an action or vibrates a web browser. */
export function useHaptics() {
  const { motionEnabled } = useMotionPreference();
  return (kind: 'selection' | 'success' | 'retry' = 'selection') => {
    if (Platform.OS === 'web' || !motionEnabled) return;
    const effect = kind === 'selection'
      ? Haptics.selectionAsync()
      : Haptics.notificationAsync(kind === 'success' ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning);
    void effect.catch(() => undefined);
  };
}
