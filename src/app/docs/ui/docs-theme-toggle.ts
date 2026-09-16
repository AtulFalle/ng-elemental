import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ElButton, ElThemeService, ElTooltip } from '@ng-elemental/ui';

@Component({
  selector: 'app-docs-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElButton, ElTooltip],
  template: `
    <el-button
      variant="icon"
      size="sm"
      [iconStart]="icon()"
      [ariaLabel]="label()"
      [elTooltip]="label()"
      (click)="toggle()"
    />
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class DocsThemeToggle {
  private readonly theme = inject(ElThemeService);

  private readonly isDark = computed(() => this.theme.mode() === 'dark');

  protected readonly label = computed(() =>
    this.isDark() ? 'Switch to light theme' : 'Switch to dark theme',
  );

  protected readonly icon = computed(() => (this.isDark() ? 'sun' : 'moon'));

  protected toggle(): void {
    this.theme.setMode(this.isDark() ? 'light' : 'dark');
  }
}
