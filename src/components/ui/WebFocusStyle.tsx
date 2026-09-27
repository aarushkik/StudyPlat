import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useAppTheme } from '@/theme/ThemeProvider';

const STYLE_ID = 'studyplat-focus-ring';

/**
 * A visible keyboard-focus ring for the web build, in the theme's colour.
 *
 * Every card, map stop, tab and setup row is keyboard-reachable on the web,
 * but only AppButton drew a ring of its own — and it drew it on focus of any
 * kind, including the focus a mouse click leaves behind. Everything else fell
 * back to the browser's default, a one-pixel line in the system accent
 * colour, square-cornered around rounded controls and all but invisible
 * against the app's own borders. Someone tabbing through the web app could
 * not see where they were.
 *
 * One rule covers all of it. `:focus-visible` is the browser's own judgement
 * of when focus should be shown, which in practice means keyboard use and not
 * taps or clicks, so the ring appears for the people who need it and stays out
 * of the way for everyone else. The ring follows each element's corner
 * radius, which is why chunky wrappers now carry their face's radius. Text
 * fields are left out: they already mark focus with their own border.
 *
 * Renders nothing. Native platforms have no outline and draw their own focus
 * affordances, so this does nothing off the web.
 */
export function WebFocusStyle() {
  const { colors } = useAppTheme();

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    let tag = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement('style');
      tag.id = STYLE_ID;
      document.head.appendChild(tag);
    }
    tag.textContent = `
      [role="button"]:focus-visible,
      [role="tab"]:focus-visible,
      [role="link"]:focus-visible,
      [role="radio"]:focus-visible,
      [role="switch"]:focus-visible,
      a:focus-visible,
      button:focus-visible {
        outline: 3px solid ${colors.primaryDeep};
        outline-offset: 3px;
      }
    `;
  }, [colors.primaryDeep]);

  return null;
}
