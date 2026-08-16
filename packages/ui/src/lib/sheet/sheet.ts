import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  numberAttribute,
  untracked,
  viewChild,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import type { ElSheetContext, ElSheetSide, ElSheetSize } from './sheet.token';
import { EL_SHEET } from './sheet.token';

export type { ElSheetOpenOptions, ElSheetSide, ElSheetSize } from './sheet.token';
export { EL_SHEET, EL_SHEET_DATA } from './sheet.token';
export { ElSheetClose } from './sheet-close';
export { ElSheetRef } from './sheet-ref';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let bodyLockCount = 0;
let previousBodyOverflow = '';

function lockBody(): void {
  if (typeof document === 'undefined') {
    return;
  }

  if (bodyLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  bodyLockCount += 1;
}

function unlockBody(): void {
  if (typeof document === 'undefined') {
    return;
  }

  bodyLockCount = Math.max(0, bodyLockCount - 1);
  if (bodyLockCount === 0) {
    document.body.style.overflow = previousBodyOverflow;
  }
}

@Component({
  selector: 'el-sheet',
  imports: [ElIcon],
  templateUrl: './sheet.html',
  styleUrl: './sheet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_SHEET, useExisting: ElSheet }],
  host: {
    class: 'el-sheet-host',
    '(document:keydown.escape)': 'onEscape($event)',
  },
})
export class ElSheet implements ElSheetContext {
  private static nextId = 0;

  private readonly destroyRef = inject(DestroyRef);
  private readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');

  readonly open = model(false);
  readonly title = input('');
  readonly size = input<ElSheetSize>('md');
  readonly side = input<ElSheetSide>('bottom');
  readonly closable = input(true, { transform: booleanAttribute });
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();
  readonly ariaDescribedBy = input<string>();
  readonly zIndex = input(1100, { transform: numberAttribute });

  private readonly uid = ElSheet.nextId++;
  readonly titleId = `el-sheet-title-${this.uid}`;

  private sessionActive = false;
  private restoreFocusEl: HTMLElement | null = null;

  protected readonly labelledBy = computed(() => {
    if (this.ariaLabel() || !this.title()) {
      return null;
    }

    return this.titleId;
  });

  protected readonly panelZ = computed(() => this.zIndex() + 1);

  constructor() {
    this.destroyRef.onDestroy(() => this.endSession());

    afterRenderEffect(() => {
      const isOpen = this.open();
      untracked(() => {
        if (isOpen) {
          this.beginSession();
          return;
        }

        this.endSession();
      });
    });
  }

  close(): void {
    if (!this.open()) {
      return;
    }

    this.open.set(false);
  }

  protected onBackdrop(event: Event): void {
    if (!this.closeOnBackdrop()) {
      return;
    }

    event.preventDefault();
    this.close();
  }

  protected onEscape(event: Event): void {
    if (!this.open() || !this.closeOnEscape()) {
      return;
    }

    event.preventDefault();
    this.close();
  }

  protected onPanelKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const panel = this.panelRef()?.nativeElement;
    if (!panel) {
      return;
    }

    const nodes = this.focusable(panel);
    if (nodes.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = panel.ownerDocument.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private beginSession(): void {
    if (this.sessionActive) {
      return;
    }

    this.sessionActive = true;
    const active = typeof document === 'undefined' ? null : document.activeElement;
    this.restoreFocusEl = active instanceof HTMLElement ? active : null;
    lockBody();
    queueMicrotask(() => this.focusPanel());
  }

  private endSession(): void {
    if (!this.sessionActive) {
      return;
    }

    this.sessionActive = false;
    unlockBody();
    const restore = this.restoreFocusEl;
    this.restoreFocusEl = null;
    queueMicrotask(() => restore?.focus());
  }

  private focusPanel(): void {
    const panel = this.panelRef()?.nativeElement;
    if (!panel) {
      return;
    }

    const nodes = this.focusable(panel);
    (nodes[0] ?? panel).focus();
  }

  private focusable(root: HTMLElement): HTMLElement[] {
    return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1,
    );
  }
}
