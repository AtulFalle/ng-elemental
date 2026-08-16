import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ElResizableHandle } from './resizable-handle';
import { ElResizablePanel } from './resizable-panel';
import {
  EL_RESIZABLE,
  type ElResizableContext,
  type ElResizableOrientation,
} from './resizable.token';
import { applyResize, normalizeSizes, splitBounds } from './resizable-utils';

export type { ElResizableOrientation } from './resizable.token';
export { EL_RESIZABLE, type ElResizableContext } from './resizable.token';
export { ElResizablePanel } from './resizable-panel';
export { ElResizableHandle } from './resizable-handle';

@Component({
  selector: 'el-resizable',
  templateUrl: './resizable.html',
  styleUrl: './resizable.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_RESIZABLE, useExisting: ElResizable }],
  host: {
    class: 'el-resizable',
    '[class.el-resizable--horizontal]': 'orientation() === "horizontal"',
    '[class.el-resizable--vertical]': 'orientation() === "vertical"',
  },
})
export class ElResizable implements ElResizableContext {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly orientation = input<ElResizableOrientation>('horizontal');

  private readonly panels = contentChildren(ElResizablePanel);
  private readonly handles = contentChildren(ElResizableHandle);
  private readonly override = signal<number[] | null>(null);

  private readonly layout = computed(() => {
    const panels = this.panels();
    const defaults = panels.map((panel) => panel.defaultSize());
    const mins = panels.map((panel) => panel.min());
    const maxes = panels.map((panel) => panel.max());
    const normalized = normalizeSizes(defaults, mins, maxes);
    const override = this.override();
    const sizes =
      override && override.length === panels.length ? override : normalized;

    return { sizes, mins, maxes };
  });

  sizeFor(panel: object): number {
    const index = this.panels().indexOf(panel as ElResizablePanel);
    if (index < 0) {
      return 0;
    }

    return this.layout().sizes[index] ?? 0;
  }

  handleIndex(handle: object): number {
    return this.handles().indexOf(handle as ElResizableHandle);
  }

  groupRect(): DOMRect {
    return this.host.nativeElement.getBoundingClientRect();
  }

  snapshotSizes(): number[] {
    return this.layout().sizes.slice();
  }

  resizeFromSnapshot(
    handle: object,
    startSizes: number[],
    deltaPercent: number,
  ): void {
    const index = this.handleIndex(handle);
    const { mins, maxes } = this.layout();
    this.override.set(applyResize(startSizes, index, deltaPercent, mins, maxes));
  }

  nudge(handle: object, deltaPercent: number): void {
    this.resizeFromSnapshot(handle, this.snapshotSizes(), deltaPercent);
  }

  jump(handle: object, edge: 'start' | 'end'): void {
    const index = this.handleIndex(handle);
    const { sizes, mins, maxes } = this.layout();
    const bounds = splitBounds(sizes, index, mins, maxes);
    const current = sizes[index] ?? 0;
    const target = edge === 'start' ? bounds.min : bounds.max;
    this.override.set(
      applyResize(sizes, index, target - current, mins, maxes),
    );
  }

  valueNow(handle: object): number {
    const index = this.handleIndex(handle);
    return this.layout().sizes[index] ?? 0;
  }

  valueMin(handle: object): number {
    const index = this.handleIndex(handle);
    const { sizes, mins, maxes } = this.layout();
    return splitBounds(sizes, index, mins, maxes).min;
  }

  valueMax(handle: object): number {
    const index = this.handleIndex(handle);
    const { sizes, mins, maxes } = this.layout();
    return splitBounds(sizes, index, mins, maxes).max;
  }
}
