import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  model,
  viewChildren,
  ElementRef,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import { ElStep } from './step';

export { ElStep, ElStepContent, ElStepLabel } from './step';

export type ElStepperOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'el-stepper',
  imports: [NgTemplateOutlet, ElIcon],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-stepper',
    '[class.el-stepper--disabled]': 'disabled()',
    '[class.el-stepper--horizontal]': 'orientation() === "horizontal"',
    '[class.el-stepper--vertical]': 'orientation() === "vertical"',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class ElStepper {
  private static nextId = 0;

  readonly value = model<string>('');
  readonly orientation = input<ElStepperOrientation>('horizontal');
  readonly linear = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  private readonly uid = ElStepper.nextId++;
  readonly steps = contentChildren(ElStep);
  private readonly stepButtons =
    viewChildren<ElementRef<HTMLButtonElement>>('stepButton');

  protected readonly activeStep = computed(() => {
    const items = this.steps();
    const current = this.value();
    const match = items.find(
      (step) =>
        step.value() === current && !this.isItemDisabled(step.disabled()),
    );
    if (match) {
      return match;
    }
    return items.find((step) => !this.isItemDisabled(step.disabled()));
  });

  protected readonly activeIndex = computed(() => {
    const active = this.activeStep();
    if (!active) {
      return -1;
    }
    return this.steps().indexOf(active);
  });

  isItemDisabled(itemDisabled: boolean): boolean {
    return this.disabled() || itemDisabled;
  }

  protected isSelected(step: ElStep): boolean {
    return this.activeStep() === step;
  }

  protected canSelectStep(step: ElStep, index: number): boolean {
    if (this.isItemDisabled(step.disabled())) {
      return false;
    }

    if (!this.linear()) {
      return true;
    }

    const current = this.activeIndex();
    if (current < 0) {
      return index === 0;
    }

    return index <= current + 1;
  }

  protected tabIndex(step: ElStep, index: number): number {
    if (!this.canSelectStep(step, index)) {
      return -1;
    }
    return this.isSelected(step) ? 0 : -1;
  }

  stepId(index: number): string {
    return `el-stepper-${this.uid}-step-${index}`;
  }

  panelId(index: number): string {
    return `el-stepper-${this.uid}-panel-${index}`;
  }

  select(itemValue: string): void {
    if (this.disabled()) {
      return;
    }

    const items = this.steps();
    const index = items.findIndex((item) => item.value() === itemValue);
    const step = items[index];
    if (!step || !this.canSelectStep(step, index)) {
      return;
    }

    this.value.set(itemValue);
  }

  next(): void {
    const index = this.nextIndex();
    if (index < 0) {
      return;
    }
    this.select(this.steps()[index].value());
  }

  previous(): void {
    const index = this.previousIndex();
    if (index < 0) {
      return;
    }
    this.select(this.steps()[index].value());
  }

  isFirst(): boolean {
    return this.previousIndex() < 0;
  }

  isLast(): boolean {
    return this.nextIndex() < 0;
  }

  protected onStepClick(step: ElStep, index: number): void {
    this.select(step.value());
    this.focusStep(index);
  }

  onStepListKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const enabled = this.steps()
      .map((step, index) => ({ step, index }))
      .filter(({ step, index }) => this.canSelectStep(step, index));
    if (enabled.length === 0) {
      return;
    }

    const currentIndex = enabled.findIndex(({ step }) => this.isSelected(step));
    const resolved = currentIndex >= 0 ? currentIndex : 0;
    const vertical = this.orientation() === 'vertical';
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';

    if (event.key === nextKey) {
      event.preventDefault();
      const next = (resolved + 1) % enabled.length;
      this.selectAndFocus(enabled[next].index);
      return;
    }

    if (event.key === prevKey) {
      event.preventDefault();
      const next = (resolved - 1 + enabled.length) % enabled.length;
      this.selectAndFocus(enabled[next].index);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.selectAndFocus(enabled[0].index);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.selectAndFocus(enabled[enabled.length - 1].index);
    }
  }

  private nextIndex(): number {
    const current = this.activeIndex();
    const items = this.steps();
    for (let index = current + 1; index < items.length; index++) {
      if (this.canSelectStep(items[index], index)) {
        return index;
      }
    }
    return -1;
  }

  private previousIndex(): number {
    const current = this.activeIndex();
    const items = this.steps();
    for (let index = current - 1; index >= 0; index--) {
      if (this.canSelectStep(items[index], index)) {
        return index;
      }
    }
    return -1;
  }

  private selectAndFocus(index: number): void {
    const step = this.steps()[index];
    this.select(step.value());
    this.focusStep(index);
  }

  private focusStep(index: number): void {
    this.stepButtons()[index]?.nativeElement.focus();
  }
}
