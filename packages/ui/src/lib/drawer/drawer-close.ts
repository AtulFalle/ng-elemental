import { Directive, inject } from '@angular/core';
import { ElDrawerRef } from './drawer-ref';
import { EL_DRAWER } from './drawer.token';

@Directive({
  selector: '[elDrawerClose]',
  host: {
    '(click)': 'onClick($event)',
  },
})
export class ElDrawerClose {
  private readonly drawerRef = inject(ElDrawerRef, { optional: true });
  private readonly drawer = inject(EL_DRAWER, { optional: true });

  protected onClick(event: Event): void {
    event.preventDefault();
    if (this.drawerRef) {
      this.drawerRef.close();
      return;
    }

    this.drawer?.close();
  }
}
