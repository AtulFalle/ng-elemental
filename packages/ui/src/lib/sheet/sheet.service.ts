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
import { ElSheetOutlet } from './sheet-outlet';
import { ElSheetRef } from './sheet-ref';
import { EL_SHEET_DATA, type ElSheetOpenOptions } from './sheet.token';

export type { ElSheetOpenOptions } from './sheet.token';
export { EL_SHEET_DATA } from './sheet.token';
export { ElSheetRef } from './sheet-ref';

interface ElSheetOverlay {
  outletRef: ComponentRef<ElSheetOutlet>;
  userRef: ComponentRef<unknown> | null;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
}

@Injectable({ providedIn: 'root' })
export class ElSheetService {
  private readonly appRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly stack: ElSheetOverlay[] = [];

  open<C, D = unknown, R = unknown>(
    component: Type<C>,
    options: ElSheetOpenOptions<D> = {},
  ): ElSheetRef<R> {
    if (typeof document === 'undefined') {
      return new ElSheetRef<R>(() => undefined);
    }

    const closeOnBackdrop = options.closeOnBackdrop ?? true;
    const closeOnEscape = options.closeOnEscape ?? true;
    const overlay: ElSheetOverlay = {
      outletRef: null as unknown as ComponentRef<ElSheetOutlet>,
      userRef: null,
      closeOnBackdrop,
      closeOnEscape,
    };

    const ref = new ElSheetRef<R>(() => this.teardown(overlay));
    const overlayInjector = Injector.create({
      providers: [
        { provide: EL_SHEET_DATA, useValue: options.data },
        { provide: ElSheetRef, useValue: ref },
      ],
      parent: this.environmentInjector,
    });

    this.muteTop();

    const outletRef = createComponent(ElSheetOutlet, {
      environmentInjector: this.environmentInjector,
      elementInjector: overlayInjector,
    });
    overlay.outletRef = outletRef;

    const zIndex = 1100 + this.stack.length * 10;
    outletRef.setInput('title', options.title ?? '');
    outletRef.setInput('size', options.size ?? 'md');
    outletRef.setInput('side', options.side ?? 'bottom');
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

  private teardown(overlay: ElSheetOverlay): void {
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
