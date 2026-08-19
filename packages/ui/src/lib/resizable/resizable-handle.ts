import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { EL_RESIZABLE } from './resizable.token';

@Component({
  selector: 'el-resizable-handle',
  templateUrl: './resizable-handle.html',
  styleUrl: './resizable-handle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-resizable-handle',
    role: 'separator',
    '[class.el-resizable-handle--horizontal]':
      'group.orientation() === "horizontal"',
    '[class.el-resizable-handle--vertical]':
      'group.orientation() === "vertical"',
    '[class.el-resizable-handle--disabled]': 'disabled()',
    '[class.el-resizable-handle--dragging]': 'dragging()',
    '[attr.aria-orientation]': 'group.orientation()',
    '[attr.aria-valuenow]': 'valueNow()',
    '[attr.aria-valuemin]': 'valueMin()',
    '[attr.aria-valuemax]': 'valueMax()',
    '[attr.aria-valuetext]': 'valueText()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-disabled]': 'disabled() ? true : null',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ElResizableHandle {
  protected readonly group = inject(EL_RESIZABLE);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input('Resize');

  protected readonly dragging = signal(false);

  private startPos = 0;
  private startSizes: number[] = [];

  protected readonly valueNow = computed(() =>
    Math.round(this.group.valueNow(this)),
  );
  protected readonly valueMin = computed(() =>
    Math.round(this.group.valueMin(this)),
  );
  protected readonly valueMax = computed(() =>
    Math.round(this.group.valueMax(this)),
  );

  protected readonly valueText = computed(
    () => `${this.valueNow()} percent`,
  );

  protected onPointerDown(event: PointerEvent): void {
    if (this.disabled() || event.button !== 0) {
      return;
    }

    this.dragging.set(true);
    this.startPos = this.axisValue(event);
    this.startSizes = this.group.snapshotSizes();
    this.host.nativeElement.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging() || this.disabled()) {
      return;
    }

    const rect = this.group.groupRect();
    const span =
      this.group.orientation() === 'horizontal' ? rect.width : rect.height;
    if (span <= 0) {
      return;
    }

    const deltaPercent = ((this.axisValue(event) - this.startPos) / span) * 100;
    this.group.resizeFromSnapshot(this, this.startSizes, deltaPercent);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragging()) {
      return;
    }

    this.dragging.set(false);
    const el = this.host.nativeElement;
    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const horizontal = this.group.orientation() === 'horizontal';
    const step = 2;
    let handled = true;

    switch (event.key) {
      case 'ArrowLeft':
        if (horizontal) {
          this.group.nudge(this, -step);
        }
        break;
      case 'ArrowRight':
        if (horizontal) {
          this.group.nudge(this, step);
        }
        break;
      case 'ArrowUp':
        if (!horizontal) {
          this.group.nudge(this, -step);
        }
        break;
      case 'ArrowDown':
        if (!horizontal) {
          this.group.nudge(this, step);
        }
        break;
      case 'Home':
        this.group.jump(this, 'start');
        break;
      case 'End':
        this.group.jump(this, 'end');
        break;
      default:
        handled = false;
    }

    if (handled) {
      event.preventDefault();
    }
  }

  private axisValue(event: PointerEvent): number {
    return this.group.orientation() === 'horizontal'
      ? event.clientX
      : event.clientY;
  }
}
