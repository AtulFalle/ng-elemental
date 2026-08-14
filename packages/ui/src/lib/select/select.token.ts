import { InjectionToken, type Signal } from '@angular/core';

export interface ElSelectOptionView {
  value: string;
  label: string;
}

export interface ElSelectable {
  readonly value: Signal<string>;
  readonly displayLabel: Signal<string>;
  readonly disabled: Signal<boolean>;
  readonly optionId: string;
  focus(): void;
}

export interface ElSelectContext {
  multiple(): boolean;
  disabled(): boolean;
  isSelected(value: string): boolean;
  isItemDisabled(itemDisabled: boolean): boolean;
  isActive(optionId: string): boolean;
  select(value: string): void;
  toggle(value: string): void;
  onItemKeydown(event: KeyboardEvent): void;
  register(item: ElSelectable): void;
  unregister(item: ElSelectable): void;
}

export const EL_SELECT = new InjectionToken<ElSelectContext>('ElSelect');
