import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElRadio, ElRadioGroup } from './radio-group';

const meta: Meta<ElRadioGroup> = {
  title: 'Components/Radio',
  component: ElRadioGroup,
  argTypes: {
    value: { control: 'text' },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
  args: {
    value: 'option-1',
    direction: 'vertical',
    disabled: false,
    ariaLabel: 'Options',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElRadioGroup, ElRadio],
    },
    template: `<el-radio-group
      [(value)]="value"
      [direction]="direction"
      [disabled]="disabled"
      [ariaLabel]="ariaLabel"
    >
      <el-radio value="option-1" inputId="radio-1">Option 1</el-radio>
      <el-radio value="option-2" inputId="radio-2">Option 2</el-radio>
      <el-radio value="option-3" inputId="radio-3">Option 3</el-radio>
    </el-radio-group>`,
  }),
};

export default meta;
type Story = StoryObj<ElRadioGroup>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LabelLeft: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ElRadioGroup, ElRadio],
    },
    template: `
      <el-radio-group value="left-1" ariaLabel="Label position">
        <el-radio value="left-1" inputId="radio-left-1" labelPosition="left">
          Label on the left
        </el-radio>
        <el-radio value="left-2" inputId="radio-left-2" labelPosition="right">
          Label on the right (default)
        </el-radio>
      </el-radio-group>
    `,
  }),
};

export const VerticalGroup: Story = {
  render: () => ({
    props: { selected: 'email' },
    moduleMetadata: {
      imports: [ElRadioGroup, ElRadio],
    },
    template: `
      <el-radio-group [(value)]="selected" direction="vertical" ariaLabel="Contact method">
        <el-radio value="email" inputId="contact-email">Email</el-radio>
        <el-radio value="phone" inputId="contact-phone">Phone</el-radio>
        <el-radio value="mail" inputId="contact-mail">Mail</el-radio>
      </el-radio-group>
    `,
  }),
};

export const HorizontalGroup: Story = {
  render: () => ({
    props: { selected: 'medium' },
    moduleMetadata: {
      imports: [ElRadioGroup, ElRadio],
    },
    template: `
      <el-radio-group [(value)]="selected" direction="horizontal" ariaLabel="Size">
        <el-radio value="small" inputId="size-small">Small</el-radio>
        <el-radio value="medium" inputId="size-medium">Medium</el-radio>
        <el-radio value="large" inputId="size-large">Large</el-radio>
      </el-radio-group>
    `,
  }),
};

export const WithDisabledOption: Story = {
  render: () => ({
    props: { selected: 'standard' },
    moduleMetadata: {
      imports: [ElRadioGroup, ElRadio],
    },
    template: `
      <el-radio-group [(value)]="selected" direction="vertical" ariaLabel="Shipping">
        <el-radio value="standard" inputId="ship-standard">Standard (5–7 days)</el-radio>
        <el-radio value="express" inputId="ship-express">Express (2–3 days)</el-radio>
        <el-radio value="overnight" inputId="ship-overnight" [disabled]="true">
          Overnight (unavailable)
        </el-radio>
      </el-radio-group>
    `,
  }),
};
