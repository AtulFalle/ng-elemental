import { Directive, inject } from '@angular/core';
import { ElDialogRef } from './dialog-ref';
import { EL_DIALOG } from './dialog.token';

@Directive({
  selector: '[elDialogClose]',
  host: {
    '(click)': 'onClick($event)',
  },
})
export class ElDialogClose {
  private readonly dialogRef = inject(ElDialogRef, { optional: true });
  private readonly dialog = inject(EL_DIALOG, { optional: true });

  protected onClick(event: Event): void {
    event.preventDefault();
    if (this.dialogRef) {
      this.dialogRef.close();
      return;
    }

    this.dialog?.close();
  }
}
