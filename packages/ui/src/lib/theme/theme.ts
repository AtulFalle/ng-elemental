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
  private readonly customVariables = signal<Readonly<Record<string, string>>>(
    this.options?.variables ?? {},
  );

  readonly mode = signal<ElThemeMode>(this.options?.mode ?? 'light');

  constructor() {
    effect(() => {
      const mode = this.mode();
      const variables = this.customVariables();
      untracked(() => this.apply(mode, variables));
    });
  }

  setMode(mode: ElThemeMode): void {
    this.mode.set(mode);
  }

  setVariables(variables: Readonly<Record<string, string>>): void {
    this.customVariables.set(variables);
  }

  updateVariables(
    variables: Readonly<Record<string, string>>,
  ): void {
    this.customVariables.update((current) => ({ ...current, ...variables }));
  }

  private apply(
    mode: ElThemeMode,
    variables: Readonly<Record<string, string>>,
  ): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    root.setAttribute('data-el-theme', mode);

    for (const [name, value] of Object.entries(variables)) {
      root.style.setProperty(name, value);
    }
  }
}

export function provideElTheme(
  options?: ElThemeOptions,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: EL_THEME_OPTIONS, useValue: options ?? {} },
  ]);
}
