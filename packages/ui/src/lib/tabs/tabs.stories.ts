import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElIcon } from '../icon/icon';
import { ElTab } from './tab';
import { ElTabContent } from './tab-content';
import { ElTabLabel } from './tab-label';
import { ElTabs } from './tabs';
import { TabsStoryHost } from '../../stories/tabs.story-host';

const meta: Meta<TabsStoryHost> = {
  title: 'Components/Tabs',
  component: TabsStoryHost,
  argTypes: {
    disabled: { control: 'boolean' },
    disableBilling: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
  args: {
    disabled: false,
    disableBilling: false,
    ariaLabel: 'Account',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [TabsStoryHost],
    },
    template: `
      <el-tabs-story-host
        [disabled]="disabled"
        [disableBilling]="disableBilling"
        [ariaLabel]="ariaLabel"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<TabsStoryHost>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithDisabledTab: Story = {
  args: { disableBilling: true },
};

export const CustomLabels: Story = {
  render: () => ({
    props: { selected: 'profile' },
    moduleMetadata: {
      imports: [ElTabs, ElTab, ElTabContent, ElTabLabel, ElIcon],
    },
    template: `
      <el-tabs
        [value]="selected"
        (valueChange)="selected = $event"
        ariaLabel="Settings"
      >
        <el-tab value="profile">
          <ng-template elTabLabel>
            <el-icon name="user" size="sm" />
            Profile
          </ng-template>
          <ng-template elTabContent>
            <p>Name, email, and avatar settings.</p>
          </ng-template>
        </el-tab>
        <el-tab value="security">
          <ng-template elTabLabel>
            <el-icon name="shield-halved" size="sm" />
            Security
          </ng-template>
          <ng-template elTabContent>
            <p>Password, sessions, and two-factor authentication.</p>
          </ng-template>
        </el-tab>
      </el-tabs>
    `,
  }),
};

export const Overflow: Story = {
  render: () => ({
    props: { selected: 'one' },
    moduleMetadata: {
      imports: [ElTabs, ElTab, ElTabContent, ElTabLabel, ElIcon],
    },
    template: `
      <div style="max-width: 16rem">
        <el-tabs
          [value]="selected"
          (valueChange)="selected = $event"
          ariaLabel="Many sections"
        >
          <el-tab value="one">
            <ng-template elTabLabel>
              <el-icon name="house" size="sm" />
              Overview
            </ng-template>
            <ng-template elTabContent><p>One</p></ng-template>
          </el-tab>
          <el-tab value="two">
            <ng-template elTabLabel>
              <el-icon name="chart-line" size="sm" />
              Usage
            </ng-template>
            <ng-template elTabContent><p>Two</p></ng-template>
          </el-tab>
          <el-tab value="three">
            <ng-template elTabLabel>
              <el-icon name="users" size="sm" />
              Members
            </ng-template>
            <ng-template elTabContent><p>Three</p></ng-template>
          </el-tab>
          <el-tab value="four">
            <ng-template elTabLabel>
              <el-icon name="puzzle-piece" size="sm" />
              Integrations
            </ng-template>
            <ng-template elTabContent><p>Four</p></ng-template>
          </el-tab>
          <el-tab value="five">
            <ng-template elTabLabel>
              <el-icon name="file-invoice" size="sm" />
              Billing history
            </ng-template>
            <ng-template elTabContent><p>Five</p></ng-template>
          </el-tab>
          <el-tab value="six">
            <ng-template elTabLabel>
              <el-icon name="clipboard-list" size="sm" />
              Audit log
            </ng-template>
            <ng-template elTabContent><p>Six</p></ng-template>
          </el-tab>
        </el-tabs>
      </div>
    `,
  }),
};
