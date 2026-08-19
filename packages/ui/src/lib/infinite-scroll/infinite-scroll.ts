import {
  afterEveryRender,
  afterRenderEffect,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
  numberAttribute,
  output,
  signal,
  untracked,
} from '@angular/core';

export type ElInfiniteScrollRoot = 'host' | 'viewport';

@Directive({
  selector: '[elInfiniteScroll]',
  host: {
    class: 'el-infinite-scroll',
    '[attr.aria-busy]': 'disabled() && !complete() ? true : null',
  },
})
export class ElInfiniteScroll {
  /** Skip `loadMore` while a page is in flight. Bind to your loading flag. */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Stop requesting when the last page has been loaded. */
  readonly complete = input(false, { transform: booleanAttribute });
  /** IntersectionObserver `rootMargin`, e.g. `"160px"` to prefetch. */
  readonly rootMargin = input('160px');
  readonly threshold = input(0, { transform: numberAttribute });
  /**
   * `"host"` (default) uses this element as the scroll root — set overflow and
   * a max height on it. `"viewport"` observes against the window.
   */
  readonly root = input<ElInfiniteScrollRoot>('host');

  readonly loadMore = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  private readonly sentinelVisible = signal(false);
  private requested = false;
  private observer: IntersectionObserver | null = null;
  private observerKey = '';
  private observedNode: HTMLElement | null = null;
  private sentinel: HTMLElement | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.teardown());

    afterEveryRender(() => {
      this.ensureSentinel();
      this.observe();
    });

    afterRenderEffect(() => {
      if (this.complete() || this.disabled()) {
        this.requested = false;
        return;
      }
      if (!this.sentinelVisible() || this.requested) {
        return;
      }
      this.requested = true;
      untracked(() => this.loadMore.emit());
    });
  }

  private ensureSentinel(): void {
    const host = this.host.nativeElement;
    const doc = host.ownerDocument;
    if (!this.sentinel || this.sentinel.ownerDocument !== doc) {
      this.disconnectObserver();
      this.sentinel = this.createSentinel(doc);
    }
    if (this.sentinel.parentNode !== host || host.lastChild !== this.sentinel) {
      host.appendChild(this.sentinel);
    }
  }

  private createSentinel(doc: Document): HTMLElement {
    const sentinel = doc.createElement('div');
    sentinel.className = 'el-infinite-scroll__sentinel';
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText =
      'display:block;width:100%;height:1px;flex-shrink:0;pointer-events:none';
    return sentinel;
  }

  private observe(): void {
    const sentinel = this.sentinel;
    if (!sentinel) {
      return;
    }

    const key = `${this.root()}|${this.rootMargin()}|${this.threshold()}`;
    if (
      this.observer &&
      this.observerKey === key &&
      this.observedNode === sentinel
    ) {
      return;
    }

    this.disconnectObserver();
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observerKey = key;
    this.observedNode = sentinel;
    const root = this.root() === 'viewport' ? null : this.host.nativeElement;
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        this.ngZone.run(() => this.sentinelVisible.set(visible));
      },
      {
        root,
        rootMargin: this.rootMargin(),
        threshold: this.threshold(),
      },
    );
    this.observer.observe(sentinel);
  }

  private disconnectObserver(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.observerKey = '';
    this.observedNode = null;
  }

  private teardown(): void {
    this.disconnectObserver();
    this.sentinel?.remove();
    this.sentinel = null;
  }
}
