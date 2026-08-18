import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';
import { ElButton } from './button';

const meta: Meta<ElButton> = {
  title: 'Components/Button',
  component: ElButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'icon'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    iconStart: { control: 'text' },
    iconEnd: { control: 'text' },
    ariaLabel: { control: 'text' },
    loading: { control: 'boolean' },
    loadingLabel: { control: 'text' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
    iconStart: '',
    iconEnd: '',
    ariaLabel: '',
    loading: false,
    loadingLabel: 'Loading',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElButton],
    },
    template: `<el-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [type]="type"
      [iconStart]="iconStart"
      [iconEnd]="iconEnd"
      [ariaLabel]="ariaLabel"
      [loading]="loading"
      [loadingLabel]="loadingLabel"
    >Button</el-button>`,
  }),
};

export default meta;
type Story = StoryObj<ElButton>;

export const Default: Story = {};

export const WithIconStart: Story = {
  args: { iconStart: 'plus' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElButton] },
    template: `<el-button variant="primary" iconStart="plus">Add item</el-button>`,
  }),
};

export const WithIconEnd: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElButton] },
    template: `<el-button variant="secondary" iconEnd="arrow-right">Next</el-button>`,
  }),
};

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

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const IconOnly: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElButton] },
    template: `<el-button
      variant="icon"
      size="md"
      iconStart="ellipsis-vertical"
      ariaLabel="More actions"
    ></el-button>`,
  }),
};

export const Loading: Story = {
  args: {
    loading: true,
    loadingLabel: 'Saving',
  },
};

export const LongLabel: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElButton] },
    template: `<div style="max-width: 16rem;">
      <el-button variant="secondary">
        Save shipping preferences and billing profile changes
      </el-button>
    </div>`,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [ElButton] },
    template: `<div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
      <el-button>Button</el-button>
      <el-button disabled>Disabled</el-button>
      <el-button loading loadingLabel="Saving">Save</el-button>
      <el-button
        variant="icon"
        iconStart="ellipsis-vertical"
        ariaLabel="More actions"
      ></el-button>
    </div>`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const button = canvas.getByRole('button', { name: 'Button' });
    const disabled = canvas.getByRole('button', { name: 'Disabled' });
    const loading = canvas.getByRole('button', { name: 'Saving' });
    const icon = canvas.getByRole('button', { name: 'More actions' });

    const onClick = fn();
    const onDisabledClick = fn();
    const onLoadingClick = fn();
    const onIconClick = fn();
    button.addEventListener('click', onClick);
    disabled.addEventListener('click', onDisabledClick);
    loading.addEventListener('click', onLoadingClick);
    icon.addEventListener('click', onIconClick);

    await step('Pointer: hover and click', async () => {
      await userEvent.hover(button);
      await userEvent.click(button);
      await expect(onClick).toHaveBeenCalledTimes(1);
    });

    await step('Keyboard: Enter and Space', async () => {
      button.focus();
      await expect(button).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect(onClick).toHaveBeenCalledTimes(2);
      await userEvent.keyboard(' ');
      await expect(onClick).toHaveBeenCalledTimes(3);
    });

    await step('Disabled does not activate', async () => {
      await expect(disabled).toBeDisabled();
      await userEvent.click(disabled);
      await expect(onDisabledClick).not.toHaveBeenCalled();
    });

    await step('Loading is busy and does not activate', async () => {
      await expect(loading).toBeDisabled();
      await expect(loading).toHaveAttribute('aria-busy', 'true');
      await userEvent.click(loading);
      await expect(onLoadingClick).not.toHaveBeenCalled();
    });

    await step('Icon-only is named and clickable', async () => {
      await userEvent.hover(icon);
      await userEvent.click(icon);
      await expect(onIconClick).toHaveBeenCalledTimes(1);
    });
  },
};
