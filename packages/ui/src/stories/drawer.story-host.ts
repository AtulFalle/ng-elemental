import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { ElButton } from '../lib/button/button';
import { ElDrawer } from '../lib/drawer/drawer';
import { ElDrawerClose } from '../lib/drawer/drawer-close';
import { ElDrawerRef } from '../lib/drawer/drawer-ref';
import { ElDrawerService } from '../lib/drawer/drawer.service';
import {
  EL_DRAWER_DATA,
  type ElDrawerSide,
  type ElDrawerSize,
} from '../lib/drawer/drawer.token';

@Component({
  selector: 'el-drawer-story-host',
  imports: [ElButton, ElDrawer, ElDrawerClose],
  template: `
    <el-button (click)="open.set(true)">Open drawer</el-button>
    <el-drawer
      [open]="open()"
      (openChange)="open.set($event)"
      [title]="title()"
      [size]="size()"
      [side]="side()"
      [closable]="closable()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
    >
      <div elDrawerContent>
        <p>Full-height side panel for navigation or account tools.</p>
        @for (line of lines; track line) {
          <p>Item {{ line }}</p>
        }
      </div>
      <div elDrawerFooter>
        <el-button elDrawerClose variant="ghost">Close</el-button>
      </div>
    </el-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerStoryHost {
  readonly title = input('Navigation');
  readonly size = input<ElDrawerSize>('md');
  readonly side = input<ElDrawerSide>('left');
  readonly closable = input(true);
  readonly closeOnBackdrop = input(true);
  readonly closeOnEscape = input(true);

  protected readonly open = signal(false);
  protected readonly lines = [1, 2, 3, 4, 5, 6, 7, 8];
}

export interface DrawerServiceDemoData {
  workspace: string;
}

@Component({
  selector: 'el-drawer-service-demo',
  imports: [ElButton, ElDrawerClose],
  template: `
    <p>{{ data.workspace }} settings.</p>
    <div
      style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem"
    >
      <el-button elDrawerClose variant="ghost">Cancel</el-button>
      <el-button (click)="drawerRef.close(true)">Save</el-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerServiceDemo {
  readonly data = inject<DrawerServiceDemoData>(EL_DRAWER_DATA);
  readonly drawerRef = inject(ElDrawerRef);
}

@Component({
  selector: 'el-drawer-service-story-host',
  imports: [ElButton],
  template: `
    <el-button (click)="open()">Open with service</el-button>
    @if (result() !== null) {
      <p style="margin: 0.75rem 0 0">Result: {{ result() }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerServiceStoryHost {
  private readonly drawer = inject(ElDrawerService);
  protected readonly result = signal<string | null>(null);

  protected async open(): Promise<void> {
    const ref = this.drawer.open(DrawerServiceDemo, {
      data: { workspace: 'Acme' },
      title: 'Workspace',
      size: 'sm',
      side: 'left',
    });
    const saved = await ref.afterClosed;
    this.result.set(saved ? 'saved' : 'dismissed');
  }
}
