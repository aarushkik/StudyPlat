import type { ImageSourcePropType } from 'react-native';

/**
 * Stu's poses.
 *
 * Each is a drawn illustration rather than a set of parts, so whatever Stu is
 * holding is part of the pose — `reading` comes with a book, `bossReady` with
 * a sword. There is nothing to combine, which is why the old `accessory` prop
 * was removed rather than kept as a no-op.
 *
 * Pose names describe the *moment* rather than the emotion wherever the app
 * has a specific moment for one: `thumbsup` is a correct answer, `wince` a
 * wrong one, `streakLost` a broken streak.
 */
export type MascotPose =
  // General expressions
  | 'neutral'
  | 'thinking'
  | 'excited'
  | 'worried'
  | 'celebrate'
  | 'proud'
  | 'sleepy'
  | 'sad'
  // Doing something
  | 'reading'
  | 'meditate'
  | 'wave'
  | 'point'
  | 'map'
  | 'idea'
  // Answer feedback
  | 'thumbsup'
  | 'wince'
  | 'trophy'
  // Streak
  | 'streakOn'
  | 'streakLost'
  | 'streakFreeze'
  // Boss encounters
  | 'bossReady'
  | 'bossWin'
  | 'bossLose'
  // Rewards
  | 'levelUp'
  | 'progress'
  | 'chest';

/** Named sizes; a raw number is also accepted for precise control. */
export type MascotSize = 'tiny' | 'small' | 'medium' | 'large' | 'xl';

export interface MascotProps {
  pose?: MascotPose;
  size?: MascotSize | number;
  /** Master switch for the idle bob (default true). */
  animated?: boolean;
  /** Soft contact shadow beneath Stu (default true). */
  shadow?: boolean;
}

/** Width in pixels for each named size. */
export const MASCOT_SIZES: Record<MascotSize, number> = {
  tiny: 44,
  small: 80,
  medium: 120,
  large: 176,
  xl: 232,
};

/** The art is square, unlike the old drawn mascot's 240×276 grid. */
export const MASCOT_ASPECT = 1;

/**
 * Pose → artwork. All transparent PNGs at 512², so they sit correctly on the
 * night-ground screens as well as on cream.
 *
 * `require` paths must be static literals — Metro resolves them at build time,
 * so this map cannot be built from a template string.
 */
export const MASCOT_ART: Record<MascotPose, ImageSourcePropType> = {
  neutral: require('../../assets/mascot/platypus-neutral.png'),
  thinking: require('../../assets/mascot/platypus-thinking.png'),
  excited: require('../../assets/mascot/platypus-excited.png'),
  worried: require('../../assets/mascot/platypus-worried.png'),
  celebrate: require('../../assets/mascot/platypus-celebrate.png'),
  proud: require('../../assets/mascot/platypus-proud.png'),
  sleepy: require('../../assets/mascot/platypus-sleepy.png'),
  sad: require('../../assets/mascot/platypus-sad.png'),

  reading: require('../../assets/mascot/platypus-reading.png'),
  meditate: require('../../assets/mascot/platypus-meditate.png'),
  wave: require('../../assets/mascot/platypus-wave.png'),
  point: require('../../assets/mascot/platypus-point.png'),
  map: require('../../assets/mascot/platypus-map.png'),
  idea: require('../../assets/mascot/platypus-idea.png'),

  thumbsup: require('../../assets/mascot/platypus-thumbsup.png'),
  wince: require('../../assets/mascot/platypus-wince.png'),
  trophy: require('../../assets/mascot/platypus-trophy.png'),

  streakOn: require('../../assets/mascot/platypus-streak-on.png'),
  streakLost: require('../../assets/mascot/platypus-streak-lost.png'),
  streakFreeze: require('../../assets/mascot/platypus-streak-freeze.png'),

  bossReady: require('../../assets/mascot/platypus-boss-ready.png'),
  bossWin: require('../../assets/mascot/platypus-boss-win.png'),
  bossLose: require('../../assets/mascot/platypus-boss-lose.png'),

  levelUp: require('../../assets/mascot/platypus-levelup.png'),
  progress: require('../../assets/mascot/platypus-progress.png'),
  chest: require('../../assets/mascot/platypus-chest.png'),
};

/** The brand mark — Stu's head. Not a pose; used beside the wordmark. */
export const MASCOT_MARK: ImageSourcePropType = require('../../assets/mascot/logo-mark.png');
