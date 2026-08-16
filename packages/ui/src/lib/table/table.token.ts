import { InjectionToken } from '@angular/core';

export type ElTableSize = 'sm' | 'md' | 'lg';
export type ElTableAppearance = 'outlined' | 'plain';
export type ElTableAlign = 'start' | 'center' | 'end';
export type ElTableSortDirection = 'asc' | 'desc';
export type ElTableExpandVariant = 'single' | 'multiple';
export type ElTableSort = {
  name: string;
  direction: ElTableSortDirection;
} | null;
export type ElTableExpanded = string | string[];

export interface ElTableContext {
  sort(): ElTableSort;
  toggleSort(name: string): void;
  isExpanded(rowId: string): boolean;
  toggleExpand(rowId: string): void;
}

export const EL_TABLE = new InjectionToken<ElTableContext>('ElTable');
