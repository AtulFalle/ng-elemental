import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ElIcon } from '../icon/icon';
import { ElStep } from './step';
import { ElStepContent } from './step-content';
import { ElStepLabel } from './step-label';
import { ElStepper } from './stepper';
import { StepperStoryHost } from '../../stories/stepper.story-host';

const meta: Meta<StepperStoryHost> = {
  title: 'Components/Stepper',
  component: StepperStoryHost,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    linear: { control: 'boolean' },
    disabled: { control: 'boolean' },
    disablePlan: { control: 'boolean' },
    accountDone: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    linear: false,
    disabled: false,
    disablePlan: false,
    accountDone: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [StepperStoryHost],
    },
    template: `
      <el-stepper-story-host
        [orientation]="orientation"
        [linear]="linear"
        [disabled]="disabled"
        [disablePlan]="disablePlan"
        [accountDone]="accountDone"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<StepperStoryHost>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const Linear: Story = {
  args: { linear: true, accountDone: true },
};

export const Completed: Story = {
  args: { accountDone: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CustomLabels: Story = {
  render: () => ({
    props: { selected: 'account' },
    moduleMetadata: {
      imports: [ElStepper, ElStep, ElStepContent, ElStepLabel, ElIcon],
    },
    template: `
      <el-stepper
        [value]="selected"
        (valueChange)="selected = $event"
        ariaLabel="Checkout"
      >
        <el-step value="account">
          <ng-template elStepLabel>
            <el-icon name="user" size="sm" />
            Account
          </ng-template>
          <ng-template elStepContent>
            <p>Sign-in details.</p>
          </ng-template>
        </el-step>
        <el-step value="shipping">
          <ng-template elStepLabel>
            <el-icon name="truck" size="sm" />
            Shipping
          </ng-template>
          <ng-template elStepContent>
            <p>Delivery address.</p>
          </ng-template>
        </el-step>
      </el-stepper>
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [StepperStoryHost] },
    template: `<el-stepper-story-host />`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const group = canvas.getByRole('group', { name: 'Onboarding' });
    const account = canvas.getByRole('button', { name: /Account/i });
    const plan = canvas.getByRole('button', { name: /Plan/i });

    await step('Wizard steps use group semantics with current step', async () => {
      await expect(group).toBeInTheDocument();
      await expect(account).toHaveAttribute('aria-current', 'step');
    });

    await step('Arrow keys move between steps on the group', async () => {
      account.focus();
      await userEvent.keyboard('{ArrowRight}');
      await expect(plan).toHaveFocus();
      await expect(plan).toHaveAttribute('aria-current', 'step');
    });
  },
};
