import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ElButton } from '../button/button';
import { ElInput } from '../input/input';
import {
  ElPopover,
  ElPopoverClose,
  ElPopoverPanel,
  ElPopoverTrigger,
} from './popover';

const IMPORTS = [
  ElPopover,
  ElPopoverPanel,
  ElPopoverTrigger,
  ElPopoverClose,
  ElButton,
];

const meta: Meta<ElPopover> = {
  title: 'Components/Popover',
  component: ElPopover,
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
    },
    modal: { control: 'boolean' },
    arrow: { control: 'boolean' },
  },
  args: {
    position: 'bottom',
    trigger: 'click',
    modal: false,
    arrow: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: IMPORTS },
    template: `
      <div style="min-height: 14rem; display: flex; align-items: center">
        <el-popover
          [position]="position"
          [trigger]="trigger"
          [modal]="modal"
          [arrow]="arrow"
        >
          <el-button elPopoverTrigger variant="secondary">Details</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Assignee</span>
            <p style="margin: 0">Ada Lovelace</p>
            <el-button elPopoverClose variant="ghost" size="sm" style="margin-top: 0.75rem">
              Close
            </el-button>
          </el-popover-panel>
        </el-popover>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElPopover>;

export const Default: Story = {};

export const Positions: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; min-height: 12rem; align-items: center">
        <el-popover position="top">
          <el-button elPopoverTrigger variant="secondary" size="sm">Top</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Top</span>
            Anchored above the trigger.
          </el-popover-panel>
        </el-popover>
        <el-popover position="bottom">
          <el-button elPopoverTrigger variant="secondary" size="sm">Bottom</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Bottom</span>
            Default placement.
          </el-popover-panel>
        </el-popover>
        <el-popover position="start">
          <el-button elPopoverTrigger variant="secondary" size="sm">Start</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Start</span>
            Follows text direction.
          </el-popover-panel>
        </el-popover>
        <el-popover position="end">
          <el-button elPopoverTrigger variant="secondary" size="sm">End</el-button>
          <el-popover-panel>
            <span elPopoverTitle>End</span>
            Follows text direction.
          </el-popover-panel>
        </el-popover>
      </div>
    `,
  }),
};

export const Form: Story = {
  render: () => ({
    moduleMetadata: { imports: [...IMPORTS, ElInput] },
    template: `
      <div style="min-height: 16rem">
        <el-popover>
          <el-button elPopoverTrigger variant="primary">Invite</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Invite teammate</span>
            <el-input placeholder="name@example.com" inputId="invite-email" />
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem; justify-content: flex-end">
              <el-button elPopoverClose variant="ghost" size="sm">Cancel</el-button>
              <el-button elPopoverClose variant="primary" size="sm">Send</el-button>
            </div>
          </el-popover-panel>
        </el-popover>
      </div>
    `,
  }),
};

export const Hover: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <div style="min-height: 12rem; display: flex; align-items: center">
        <el-popover trigger="hover" position="top">
          <el-button elPopoverTrigger variant="ghost">Hover me</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Hover card</span>
            Rich content, not a tooltip.
          </el-popover-panel>
        </el-popover>
      </div>
    `,
  }),
};

export const Modal: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <div style="min-height: 12rem">
        <el-popover modal ariaLabel="Confirm">
          <el-button elPopoverTrigger variant="secondary">Modal popover</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Confirm</span>
            Focus moves into the panel. Click the backdrop or press Escape to dismiss.
            <el-button elPopoverClose variant="primary" size="sm" style="margin-top: 0.75rem">
              Done
            </el-button>
          </el-popover-panel>
        </el-popover>
      </div>
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:2rem;min-height:14rem;align-items:center">
        <el-popover>
          <el-button elPopoverTrigger variant="secondary">Click popover</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Details</span>
            Click or keyboard to toggle.
          </el-popover-panel>
        </el-popover>
        <el-popover trigger="hover" position="top">
          <el-button elPopoverTrigger variant="ghost">Hover popover</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Hover card</span>
            Enter or Space opens for keyboard users.
          </el-popover-panel>
        </el-popover>
        <el-popover modal ariaLabel="Confirm">
          <el-button elPopoverTrigger variant="primary">Modal popover</el-button>
          <el-popover-panel>
            <span elPopoverTitle>Confirm</span>
            <el-button elPopoverClose variant="ghost" size="sm">Cancel</el-button>
            <el-button elPopoverClose variant="primary" size="sm">Done</el-button>
          </el-popover-panel>
        </el-popover>
      </div>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const clickTrigger = canvas.getByRole('button', { name: 'Click popover' });
    const hoverTrigger = canvas.getByRole('button', { name: 'Hover popover' });
    const modalTrigger = canvas.getByRole('button', { name: 'Modal popover' });

    await step('Pointer: click opens and closes popover', async () => {
      await userEvent.click(clickTrigger);
      await expect(
        canvas.getByRole('dialog', { name: 'Details' }),
      ).toBeVisible();
      await userEvent.click(clickTrigger);
      await expect(
        canvas.queryByRole('dialog', { name: 'Details' }),
      ).not.toBeInTheDocument();
    });

    await step('Keyboard: hover trigger opens with Enter', async () => {
      hoverTrigger.focus();
      await userEvent.keyboard('{Enter}');
      await expect(
        canvas.getByRole('dialog', { name: 'Hover card' }),
      ).toBeVisible();
      await userEvent.keyboard('{Escape}');
    });

    await step('Modal: Tab stays in the panel', async () => {
      await userEvent.click(modalTrigger);
      const dialog = await canvas.findByRole('dialog', { name: 'Confirm' });
      await expect(dialog).toBeVisible();
      await userEvent.tab();
      await expect(dialog.contains(document.activeElement)).toBe(true);
      await userEvent.keyboard('{Escape}');
      await expect(modalTrigger).toHaveFocus();
    });
  },
};
