import { useSyncExternalStore } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

/**
 * Whether glass should fall back to solid surfaces.
 *
 * True when the person has asked their device for less transparency, and
 * always true on Android, where a live blur under every floating control
 * costs more than it gives. One set of listeners for the whole app: the HUD,
 * tab bar, banner and sheets all read the same answer.
 *
 * Starts solid on iOS until the setting has been read, so nobody who asked
 * for opaque surfaces sees a flash of glass first. The web answers
 * synchronously from the media query, so it starts right.
 */
const QUERY = '(prefers-reduced-transparency: reduce)';

function readWeb(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(QUERY).matches;
}

let snapshot = Platform.OS === 'web' ? readWeb() : true;
const listeners = new Set<() => void>();
let dispose: (() => void) | undefined;

function update(value: boolean) {
  if (snapshot === value) return;
  snapshot = value;
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  if (listeners.size === 1) {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const query = window.matchMedia(QUERY);
      const onChange = () => update(query.matches);
      update(query.matches);
      query.addEventListener('change', onChange);
      dispose = () => query.removeEventListener('change', onChange);
    } else if (Platform.OS === 'ios') {
      let mounted = true;
      const sub = AccessibilityInfo.addEventListener('reduceTransparencyChanged', update);
      AccessibilityInfo.isReduceTransparencyEnabled()
        .then((value) => { if (mounted) update(value); })
        .catch(() => { /* Keep the solid default. */ });
      dispose = () => { mounted = false; sub.remove(); };
    }
  }
  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) { dispose?.(); dispose = undefined; }
  };
}

export function useReducedTransparency(): boolean {
  return useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
}
