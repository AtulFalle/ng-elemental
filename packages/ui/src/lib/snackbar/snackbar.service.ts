import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  outputBinding,
} from '@angular/core';
import {
  ElSnackbar,
  type ElSnackbarColor,
  type ElSnackbarPosition,
} from './snackbar';
import { ElSnackbarRef } from './snackbar-ref';

export interface ElSnackbarOpenOptions {
  action?: string;
  color?: ElSnackbarColor;
  duration?: number;
  dismissible?: boolean;
  position?: ElSnackbarPosition;
}

interface ElSnackbarOverlay {
  snackbarRef: ComponentRef<ElSnackbar>;
}

@Injectable({ providedIn: 'root' })
export class ElSnackbarService {
  private readonly appRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private current: { overlay: ElSnackbarOverlay; ref: ElSnackbarRef } | null =
    null;

  open(message: string, options: ElSnackbarOpenOptions = {}): ElSnackbarRef {
    this.current?.ref.close();

    if (typeof document === 'undefined') {
      return new ElSnackbarRef(() => undefined);
    }

    const overlay: ElSnackbarOverlay = {
      snackbarRef: null as unknown as ComponentRef<ElSnackbar>,
    };
    const ref = new ElSnackbarRef(() => this.teardown(overlay));

    const snackbarRef = createComponent(ElSnackbar, {
      environmentInjector: this.environmentInjector,
      bindings: [
        outputBinding('openChange', (isOpen: boolean) => {
          if (!isOpen) {
            ref.close();
          }
        }),
        outputBinding('actionClick', () => {
          ref.notifyAction();
        }),
      ],
    });
    overlay.snackbarRef = snackbarRef;

    snackbarRef.setInput('open', true);
    snackbarRef.setInput('message', message);
    snackbarRef.setInput('action', options.action ?? '');
    snackbarRef.setInput('color', options.color ?? 'neutral');
    snackbarRef.setInput('duration', options.duration ?? 4000);
    snackbarRef.setInput('dismissible', options.dismissible ?? true);
    snackbarRef.setInput('position', options.position ?? 'bottom');

    document.body.appendChild(snackbarRef.location.nativeElement);
    this.appRef.attachView(snackbarRef.hostView);
    snackbarRef.changeDetectorRef.detectChanges();

    this.current = { overlay, ref };
    return ref;
  }

  private teardown(overlay: ElSnackbarOverlay): void {
    if (this.current?.overlay === overlay) {
      this.current = null;
    }

    if (overlay.snackbarRef) {
      this.appRef.detachView(overlay.snackbarRef.hostView);
      overlay.snackbarRef.destroy();
    }
  }
}
