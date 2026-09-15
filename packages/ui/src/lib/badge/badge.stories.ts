import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, userEvent } from 'storybook/test';
import { ElAvatar } from '../avatar/avatar';
import { ElButton } from '../button/button';
import { ElIcon } from '../icon/icon';
import { ElBadge } from './badge';

const meta: Meta<ElBadge> = {
  title: 'Components/Badge',
  component: ElBadge,
  argTypes: {
    count: { control: 'number' },
    max: { control: 'number' },
    content: { control: 'text' },
    dot: { control: 'boolean' },
    showZero: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['auto', 'overlay', 'pill'],
    },
    color: {
      control: 'select',
      options: ['', 'error', 'primary', 'success', 'warning', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    placement: {
      control: 'select',
      options: ['top-end', 'top-start', 'bottom-end', 'bottom-start'],
    },
    ariaLabel: { control: 'text' },
  },
  args: {
    count: 8,
    max: 99,
    content: '',
    dot: false,
    showZero: false,
    variant: 'auto',
    color: '',
    size: 'md',
    placement: 'top-end',
    ariaLabel: '',
  },
  parameters: {
    docs: { codePanel: true },
  },
};

export default meta;
type Story = StoryObj<ElBadge>;

export const Overlay: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElBadge, ElButton] },
    template: `
      <el-badge
        [count]="count"
        [max]="max"
        [content]="content"
        [dot]="dot"
        [showZero]="showZero"
        [variant]="variant"
        [color]="color"
        [size]="size"
        [placement]="placement"
        [ariaLabel]="ariaLabel"
      >
        <el-button variant="icon" iconStart="bell" ariaLabel="Notifications, 8 unread" />
      </el-badge>
    `,
  }),
};

export const CountPill: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElBadge, ElButton] },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap">
        <el-button variant="outline">
          More filters
          <el-badge [count]="3" />
        </el-button>
        <el-badge [count]="120" [max]="99" />
        <el-badge content="12 more" />
        <el-badge content="NEW" />
      </div>
    `,
  }),
};

export const Overflow: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElBadge, ElAvatar] },
    template: `
      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap">
        <el-badge [count]="99">
          <el-avatar initials="AL" alt="Ada Lovelace, 99 notifications" />
        </el-badge>
        <el-badge [count]="100">
          <el-avatar initials="GH" alt="Grace Hopper, 99+ notifications" />
        </el-badge>
        <el-badge [count]="1000" [max]="999" />
        <el-badge [count]="0" />
        <el-badge [count]="0" showZero />
      </div>
    `,
  }),
};

export const Dot: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElBadge, ElIcon] },
    template: `
      <div style="display: flex; align-items: center; gap: 1.5rem">
        <el-badge dot ariaLabel="Unread">
          <el-icon name="envelope" />
        </el-badge>
        <el-badge dot ariaLabel="Online status" />
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElBadge] },
    template: `
      <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap">
        <el-badge [count]="5" color="error" />
        <el-badge [count]="5" color="primary" />
        <el-badge [count]="5" color="success" />
        <el-badge [count]="5" color="warning" />
        <el-badge [count]="5" color="info" />
        <el-badge [count]="5" color="neutral" />
      </div>
    `,
  }),
};

export const Size: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElBadge, ElButton] },
    template: `
      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap">
        <el-badge [count]="8" size="sm">
          <el-button variant="icon" iconStart="bell" ariaLabel="Notifications, 8 unread" />
        </el-badge>
        <el-badge [count]="8" size="md">
          <el-button variant="icon" iconStart="bell" ariaLabel="Notifications, 8 unread" />
        </el-badge>
        <el-badge [count]="8" size="sm" />
        <el-badge [count]="8" size="md" />
      </div>
    `,
  }),
};

export const Placement: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElBadge, ElAvatar] },
    template: `
      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap">
        <el-badge [count]="8" placement="top-end">
          <el-avatar initials="TE" alt="Top end, 8 notifications" />
        </el-badge>
        <el-badge [count]="8" placement="top-start">
          <el-avatar initials="TS" alt="Top start, 8 notifications" />
        </el-badge>
        <el-badge [count]="8" placement="bottom-end">
          <el-avatar initials="BE" alt="Bottom end, 8 notifications" />
        </el-badge>
        <el-badge [count]="8" placement="bottom-start">
          <el-avatar initials="BS" alt="Bottom start, 8 notifications" />
        </el-badge>
      </div>
    `,
  }),
};

export const LongContent: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElBadge, ElButton] },
    template: `
      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap">
        <el-badge content="A very long notification label that must ellipsize">
          <el-button variant="icon" iconStart="bell" ariaLabel="Notifications" />
        </el-badge>
        <el-badge content="A very long filter summary that must ellipsize" />
      </div>
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  parameters: {
    docs: { codePanel: true },
  },
  render: () => ({
    moduleMetadata: { imports: [ElBadge, ElButton, ElAvatar, ElIcon] },
    template: `
      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap">
        <el-badge [count]="8" data-testid="overlay-badge">
          <el-button variant="icon" iconStart="bell" ariaLabel="Notifications, 8 unread" />
        </el-badge>
        <el-button data-testid="filters-button" variant="outline">
          More filters
          <el-badge [count]="3" />
        </el-button>
        <el-badge [count]="120" [max]="99" data-testid="overflow-pill" />
        <el-badge dot ariaLabel="Unread mail" data-testid="dot-badge">
          <el-icon name="envelope" />
        </el-badge>
        <el-badge
          content="A very long notification label that must ellipsize"
          data-testid="long-pill"
        />
        <el-badge [count]="0" data-testid="hidden-zero" />
        <el-badge [count]="0" showZero data-testid="shown-zero" />
      </div>
    `,
  }),
  play: async ({ canvas, step }) => {
    await step('Overlay shows count on notifications', async () => {
      const overlay = canvas.getByTestId('overlay-badge');
      await expect(overlay).toHaveTextContent('8');
      await expect(
        canvas.getByRole('button', { name: 'Notifications, 8 unread' }),
      ).toBeInTheDocument();
    });

    await step('Count pill sits inside More filters', async () => {
      const button = canvas.getByTestId('filters-button');
      await expect(button).toHaveTextContent('More filters');
      await expect(button).toHaveTextContent('3');
      await userEvent.click(button);
    });

    await step('Overflow formats as max+', async () => {
      const pill = canvas.getByTestId('overflow-pill');
      await expect(pill).toHaveTextContent('99+');
    });

    await step('Dot exposes accessible name as an image', async () => {
      const named = canvas.getByRole('img', { name: 'Unread mail' });
      await expect(named).toBeInTheDocument();
    });

    await step('Long content keeps full string in the DOM', async () => {
      const long = canvas.getByTestId('long-pill');
      const indicator = long.querySelector('.el-badge__indicator');
      const label = long.querySelector('.el-badge__label');
      await expect(indicator).not.toHaveAttribute('aria-label');
      await expect(indicator).not.toHaveAttribute('title');
      await expect(label).toHaveTextContent(
        'A very long notification label that must ellipsize',
      );
      const style = getComputedStyle(label as Element);
      await expect(style.textOverflow).toBe('ellipsis');
    });

    await step('Zero is hidden unless showZero', async () => {
      const hidden = canvas.getByTestId('hidden-zero');
      await expect(hidden.querySelector('.el-badge__indicator')).toBeNull();
      const shown = canvas.getByTestId('shown-zero');
      await expect(shown).toHaveTextContent('0');
    });
  },
};
