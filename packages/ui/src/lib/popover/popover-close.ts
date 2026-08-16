import { Directive, inject } from '@angular/core';
import { EL_POPOVER } from './popover.token';

@Directive({
  selector: '[elPopoverClose]',
  host: {
    '(click)': 'onClick($event)',
  },
})
export class ElPopoverClose {
  private readonly popover = inject(EL_POPOVER);

  protected onClick(event: Event): void {
    event.preventDefault();
    this.popover.close();
  }
}
