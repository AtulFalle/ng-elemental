import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';
import { ElButton } from '../button/button';
import { ElCarouselSlide } from './carousel-slide';
import { EL_CAROUSEL, type ElCarouselContext, type ElCarouselSize } from './carousel.token';
import {
  clampIndex,
  indexFromDrag,
  nextIndex,
  prevIndex,
  slideStride,
  trackOffset,
  wrapIndex,
} from './carousel-utils';

export type { ElCarouselSize } from './carousel.token';
export { ElCarouselSlide } from './carousel-slide';

@Component({
  selector: 'el-carousel',
  imports: [ElButton],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_CAROUSEL, useExisting: ElCarousel }],
  host: {
    class: 'el-carousel-host',
    role: 'region',
    '[class.el-carousel-host--disabled]': 'disabled()',
    '[class.el-carousel-host--dragging]': 'dragging()',
    '[attr.aria-roledescription]': '"carousel"',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-disabled]': 'disabled() ? true : null',
    '[style.--el-carousel-slide-width]': 'slideWidthPx()',
    '(mouseenter)': 'onHover(true)',
    '(mouseleave)': 'onHover(false)',
    '(focusin)': 'onFocusInside(true)',
    '(focusout)': 'onFocusInside(false)',
  },
})
export class ElCarousel implements ElCarouselContext {
  readonly index = model(0);
  readonly loop = input(false, { transform: booleanAttribute });
  readonly autoplay = input(0, { transform: numberAttribute });
  readonly peek = input(0, { transform: numberAttribute });
  readonly size = input<ElCarouselSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly viewportRef =
    viewChild<ElementRef<HTMLElement>>('viewport');
  protected readonly slides = contentChildren(ElCarouselSlide);

  private readonly viewportWidth = signal(0);
  private readonly dragDelta = signal(0);
  protected readonly dragging = signal(false);
  private readonly hovered = signal(false);
  private readonly focusInside = signal(false);
  protected readonly userPaused = signal(false);
  private readonly reduceMotion = signal(false);
  private resizeObserver: ResizeObserver | null = null;
  private watchedViewport: HTMLElement | null = null;
  private motionQuery: MediaQueryList | null = null;
  private dragStartX = 0;

  protected readonly slideCount = computed(() => this.slides().length);

  protected readonly currentIndex = computed(() => {
    const count = this.slideCount();
    if (this.loop()) {
      return wrapIndex(this.index(), count);
    }
    return clampIndex(this.index(), count);
  });

  protected readonly peekPx = computed(() => Math.max(0, this.peek()));

  protected readonly slideWidth = computed(() => {
    const width = this.viewportWidth();
    const peek = this.peekPx();
    return Math.max(0, width - peek * 2);
  });

  protected readonly slideWidthPx = computed(() => {
    const width = this.slideWidth();
    return width > 0 ? `${width}px` : '100%';
  });

  protected readonly stride = computed(() =>
    slideStride(this.slideWidth(), this.peekPx()),
  );

  protected readonly trackTransform = computed(() => {
    const offset = trackOffset(
      this.currentIndex(),
      this.stride(),
      this.dragDelta(),
    );
    return `translateX(${offset}px)`;
  });

  protected readonly canPrev = computed(() => {
    if (this.disabled() || this.slideCount() <= 1) {
      return false;
    }
    return this.loop() || this.currentIndex() > 0;
  });

  protected readonly canNext = computed(() => {
    if (this.disabled() || this.slideCount() <= 1) {
      return false;
    }
    return this.loop() || this.currentIndex() < this.slideCount() - 1;
  });

  protected readonly paused = computed(
    () =>
      this.userPaused() ||
      this.hovered() ||
      this.focusInside() ||
      this.dragging() ||
      this.disabled() ||
      this.reduceMotion(),
  );

  protected readonly showAutoplayControl = computed(
    () => this.autoplay() > 0 && this.slideCount() > 1 && !this.disabled(),
  );

  protected readonly rootClass = computed(() => ({
    'el-carousel': true,
    [`el-carousel--${this.size()}`]: true,
    'el-carousel--disabled': this.disabled(),
    'el-carousel--dragging': this.dragging(),
    'el-carousel--peek': this.peekPx() > 0,
  }));

  constructor() {
    this.destroyRef.onDestroy(() => this.teardown());

    if (typeof window !== 'undefined' && window.matchMedia) {
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reduceMotion.set(this.motionQuery.matches);
      const onMotion = (): void =>
        this.reduceMotion.set(this.motionQuery?.matches ?? false);
      this.motionQuery.addEventListener('change', onMotion);
      this.destroyRef.onDestroy(() =>
        this.motionQuery?.removeEventListener('change', onMotion),
      );
    }

    afterRenderEffect(() => {
      const viewport = this.viewportRef()?.nativeElement;
      if (!viewport) {
        return;
      }
      this.attachViewport(viewport);
      this.viewportWidth.set(viewport.clientWidth);
    });

    afterRenderEffect((onCleanup) => {
      const ms = this.autoplay();
      const count = this.slideCount();
      this.currentIndex();
      if (ms <= 0 || count <= 1 || this.paused()) {
        return;
      }
      const id = window.setInterval(() => this.next(), ms);
      onCleanup(() => window.clearInterval(id));
    });
  }

  isSlideActive(slide: object): boolean {
    return this.slides().indexOf(slide as ElCarouselSlide) === this.currentIndex();
  }

  protected prev(): void {
    if (!this.canPrev()) {
      return;
    }
    this.index.set(prevIndex(this.currentIndex(), this.slideCount(), this.loop()));
  }

  protected next(): void {
    if (this.disabled() || this.slideCount() <= 1) {
      return;
    }
    if (!this.loop() && this.currentIndex() >= this.slideCount() - 1) {
      return;
    }
    this.index.set(nextIndex(this.currentIndex(), this.slideCount(), this.loop()));
  }

  protected goTo(index: number): void {
    if (this.disabled()) {
      return;
    }
    const count = this.slideCount();
    this.index.set(
      this.loop() ? wrapIndex(index, count) : clampIndex(index, count),
    );
  }

  protected onViewportKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prev();
        return;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        return;
      case 'Home':
        event.preventDefault();
        this.goTo(0);
        return;
      case 'End':
        event.preventDefault();
        this.goTo(this.slideCount() - 1);
        return;
      default:
        return;
    }
  }

  protected onPointerDown(event: PointerEvent): void {
    if (this.disabled() || event.button !== 0 || this.slideCount() <= 1) {
      return;
    }
    this.dragging.set(true);
    this.dragStartX = event.clientX;
    this.dragDelta.set(0);
    const viewport = this.viewportRef()?.nativeElement;
    viewport?.setPointerCapture(event.pointerId);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging()) {
      return;
    }
    this.dragDelta.set(event.clientX - this.dragStartX);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragging()) {
      return;
    }
    const delta = this.dragDelta();
    this.dragging.set(false);
    this.dragDelta.set(0);
    const viewport = this.viewportRef()?.nativeElement;
    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    const stride = this.stride();
    const threshold = Math.max(32, stride * 0.2);
    this.index.set(
      indexFromDrag(
        delta,
        threshold,
        this.currentIndex(),
        this.slideCount(),
        this.loop(),
      ),
    );
  }

  protected onHover(value: boolean): void {
    this.hovered.set(value);
  }

  protected onFocusInside(value: boolean): void {
    this.focusInside.set(value);
  }

  protected toggleAutoplayPause(): void {
    this.userPaused.update((paused) => !paused);
  }

  private attachViewport(el: HTMLElement): void {
    if (this.watchedViewport === el) {
      return;
    }
    this.disconnectViewport();
    this.watchedViewport = el;
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    this.resizeObserver = new ResizeObserver(() => {
      this.viewportWidth.set(el.clientWidth);
    });
    this.resizeObserver.observe(el);
  }

  private disconnectViewport(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.watchedViewport = null;
  }

  private teardown(): void {
    this.disconnectViewport();
  }
}
