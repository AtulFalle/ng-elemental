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
import { ElDrawerOutlet } from './drawer-outlet';
import { ElDrawerRef } from './drawer-ref';
import { EL_DRAWER_DATA, type ElDrawerOpenOptions } from './drawer.token';

export type { ElDrawerOpenOptions } from './drawer.token';
export { EL_DRAWER_DATA } from './drawer.token';
export { ElDrawerRef } from './drawer-ref';

interface ElDrawerOverlay {
  outletRef: ComponentRef<ElDrawerOutlet>;
  userRef: ComponentRef<unknown> | null;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
}

@Injectable({ providedIn: 'root' })
export class ElDrawerService {
  private readonly appRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly stack: ElDrawerOverlay[] = [];

  open<C, D = unknown, R = unknown>(
    component: Type<C>,
    options: ElDrawerOpenOptions<D> = {},
  ): ElDrawerRef<R> {
    if (typeof document === 'undefined') {
      return new ElDrawerRef<R>(() => undefined);
    }

    const closeOnBackdrop = options.closeOnBackdrop ?? true;
    const closeOnEscape = options.closeOnEscape ?? true;
    const overlay: ElDrawerOverlay = {
      outletRef: null as unknown as ComponentRef<ElDrawerOutlet>,
      userRef: null,
      closeOnBackdrop,
      closeOnEscape,
    };

    const ref = new ElDrawerRef<R>(() => this.teardown(overlay));
    const overlayInjector = Injector.create({
      providers: [
        { provide: EL_DRAWER_DATA, useValue: options.data },
        { provide: ElDrawerRef, useValue: ref },
      ],
      parent: this.environmentInjector,
    });

    this.muteTop();

    const outletRef = createComponent(ElDrawerOutlet, {
      environmentInjector: this.environmentInjector,
      elementInjector: overlayInjector,
    });
    overlay.outletRef = outletRef;

    const zIndex = 1100 + this.stack.length * 10;
    outletRef.setInput('title', options.title ?? '');
    outletRef.setInput('size', options.size ?? 'md');
    outletRef.setInput('side', options.side ?? 'left');
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

  private teardown(overlay: ElDrawerOverlay): void {
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
