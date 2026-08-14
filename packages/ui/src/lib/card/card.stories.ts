import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElAvatar } from '../avatar/avatar';
import { ElButton } from '../button/button';
import { ElCard } from './card';

const meta: Meta<ElCard> = {
  title: 'Components/Card',
  component: ElCard,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['outlined', 'elevated'],
    },
  },
  args: {
    appearance: 'outlined',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElCard],
    },
    template: `
      <el-card [appearance]="appearance" style="max-width: 22rem">
        <div elCardHeader>
          <strong>Card title</strong>
        </div>
        <div elCardContent>
          Slot-based body content. Put whatever you need here.
        </div>
        <div elCardFooter>
          <span style="font-size: 0.875rem; color: var(--el-color-fg-muted)">Footer</span>
        </div>
      </el-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElCard>;

export const Outlined: Story = {};

export const Elevated: Story = {
  args: { appearance: 'elevated' },
};

export const WithMedia: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCard] },
    template: `
      <el-card style="max-width: 22rem">
        <img
          elCardMedia
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&q=80"
          alt=""
          style="width: 100%; display: block"
        />
        <div elCardHeader>
          <strong>Trail overlook</strong>
        </div>
        <div elCardContent>
          Media sits flush at the top of the card.
        </div>
      </el-card>
    `,
  }),
};

export const WithAvatar: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCard, ElAvatar, ElButton] },
    template: `
      <el-card appearance="elevated" style="max-width: 22rem">
        <div
          elCardHeader
          style="display: flex; align-items: center; gap: 0.75rem"
        >
          <el-avatar initials="AL" alt="Ada Lovelace" />
          <div>
            <div style="font-weight: 600">Ada Lovelace</div>
            <div style="font-size: 0.875rem; color: var(--el-color-fg-muted)">
              Mathematician
            </div>
          </div>
        </div>
        <div elCardContent>
          Compose avatar inside the header slot when you need a people card.
        </div>
        <div elCardFooter>
          <el-button size="sm" variant="secondary">Follow</el-button>
        </div>
      </el-card>
    `,
  }),
};
