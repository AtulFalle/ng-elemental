import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElChip } from './chip';

const meta: Meta<ElChip> = {
  title: 'Components/Chip',
  component: ElChip,
  argTypes: {
    type: {
      control: 'select',
      options: ['assist', 'filter', 'suggestion'],
    },
    appearance: {
      control: 'select',
      options: ['outlined', 'filled', 'elevated'],
    },
    iconStart: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    removable: { control: 'boolean' },
  },
  args: {
    type: 'assist',
    appearance: 'outlined',
    iconStart: '',
    selected: false,
    disabled: false,
    removable: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElChip],
    },
    template: `<el-chip
      [type]="type"
      [appearance]="appearance"
      [iconStart]="iconStart"
      [(selected)]="selected"
      [disabled]="disabled"
      [removable]="removable"
    >Assist chip</el-chip>`,
  }),
};

export default meta;
type Story = StoryObj<ElChip>;

export const Assist: Story = {
  args: { type: 'assist' },
};

export const AssistWithIcon: Story = {
  args: { type: 'assist', iconStart: 'key' },
};

export const Filter: Story = {
  args: { type: 'filter' },
};

export const FilterSelected: Story = {
  args: { type: 'filter', selected: true },
};

export const Removable: Story = {
  args: { type: 'suggestion', appearance: 'filled', removable: true },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElChip] },
    template: `<el-chip
      [type]="type"
      [appearance]="appearance"
      [removable]="removable"
    >Removable</el-chip>`,
  }),
};

export const WithCheckIcon: Story = {
  args: { type: 'suggestion', appearance: 'filled', iconStart: 'check' },
};

export const SuggestionOutlined: Story = {
  args: { type: 'suggestion', appearance: 'outlined' },
};

export const SuggestionFilled: Story = {
  args: { type: 'suggestion', appearance: 'filled' },
};

export const SuggestionElevated: Story = {
  args: { type: 'suggestion', appearance: 'elevated' },
};

export const Disabled: Story = {
  args: { type: 'assist', disabled: true },
};

export const ChipSet: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElChip] },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        <el-chip type="assist" iconStart="key">Assist</el-chip>
        <el-chip type="filter" [selected]="true">Filter on</el-chip>
        <el-chip type="suggestion" appearance="filled" [removable]="true">Removable</el-chip>
        <el-chip type="suggestion" appearance="filled" iconStart="check">With check</el-chip>
        <el-chip type="suggestion" appearance="elevated">Elevated</el-chip>
      </div>
    `,
  }),
};
