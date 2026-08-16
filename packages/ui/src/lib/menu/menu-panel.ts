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
import { EL_MENU } from './menu.token';
import { menuPanelPosition, pointerAnchor } from './menu-position';

@Component({
  selector: 'el-menu-panel',
  templateUrl: './menu-panel.html',
  styleUrl: './menu-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-menu-panel-host',
  },
})
export class ElMenuPanel {
  protected readonly menu = inject(EL_MENU);
  private readonly destroyRef = inject(DestroyRef);
  private readonly panelRef =
    viewChild<ElementRef<HTMLElement>>('panel');

  protected readonly left = signal(0);
  protected readonly top = signal(0);

  private readonly onReposition = () => this.position();

  constructor() {
    this.destroyRef.onDestroy(() => this.unlisten());

    afterRenderEffect(() => {
      if (!this.menu.isOpen()) {
        untracked(() => this.unlisten());
        return;
      }
      const el = this.panelRef()?.nativeElement;
      if (!el) {
        return;
      }
      untracked(() => {
        this.menu.registerPanel(el);
        this.position();
        this.listen();
      });
    });
  }

  private position(): void {
    const panel = this.panelRef()?.nativeElement;
    const trigger = this.menu.triggerElement();
    if (!panel) {
      return;
    }

    const pointer = this.menu.anchorPoint();
    const rtl =
      (trigger ?? panel).ownerDocument.defaultView
        ?.getComputedStyle(trigger ?? panel)
        .direction === 'rtl';
    const view = panel.ownerDocument.defaultView;
    const viewWidth = view?.innerWidth ?? 0;
    const viewHeight = view?.innerHeight ?? 0;
    const size = panel.getBoundingClientRect();

    const anchor = pointer
      ? pointerAnchor(pointer.x, pointer.y)
      : trigger
        ? trigger.getBoundingClientRect()
        : pointerAnchor(0, 0);

    const placed = menuPanelPosition({
      anchor,
      panelWidth: size.width,
      panelHeight: size.height,
      placement: this.menu.isSubmenu() ? 'end' : 'bottom',
      rtl,
      viewWidth,
      viewHeight,
    });

    this.left.set(placed.left);
    this.top.set(placed.top);
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
      this.menu.unregisterPanel(el);
    }
  }
}
