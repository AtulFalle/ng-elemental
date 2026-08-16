import {
  afterRenderEffect,
  ApplicationRef,
  booleanAttribute,
  ComponentRef,
  createComponent,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ElSkeletonCover } from './skeleton-cover';

const REPLACED_TAGS = new Set([
  'INPUT',
  'TEXTAREA',
  'SELECT',
  'IMG',
  'HR',
  'BR',
  'VIDEO',
  'AUDIO',
  'CANVAS',
  'IFRAME',
]);

@Directive({
  selector: '[elSkeleton]',
  host: {
    '[attr.aria-busy]': 'elSkeleton() ? "true" : null',
  },
})
export class ElSkeletonDirective {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly appRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);

  /** When true, covers this element with a skeleton matching its box. */
  readonly elSkeleton = input(false, { transform: booleanAttribute });
  readonly elSkeletonAnimation = input(true, { transform: booleanAttribute });

  private coverRef: ComponentRef<ElSkeletonCover> | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private restoredPosition: string | null = null;
  private readonly onReposition = () => this.positionCover();

  constructor() {
    this.destroyRef.onDestroy(() => this.unmount());

    afterRenderEffect(() => {
      const loading = this.elSkeleton();
      const animation = this.elSkeletonAnimation();
      if (!loading) {
        untracked(() => this.unmount());
        return;
      }

      untracked(() => {
        this.mount();
        this.syncCover(animation);
        this.positionCover();
      });
    });
  }

  private usesFixedCover(): boolean {
    return REPLACED_TAGS.has(this.host.nativeElement.tagName);
  }

  private mount(): void {
    if (this.coverRef || typeof document === 'undefined') {
      return;
    }

    this.coverRef = createComponent(ElSkeletonCover, {
      environmentInjector: this.environmentInjector,
    });
    const coverEl = this.coverRef.location.nativeElement as HTMLElement;
    const host = this.host.nativeElement;
    if (this.usesFixedCover()) {
      document.body.appendChild(coverEl);
    } else {
      const position = getComputedStyle(host).position;
      if (position === 'static') {
        this.restoredPosition = host.style.position;
        host.style.position = 'relative';
      }
      host.appendChild(coverEl);
    }
    this.appRef.attachView(this.coverRef.hostView);
    window.addEventListener('scroll', this.onReposition, true);
    window.addEventListener('resize', this.onReposition);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.onReposition);
      this.resizeObserver.observe(host);
    }
  }

  private syncCover(animation: boolean): void {
    const ref = this.coverRef;
    if (!ref) {
      return;
    }

    ref.setInput('animation', animation);
    ref.setInput('fixed', this.usesFixedCover());
    ref.changeDetectorRef.detectChanges();
  }

  private positionCover(): void {
    const ref = this.coverRef;
    if (!ref) {
      return;
    }

    const el = this.host.nativeElement;
    ref.setInput('radius', this.resolveRadius(el));

    if (this.usesFixedCover()) {
      const box = el.getBoundingClientRect();
      ref.setInput('left', box.left);
      ref.setInput('top', box.top);
      ref.setInput('width', box.width);
      ref.setInput('height', box.height);
    }

    ref.changeDetectorRef.detectChanges();
  }

  private resolveRadius(el: HTMLElement): string {
    const own = getComputedStyle(el).borderRadius;
    if (own && own !== '0px') {
      return own;
    }

    const child = el.firstElementChild;
    if (child instanceof HTMLElement) {
      const nested = getComputedStyle(child).borderRadius;
      if (nested && nested !== '0px') {
        return nested;
      }
    }

    return 'inherit';
  }

  private unmount(): void {
    window.removeEventListener('scroll', this.onReposition, true);
    window.removeEventListener('resize', this.onReposition);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (this.restoredPosition !== null) {
      this.host.nativeElement.style.position = this.restoredPosition;
      this.restoredPosition = null;
    }
    if (!this.coverRef) {
      return;
    }

    this.appRef.detachView(this.coverRef.hostView);
    this.coverRef.destroy();
    this.coverRef = null;
  }
}
