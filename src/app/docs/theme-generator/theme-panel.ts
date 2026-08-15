import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import {
  ElButton,
  ElIcon,
  ElSegmentedButton,
  ElSegmentedButtonItem,
  ElThemeService,
  type ElThemeMode,
} from '@ng-elemental/ui';
import { BRAND_TOKEN_GROUPS, type BrandToken } from './brand-tokens';
import { DocsThemeService } from './docs-theme.service';

const HEX = /^#[0-9a-fA-F]{6}$/;

@Component({
  selector: 'app-theme-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElButton, ElIcon, ElSegmentedButton, ElSegmentedButtonItem],
  templateUrl: './theme-panel.html',
  styleUrl: './theme-panel.scss',
  host: {
    '(document:keydown.escape)': 'closed.emit()',
  },
})
export class ThemePanel {
  private readonly elTheme = inject(ElThemeService);
  protected readonly docsTheme = inject(DocsThemeService);

  readonly closed = output<void>();

  protected readonly groups = BRAND_TOKEN_GROUPS;
  protected readonly copied = signal(false);

  protected mode(): ElThemeMode {
    return this.elTheme.mode();
  }

  protected setMode(value: string): void {
    this.elTheme.setMode(value === 'dark' ? 'dark' : 'light');
  }

  protected colorOf(token: BrandToken): string {
    return this.docsTheme.colorOf(token.name, this.mode());
  }

  protected onPicker(token: BrandToken, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.docsTheme.setColor(token.name, this.mode(), value);
  }

  protected onHex(token: BrandToken, event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim();
    if (!HEX.test(value)) {
      return;
    }
    this.docsTheme.setColor(token.name, this.mode(), value.toLowerCase());
  }

  protected apply(): void {
    this.docsTheme.apply();
  }

  protected reset(): void {
    this.docsTheme.reset();
  }

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.docsTheme.toCss());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
