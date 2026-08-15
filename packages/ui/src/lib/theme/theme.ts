import {
  effect,
  EnvironmentProviders,
  inject,
  Injectable,
  makeEnvironmentProviders,
  signal,
  untracked,
} from '@angular/core';
import {
  EL_THEME_OPTIONS,
  type ElThemeMode,
  type ElThemeOptions,
} from './theme.token';

export {
  EL_THEME_OPTIONS,
  type ElThemeMode,
  type ElThemeOptions,
} from './theme.token';

@Injectable({ providedIn: 'root' })
export class ElThemeService {
  private readonly options = inject(EL_THEME_OPTIONS, { optional: true });

  readonly mode = signal<ElThemeMode>(this.options?.mode ?? 'light');

  constructor() {
    effect(() => {
      const mode = this.mode();
      untracked(() => this.apply(mode));
    });
  }

  setMode(mode: ElThemeMode): void {
    this.mode.set(mode);
  }

  private apply(mode: ElThemeMode): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    root.setAttribute('data-el-theme', mode);
    root.style.colorScheme = mode;
  }
}

export function provideElTheme(
  options?: ElThemeOptions,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: EL_THEME_OPTIONS, useValue: options ?? {} },
  ]);
}
