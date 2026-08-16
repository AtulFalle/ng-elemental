import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  numberAttribute,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ElDialog } from './dialog';
import { ElDialogRef } from './dialog-ref';
import type { ElDialogSize } from './dialog.token';

@Component({
  selector: 'el-dialog-outlet',
  imports: [ElDialog],
  template: `
    <el-dialog
      [open]="open()"
      [title]="title()"
      [size]="size()"
      [closable]="closable()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
      [ariaLabel]="ariaLabel()"
      [ariaDescribedBy]="ariaDescribedBy()"
      [zIndex]="zIndex()"
      (openChange)="onShellOpenChange($event)"
    >
      <div elDialogContent>
        <ng-container #contentHost />
      </div>
    </el-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-dialog-outlet',
    style: 'display: contents',
  },
})
export class ElDialogOutlet {
  private readonly dialogRef = inject(ElDialogRef);

  readonly open = model(true);
  readonly title = input('');
  readonly size = input<ElDialogSize>('md');
  readonly closable = input(true, { transform: booleanAttribute });
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();
  readonly ariaDescribedBy = input<string>();
  readonly zIndex = input(1100, { transform: numberAttribute });

  readonly contentHost = viewChild.required('contentHost', {
    read: ViewContainerRef,
  });

  protected onShellOpenChange(next: boolean): void {
    this.open.set(next);
    if (!next) {
      this.dialogRef.close();
    }
  }
}
