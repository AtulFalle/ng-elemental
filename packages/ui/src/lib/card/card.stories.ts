import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElAspectRatio } from '../aspect-ratio/aspect-ratio';
import { ElAvatar } from '../avatar/avatar';
import { ElButton } from '../button/button';
import { ElGrid } from '../grid/grid';
import { ElIcon } from '../icon/icon';
import { ElSlideToggle } from '../slide-toggle/slide-toggle';
import { ElStack } from '../stack/stack';
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
      imports: [ElCard, ElButton, ElAspectRatio],
    },
    template: `
      <el-card [appearance]="appearance" [size]="size" style="max-width: 22rem">
        <el-aspect-ratio elCardMedia ratio="16/9">
          <img
            style="width: 100%; height: 100%; object-fit: cover"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&q=80"
            alt=""
          />
        </el-aspect-ratio>
        <div elCardHeader>
          <div elCardTitle>Trail overlook pack</div>
          <div elCardDescription>
            Daypack with weather shell for weekend hikes.
          </div>
        </div>
        <div elCardContent>$128</div>
        <div elCardFooter>
          <el-button size="sm" variant="secondary">View</el-button>
          <el-button size="sm">Add to cart</el-button>
        </div>
      </el-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElCard>;

export const Product: Story = {};

export const Elevated: Story = {
  args: { appearance: 'elevated' },
};

export const Stats: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCard, ElGrid] },
    template: `
      <el-grid minItemWidth="12rem" gap="4">
        <el-card>
          <div elCardHeader>
            <div elCardTitle>Revenue</div>
            <div elCardDescription>Last 30 days</div>
          </div>
          <div elCardContent>
            <div class="el-text-h3">$48.2k</div>
            <div class="el-text-muted">+12.4% vs prior</div>
          </div>
        </el-card>
        <el-card>
          <div elCardHeader>
            <div elCardTitle>Active users</div>
            <div elCardDescription>Last 30 days</div>
          </div>
          <div elCardContent>
            <div class="el-text-h3">3,842</div>
            <div class="el-text-muted">+8.1% vs prior</div>
          </div>
        </el-card>
        <el-card>
          <div elCardHeader>
            <div elCardTitle>Churn</div>
            <div elCardDescription>Last 30 days</div>
          </div>
          <div elCardContent>
            <div class="el-text-h3">1.8%</div>
            <div class="el-text-muted">−0.3 pts vs prior</div>
          </div>
        </el-card>
      </el-grid>
    `,
  }),
};

export const Profile: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCard, ElAvatar, ElButton, ElStack] },
    template: `
      <el-card appearance="elevated" style="max-width: 22rem">
        <div elCardHeader>
          <el-stack direction="row" gap="3" align="center">
            <el-avatar initials="AL" alt="" />
            <el-stack gap="2" style="min-width: 0">
              <div elCardTitle>Ada Lovelace</div>
              <div elCardDescription>Mathematician · London</div>
            </el-stack>
          </el-stack>
        </div>
        <div elCardContent>
          Working on analytical engines and early computing notes.
        </div>
        <div elCardFooter>
          <el-button size="sm" variant="secondary">Message</el-button>
          <el-button size="sm">Follow</el-button>
        </div>
      </el-card>
    `,
  }),
};

export const Settings: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCard, ElButton, ElSlideToggle, ElStack] },
    template: `
      <el-card style="max-width: 28rem">
        <div elCardHeader>
          <div elCardTitle>Email preferences</div>
          <div elCardDescription>
            Choose which product emails you want to receive.
          </div>
        </div>
        <div elCardContent>
          <el-stack gap="4">
            <el-slide-toggle [checked]="true" inputId="story-marketing">
              Marketing emails
            </el-slide-toggle>
            <el-slide-toggle [checked]="false" inputId="story-updates">
              Product updates
            </el-slide-toggle>
          </el-stack>
        </div>
        <div elCardFooter>
          <el-button size="sm" variant="secondary">Cancel</el-button>
          <el-button size="sm">Save</el-button>
        </div>
      </el-card>
    `,
  }),
};

export const Compact: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCard, ElButton, ElIcon] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 28rem">
        <el-card size="compact">
          <el-icon elCardMedia name="file-lines" />
          <div elCardHeader>report.pdf</div>
          <div elCardContent>2.4 MB</div>
          <div elCardFooter>
            <el-button
              variant="ghost"
              size="sm"
              iconStart="xmark"
              ariaLabel="Remove report.pdf"
            />
          </div>
        </el-card>
        <el-card size="compact">
          <el-icon elCardMedia name="image" />
          <div elCardHeader>
            quarterly-financial-summary-final-v12.png
          </div>
          <div elCardContent>840 KB</div>
          <div elCardFooter>
            <el-button size="sm" variant="ghost">Replace</el-button>
            <el-button
              variant="ghost"
              size="sm"
              iconStart="xmark"
              ariaLabel="Remove quarterly-financial-summary-final-v12.png"
            />
          </div>
        </el-card>
      </div>
    `,
  }),
};
