import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  signal,
} from '@angular/core';
import {
  ElButton,
  ElChip,
  ElInput,
  ElSegmentedButton,
  ElSegmentedButtonItem,
  ElSheet,
  ElStack,
  ElThemeService,
  type ElThemeMode,
} from '@ng-elemental/ui';
import {
  BRAND_TOKEN_GROUPS,
  PREVIEW_TOKEN_GROUPS,
  type BrandToken,
  type BrandTokenGroup,
} from './brand-tokens';
import { DocsThemeService } from './docs-theme.service';

const HEX = /^#[0-9a-fA-F]{6}$/;

export type ThemeTokenScope = 'preview' | 'all';

@Component({
  selector: 'app-theme-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElButton,
    ElChip,
    ElInput,
    ElSegmentedButton,
    ElSegmentedButtonItem,
    ElSheet,
    ElStack,
  ],
  templateUrl: './theme-panel.html',
  styleUrl: './theme-panel.scss',
})
export class ThemePanel {
  private readonly elTheme = inject(ElThemeService);
  protected readonly docsTheme = inject(DocsThemeService);

  readonly open = model(false);
  protected readonly tokenScope = signal<ThemeTokenScope>('preview');
  protected readonly copied = signal(false);
  private readonly hexDraft = signal<Record<string, string>>({});

  protected readonly displayGroups = computed((): readonly BrandTokenGroup[] =>
    this.tokenScope() === 'all' ? BRAND_TOKEN_GROUPS : PREVIEW_TOKEN_GROUPS,
  );

  protected readonly modeLabel = computed(() =>
    this.mode() === 'dark' ? 'dark mode' : 'light mode',
  );

  protected mode(): ElThemeMode {
    return this.elTheme.mode();
  }

  protected setMode(value: string): void {
    this.elTheme.setMode(value === 'dark' ? 'dark' : 'light');
  }

  protected setTokenScope(value: string): void {
    this.tokenScope.set(value === 'all' ? 'all' : 'preview');
  }

  protected colorOf(token: BrandToken): string {
    return this.docsTheme.colorOf(token.name, this.mode());
  }

  protected hexOf(token: BrandToken): string {
    return this.hexDraft()[this.draftKey(token)] ?? this.colorOf(token);
  }

  protected hexId(token: BrandToken): string {
    return `docs-theme-hex-${token.name.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  }

  protected onPicker(token: BrandToken, value: string): void {
    this.clearDraft(token);
    this.commitColor(token, value);
  }

  protected onHex(token: BrandToken, value: string): void {
    const next = value.trim();
    this.hexDraft.update((draft) => ({
      ...draft,
      [this.draftKey(token)]: next,
    }));
    if (!HEX.test(next)) {
      return;
    }
    this.commitColor(token, next.toLowerCase());
  }

  protected reset(): void {
    this.hexDraft.set({});
    this.docsTheme.reset();
  }

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.docsTheme.toCss());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  private commitColor(token: BrandToken, value: string): void {
    this.docsTheme.setColor(token.name, this.mode(), value);
    this.docsTheme.apply();
  }

  private draftKey(token: BrandToken): string {
    return `${token.name}:${this.mode()}`;
  }

  private clearDraft(token: BrandToken): void {
    const key = this.draftKey(token);
    this.hexDraft.update((draft) => {
      if (!(key in draft)) {
        return draft;
      }
      const next = { ...draft };
      delete next[key];
      return next;
    });
  }
}
