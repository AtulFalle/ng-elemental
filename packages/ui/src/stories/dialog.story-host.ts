import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { ElButton } from '../lib/button/button';
import { ElDialog } from '../lib/dialog/dialog';
import { ElDialogClose } from '../lib/dialog/dialog-close';
import { ElDialogRef } from '../lib/dialog/dialog-ref';
import { ElDialogService } from '../lib/dialog/dialog.service';
import {
  EL_DIALOG_DATA,
  type ElDialogSize,
} from '../lib/dialog/dialog.token';
import { ElStep } from '../lib/stepper/step';
import { ElStepContent } from '../lib/stepper/step-content';
import { ElStepper } from '../lib/stepper/stepper';

@Component({
  selector: 'el-dialog-story-host',
  imports: [ElButton, ElDialog, ElDialogClose],
  template: `
    <el-button (click)="open.set(true)">Open dialog</el-button>
    <el-dialog
      [open]="open()"
      (openChange)="open.set($event)"
      [title]="title()"
      [size]="size()"
      [closable]="closable()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
    >
      <div elDialogContent>
        <p>
          Header and footer stay put. This content scrolls so the dialog
          remains on screen.
        </p>
        @for (line of lines; track line) {
          <p>Paragraph {{ line }} of a long body.</p>
        }
      </div>
      <div elDialogFooter>
        <el-button elDialogClose variant="ghost">Cancel</el-button>
        <el-button (click)="open.set(false)">Save</el-button>
      </div>
    </el-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogStoryHost {
  readonly title = input('Edit profile');
  readonly size = input<ElDialogSize>('md');
  readonly closable = input(true);
  readonly closeOnBackdrop = input(true);
  readonly closeOnEscape = input(true);

  protected readonly open = signal(false);
  protected readonly lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}

export interface DialogServiceDemoData {
  userId: number;
}

@Component({
  selector: 'el-dialog-service-demo',
  imports: [ElButton, ElDialogClose],
  template: `
    <p>User {{ data.userId }}</p>
    <div
      style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem"
    >
      <el-button elDialogClose variant="ghost">Cancel</el-button>
      <el-button (click)="dialogRef.close(true)">Save</el-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogServiceDemo {
  readonly data = inject<DialogServiceDemoData>(EL_DIALOG_DATA);
  readonly dialogRef = inject(ElDialogRef);
}

@Component({
  selector: 'el-dialog-service-story-host',
  imports: [ElButton],
  template: `
    <el-button (click)="open()">Open with service</el-button>
    @if (result() !== null) {
      <p style="margin: 0.75rem 0 0">Result: {{ result() }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogServiceStoryHost {
  private readonly dialog = inject(ElDialogService);
  protected readonly result = signal<string | null>(null);

  protected async open(): Promise<void> {
    const ref = this.dialog.open(DialogServiceDemo, {
      data: { userId: 42 },
      title: 'Edit user',
      size: 'sm',
    });
    const saved = await ref.afterClosed;
    this.result.set(saved ? 'saved' : 'dismissed');
  }
}

@Component({
  selector: 'el-dialog-wizard-story-host',
  imports: [
    ElButton,
    ElDialog,
    ElDialogClose,
    ElStepper,
    ElStep,
    ElStepContent,
  ],
  template: `
    <el-button (click)="open.set(true)">Start setup</el-button>
    <el-dialog
      [open]="open()"
      (openChange)="open.set($event)"
      title="Workspace setup"
      size="lg"
    >
      <div elDialogContent>
        <el-stepper
          #stepper
          [value]="step()"
          (valueChange)="step.set($event)"
          ariaLabel="Workspace setup"
        >
          <el-step value="account" label="Account" description="Name and email">
            <ng-template elStepContent>
              <p>Account details for this workspace.</p>
            </ng-template>
          </el-step>
          <el-step value="plan" label="Plan" description="Billing period">
            <ng-template elStepContent>
              <p>Choose monthly or annual billing.</p>
            </ng-template>
          </el-step>
          <el-step value="review" label="Review">
            <ng-template elStepContent>
              <p>Confirm and create the workspace.</p>
            </ng-template>
          </el-step>
        </el-stepper>
      </div>
      <div elDialogFooter>
        <el-button
          variant="ghost"
          [disabled]="stepper.isFirst()"
          (click)="stepper.previous()"
        >
          Back
        </el-button>
        @if (stepper.isLast()) {
          <el-button (click)="open.set(false)">Create</el-button>
        } @else {
          <el-button (click)="stepper.next()">Next</el-button>
        }
        <el-button elDialogClose variant="ghost">Cancel</el-button>
      </div>
    </el-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWizardStoryHost {
  protected readonly open = signal(false);
  protected readonly step = signal('account');
}
