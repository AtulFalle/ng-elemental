import { InjectionToken } from '@angular/core';

export type ElNavAppearance = 'rail' | 'soft';
export type ElNavSize = 'sm' | 'md' | 'lg';
export type ElNavExpandMode = 'single' | 'multiple';

export interface ElNavItemLevel {
  value(): string;
  resolvedLevel(): number;
  nestedItems(): readonly { value(): string }[];
}

export interface ElNavContext {
  appearance(): ElNavAppearance;
  size(): ElNavSize;
  disabled(): boolean;
  expandMode(): ElNavExpandMode;
  isActive(value: string): boolean;
  isExpanded(value: string): boolean;
  isItemDisabled(itemDisabled: boolean): boolean;
  activate(value: string): void;
  toggleExpanded(value: string): void;
  groupId(value: string): string;
}

export const EL_NAV = new InjectionToken<ElNavContext>('ElNav');
export const EL_NAV_ITEM = new InjectionToken<ElNavItemLevel>('ElNavItem');
