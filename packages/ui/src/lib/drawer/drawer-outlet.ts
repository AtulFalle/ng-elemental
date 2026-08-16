import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  numberAttribute,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ElDrawer } from './drawer';
import { ElDrawerRef } from './drawer-ref';
import type { ElDrawerSide, ElDrawerSize } from './drawer.token';

@Component({
  selector: 'el-drawer-outlet',
  imports: [ElDrawer],
  template: `
    <el-drawer
      [open]="open()"
      [title]="title()"
      [size]="size()"
      [side]="side()"
      [closable]="closable()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
      [ariaLabel]="ariaLabel()"
      [ariaDescribedBy]="ariaDescribedBy()"
      [zIndex]="zIndex()"
      (openChange)="onShellOpenChange($event)"
    >
      <div elDrawerContent>
        <ng-container #contentHost />
      </div>
    </el-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-drawer-outlet',
    style: 'display: contents',
  },
})
export class ElDrawerOutlet {
  private readonly drawerRef = inject(ElDrawerRef);

  readonly open = model(true);
  readonly title = input('');
  readonly size = input<ElDrawerSize>('md');
  readonly side = input<ElDrawerSide>('left');
  readonly closable = input(true, { transform: booleanAttribute });
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();
  readonly ariaDescribedBy = input<string>();
  readonly zIndex = input(1100, { transform: numberAttribute });

  readonly contentHost = viewChild.required('contentHost', {
    read: ViewContainerRef,
  });

  protected onShellOpenChange(next: boolean): void {
    this.open.set(next);
    if (!next) {
      this.drawerRef.close();
    }
  }
}
