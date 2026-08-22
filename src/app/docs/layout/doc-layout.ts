import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DOC_NAV } from '../nav';
import { DocsThemeService } from '../theme-generator/docs-theme.service';
import { ThemePanel } from '../theme-generator/theme-panel';
import { SortPipe } from '../pipe/sort.pipe';
@Component({
  selector: 'app-doc-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemePanel, SortPipe],
  templateUrl: './doc-layout.html',
  styleUrl: './doc-layout.scss',
})
export class DocLayout {
  protected readonly nav = DOC_NAV;
  protected readonly docsTheme = inject(DocsThemeService);
  protected readonly themeOpen = signal(false);

}
