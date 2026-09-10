import { useSyncExternalStore } from 'react';
import { AccessibilityInfo, AppState } from 'react-native';

// One pair of native listeners for the whole app, including long quest maps.
// Start quietly until the device's accessibility preference has been read.
let snapshot = { reduceMotion: true, motionEnabled: false };
let active = AppState.currentState !== 'background' && AppState.currentState !== 'inactive';
const listeners = new Set<() => void>();
let dispose: (() => void) | undefined;

function update(reduceMotion: boolean) {
  const motionEnabled = !reduceMotion && active;
  if (snapshot.reduceMotion === reduceMotion && snapshot.motionEnabled === motionEnabled) return;
  snapshot = { reduceMotion, motionEnabled };
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  if (listeners.size === 1) {
    let mounted = true;
    active = AppState.currentState !== 'background' && AppState.currentState !== 'inactive';
    const motion = AccessibilityInfo.addEventListener('reduceMotionChanged', update);
    const app = AppState.addEventListener('change', (state) => {
      active = state === 'active';
      update(snapshot.reduceMotion);
    });
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (mounted) update(reduced);
    }).catch(() => { /* Keep the accessible, quiet default. */ });
    dispose = () => {
      mounted = false;
      motion.remove();
      app.remove();
    };
  }
  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) { dispose?.(); dispose = undefined; }
  };
}

const getSnapshot = () => snapshot;

/** Ambient motion pauses in the background and follows Reduce Motion live. */
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
