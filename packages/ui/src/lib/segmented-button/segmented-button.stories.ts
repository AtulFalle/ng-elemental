import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';
import { SegmentedButtonStoryHost } from '../../stories/segmented-button.story-host';

const meta: Meta<SegmentedButtonStoryHost> = {
  title: 'Components/Segmented Button',
  component: SegmentedButtonStoryHost,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    disableGrid: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    disableGrid: false,
    ariaLabel: 'View mode',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [SegmentedButtonStoryHost],
    },
    template: `
      <el-segmented-button-story-host
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [disableGrid]="disableGrid"
        [ariaLabel]="ariaLabel"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<SegmentedButtonStoryHost>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithDisabledItem: Story = {
  args: { disableGrid: true },
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  parameters: { docs: { codePanel: true } },
  render: () => ({
    moduleMetadata: { imports: [SegmentedButtonStoryHost] },
    template: `
      <div style="display:flex;flex-direction:column;gap:1rem">
        <el-segmented-button-story-host ariaLabel="View mode" />
        <el-segmented-button-story-host ariaLabel="Disabled" [disabled]="true" />
      </div>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const list = canvas.getAllByRole('radio', { name: 'List' })[0];
    const grid = canvas.getAllByRole('radio', { name: 'Grid' })[0];
    const disabledList = canvas.getAllByRole('radio', { name: 'List' })[1];

    await step('Pointer: select segment', async () => {
      await userEvent.click(grid);
      await expect(grid).toBeChecked();
    });

    await step('Keyboard: Arrow keys move selection', async () => {
      list.focus();
      await userEvent.keyboard('{ArrowRight}');
      await expect(grid).toBeChecked();
    });

    await step('Disabled group is inert', async () => {
      await expect(disabledList).toHaveAttribute('aria-disabled', 'true');
      const onClick = fn();
      disabledList.addEventListener('click', onClick);
      await userEvent.click(disabledList);
      await expect(onClick).not.toHaveBeenCalled();
    });
  },
};
