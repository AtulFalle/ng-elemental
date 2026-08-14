import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElIcon } from './icon';

const meta: Meta<ElIcon> = {
  title: 'Components/Icon',
  component: ElIcon,
  argTypes: {
    name: { control: 'text' },
    variant: {
      control: 'select',
      options: ['solid', 'regular', 'brands'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    decorative: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    name: 'check',
    variant: 'solid',
    size: 'md',
    decorative: true,
    label: '',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElIcon] },
    template: `<el-icon [name]="name" [variant]="variant" [size]="size" [decorative]="decorative" [label]="label" />`,
  }),
};

export default meta;
type Story = StoryObj<ElIcon>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElIcon] },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; font-size: 1rem;">
        <el-icon name="star" size="sm" />
        <el-icon name="star" size="md" />
        <el-icon name="star" size="lg" />
      </div>
    `,
  }),
};

export const CommonIcons: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElIcon] },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <el-icon name="check" />
        <el-icon name="xmark" />
        <el-icon name="plus" />
        <el-icon name="pen" />
        <el-icon name="trash" />
        <el-icon name="magnifying-glass" />
        <el-icon name="user" />
        <el-icon name="github" variant="brands" />
      </div>
    `,
  }),
};
