import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import {
  ElSegmentedButton,
  type ElSegmentedButtonSize,
  type ElSegmentedButtonVariant,
} from '../lib/segmented-button/segmented-button';
import { ElSegmentedButtonItem } from '../lib/segmented-button/segmented-button-item';

@Component({
  selector: 'el-segmented-button-story-host',
  imports: [ElSegmentedButton, ElSegmentedButtonItem],
  template: `
    <el-segmented-button
      [value]="selected()"
      (valueChange)="selected.set($event)"
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [ariaLabel]="ariaLabel()"
    >
      <el-segmented-button-item value="list">List</el-segmented-button-item>
      <el-segmented-button-item value="grid" [disabled]="disableGrid()">
        Grid
      </el-segmented-button-item>
      <el-segmented-button-item value="board">Board</el-segmented-button-item>
    </el-segmented-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedButtonStoryHost {
  readonly variant = input<ElSegmentedButtonVariant>('secondary');
  readonly size = input<ElSegmentedButtonSize>('md');
  readonly disabled = input(false);
  readonly ariaLabel = input('View mode');
  readonly disableGrid = input(false);

  protected readonly selected = signal('list');
}
