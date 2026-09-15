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
  ElTab,
  ElTabContent,
  ElTabs,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
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
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './stepper-doc.html',
  styleUrl: './page.scss',
})
export class StepperDocPage {
  protected readonly installTab = signal('cli');

  protected readonly selected = signal('account');
  protected readonly vertical = signal('account');
  protected readonly linear = signal('account');
  protected readonly iconDemo = signal('account');
  protected readonly wizardOpen = signal(false);
  protected readonly wizardStep = signal('account');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add stepper`;

  protected readonly manualIconCode = `npx @ng-elemental/cli add icon`;

  protected readonly manualFilesCode = `ui/stepper/stepper.ts
ui/stepper/stepper.html
ui/stepper/stepper.scss
ui/stepper/step.ts
ui/stepper/step.html
ui/stepper/step.scss
ui/stepper/step-content.ts
ui/stepper/step-label.ts`;

  protected readonly importSnippet = `import {
  ElStepper,
  ElStep,
  ElStepContent,
} from './ui/stepper/stepper'`;

  protected readonly usageSnippet = `<el-stepper [(value)]="step" ariaLabel="Onboarding">
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
</el-stepper>`;

  protected readonly heroCode = `<el-stepper
  [value]="selected()"
  (valueChange)="selected.set($event)"
  ariaLabel="Onboarding"
>
  <el-step value="account" label="Account" description="Name and email">
    <ng-template elStepContent>
      <p>Create the account used to sign in.</p>
    </ng-template>
  </el-step>
  <el-step value="plan" label="Plan" description="Billing period" completed>
    <ng-template elStepContent>
      <p>Choose a plan.</p>
    </ng-template>
  </el-step>
  <el-step value="review" label="Review">
    <ng-template elStepContent>
      <p>Review and finish.</p>
    </ng-template>
  </el-step>
</el-stepper>`;

  protected readonly verticalCode = `<el-stepper [(value)]="step" orientation="vertical" ariaLabel="Onboarding">
  <el-step value="account" label="Account">
    <ng-template elStepContent>Account fields.</ng-template>
  </el-step>
</el-stepper>`;

  protected readonly linearCode = `<el-stepper [(value)]="step" linear ariaLabel="Linear onboarding">
  <el-step value="account" label="Account">
    <ng-template elStepContent>Start here.</ng-template>
  </el-step>
</el-stepper>`;

  protected readonly customLabelsCode = `<el-step value="account">
  <ng-template elStepLabel>
    <el-icon name="user" size="sm" />
    Account
  </ng-template>
  <ng-template elStepContent>Sign-in details.</ng-template>
</el-step>`;

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
