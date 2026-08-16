import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElDialog,
  ElIcon,
  ElStep,
  ElStepContent,
  ElStepLabel,
  ElStepper,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-stepper-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElDialog,
    ElIcon,
    ElStepper,
    ElStep,
    ElStepContent,
    ElStepLabel,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './stepper-doc.html',
  styleUrl: './page.scss',
})
export class StepperDocPage {
  protected readonly selected = signal('account');
  protected readonly vertical = signal('account');
  protected readonly linear = signal('account');
  protected readonly iconDemo = signal('account');
  protected readonly wizardOpen = signal(false);
  protected readonly wizardStep = signal('account');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add stepper`;

  protected readonly importCode = `import {
  ElStepper,
  ElStep,
  ElStepContent,
} from './ui/stepper/stepper';

@Component({
  imports: [ElStepper, ElStep, ElStepContent],
  template: \`
    <el-stepper [(value)]="step" ariaLabel="Onboarding">
      <el-step value="account" label="Account">
        <ng-template elStepContent>
          <p>Account fields.</p>
        </ng-template>
      </el-step>
      <el-step value="plan" label="Plan">
        <ng-template elStepContent>
          <p>Plan fields.</p>
        </ng-template>
      </el-step>
    </el-stepper>
  \`,
})
export class MyComponent {
  protected step = 'account';
}`;

  protected readonly usageCode = `<el-stepper [(value)]="step" ariaLabel="Onboarding">
  <el-step value="account" label="Account">
    <ng-template elStepContent>
      <p>Any HTML, components, or forms.</p>
    </ng-template>
  </el-step>
  <el-step value="plan" label="Plan">
    <ng-template elStepContent>
      <p>Plan fields.</p>
    </ng-template>
  </el-step>
</el-stepper>`;

  protected readonly wizardCode = `<el-dialog [(open)]="open" title="Workspace setup" size="lg">
  <div elDialogContent>
    <el-stepper #stepper [(value)]="step" ariaLabel="Workspace setup">
      <el-step value="account" label="Account">
        <ng-template elStepContent>Account fields</ng-template>
      </el-step>
    </el-stepper>
  </div>
  <div elDialogFooter>
    <el-button variant="ghost" [disabled]="stepper.isFirst()" (click)="stepper.previous()">
      Back
    </el-button>
    <el-button (click)="stepper.next()">Next</el-button>
  </div>
</el-dialog>`;

  protected readonly scopedTokensCode = `.onboarding {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly stepperProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: "''",
      description:
        'Active step value. Supports two-way binding. Falls back to the first enabled step.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Indicator layout. Vertical puts the panel beside the list.',
    },
    {
      name: 'linear',
      type: 'boolean',
      default: 'false',
      description: 'Prevents skipping more than one step ahead.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables every step.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible name for the step list.',
    },
  ];

  protected readonly stepProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: '(required)',
      description: 'Unique value for this step.',
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description:
        'Step label. Falls back to value when omitted. Ignored when elStepLabel is provided.',
    },
    {
      name: 'description',
      type: 'string',
      default: "''",
      description: 'Optional supporting text under the label.',
    },
    {
      name: 'completed',
      type: 'boolean',
      default: 'false',
      description: 'Shows a check in the indicator. Display only.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables this step only.',
    },
  ];
}
