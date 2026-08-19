import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElAvatar } from '../avatar/avatar';
import { ElButton } from '../button/button';
import { ElGrid } from '../grid/grid';
import { ElCard } from './card';

const meta: Meta<ElCard> = {
  title: 'Components/Card',
  component: ElCard,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['outlined', 'elevated'],
    },
    size: {
      control: 'select',
      options: ['default', 'compact'],
    },
  },
  args: {
    appearance: 'outlined',
    size: 'default',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElCard, ElButton],
    },
    template: `
      <el-card [appearance]="appearance" [size]="size" style="max-width: 22rem">
        <div elCardHeader>Card title</div>
        <div elCardContent>
          Slot-based body content. Put whatever you need here.
        </div>
        <div elCardFooter>
          <el-button size="sm">Save</el-button>
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
      <el-card style="max-width: 22rem; max-height: 22rem">
        <img
          elCardMedia
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&q=80"
          alt=""
        />
        <div elCardHeader>Trail overlook</div>
        <div elCardContent>
          Media sits flush at the top of the card.
        </div>
      </el-card>
    `,
  }),
};

export const SlotRegions: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCard, ElGrid] },
    template: `
      <el-grid [columns]="3" gap="4">
        <el-card>
          <div elCardHeader>Header only</div>
        </el-card>
        <el-card>
          <div elCardContent>Content only</div>
        </el-card>
        <el-card>
          <div elCardFooter>Footer only</div>
        </el-card>
      </el-grid>
    `,
  }),
};

export const InGrid: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCard, ElButton, ElGrid] },
    template: `
      <el-grid [columns]="3" gap="4">
        <el-card>
          <div elCardHeader>Short</div>
          <div elCardContent>One line.</div>
          <div elCardFooter>
            <el-button size="sm" variant="secondary">Open</el-button>
          </div>
        </el-card>
        <el-card>
          <div elCardHeader>A much longer title that wraps inside the header</div>
          <div elCardContent>
            Longer body copy so the card grows. Footers stay at the bottom of the
            row because the card fills the grid cell.
          </div>
          <div elCardFooter>
            <el-button size="sm" variant="secondary">Open</el-button>
          </div>
        </el-card>
        <el-card>
          <div elCardHeader>Medium</div>
          <div elCardContent>
            A couple of sentences of content, still shorter than the middle card.
          </div>
          <div elCardFooter>
            <el-button size="sm" variant="secondary">Open</el-button>
          </div>
        </el-card>
      </el-grid>
    `,
  }),
};

export const WithLink: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCard] },
    template: `
      <el-card style="max-width: 22rem">
        <div elCardHeader>Release notes</div>
        <div elCardContent>
          See the
          <a href="https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/">APG landmarks</a>
          guidance for grouping content. Put the link in the card — do not make
          the card itself a control.
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
            <div style="font-size: 0.875rem; color: var(--el-color-on-surface-variant)">
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