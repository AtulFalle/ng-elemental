import { Directive, inject } from '@angular/core';
import { ElSheetRef } from './sheet-ref';
import { EL_SHEET } from './sheet.token';

@Directive({
  selector: '[elSheetClose]',
  host: {
    '(click)': 'onClick($event)',
  },
})
export class ElSheetClose {
  private readonly sheetRef = inject(ElSheetRef, { optional: true });
  private readonly sheet = inject(EL_SHEET, { optional: true });

  protected onClick(event: Event): void {
    event.preventDefault();
    if (this.sheetRef) {
      this.sheetRef.close();
      return;
    }

    this.sheet?.close();
  }
}
