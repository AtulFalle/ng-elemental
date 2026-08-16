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
import { ElSheet } from './sheet';
import { ElSheetRef } from './sheet-ref';
import type { ElSheetSide, ElSheetSize } from './sheet.token';

@Component({
  selector: 'el-sheet-outlet',
  imports: [ElSheet],
  template: `
    <el-sheet
      [open]="open()"
      [title]="title()"
      [size]="size()"
      [side]="side()"
      [closable]="closable()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
      [ariaLabel]="ariaLabel()"
      [ariaDescribedBy]="ariaDescribedBy()"
      [zIndex]="zIndex()"
      (openChange)="onShellOpenChange($event)"
    >
      <div elSheetContent>
        <ng-container #contentHost />
      </div>
    </el-sheet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-sheet-outlet',
    style: 'display: contents',
  },
})
export class ElSheetOutlet {
  private readonly sheetRef = inject(ElSheetRef);

  readonly open = model(true);
  readonly title = input('');
  readonly size = input<ElSheetSize>('md');
  readonly side = input<ElSheetSide>('bottom');
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
      this.sheetRef.close();
    }
  }
}
