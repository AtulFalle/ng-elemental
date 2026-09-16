import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { ElPagination } from '@ng-elemental/ui';
import { filter, map, startWith } from 'rxjs/operators';
import { DOC_NAV, type DocNavItem } from '../nav';

function flattenNav(): DocNavItem[] {
  return DOC_NAV.flatMap((section) => section.items);
}

function pageUrl(url: string): string {
  return url.split('#')[0].split('?')[0];
}

@Component({
  selector: 'app-docs-pager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElPagination],
  templateUrl: './docs-pager.html',
  styleUrl: './docs-pager.scss',
  host: {
    class: 'docs-pager-host',
    '[class.docs-pager-host--compact]': 'compact()',
  },
})
export class DocsPager {
  readonly compact = input(false);

  private readonly router = inject(Router);
  private readonly items = flattenNav();

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => pageUrl(this.router.url)),
      startWith(pageUrl(this.router.url)),
    ),
    { initialValue: pageUrl(this.router.url) },
  );

  private readonly index = computed(() => {
    const path = this.url();
    return this.items.findIndex((item) => item.path === path);
  });

  protected readonly page = computed(() => {
    const i = this.index();
    return i >= 0 ? i + 1 : 1;
  });

  protected readonly total = computed(() => this.items.length);

  protected readonly ariaLabel = computed(() => {
    const i = this.index();
    const current = i >= 0 ? this.items[i] : null;
    return current
      ? `Documentation pages, ${current.label}`
      : 'Documentation pages';
  });

  protected onPage(page: number): void {
    const item = this.items[page - 1];
    if (!item || item.path === this.url()) {
      return;
    }
    void this.router.navigateByUrl(item.path);
  }
}
