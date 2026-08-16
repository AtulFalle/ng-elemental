import { InjectionToken } from '@angular/core';

export type ElPopoverPosition = 'top' | 'bottom' | 'start' | 'end';
export type ElPopoverTriggerKind = 'click' | 'hover';

export interface ElPopoverContext {
  readonly panelId: string;
  open(): boolean;
  disabled(): boolean;
  modal(): boolean;
  arrow(): boolean;
  position(): ElPopoverPosition;
  trigger(): ElPopoverTriggerKind;
  ariaLabel(): string | undefined;
  registerTrigger(el: HTMLElement): void;
  unregisterTrigger(el: HTMLElement): void;
  registerPanel(el: HTMLElement): void;
  unregisterPanel(el: HTMLElement): void;
  triggerElement(): HTMLElement | null;
  toggle(): void;
  openPanel(): void;
  close(): void;
  onHoverEnter(): void;
  onHoverLeave(event: PointerEvent): void;
}

export const EL_POPOVER = new InjectionToken<ElPopoverContext>('ElPopover');
