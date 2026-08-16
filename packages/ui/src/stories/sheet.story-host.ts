import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { ElButton } from '../lib/button/button';
import { ElSheet } from '../lib/sheet/sheet';
import { ElSheetClose } from '../lib/sheet/sheet-close';
import { ElSheetRef } from '../lib/sheet/sheet-ref';
import { ElSheetService } from '../lib/sheet/sheet.service';
import {
  EL_SHEET_DATA,
  type ElSheetSide,
  type ElSheetSize,
} from '../lib/sheet/sheet.token';

@Component({
  selector: 'el-sheet-story-host',
  imports: [ElButton, ElSheet, ElSheetClose],
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
        <p>Edge panel with a title, scrolling body, and footer actions.</p>
        @for (line of lines; track line) {
          <p>Paragraph {{ line }} of a long body.</p>
        }
      </div>
      <div elSheetFooter>
        <el-button elSheetClose variant="ghost">Cancel</el-button>
        <el-button (click)="open.set(false)">Apply</el-button>
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
  protected readonly lines = [1, 2, 3, 4, 5, 6, 7, 8];
}

export interface SheetServiceDemoData {
  userId: number;
}

@Component({
  selector: 'el-sheet-service-demo',
  imports: [ElButton, ElSheetClose],
  template: `
    <p>Filters for user {{ data.userId }}.</p>
    <div
      style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem"
    >
      <el-button elSheetClose variant="ghost">Cancel</el-button>
      <el-button (click)="sheetRef.close(true)">Apply</el-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetServiceDemo {
  readonly data = inject<SheetServiceDemoData>(EL_SHEET_DATA);
  readonly sheetRef = inject(ElSheetRef);
}

@Component({
  selector: 'el-sheet-service-story-host',
  imports: [ElButton],
  template: `
    <el-button (click)="open()">Open with service</el-button>
    @if (result() !== null) {
      <p style="margin: 0.75rem 0 0">Result: {{ result() }}</p>
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
