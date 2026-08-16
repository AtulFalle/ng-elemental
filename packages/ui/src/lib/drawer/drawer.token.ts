import { InjectionToken } from '@angular/core';

export type ElDrawerSize = 'sm' | 'md' | 'lg';
export type ElDrawerSide = 'left' | 'right';

export interface ElDrawerOpenOptions<D = unknown> {
  data?: D;
  title?: string;
  size?: ElDrawerSize;
  side?: ElDrawerSide;
  closable?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface ElDrawerContext {
  open(): boolean;
  close(): void;
}

export const EL_DRAWER = new InjectionToken<ElDrawerContext>('ElDrawer');
export const EL_DRAWER_DATA = new InjectionToken<unknown>('ElDrawerData');
