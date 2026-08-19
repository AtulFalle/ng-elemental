import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';
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

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  parameters: { docs: { codePanel: true } },
  render: () => ({
    props: { filterOn: true },
    moduleMetadata: { imports: [ElChip] },
    template: `<div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
      <el-chip type="assist" iconStart="key">Assist</el-chip>
      <el-chip type="filter" [(selected)]="filterOn">Filter</el-chip>
      <el-chip type="suggestion" appearance="filled" [removable]="true">Removable</el-chip>
      <el-chip type="assist" disabled>Disabled</el-chip>
    </div>`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const assist = canvas.getByRole('button', { name: 'Assist' });
    const filter = canvas.getByRole('checkbox', { name: 'Filter' });
    const disabled = canvas.getByRole('button', { name: 'Disabled' });

    const onAssist = fn();
    const onRemove = fn();
    assist.addEventListener('click', onAssist);

    await step('Assist chip is named and activates', async () => {
      await userEvent.click(assist);
      await expect(onAssist).toHaveBeenCalledTimes(1);
    });

    await step('Filter chip toggles aria-checked', async () => {
      await expect(filter).toHaveAttribute('aria-checked', 'true');
      await userEvent.click(filter);
      await expect(filter).toHaveAttribute('aria-checked', 'false');
    });

    await step('Removable chip exposes remove control', async () => {
      const remove = canvas.getByRole('button', { name: 'Remove' });
      remove.addEventListener('click', onRemove);
      await userEvent.click(remove);
      await expect(onRemove).toHaveBeenCalledTimes(1);
    });

    await step('Disabled chip does not activate', async () => {
      await expect(disabled).toBeDisabled();
      const onDisabled = fn();
      disabled.addEventListener('click', onDisabled);
      await userEvent.click(disabled);
      await expect(onDisabled).not.toHaveBeenCalled();
    });
  },
};
