import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { ElDialogOutlet } from './dialog-outlet';
import { ElDialogRef } from './dialog-ref';
import {
  EL_DIALOG_DATA,
  type ElDialogOpenOptions,
} from './dialog.token';

export type { ElDialogOpenOptions } from './dialog.token';
export { EL_DIALOG_DATA } from './dialog.token';
export { ElDialogRef } from './dialog-ref';

interface ElDialogOverlay {
  outletRef: ComponentRef<ElDialogOutlet>;
  userRef: ComponentRef<unknown> | null;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
}

@Injectable({ providedIn: 'root' })
export class ElDialogService {
  private readonly appRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly stack: ElDialogOverlay[] = [];

  open<C, D = unknown, R = unknown>(
    component: Type<C>,
    options: ElDialogOpenOptions<D> = {},
  ): ElDialogRef<R> {
    if (typeof document === 'undefined') {
      return new ElDialogRef<R>(() => undefined);
    }

    const closeOnBackdrop = options.closeOnBackdrop ?? true;
    const closeOnEscape = options.closeOnEscape ?? true;
    const overlay: ElDialogOverlay = {
      outletRef: null as unknown as ComponentRef<ElDialogOutlet>,
      userRef: null,
      closeOnBackdrop,
      closeOnEscape,
    };

    const ref = new ElDialogRef<R>(() => this.teardown(overlay));
    const overlayInjector = Injector.create({
      providers: [
        { provide: EL_DIALOG_DATA, useValue: options.data },
        { provide: ElDialogRef, useValue: ref },
      ],
      parent: this.environmentInjector,
    });

    this.muteTop();

    const outletRef = createComponent(ElDialogOutlet, {
      environmentInjector: this.environmentInjector,
      elementInjector: overlayInjector,
    });
    overlay.outletRef = outletRef;

    const zIndex = 1100 + this.stack.length * 10;
    outletRef.setInput('title', options.title ?? '');
    outletRef.setInput('size', options.size ?? 'md');
    outletRef.setInput('closable', options.closable ?? true);
    outletRef.setInput('closeOnBackdrop', closeOnBackdrop);
    outletRef.setInput('closeOnEscape', closeOnEscape);
    outletRef.setInput('ariaLabel', options.ariaLabel);
    outletRef.setInput('ariaDescribedBy', options.ariaDescribedBy);
    outletRef.setInput('zIndex', zIndex);
    outletRef.setInput('open', true);

    document.body.appendChild(outletRef.location.nativeElement);
    this.appRef.attachView(outletRef.hostView);
    outletRef.changeDetectorRef.detectChanges();

    overlay.userRef = outletRef.instance.contentHost().createComponent(component, {
      injector: overlayInjector,
    });

    this.stack.push(overlay);
    return ref;
  }

  private muteTop(): void {
    const top = this.stack[this.stack.length - 1];
    if (!top) {
      return;
    }

    top.outletRef.setInput('closeOnBackdrop', false);
    top.outletRef.setInput('closeOnEscape', false);
  }

  private restoreTop(): void {
    const top = this.stack[this.stack.length - 1];
    if (!top) {
      return;
    }

    top.outletRef.setInput('closeOnBackdrop', top.closeOnBackdrop);
    top.outletRef.setInput('closeOnEscape', top.closeOnEscape);
  }

  private teardown(overlay: ElDialogOverlay): void {
    const index = this.stack.indexOf(overlay);
    if (index >= 0) {
      this.stack.splice(index, 1);
    }

    overlay.userRef?.destroy();
    overlay.userRef = null;

    if (overlay.outletRef) {
      this.appRef.detachView(overlay.outletRef.hostView);
      overlay.outletRef.destroy();
    }

    this.restoreTop();
  }
}
