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
import type { ElDialogContext, ElDialogSize } from './dialog.token';
import { EL_DIALOG } from './dialog.token';

export type { ElDialogSize, ElDialogOpenOptions } from './dialog.token';
export { EL_DIALOG, EL_DIALOG_DATA } from './dialog.token';
export { ElDialogClose } from './dialog-close';
export { ElDialogRef } from './dialog-ref';

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
  selector: 'el-dialog',
  imports: [ElIcon],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_DIALOG, useExisting: ElDialog }],
  host: {
    class: 'el-dialog-host',
  },
})
export class ElDialog implements ElDialogContext {
  private static nextId = 0;

  private readonly destroyRef = inject(DestroyRef);
  private readonly panelRef = viewChild<ElementRef<HTMLDialogElement>>('panel');

  readonly open = model(false);
  readonly title = input('');
  readonly size = input<ElDialogSize>('md');
  readonly closable = input(true, { transform: booleanAttribute });
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();
  readonly ariaDescribedBy = input<string>();
  readonly zIndex = input(1100, { transform: numberAttribute });

  private readonly uid = ElDialog.nextId++;
  readonly titleId = `el-dialog-title-${this.uid}`;

  private sessionActive = false;
  private restoreFocusEl: HTMLElement | null = null;

  protected readonly labelledBy = computed(() =>
    this.ariaLabel() ? null : this.titleId,
  );

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

  private readonly onBackdropClick = (event: MouseEvent): void => {
    if (!this.closeOnBackdrop() || event.target !== event.currentTarget) {
      return;
    }

    const dialog = event.currentTarget;
    if (!(dialog instanceof HTMLElement)) {
      return;
    }

    const rect = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (inside) {
      return;
    }

    this.close();
  }

  protected onCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
    }
  }

  protected onNativeClose(): void {
    if (this.open()) {
      this.open.set(false);
    }
  }

  private beginSession(): void {
    if (this.sessionActive) {
      return;
    }

    this.sessionActive = true;
    const active =
      typeof document === 'undefined' ? null : document.activeElement;
    this.restoreFocusEl = active instanceof HTMLElement ? active : null;
    lockBody();

    const panel = this.panelRef()?.nativeElement;
    if (panel && !panel.open) {
      panel.addEventListener('click', this.onBackdropClick);
      panel.showModal();
    }
  }

  private endSession(): void {
    if (!this.sessionActive) {
      return;
    }

    this.sessionActive = false;
    const panel = this.panelRef()?.nativeElement;
    panel?.removeEventListener('click', this.onBackdropClick);
    if (panel?.open) {
      panel.close();
    }

    unlockBody();
    const restore = this.restoreFocusEl;
    this.restoreFocusEl = null;
    queueMicrotask(() => restore?.focus());
  }
}
