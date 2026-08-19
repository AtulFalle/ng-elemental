import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  signal,
} from '@angular/core';
import type {
  ElSelectable,
  ElSelectContext,
  ElSelectOptionView,
} from './select.token';
import { ElIcon, type ElIconSize } from '../icon/icon';
import { EL_SELECT } from './select.token';
import { ElSelectValue } from './select-value';

export type ElSelectSize = 'sm' | 'md' | 'lg';
export type ElSelectValueModel = string | string[];

export { ElSelectGroup } from './select-group';
export { ElSelectItem } from './select-item';
export { ElSelectValue, type ElSelectValueContext } from './select-value';
export {
  EL_SELECT,
  type ElSelectContext,
  type ElSelectable,
  type ElSelectOptionView,
} from './select.token';

@Component({
  selector: 'el-select',
  imports: [NgTemplateOutlet, ElIcon],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_SELECT, useExisting: ElSelect }],
  host: {
    class: 'el-select',
    '[class.el-select--sm]': 'size() === "sm"',
    '[class.el-select--md]': 'size() === "md"',
    '[class.el-select--lg]': 'size() === "lg"',
    '[class.el-select--open]': 'open()',
    '[class.el-select--disabled]': 'disabled()',
    '[class.el-select--error]': 'error()',
    '[class.el-select--multiple]': 'multiple()',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class ElSelect implements ElSelectContext {
  private static nextId = 0;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);

  readonly value = model<ElSelectValueModel>('');
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly size = input<ElSelectSize>('md');
  readonly placeholder = input('Select');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly error = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();
  readonly ariaLabelledby = input('');
  readonly ariaDescribedby = input('');

  private readonly valueTemplate = contentChild(ElSelectValue);
  private readonly registered = signal<ElSelectable[]>([]);
  protected readonly open = signal(false);
  private readonly activeOptionId = signal<string | null>(null);

  protected readonly listboxId = `el-select-listbox-${ElSelect.nextId++}`;

  protected readonly selectedOptions = computed((): ElSelectOptionView[] => {
    const selected = new Set(this.selectedValues());
    return this.registered()
      .filter((item) => selected.has(item.value()))
      .map((item) => ({
        value: item.value(),
        label: item.displayLabel(),
      }));
  });

  protected readonly triggerLabel = computed(() => {
    const selected = this.selectedOptions();
    if (selected.length === 0) {
      return this.placeholder();
    }
    return selected.map((item) => item.label).join(', ');
  });

  protected readonly isPlaceholder = computed(
    () => this.selectedOptions().length === 0,
  );

  protected readonly valueTemplateRef = computed(
    () => this.valueTemplate()?.template ?? null,
  );

  protected readonly iconSize = computed((): ElIconSize => this.size());

  protected readonly activeDescendant = computed(
    () => this.activeOptionId() ?? null,
  );

  register(item: ElSelectable): void {
    this.registered.update((items) =>
      items.some((existing) => existing.optionId === item.optionId)
        ? items
        : [...items, item],
    );
  }

  unregister(item: ElSelectable): void {
    this.registered.update((items) =>
      items.filter((existing) => existing.optionId !== item.optionId),
    );
  }

  isSelected(itemValue: string): boolean {
    return this.selectedValues().includes(itemValue);
  }

  isItemDisabled(itemDisabled: boolean): boolean {
    return this.disabled() || itemDisabled;
  }

  isActive(optionId: string): boolean {
    return this.activeOptionId() === optionId;
  }

  select(itemValue: string): void {
    if (this.disabled()) {
      return;
    }

    if (this.multiple()) {
      this.toggle(itemValue);
      return;
    }

    this.value.set(itemValue);
    this.closePanel();
  }

  toggle(itemValue: string): void {
    if (this.disabled()) {
      return;
    }

    const current = this.selectedValues();
    if (current.includes(itemValue)) {
      this.setMultipleValue(current.filter((value) => value !== itemValue));
      return;
    }

    this.setMultipleValue([...current, itemValue]);
  }

  selectAll(): void {
    if (this.disabled() || !this.multiple()) {
      return;
    }

    this.setMultipleValue(
      this.enabledItems().map((item) => item.value()),
    );
  }

  unselectAll(): void {
    if (this.disabled() || !this.multiple()) {
      return;
    }

    this.setMultipleValue([]);
  }

  protected toggleOpen(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) {
      return;
    }

    if (this.open()) {
      this.closePanel();
      return;
    }

    this.openPanel();
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      this.openPanel();
    }
  }

  onItemKeydown(event: KeyboardEvent): void {
    if (!this.open() || this.disabled()) {
      return;
    }

    const enabled = this.enabledItems();
    if (enabled.length === 0) {
      return;
    }

    const currentIndex = enabled.findIndex(
      (item) => item.optionId === this.activeOptionId(),
    );
    const resolvedIndex = currentIndex >= 0 ? currentIndex : 0;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusItemAt(enabled, (resolvedIndex + 1) % enabled.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusItemAt(
        enabled,
        (resolvedIndex - 1 + enabled.length) % enabled.length,
      );
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.focusItemAt(enabled, 0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.focusItemAt(enabled, enabled.length - 1);
    }
  }

  onDocumentClick(event: Event): void {
    if (!this.open()) {
      return;
    }

    const target = event.target as Node | null;
    if (target && this.elementRef.nativeElement.contains(target)) {
      return;
    }

    this.closePanel();
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open()) {
      event.preventDefault();
      this.closePanel();
    }
  }

  private selectedValues(): string[] {
    const value = this.value();
    if (Array.isArray(value)) {
      return value;
    }
    return value === '' ? [] : [value];
  }

  private setMultipleValue(values: string[]): void {
    this.value.set(values);
  }

  private enabledItems(): ElSelectable[] {
    return this.registered().filter(
      (item) => !this.isItemDisabled(item.disabled()),
    );
  }

  private openPanel(): void {
    this.open.set(true);
    const enabled = this.enabledItems();
    const selected = enabled.find((item) => this.isSelected(item.value()));
    const next = selected ?? enabled[0];
    this.activeOptionId.set(next?.optionId ?? null);
    afterNextRender(() => next?.focus(), { injector: this.injector });
  }

  private closePanel(): void {
    this.open.set(false);
    this.activeOptionId.set(null);
  }

  private focusItemAt(items: readonly ElSelectable[], index: number): void {
    const item = items[index];
    this.activeOptionId.set(item.optionId);
    item.focus();
  }
}
