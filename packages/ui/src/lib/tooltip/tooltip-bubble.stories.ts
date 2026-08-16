import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElTooltipBubble } from './tooltip-bubble';

const meta: Meta<ElTooltipBubble> = {
  title: 'Components/Tooltip/Bubble',
  component: ElTooltipBubble,
  argTypes: {
    text: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
    },
  },
  args: {
    text: 'Save file',
    position: 'top',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElTooltipBubble],
    },
    template: `<el-tooltip-bubble [text]="text" [position]="position" />`,
  }),
};

export default meta;
type Story = StoryObj<ElTooltipBubble>;

export const Default: Story = {};

export const LongWrap: Story = {
  args: {
    text: 'A longer tooltip that wraps onto a second line for Chromatic.',
  },
};

export const Top: Story = { args: { position: 'top' } };
export const Bottom: Story = { args: { position: 'bottom' } };
export const Start: Story = { args: { position: 'start' } };
export const End: Story = { args: { position: 'end' } };
