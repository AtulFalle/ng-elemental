import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { ElButton } from '../lib/button/button';
import {
  ElSnackbar,
  type ElSnackbarColor,
  type ElSnackbarPosition,
} from '../lib/snackbar/snackbar';
import { ElSnackbarService } from '../lib/snackbar/snackbar.service';

@Component({
  selector: 'el-snackbar-story-host',
  imports: [ElButton, ElSnackbar],
  template: `
    <el-button (click)="open.set(true)">Show snackbar</el-button>
    <el-snackbar
      [open]="open()"
      (openChange)="open.set($event)"
      [message]="message()"
      [action]="action()"
      [color]="color()"
      [duration]="duration()"
      [dismissible]="dismissible()"
      [position]="position()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarStoryHost {
  readonly message = input('File deleted');
  readonly action = input('Undo');
  readonly color = input<ElSnackbarColor>('neutral');
  readonly duration = input(4000);
  readonly dismissible = input(true);
  readonly position = input<ElSnackbarPosition>('bottom');

  protected readonly open = signal(false);
}

@Component({
  selector: 'el-snackbar-service-story-host',
  imports: [ElButton],
  template: `
    <el-button (click)="show()">Open with service</el-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarServiceStoryHost {
  private readonly snackbar = inject(ElSnackbarService);

  protected show(): void {
    this.snackbar.open('File deleted', { action: 'Undo', color: 'neutral' });
  }
}

@Component({
  selector: 'el-snackbar-bulk-story-host',
  imports: [ElButton, ElSnackbar],
  template: `
    <el-button (click)="open.set(true)">Select 3 items</el-button>
    <el-snackbar
      [open]="open()"
      (openChange)="open.set($event)"
      message="3 selected"
      [duration]="0"
    >
      <div elSnackbarActions>
        <el-button variant="ghost" size="sm" (click)="open.set(false)">
          Move
        </el-button>
        <el-button variant="ghost" size="sm" (click)="open.set(false)">
          Delete
        </el-button>
        <el-button variant="ghost" size="sm" (click)="open.set(false)">
          Share
        </el-button>
      </div>
    </el-snackbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarBulkStoryHost {
  protected readonly open = signal(false);
}
