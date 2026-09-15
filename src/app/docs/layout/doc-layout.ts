import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { ElNav, ElNavHeading, ElNavItem } from '@ng-elemental/ui';
import { filter, map, startWith } from 'rxjs';
import { DOC_NAV, DOCS_VERSION, type DocNavSection } from '../nav';
import { DocsThemeService } from '../theme-generator/docs-theme.service';
import { ThemePanel } from '../theme-generator/theme-panel';
import { DocsSearch } from '../ui/docs-search';
import { DocsToc } from '../ui/docs-toc';

function stripUrl(url: string): string {
  return url.split('?')[0]?.split('#')[0] ?? url;
}

function sortSections(sections: DocNavSection[]): DocNavSection[] {
  return sections.map((section) => ({
    ...section,
    items: [...section.items].sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }),
    ),
  }));
}

@Component({
  selector: 'app-doc-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    ThemePanel,
    DocsToc,
    DocsSearch,
    ElNav,
    ElNavItem,
    ElNavHeading,
  ],
  templateUrl: './doc-layout.html',
  styleUrl: './doc-layout.scss',
})
export class DocLayout {
  private readonly router = inject(Router);

  protected readonly version = DOCS_VERSION;
  protected readonly docsTheme = inject(DocsThemeService);
  protected readonly themeOpen = signal(false);
  protected readonly sections = sortSections(DOC_NAV);

  private readonly urlPath = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => stripUrl(this.router.url)),
      startWith(stripUrl(this.router.url)),
    ),
    { initialValue: stripUrl(this.router.url) },
  );

  protected readonly activePath = computed(() => this.urlPath());

  protected onNavValueChange(path: string): void {
    if (!path || path === this.activePath()) {
      return;
    }
    void this.router.navigateByUrl(path);
  }
}
