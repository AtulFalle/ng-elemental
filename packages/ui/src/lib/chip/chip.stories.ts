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
    color: {
      control: 'select',
      options: ['neutral', 'success', 'error', 'warning', 'info'],
    },
    iconStart: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    removable: { control: 'boolean' },
  },
  args: {
    type: 'assist',
    appearance: 'outlined',
    color: 'neutral',
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
      [color]="color"
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

export const ColorSuccess: Story = {
  args: { type: 'suggestion', appearance: 'filled', color: 'success' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElChip] },
    template: `<el-chip [type]="type" [appearance]="appearance" [color]="color">Active</el-chip>`,
  }),
};

export const ColorError: Story = {
  args: { type: 'suggestion', appearance: 'filled', color: 'error' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElChip] },
    template: `<el-chip [type]="type" [appearance]="appearance" [color]="color">Failed</el-chip>`,
  }),
};

export const ColorWarning: Story = {
  args: { type: 'suggestion', appearance: 'filled', color: 'warning' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElChip] },
    template: `<el-chip [type]="type" [appearance]="appearance" [color]="color">Pending</el-chip>`,
  }),
};

export const ColorInfo: Story = {
  args: { type: 'suggestion', appearance: 'filled', color: 'info' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElChip] },
    template: `<el-chip [type]="type" [appearance]="appearance" [color]="color">New</el-chip>`,
  }),
};

export const ColorSet: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElChip] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
          <el-chip type="suggestion" appearance="outlined">Neutral</el-chip>
          <el-chip type="suggestion" appearance="outlined" color="success">Success</el-chip>
          <el-chip type="suggestion" appearance="outlined" color="error">Error</el-chip>
          <el-chip type="suggestion" appearance="outlined" color="warning">Warning</el-chip>
          <el-chip type="suggestion" appearance="outlined" color="info">Info</el-chip>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
          <el-chip type="suggestion" appearance="filled">Neutral</el-chip>
          <el-chip type="suggestion" appearance="filled" color="success">Success</el-chip>
          <el-chip type="suggestion" appearance="filled" color="error">Error</el-chip>
          <el-chip type="suggestion" appearance="filled" color="warning">Warning</el-chip>
          <el-chip type="suggestion" appearance="filled" color="info">Info</el-chip>
        </div>
      </div>
    `,
  }),
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
