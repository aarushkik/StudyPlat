export type AppearancePreference = 'system' | 'light' | 'dark';
export function resolveAppearance(preference: AppearancePreference, system: string | null | undefined): 'light' | 'dark' {
  return preference === 'system' ? system === 'dark' ? 'dark' : 'light' : preference;
}
