import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  model,
} from '@angular/core';
import type {
  ElPopoverContext,
  ElPopoverPosition,
  ElPopoverTriggerKind,
} from './popover.token';
import { EL_POPOVER } from './popover.token';

export type { ElPopoverPosition, ElPopoverTriggerKind } from './popover.token';
export { EL_POPOVER } from './popover.token';
export { ElPopoverTrigger } from './popover-trigger';
export { ElPopoverPanel } from './popover-panel';
export { ElPopoverClose } from './popover-close';

@Component({
  selector: 'el-popover',
  templateUrl: './popover.html',
  styleUrl: './popover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_POPOVER, useExisting: ElPopover }],
  host: {
    class: 'el-popover-host',
    '(document:pointerdown)': 'onDocumentPointerDown($event)',
    '(document:keydown.escape)': 'onEscape($event)',
  },
})
export class ElPopover implements ElPopoverContext {
  private static nextId = 0;

  private readonly host = inject(ElementRef<HTMLElement>);

  readonly panelId = `el-popover-panel-${ElPopover.nextId++}`;

  readonly open = model(false);
  readonly position = input<ElPopoverPosition>('bottom');
  readonly trigger = input<ElPopoverTriggerKind>('click');
  readonly modal = input(false, { transform: booleanAttribute });
  readonly arrow = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  private triggerEl: HTMLElement | null = null;
  private panelEl: HTMLElement | null = null;
  private restoreFocus: HTMLElement | null = null;

  registerTrigger(el: HTMLElement): void {
    this.triggerEl = el;
  }

  unregisterTrigger(el: HTMLElement): void {
    if (this.triggerEl === el) {
      this.triggerEl = null;
    }
  }

  registerPanel(el: HTMLElement): void {
    this.panelEl = el;
  }

  unregisterPanel(el: HTMLElement): void {
    if (this.panelEl === el) {
      this.panelEl = null;
    }
  }

  triggerElement(): HTMLElement | null {
    return this.triggerEl;
  }

  toggle(): void {
    if (this.disabled()) {
      return;
    }
    if (this.open()) {
      this.close();
      return;
    }
    this.openPanel();
  }

  openPanel(): void {
    if (this.disabled()) {
      return;
    }
    const active = this.host.nativeElement.ownerDocument.activeElement;
    this.restoreFocus =
      active instanceof HTMLElement ? active : this.triggerEl;
    this.open.set(true);
  }

  close(): void {
    if (!this.open()) {
      return;
    }
    this.open.set(false);
    queueMicrotask(() => this.restoreFocus?.focus());
  }

  onHoverEnter(): void {
    if (this.disabled() || this.trigger() !== 'hover') {
      return;
    }
    this.openPanel();
  }

  onHoverLeave(event: PointerEvent): void {
    if (this.trigger() !== 'hover') {
      return;
    }
    const related = event.relatedTarget;
    if (related instanceof Node && this.containsTree(related)) {
      return;
    }
    this.close();
  }

  protected onDocumentPointerDown(event: Event): void {
    if (!this.open() || this.disabled()) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Node) || this.containsTree(target)) {
      return;
    }
    if (this.modal()) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.close();
  }

  protected onEscape(event: Event): void {
    if (!this.open()) {
      return;
    }
    event.preventDefault();
    this.close();
  }

  private containsTree(target: Node): boolean {
    if (this.host.nativeElement.contains(target)) {
      return true;
    }
    return !!(
      this.triggerEl?.contains(target) || this.panelEl?.contains(target)
    );
  }
}
