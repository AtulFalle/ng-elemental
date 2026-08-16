import { InjectionToken } from '@angular/core';

export type ElSheetSize = 'sm' | 'md' | 'lg';
export type ElSheetSide = 'top' | 'right' | 'bottom' | 'left';

export interface ElSheetOpenOptions<D = unknown> {
  data?: D;
  title?: string;
  size?: ElSheetSize;
  side?: ElSheetSide;
  closable?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface ElSheetContext {
  open(): boolean;
  close(): void;
}

export const EL_SHEET = new InjectionToken<ElSheetContext>('ElSheet');
export const EL_SHEET_DATA = new InjectionToken<unknown>('ElSheetData');
