import { InjectionToken, type Signal } from '@angular/core';

export interface ElAutocompleteOption {
  readonly value: Signal<string>;
  readonly displayLabel: Signal<string>;
  readonly disabled: Signal<boolean>;
  readonly optionId: string;
  readonly element: HTMLElement;
  matchesQuery(query: string): boolean;
  setHidden(hidden: boolean): void;
}

export interface ElAutocompleteContext {
  disabled(): boolean;
  isSelected(value: string): boolean;
  isItemDisabled(itemDisabled: boolean): boolean;
  isActive(optionId: string): boolean;
  isVisible(optionId: string): boolean;
  select(value: string): void;
  setActive(optionId: string): void;
  register(item: ElAutocompleteOption): void;
  unregister(item: ElAutocompleteOption): void;
}

export const EL_AUTOCOMPLETE = new InjectionToken<ElAutocompleteContext>(
  'ElAutocomplete',
);
