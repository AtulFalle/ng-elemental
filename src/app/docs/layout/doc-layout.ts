import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
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
import {
  ElButton,
  ElContainer,
  ElGrid,
  ElNav,
  ElNavHeading,
  ElNavItem,
  ElSeparator,
  ElTooltip,
} from '@ng-elemental/ui';
import { filter, map, startWith } from 'rxjs';
import { DOC_NAV, DOCS_VERSION, type DocNavSection } from '../nav';
import { DocsThemeService } from '../theme-generator/docs-theme.service';
import { ThemePanel } from '../theme-generator/theme-panel';
import { DocsSearch } from '../ui/docs-search';
import { DocsThemeToggle } from '../ui/docs-theme-toggle';
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
    DocsThemeToggle,
    ElButton,
    ElContainer,
    ElGrid,
    ElNav,
    ElNavItem,
    ElNavHeading,
    ElSeparator,
    ElTooltip,
  ],
  templateUrl: './doc-layout.html',
  styleUrl: './doc-layout.scss',
})
export class DocLayout {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly viewportWidth = signal(
    typeof window === 'undefined' ? 1200 : window.innerWidth,
  );

  protected readonly version = DOCS_VERSION;
  protected readonly docsTheme = inject(DocsThemeService);
  protected readonly themeOpen = signal(false);
  protected readonly themeTriggerLabel = computed(() =>
    this.docsTheme.isCustom()
      ? 'Customize theme · custom colors on'
      : 'Customize theme',
  );
  protected readonly sections = sortSections(DOC_NAV);
  protected readonly showToc = computed(() => this.viewportWidth() > 1099);
  protected readonly bodyColumns = computed(() => {
    const width = this.viewportWidth();
    if (width <= 768) {
      return 'minmax(0, 1fr)';
    }
    if (width <= 1099) {
      return '16rem minmax(0, 1fr)';
    }
    return '16rem minmax(0, 1fr) 14rem';
  });

  private readonly urlPath = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => stripUrl(this.router.url)),
      startWith(stripUrl(this.router.url)),
    ),
    { initialValue: stripUrl(this.router.url) },
  );

  protected readonly activePath = computed(() => this.urlPath());

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }
    const onResize = () => this.viewportWidth.set(window.innerWidth);
    window.addEventListener('resize', onResize);
    this.destroyRef.onDestroy(() =>
      window.removeEventListener('resize', onResize),
    );
  }

  protected onNavValueChange(path: string): void {
    if (!path || path === this.activePath()) {
      return;
    }
    void this.router.navigateByUrl(path);
  }
}
