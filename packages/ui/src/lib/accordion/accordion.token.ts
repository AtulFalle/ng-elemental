import { InjectionToken } from '@angular/core';

export type ElAccordionVariant = 'single' | 'multiple';
export type ElAccordionValue = string | string[];

export interface ElAccordionContext {
  variant(): ElAccordionVariant;
  disabled(): boolean;
  isExpanded(value: string): boolean;
  isItemDisabled(itemDisabled: boolean): boolean;
  toggle(value: string): void;
  headerId(value: string): string;
  panelId(value: string): string;
  onHeaderKeydown(event: KeyboardEvent, value: string): void;
}

export const EL_ACCORDION = new InjectionToken<ElAccordionContext>(
  'ElAccordion',
);
