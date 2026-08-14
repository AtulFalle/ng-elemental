import type { Meta, StoryObj } from '@storybook/angular-vite';
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
