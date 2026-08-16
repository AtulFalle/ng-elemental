import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ElStep } from '../lib/stepper/step';
import { ElStepContent } from '../lib/stepper/step-content';
import { ElStepper } from '../lib/stepper/stepper';

@Component({
  selector: 'el-stepper-story-host',
  imports: [ElStepper, ElStep, ElStepContent],
  template: `
    <el-stepper
      [value]="selected()"
      (valueChange)="selected.set($event)"
      [orientation]="orientation()"
      [linear]="linear()"
      [disabled]="disabled()"
      ariaLabel="Onboarding"
    >
      <el-step
        value="account"
        label="Account"
        description="Name and email"
        [completed]="accountDone()"
      >
        <ng-template elStepContent>
          <p>Create the account used to sign in.</p>
        </ng-template>
      </el-step>
      <el-step
        value="plan"
        label="Plan"
        description="Billing period"
        [disabled]="disablePlan()"
        [completed]="planDone()"
      >
        <ng-template elStepContent>
          <p>Choose a plan. Linear mode cannot skip ahead.</p>
        </ng-template>
      </el-step>
      <el-step value="review" label="Review" description="Confirm details">
        <ng-template elStepContent>
          <p>Review and finish.</p>
        </ng-template>
      </el-step>
    </el-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperStoryHost {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly linear = input(false);
  readonly disabled = input(false);
  readonly disablePlan = input(false);
  readonly accountDone = input(false);
  readonly planDone = input(false);

  protected readonly selected = signal('account');
}
