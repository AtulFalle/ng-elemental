import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface DocsTocItem {
  id: string;
  label: string;
}

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function ensureUniqueId(base: string, used: Set<string>): string {
  let id = base || 'section';
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

@Component({
  selector: 'app-docs-toc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './docs-toc.html',
  styleUrl: './docs-toc.scss',
})
export class DocsToc {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly items = signal<DocsTocItem[]>([]);
  protected readonly activeId = signal('');

  private observer: IntersectionObserver | null = null;
  private visible = new Map<string, number>();
  private harvestTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    const sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.scheduleHarvest());

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
      this.disconnect();
      if (this.harvestTimer) {
        clearTimeout(this.harvestTimer);
      }
    });

    afterNextRender(() => this.scheduleHarvest());
  }

  private scheduleHarvest(): void {
    if (this.harvestTimer) {
      clearTimeout(this.harvestTimer);
    }
    this.harvestTimer = setTimeout(() => this.harvest(), 50);
  }

  private harvest(): void {
    this.disconnect();
    this.visible.clear();

    const root = this.host.nativeElement
      .closest('.docs-shell')
      ?.querySelector('main.docs-main .docs-page');
    if (!(root instanceof HTMLElement)) {
      this.items.set([]);
      this.activeId.set('');
      return;
    }

    const headings = Array.from(root.querySelectorAll('h2'));
    const used = new Set<string>();
    const next: DocsTocItem[] = [];

    for (const heading of headings) {
      if (!(heading instanceof HTMLHeadingElement)) {
        continue;
      }
      const label = heading.textContent?.trim() ?? '';
      if (!label) {
        continue;
      }
      const existing = heading.id.trim();
      const id = ensureUniqueId(existing || slugify(label), used);
      if (heading.id !== id) {
        heading.id = id;
      }
      next.push({ id, label });
    }

    this.items.set(next);
    this.activeId.set(next[0]?.id ?? '');

    if (next.length === 0) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) {
            continue;
          }
          if (entry.isIntersecting) {
            this.visible.set(id, entry.intersectionRatio);
          } else {
            this.visible.delete(id);
          }
        }
        this.updateActive(next);
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const item of next) {
      const el = root.querySelector(`#${CSS.escape(item.id)}`);
      if (el) {
        this.observer.observe(el);
      }
    }
  }

  private updateActive(items: DocsTocItem[]): void {
    if (this.visible.size === 0) {
      return;
    }
    let bestId = '';
    let bestRatio = -1;
    for (const item of items) {
      const ratio = this.visible.get(item.id);
      if (ratio !== undefined && ratio >= bestRatio) {
        bestRatio = ratio;
        bestId = item.id;
      }
    }
    if (bestId) {
      this.activeId.set(bestId);
    }
  }

  private disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
