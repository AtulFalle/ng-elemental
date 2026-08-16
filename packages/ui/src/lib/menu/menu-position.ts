export type ElMenuPlacement = 'bottom' | 'top' | 'end' | 'start';

export interface ElMenuPosition {
  left: number;
  top: number;
  placement: ElMenuPlacement;
}

const GAP = 4;
const PAD = 8;

function clamp(value: number, min: number, max: number): number {
  if (max < min) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
}

function alignStart(anchorLeft: number, panelWidth: number, viewWidth: number): number {
  return clamp(anchorLeft, PAD, viewWidth - panelWidth - PAD);
}

function overflows(
  pos: { left: number; top: number },
  placement: ElMenuPlacement,
  panelWidth: number,
  panelHeight: number,
  viewWidth: number,
  viewHeight: number,
  rtl: boolean,
): boolean {
  if (placement === 'bottom') {
    return pos.top + panelHeight > viewHeight - PAD;
  }
  if (placement === 'top') {
    return pos.top < PAD;
  }
  if (placement === 'end') {
    return rtl ? pos.left < PAD : pos.left + panelWidth > viewWidth - PAD;
  }
  return rtl ? pos.left + panelWidth > viewWidth - PAD : pos.left < PAD;
}

export function menuPanelPosition(options: {
  anchor: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };
  panelWidth: number;
  panelHeight: number;
  placement: ElMenuPlacement;
  rtl: boolean;
  viewWidth?: number;
  viewHeight?: number;
}): ElMenuPosition {
  const viewWidth = options.viewWidth ?? 0;
  const viewHeight = options.viewHeight ?? 0;
  const { anchor, panelWidth, panelHeight, rtl } = options;

  const tryPlace = (placement: ElMenuPlacement): { left: number; top: number } => {
    if (placement === 'bottom') {
      return {
        left: alignStart(anchor.left, panelWidth, viewWidth),
        top: anchor.bottom + GAP,
      };
    }
    if (placement === 'top') {
      return {
        left: alignStart(anchor.left, panelWidth, viewWidth),
        top: anchor.top - panelHeight - GAP,
      };
    }
    if (placement === 'end') {
      const left = rtl
        ? anchor.left - panelWidth - GAP
        : anchor.right + GAP;
      return { left, top: anchor.top };
    }
    const left = rtl ? anchor.right + GAP : anchor.left - panelWidth - GAP;
    return { left, top: anchor.top };
  };

  const flip: Record<ElMenuPlacement, ElMenuPlacement> = {
    bottom: 'top',
    top: 'bottom',
    end: 'start',
    start: 'end',
  };

  let placement = options.placement;
  let pos = tryPlace(placement);
  if (
    overflows(pos, placement, panelWidth, panelHeight, viewWidth, viewHeight, rtl)
  ) {
    placement = flip[placement];
    pos = tryPlace(placement);
  }

  return {
    left: clamp(pos.left, PAD, viewWidth - panelWidth - PAD),
    top: clamp(pos.top, PAD, viewHeight - panelHeight - PAD),
    placement,
  };
}

export function pointerAnchor(x: number, y: number): {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
} {
  return { left: x, top: y, right: x, bottom: y, width: 0, height: 0 };
}
