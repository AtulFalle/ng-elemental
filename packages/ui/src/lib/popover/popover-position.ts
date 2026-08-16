export type ElPopoverPlacement = 'top' | 'bottom' | 'start' | 'end';

export interface ElPopoverCoords {
  left: number;
  top: number;
  placement: ElPopoverPlacement;
  arrowOffset: string;
}

const GAP = 8;
const PAD = 8;
const ARROW_INSET = 12;

function clamp(value: number, min: number, max: number): number {
  if (max < min) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
}

export function popoverPanelPosition(options: {
  trigger: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };
  panelWidth: number;
  panelHeight: number;
  placement: ElPopoverPlacement;
  rtl: boolean;
  viewWidth: number;
  viewHeight: number;
}): ElPopoverCoords {
  const { trigger, panelWidth, panelHeight, rtl, viewWidth, viewHeight } =
    options;

  const sideOf = (placement: ElPopoverPlacement): ElPopoverPlacement => {
    if (placement === 'start' || placement === 'end') {
      const isStart = placement === 'start';
      return (isStart !== rtl ? 'start' : 'end') === 'start' ? 'start' : 'end';
    }
    return placement;
  };

  const tryPlace = (
    placement: ElPopoverPlacement,
  ): { left: number; top: number } => {
    const side = sideOf(placement);
    if (side === 'top') {
      return {
        left: trigger.left + trigger.width / 2 - panelWidth / 2,
        top: trigger.top - panelHeight - GAP,
      };
    }
    if (side === 'bottom') {
      return {
        left: trigger.left + trigger.width / 2 - panelWidth / 2,
        top: trigger.bottom + GAP,
      };
    }
    if (side === 'start') {
      return {
        left: trigger.left - panelWidth - GAP,
        top: trigger.top + trigger.height / 2 - panelHeight / 2,
      };
    }
    return {
      left: trigger.right + GAP,
      top: trigger.top + trigger.height / 2 - panelHeight / 2,
    };
  };

  const overflows = (
    pos: { left: number; top: number },
    placement: ElPopoverPlacement,
  ): boolean => {
    const side = sideOf(placement);
    if (side === 'top') {
      return pos.top < PAD;
    }
    if (side === 'bottom') {
      return pos.top + panelHeight > viewHeight - PAD;
    }
    if (side === 'start') {
      return pos.left < PAD;
    }
    return pos.left + panelWidth > viewWidth - PAD;
  };

  const flip: Record<ElPopoverPlacement, ElPopoverPlacement> = {
    top: 'bottom',
    bottom: 'top',
    start: 'end',
    end: 'start',
  };

  let placement = options.placement;
  let pos = tryPlace(placement);
  if (overflows(pos, placement)) {
    placement = flip[placement];
    pos = tryPlace(placement);
  }

  const left = clamp(pos.left, PAD, viewWidth - panelWidth - PAD);
  const top = clamp(pos.top, PAD, viewHeight - panelHeight - PAD);
  const side = sideOf(placement);
  const along =
    side === 'top' || side === 'bottom'
      ? trigger.left + trigger.width / 2 - left
      : trigger.top + trigger.height / 2 - top;
  const alongMax =
    side === 'top' || side === 'bottom' ? panelWidth : panelHeight;
  const arrowOffset = `${clamp(
    along,
    ARROW_INSET,
    Math.max(ARROW_INSET, alongMax - ARROW_INSET),
  )}px`;

  return { left, top, placement: side, arrowOffset };
}
