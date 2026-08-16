import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { EL_POPOVER } from './popover.token';

@Directive({
  selector: '[elPopoverTrigger]',
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'popover.open()',
    '[attr.aria-controls]': 'popover.open() ? popover.panelId : null',
    '[attr.aria-disabled]': 'popover.disabled() || null',
    '(click)': 'onClick($event)',
    '(pointerenter)': 'popover.onHoverEnter()',
    '(pointerleave)': 'onLeave($event)',
    '(keydown.enter)': 'onActivate($event)',
    '(keydown.space)': 'onActivate($event)',
  },
})
export class ElPopoverTrigger {
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly popover = inject(EL_POPOVER);

  constructor() {
    this.popover.registerTrigger(this.host.nativeElement);
    inject(DestroyRef).onDestroy(() =>
      this.popover.unregisterTrigger(this.host.nativeElement),
    );
  }

  protected onClick(event: Event): void {
    if (this.popover.disabled() || this.popover.trigger() !== 'click') {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.popover.toggle();
  }

  protected onActivate(event: Event): void {
    if (this.popover.trigger() !== 'click') {
      return;
    }
    event.preventDefault();
    this.popover.toggle();
  }

  protected onLeave(event: PointerEvent): void {
    this.popover.onHoverLeave(event);
  }
}
