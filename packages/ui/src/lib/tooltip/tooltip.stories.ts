import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ElButton } from '../button/button';
import { ElTooltip } from './tooltip';

const meta: Meta<ElTooltip> = {
  title: 'Components/Tooltip',
  component: ElTooltip,
  argTypes: {
    elTooltip: { control: 'text' },
    elTooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
    },
    elTooltipDisabled: { control: 'boolean' },
    elTooltipDelay: { control: { type: 'number', min: 0 } },
    elTooltipOpen: { control: 'boolean' },
  },
  args: {
    elTooltip: 'Save file',
    elTooltipPosition: 'top',
    elTooltipDisabled: false,
    elTooltipDelay: 0,
    elTooltipOpen: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElTooltip, ElButton],
    },
    template: `
      <div style="padding: 4rem; display: inline-block;">
        <el-button
          elTooltip
          [elTooltip]="elTooltip"
          [elTooltipPosition]="elTooltipPosition"
          [elTooltipDisabled]="elTooltipDisabled"
          [elTooltipDelay]="elTooltipDelay"
          [(elTooltipOpen)]="elTooltipOpen"
        >Save</el-button>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElTooltip>;

export const Default: Story = {};

export const Positions: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElTooltip, ElButton],
    },
    template: `
      <div style="display: flex; gap: 2rem; padding: 4rem; flex-wrap: wrap;">
        <el-button elTooltip="Top" elTooltipPosition="top" [elTooltipOpen]="true">Top</el-button>
        <el-button elTooltip="Bottom" elTooltipPosition="bottom" [elTooltipOpen]="true">Bottom</el-button>
        <el-button elTooltip="Start" elTooltipPosition="start" [elTooltipOpen]="true">Start</el-button>
        <el-button elTooltip="End" elTooltipPosition="end" [elTooltipOpen]="true">End</el-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { elTooltipDisabled: true, elTooltipOpen: false },
};

export const OnButton: Story = {
  args: { elTooltipOpen: false, elTooltipDelay: 200 },
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [ElTooltip, ElButton] },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:1rem;padding:4rem">
        <el-button elTooltip="Save file">Save</el-button>
        <el-button elTooltip="Hidden tip" elTooltipDisabled>Disabled tip</el-button>
        <el-button
          variant="icon"
          iconStart="gear"
          ariaLabel="Settings"
          elTooltip="Open settings"
        ></el-button>
      </div>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const save = canvas.getByRole('button', { name: 'Save' });
    const disabled = canvas.getByRole('button', { name: 'Disabled tip' });
    const icon = canvas.getByRole('button', { name: 'Settings' });

    await step('Pointer: hover shows tooltip', async () => {
      await userEvent.hover(save);
      await expect(canvas.getByRole('tooltip')).toHaveTextContent('Save file');
      await userEvent.unhover(save);
    });

    await step('Keyboard: focus shows tooltip', async () => {
      save.focus();
      await expect(canvas.getByRole('tooltip')).toHaveTextContent('Save file');
      await userEvent.keyboard('{Escape}');
    });

    await step('Disabled tip does not open', async () => {
      await userEvent.hover(disabled);
      await expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    await step('Icon-only host is named and tipped', async () => {
      icon.focus();
      await expect(canvas.getByRole('tooltip')).toHaveTextContent('Open settings');
    });
  },
};
