import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ElButton } from '@ng-elemental/ui';
import { filter, map, startWith } from 'rxjs/operators';
import { DOC_NAV, type DocNavItem } from '../nav';

function flattenNav(): DocNavItem[] {
  return DOC_NAV.flatMap((section) => section.items);
}

@Component({
  selector: 'app-docs-pager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton],
  templateUrl: './docs-pager.html',
  styleUrl: './docs-pager.scss',
})
export class DocsPager {
  readonly compact = input(false);

  private readonly router = inject(Router);
  private readonly items = flattenNav();

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url.split('#')[0].split('?')[0]),
      startWith(this.router.url.split('#')[0].split('?')[0]),
    ),
    { initialValue: this.router.url.split('#')[0].split('?')[0] },
  );

  private readonly index = computed(() => {
    const path = this.url();
    return this.items.findIndex((item) => item.path === path);
  });

  protected readonly prev = computed(() => {
    const i = this.index();
    return i > 0 ? this.items[i - 1] : null;
  });

  protected readonly next = computed(() => {
    const i = this.index();
    return i >= 0 && i < this.items.length - 1 ? this.items[i + 1] : null;
  });

  protected go(path: string): void {
    void this.router.navigateByUrl(path);
  }
}
