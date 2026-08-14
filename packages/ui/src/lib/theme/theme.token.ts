import { InjectionToken } from '@angular/core';

export type ElThemeMode = 'light' | 'dark';

export interface ElThemeOptions {
  /** Initial theme mode applied to `document.documentElement`. */
  readonly mode?: ElThemeMode;
  /** Custom CSS variable overrides (e.g. `{ '--el-color-accent': '#6366f1' }`). */
  readonly variables?: Readonly<Record<string, string>>;
}

export const EL_THEME_OPTIONS = new InjectionToken<ElThemeOptions>(
  'EL_THEME_OPTIONS',
);
