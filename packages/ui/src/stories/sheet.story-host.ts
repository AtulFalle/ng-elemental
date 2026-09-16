import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { ElButton } from '../lib/button/button';
import { ElCheckbox } from '../lib/checkbox/checkbox';
import { ElSheet } from '../lib/sheet/sheet';
import { ElSheetClose } from '../lib/sheet/sheet-close';
import { ElSheetRef } from '../lib/sheet/sheet-ref';
import { ElSheetService } from '../lib/sheet/sheet.service';
import { ElStack } from '../lib/stack/stack';
import {
  EL_SHEET_DATA,
  type ElSheetSide,
  type ElSheetSize,
} from '../lib/sheet/sheet.token';

@Component({
  selector: 'el-sheet-story-host',
  imports: [ElButton, ElCheckbox, ElSheet, ElSheetClose, ElStack],
  template: `
    <el-button (click)="open.set(true)">Open sheet</el-button>
    <el-sheet
      [open]="open()"
      (openChange)="open.set($event)"
      [title]="title()"
      [size]="size()"
      [side]="side()"
      [closable]="closable()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
    >
      <div elSheetContent>
        <el-stack gap="3">
          <el-checkbox [(checked)]="inStock">In stock</el-checkbox>
          <el-checkbox [(checked)]="onSale">On sale</el-checkbox>
          <el-checkbox [(checked)]="freeShipping">Free shipping</el-checkbox>
          <el-checkbox [(checked)]="openBox">Open-box</el-checkbox>
        </el-stack>
      </div>
      <div elSheetFooter>
        <el-button elSheetClose variant="ghost">Cancel</el-button>
        <el-button (click)="apply()">Apply</el-button>
      </div>
    </el-sheet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetStoryHost {
  readonly title = input('Filters');
  readonly size = input<ElSheetSize>('md');
  readonly side = input<ElSheetSide>('bottom');
  readonly closable = input(true);
  readonly closeOnBackdrop = input(true);
  readonly closeOnEscape = input(true);

  protected readonly open = signal(false);
  protected readonly inStock = signal(true);
  protected readonly onSale = signal(false);
  protected readonly freeShipping = signal(true);
  protected readonly openBox = signal(false);

  protected apply(): void {
    this.open.set(false);
  }
}

export interface SheetServiceDemoData {
  userId: number;
}

@Component({
  selector: 'el-sheet-service-demo',
  imports: [ElButton, ElCheckbox, ElSheetClose, ElStack],
  template: `
    <el-stack gap="4">
      <p>Availability for user {{ data.userId }}.</p>
      <el-stack gap="3">
        <el-checkbox [(checked)]="inStock">In stock</el-checkbox>
        <el-checkbox [(checked)]="onSale">On sale</el-checkbox>
      </el-stack>
      <el-stack direction="row" gap="3" justify="end">
        <el-button elSheetClose variant="ghost">Cancel</el-button>
        <el-button (click)="sheetRef.close(true)">Apply</el-button>
      </el-stack>
    </el-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetServiceDemo {
  readonly data = inject<SheetServiceDemoData>(EL_SHEET_DATA);
  readonly sheetRef = inject(ElSheetRef);
  protected readonly inStock = signal(true);
  protected readonly onSale = signal(false);
}

@Component({
  selector: 'el-sheet-service-story-host',
  imports: [ElButton],
  template: `
    <el-button (click)="open()">Open with service</el-button>
    @if (result() !== null) {
      <p>Result: {{ result() }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetServiceStoryHost {
  private readonly sheet = inject(ElSheetService);
  protected readonly result = signal<string | null>(null);

  protected async open(): Promise<void> {
    const ref = this.sheet.open(SheetServiceDemo, {
      data: { userId: 42 },
      title: 'Filters',
      size: 'sm',
      side: 'bottom',
    });
    const saved = await ref.afterClosed;
    this.result.set(saved ? 'applied' : 'dismissed');
  }
}
