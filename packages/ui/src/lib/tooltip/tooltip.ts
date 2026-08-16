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
  model,
  numberAttribute,
  untracked,
} from '@angular/core';
import {
  ElTooltipBubble,
  type ElTooltipPosition,
} from './tooltip-bubble';

export type { ElTooltipPosition } from './tooltip-bubble';
export { ElTooltipBubble } from './tooltip-bubble';

@Directive({
  selector: '[elTooltip]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()',
    '(focus)': 'onEnter()',
    '(blur)': 'onLeave()',
    '(document:keydown.escape)': 'onEscape()',
    '[attr.aria-describedby]': 'describedBy()',
  },
})
export class ElTooltip {
  private static nextId = 0;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly appRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly tooltipId = `el-tooltip-${ElTooltip.nextId++}`;

  readonly elTooltip = input('');
  readonly elTooltipPosition = input<ElTooltipPosition>('top');
  readonly elTooltipDisabled = input(false, { transform: booleanAttribute });
  readonly elTooltipDelay = input(200, { transform: numberAttribute });
  readonly elTooltipOpen = model(false);

  private bubbleRef: ComponentRef<ElTooltipBubble> | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly onReposition = () => this.positionBubble();

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearShowTimer();
      this.unmount();
    });

    afterRenderEffect(() => {
      const open = this.elTooltipOpen();
      const disabled = this.elTooltipDisabled();
      const text = this.elTooltip();
      const position = this.elTooltipPosition();
      if (!open || disabled || !text) {
        untracked(() => this.unmount());
        return;
      }

      untracked(() => {
        this.mount();
        this.syncBubble(text, position);
        this.positionBubble();
      });
    });
  }

  protected describedBy(): string | null {
    if (!this.elTooltipOpen() || this.elTooltipDisabled() || !this.elTooltip()) {
      return null;
    }

    return this.tooltipId;
  }

  protected onEnter(): void {
    if (this.elTooltipDisabled() || !this.elTooltip()) {
      return;
    }

    this.clearShowTimer();
    this.showTimer = setTimeout(() => {
      this.elTooltipOpen.set(true);
    }, this.elTooltipDelay());
  }

  protected onLeave(): void {
    this.clearShowTimer();
    this.elTooltipOpen.set(false);
  }

  protected onEscape(): void {
    this.clearShowTimer();
    this.elTooltipOpen.set(false);
  }

  private mount(): void {
    if (this.bubbleRef || typeof document === 'undefined') {
      return;
    }

    this.bubbleRef = createComponent(ElTooltipBubble, {
      environmentInjector: this.environmentInjector,
    });
    document.body.appendChild(this.bubbleRef.location.nativeElement);
    this.appRef.attachView(this.bubbleRef.hostView);
    window.addEventListener('scroll', this.onReposition, true);
    window.addEventListener('resize', this.onReposition);
  }

  private syncBubble(text: string, position: ElTooltipPosition): void {
    const ref = this.bubbleRef;
    if (!ref) {
      return;
    }

    ref.setInput('text', text);
    ref.setInput('position', position);
    ref.setInput('tooltipId', this.tooltipId);
    ref.setInput('fixed', true);
    ref.changeDetectorRef.detectChanges();
  }

  private positionBubble(): void {
    const ref = this.bubbleRef;
    if (!ref) {
      return;
    }

    const bubbleEl = ref.location.nativeElement as HTMLElement;
    const host = this.host.nativeElement.getBoundingClientRect();
    const bubble = bubbleEl.getBoundingClientRect();
    const gap = 8;
    const arrowInset = 12;
    const position = this.elTooltipPosition();
    const rtl = getComputedStyle(this.host.nativeElement).direction === 'rtl';
    const side =
      position === 'start' || position === 'end'
        ? (position === 'start') === !rtl
          ? 'left'
          : 'right'
        : position;

    let left: number;
    let top: number;

    if (side === 'top') {
      left = host.left + host.width / 2 - bubble.width / 2;
      top = host.top - bubble.height - gap;
    } else if (side === 'bottom') {
      left = host.left + host.width / 2 - bubble.width / 2;
      top = host.bottom + gap;
    } else if (side === 'left') {
      left = host.left - bubble.width - gap;
      top = host.top + host.height / 2 - bubble.height / 2;
    } else {
      left = host.right + gap;
      top = host.top + host.height / 2 - bubble.height / 2;
    }

    const maxLeft = window.innerWidth - bubble.width - gap;
    const maxTop = window.innerHeight - bubble.height - gap;
    left = Math.min(Math.max(gap, left), Math.max(gap, maxLeft));
    top = Math.min(Math.max(gap, top), Math.max(gap, maxTop));

    const along =
      side === 'top' || side === 'bottom'
        ? host.left + host.width / 2 - left
        : host.top + host.height / 2 - top;
    const alongMax =
      side === 'top' || side === 'bottom' ? bubble.width : bubble.height;
    const arrowOffset = `${Math.min(
      Math.max(arrowInset, along),
      Math.max(arrowInset, alongMax - arrowInset),
    )}px`;

    ref.setInput('left', left);
    ref.setInput('top', top);
    ref.setInput('arrowOffset', arrowOffset);
    ref.changeDetectorRef.detectChanges();
  }

  private unmount(): void {
    window.removeEventListener('scroll', this.onReposition, true);
    window.removeEventListener('resize', this.onReposition);
    if (!this.bubbleRef) {
      return;
    }

    this.appRef.detachView(this.bubbleRef.hostView);
    this.bubbleRef.destroy();
    this.bubbleRef = null;
  }

  private clearShowTimer(): void {
    if (this.showTimer !== null) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }
}
