import { InjectionToken } from '@angular/core';

export type ElDialogSize = 'sm' | 'md' | 'lg';

export interface ElDialogOpenOptions<D = unknown> {
  data?: D;
  title?: string;
  size?: ElDialogSize;
  closable?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface ElDialogContext {
  open(): boolean;
  close(): void;
}

export const EL_DIALOG = new InjectionToken<ElDialogContext>('ElDialog');
export const EL_DIALOG_DATA = new InjectionToken<unknown>('ElDialogData');
