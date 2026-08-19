import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ElAvatar } from './avatar';

const meta: Meta<ElAvatar> = {
  title: 'Components/Avatar',
  component: ElAvatar,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    icon: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    src: '',
    alt: 'User',
    initials: 'JD',
    icon: '',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElAvatar],
    },
    template: `<el-avatar
      [src]="src"
      [alt]="alt"
      [initials]="initials"
      [icon]="icon"
      [size]="size"
    />`,
  }),
};

export default meta;
type Story = StoryObj<ElAvatar>;

export const Initials: Story = {};

export const Icon: Story = {
  args: { initials: '', alt: 'Account' },
};

export const CustomIcon: Story = {
  args: { initials: '', icon: 'star', alt: 'Starred' },
};

export const Image: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=ng-elemental',
    initials: '',
    alt: 'Ada Lovelace',
  },
};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElAvatar] },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem">
        <el-avatar size="sm" initials="SM" alt="Small" />
        <el-avatar size="md" initials="MD" alt="Medium" />
        <el-avatar size="lg" initials="LG" alt="Large" />
      </div>
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [ElAvatar] },
    template: `<div style="display: flex; align-items: center; gap: 1rem">
      <el-avatar
        src="https://i.pravatar.cc/150?u=ng-elemental-interactions"
        alt="Ada Lovelace"
      />
      <el-avatar initials="JD" alt="Jane Doe" />
      <el-avatar icon="star" alt="Starred" />
    </div>`,
  }),
  play: async ({ canvas, step }) => {
    await step('Image exposes alt text', async () => {
      const image = canvas.getByRole('img', { name: 'Ada Lovelace' });
      await expect(image).toHaveAttribute('src');
    });

    await step('Initials fallback is named', async () => {
      const initials = canvas.getByRole('img', { name: 'Jane Doe' });
      await expect(initials).toHaveTextContent('JD');
    });

    await step('Icon fallback is named', async () => {
      const icon = canvas.getByRole('img', { name: 'Starred' });
      await expect(icon).toBeInTheDocument();
    });
  },
};
