import { computed, Injectable, signal } from '@angular/core';
import type { ElThemeMode } from '@ng-elemental/ui';
import {
  BRAND_TOKENS,
  defaultPalette,
  toRootOverrideCss,
  type ThemePalette,
} from './brand-tokens';

const STYLE_ID = 'el-docs-custom-theme';
const STORAGE_KEY = 'el-docs-theme';

@Injectable({ providedIn: 'root' })
export class DocsThemeService {
  readonly draft = signal<ThemePalette>(defaultPalette());
  readonly applied = signal<ThemePalette | null>(null);
  readonly isCustom = computed(() => this.applied() !== null);

  constructor() {
    this.restore();
  }

  colorOf(name: string, mode: ElThemeMode): string {
    return this.draft()[name]?.[mode] ?? '';
  }

  setColor(name: string, mode: ElThemeMode, value: string): void {
    this.draft.update((palette) => ({
      ...palette,
      [name]: { ...palette[name], [mode]: value },
    }));
  }

  apply(): void {
    const palette = this.draft();
    this.applied.set(palette);
    this.writeStyle(toRootOverrideCss(palette));
    this.writeSession(palette);
  }

  reset(): void {
    this.draft.set(defaultPalette());
    this.applied.set(null);
    this.removeStyle();
    this.clearSession();
  }

  toCss(): string {
    return toRootOverrideCss(this.draft());
  }

  private restore(): void {
    const stored = this.readSession();
    if (!stored) {
      return;
    }

    this.draft.set(stored);
    this.applied.set(stored);
    this.writeStyle(toRootOverrideCss(stored));
  }

  private writeStyle(css: string): void {
    if (typeof document === 'undefined') {
      return;
    }

    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = css;
  }

  private removeStyle(): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.getElementById(STYLE_ID)?.remove();
  }

  private writeSession(palette: ThemePalette): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
  }

  private clearSession(): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    sessionStorage.removeItem(STORAGE_KEY);
  }

  private readSession(): ThemePalette | null {
    if (typeof sessionStorage === 'undefined') {
      return null;
    }

    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      return mergePalette(JSON.parse(raw) as unknown);
    } catch {
      return null;
    }
  }
}

function mergePalette(stored: unknown): ThemePalette | null {
  if (!stored || typeof stored !== 'object') {
    return null;
  }

  const source = stored as Record<string, unknown>;
  const next = defaultPalette();

  for (const token of BRAND_TOKENS) {
    const entry = source[token.name];
    if (!entry || typeof entry !== 'object') {
      continue;
    }

    const { light, dark } = entry as { light?: unknown; dark?: unknown };
    if (typeof light === 'string' && typeof dark === 'string') {
      next[token.name] = { light, dark };
    }
  }

  return next;
}
