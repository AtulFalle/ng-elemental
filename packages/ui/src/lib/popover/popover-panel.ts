import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { EL_POPOVER } from './popover.token';
import type { ElPopoverPosition } from './popover.token';
import { popoverPanelPosition } from './popover-position';

@Component({
  selector: 'el-popover-panel',
  templateUrl: './popover-panel.html',
  styleUrl: './popover-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-popover-panel-host',
  },
})
export class ElPopoverPanel {
  protected readonly popover = inject(EL_POPOVER);
  private readonly destroyRef = inject(DestroyRef);
  private readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');

  protected readonly left = signal(0);
  protected readonly top = signal(0);
  protected readonly arrowOffset = signal('50%');
  protected readonly resolved = signal<ElPopoverPosition>('bottom');

  private readonly onReposition = () => this.position();

  constructor() {
    this.destroyRef.onDestroy(() => this.unlisten());

    afterRenderEffect(() => {
      if (!this.popover.open()) {
        untracked(() => this.unlisten());
        return;
      }
      const el = this.panelRef()?.nativeElement;
      if (!el) {
        return;
      }
      untracked(() => {
        this.popover.registerPanel(el);
        this.position();
        this.listen();
        if (this.popover.modal()) {
          el.focus();
        }
      });
    });
  }

  protected onPanelLeave(event: PointerEvent): void {
    this.popover.onHoverLeave(event);
  }

  protected onPanelEnter(): void {
    this.popover.onHoverEnter();
  }

  private position(): void {
    const panel = this.panelRef()?.nativeElement;
    const trigger = this.popover.triggerElement();
    if (!panel || !trigger) {
      return;
    }

    const rtl = getComputedStyle(trigger).direction === 'rtl';
    const view = panel.ownerDocument.defaultView;
    const size = panel.getBoundingClientRect();
    const placed = popoverPanelPosition({
      trigger: trigger.getBoundingClientRect(),
      panelWidth: size.width,
      panelHeight: size.height,
      placement: this.popover.position(),
      rtl,
      viewWidth: view?.innerWidth ?? 0,
      viewHeight: view?.innerHeight ?? 0,
    });

    this.left.set(placed.left);
    this.top.set(placed.top);
    this.arrowOffset.set(placed.arrowOffset);
    this.resolved.set(placed.placement);
  }

  private listen(): void {
    this.unlisten();
    window.addEventListener('scroll', this.onReposition, true);
    window.addEventListener('resize', this.onReposition);
  }

  private unlisten(): void {
    window.removeEventListener('scroll', this.onReposition, true);
    window.removeEventListener('resize', this.onReposition);
    const el = this.panelRef()?.nativeElement;
    if (el) {
      this.popover.unregisterPanel(el);
    }
  }
}
