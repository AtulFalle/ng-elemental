import { InjectionToken } from '@angular/core';

export type ElThemeMode = 'light' | 'dark';

export interface ElThemeOptions {
  /** Initial theme mode applied to `document.documentElement`. */
  readonly mode?: ElThemeMode;
}

export const EL_THEME_OPTIONS = new InjectionToken<ElThemeOptions>(
  'EL_THEME_OPTIONS',
);
