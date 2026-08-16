import { InjectionToken } from '@angular/core';

export type ElResizableOrientation = 'horizontal' | 'vertical';

export interface ElResizableContext {
  orientation(): ElResizableOrientation;
  sizeFor(panel: object): number;
  handleIndex(handle: object): number;
  groupRect(): DOMRect;
  snapshotSizes(): number[];
  resizeFromSnapshot(
    handle: object,
    startSizes: number[],
    deltaPercent: number,
  ): void;
  nudge(handle: object, deltaPercent: number): void;
  jump(handle: object, edge: 'start' | 'end'): void;
  valueNow(handle: object): number;
  valueMin(handle: object): number;
  valueMax(handle: object): number;
}

export const EL_RESIZABLE = new InjectionToken<ElResizableContext>(
  'ElResizable',
);
