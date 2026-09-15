import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ElButton } from '../button/button';
import { ElDrawer } from '../drawer/drawer';
import { ElIcon } from '../icon/icon';
import {
  ElNav,
  ElNavHeading,
  ElNavItem,
  ElNavLabelSlot,
  ElNavLeadingSlot,
} from './navigation';

const NAV_IMPORTS = [
  ElNav,
  ElNavItem,
  ElNavHeading,
  ElNavLeadingSlot,
  ElNavLabelSlot,
  ElIcon,
  ElButton,
  ElDrawer,
];

const meta: Meta<ElNav> = {
  title: 'Components/Navigation',
  component: ElNav,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['rail', 'soft'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    expandMode: {
      control: 'select',
      options: ['multiple', 'single'],
    },
    autoExpand: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
  args: {
    appearance: 'soft',
    size: 'md',
    expandMode: 'multiple',
    autoExpand: true,
    disabled: false,
    ariaLabel: 'Mail',
  },
  parameters: { docs: { codePanel: true } },
  render: (args) => ({
    props: { ...args, active: 'inbox' },
    moduleMetadata: { imports: NAV_IMPORTS },
    template: `
      <el-nav
        [appearance]="appearance"
        [size]="size"
        [expandMode]="expandMode"
        [autoExpand]="autoExpand"
        [disabled]="disabled"
        [ariaLabel]="ariaLabel"
        [value]="active"
        (valueChange)="active = $event"
        style="max-width: 16rem"
      >
        <el-nav-heading>Favorites</el-nav-heading>
        <el-nav-item value="inbox" icon="inbox" label="Inbox">
          <span elNavBadge>24</span>
        </el-nav-item>
        <el-nav-item value="starred" icon="star" label="Starred" />
        <el-nav-heading>Mailboxes</el-nav-heading>
        <el-nav-item value="sent" icon="paper-plane" label="Sent" />
        <el-nav-item value="drafts" icon="file-lines" label="Drafts">
          <span elNavBadge>3</span>
        </el-nav-item>
      </el-nav>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElNav>;

export const Default: Story = {};

export const Soft: Story = {
  args: { appearance: 'soft', ariaLabel: 'Mail, soft' },
};

export const Rail: Story = {
  args: { appearance: 'rail', ariaLabel: 'Documentation' },
  render: () => ({
    props: { active: 'navigation', open: ['components'] },
    moduleMetadata: { imports: NAV_IMPORTS },
    template: `
      <el-nav
        appearance="rail"
        [value]="active"
        (valueChange)="active = $event"
        [expanded]="open"
        (expandedChange)="open = $event"
        ariaLabel="Documentation"
        style="max-width: 16rem"
      >
        <el-nav-heading>Getting started</el-nav-heading>
        <el-nav-item value="intro" label="Introduction" />
        <el-nav-item value="installation" label="Installation" />
        <el-nav-item value="components">
          <el-icon elNavLeading name="cubes" />
          <span elNavLabel>Components</span>
          <el-nav-item value="button" label="Button" />
          <el-nav-item value="input" label="Input" />
          <el-nav-item value="navigation" label="Navigation" />
        </el-nav-item>
      </el-nav>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    moduleMetadata: { imports: NAV_IMPORTS },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start">
        <el-nav appearance="soft" size="sm" value="inbox" ariaLabel="Small" style="max-width: 14rem">
          <el-nav-item value="inbox" icon="inbox" label="Inbox" />
          <el-nav-item value="sent" icon="paper-plane" label="Sent" />
        </el-nav>
        <el-nav appearance="soft" size="md" value="inbox" ariaLabel="Medium" style="max-width: 14rem">
          <el-nav-item value="inbox" icon="inbox" label="Inbox" />
          <el-nav-item value="sent" icon="paper-plane" label="Sent" />
        </el-nav>
        <el-nav appearance="soft" size="lg" value="inbox" ariaLabel="Large" style="max-width: 14rem">
          <el-nav-item value="inbox" icon="inbox" label="Inbox" />
          <el-nav-item value="sent" icon="paper-plane" label="Sent" />
        </el-nav>
      </div>
    `,
  }),
};

export const ItemSlots: Story = {
  render: () => ({
    props: { active: 'inbox' },
    moduleMetadata: { imports: NAV_IMPORTS },
    template: `
      <el-nav
        appearance="soft"
        [value]="active"
        (valueChange)="active = $event"
        ariaLabel="Mail"
        style="max-width: 16rem"
      >
        <el-nav-item value="inbox">
          <el-icon elNavLeading name="inbox" />
          <span elNavLabel>Inbox</span>
          <span elNavBadge>24</span>
          <el-button
            elNavActions
            variant="ghost"
            size="sm"
            iconStart="ellipsis-vertical"
            ariaLabel="Inbox actions"
          />
        </el-nav-item>
        <el-nav-item value="starred" icon="star" label="Starred" />
        <el-nav-item value="sent" icon="paper-plane" label="Sent" />
        <el-nav-item value="drafts" icon="file-lines" label="Drafts">
          <span elNavBadge>3</span>
        </el-nav-item>
      </el-nav>
    `,
  }),
};

export const Badges: Story = {
  render: () => ({
    props: { mail: 'inbox', project: 'observability' },
    moduleMetadata: { imports: NAV_IMPORTS },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start">
        <el-nav
          appearance="soft"
          [value]="mail"
          (valueChange)="mail = $event"
          ariaLabel="Mail"
          style="max-width: 16rem"
        >
          <el-nav-item value="inbox" icon="inbox" label="Inbox">
            <span elNavBadge>24</span>
          </el-nav-item>
          <el-nav-item value="starred" icon="star" label="Starred" />
          <el-nav-item value="drafts" icon="file-lines" label="Drafts">
            <span elNavBadge>3</span>
          </el-nav-item>
        </el-nav>
        <el-nav
          appearance="soft"
          [value]="project"
          (valueChange)="project = $event"
          ariaLabel="Project"
          style="max-width: 16rem"
        >
          <el-nav-item value="overview" icon="house" label="Overview" />
          <el-nav-item value="analytics" icon="chart-line" label="Analytics" />
          <el-nav-item value="observability" icon="bell" label="Observability">
            <span elNavBadge="new">New</span>
          </el-nav-item>
        </el-nav>
      </div>
    `,
  }),
};

@Component({
  selector: 'el-nav-nested-story-host',
  imports: [ElNav, ElNavItem, ElNavHeading, ElIcon, ElNavLeadingSlot, ElNavLabelSlot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-nav
      appearance="soft"
      [(value)]="active"
      [(expanded)]="open"
      ariaLabel="Documentation"
      style="max-width: 16rem"
    >
      <el-nav-heading>Getting started</el-nav-heading>
      <el-nav-item value="intro" label="Introduction" />
      <el-nav-item value="installation" label="Installation" />

      <el-nav-item value="components">
        <el-icon elNavLeading name="cubes" />
        <span elNavLabel>Components</span>
        <el-nav-item value="button" label="Button" />
        <el-nav-item value="input" label="Input" />
        <el-nav-item value="navigation" label="Navigation" />
      </el-nav-item>
    </el-nav>
  `,
})
class NavNestedStoryHost {
  protected readonly active = signal('navigation');
  protected readonly open = signal(['components']);
}

export const Nested: Story = {
  render: () => ({
    moduleMetadata: { imports: [NavNestedStoryHost] },
    template: `<el-nav-nested-story-host />`,
  }),
};

@Component({
  selector: 'el-nav-single-expand-story-host',
  imports: [ElNav, ElNavItem, ElIcon, ElNavLabelSlot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-nav
      appearance="soft"
      expandMode="single"
      [(value)]="active"
      [(expanded)]="open"
      ariaLabel="Settings"
      style="max-width: 16rem"
    >
      <el-nav-item value="account">
        <span elNavLabel>Account</span>
        <el-nav-item value="profile" icon="user" label="Profile" />
        <el-nav-item value="password" label="Password" />
      </el-nav-item>
      <el-nav-item value="organization">
        <span elNavLabel>Organization</span>
        <el-nav-item value="members" label="Members" />
        <el-nav-item value="billing" label="Billing" />
      </el-nav-item>
    </el-nav>
  `,
})
class NavSingleExpandStoryHost {
  protected readonly active = signal('profile');
  protected readonly open = signal(['account']);
}

export const ExpandModeSingle: Story = {
  render: () => ({
    moduleMetadata: { imports: [NavSingleExpandStoryHost] },
    template: `<el-nav-single-expand-story-host />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: { active: 'overview' },
    moduleMetadata: { imports: NAV_IMPORTS },
    template: `
      <el-nav
        appearance="soft"
        [value]="active"
        (valueChange)="active = $event"
        ariaLabel="Account"
        style="max-width: 16rem"
      >
        <el-nav-item value="overview" icon="house" label="Overview" />
        <el-nav-item value="billing" icon="file-lines" label="Billing" disabled />
      </el-nav>
    `,
  }),
};

export const LongContent: Story = {
  render: () => ({
    props: { active: 'long' },
    moduleMetadata: { imports: NAV_IMPORTS },
    template: `
      <el-nav
        appearance="soft"
        [value]="active"
        (valueChange)="active = $event"
        ariaLabel="Long labels"
        style="max-width: 14rem"
      >
        <el-nav-item
          value="long"
          label="Quarterly planning notes for the North American regional strategy review"
          sublabel="Updated yesterday with stakeholder feedback and revised milestones"
        >
          <span elNavBadge>3</span>
          <el-button
            elNavActions
            variant="ghost"
            size="sm"
            iconStart="ellipsis-vertical"
            ariaLabel="More actions"
          />
        </el-nav-item>
      </el-nav>
    `,
  }),
};

export const InDrawer: Story = {
  render: () => ({
    props: { open: true, active: 'inbox' },
    moduleMetadata: { imports: NAV_IMPORTS },
    template: `
      <el-drawer [(open)]="open" ariaLabel="Navigation drawer" side="left">
        <el-nav
          appearance="soft"
          [value]="active"
          (valueChange)="active = $event"
          ariaLabel="Mail"
        >
          <el-nav-item value="inbox" icon="inbox" label="Inbox" />
          <el-nav-item value="sent" icon="paper-plane" label="Sent" />
        </el-nav>
      </el-drawer>
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  parameters: { docs: { codePanel: true } },
  render: () => ({
    props: { active: 'button', open: ['components', 'docs'] },
    moduleMetadata: { imports: NAV_IMPORTS },
    template: `
      <el-nav
        appearance="soft"
        [value]="active"
        (valueChange)="active = $event"
        [expanded]="open"
        (expandedChange)="open = $event"
        ariaLabel="Docs"
        style="max-width: 18rem"
      >
        <el-nav-item value="intro" href="#intro" label="Introduction" />
        <el-nav-item value="components">
          <span elNavLabel>Components</span>
          <el-nav-item value="button" href="#button" label="Button" />
        </el-nav-item>
        <el-nav-item value="docs" href="#docs">
          <span elNavLabel>Docs</span>
          <el-nav-item value="theming" href="#theming" label="Theming" />
        </el-nav-item>
        <el-nav-item value="inbox" href="#inbox">
          <span elNavLabel>Inbox</span>
          <el-button
            elNavActions
            variant="ghost"
            size="sm"
            iconStart="ellipsis-vertical"
            ariaLabel="Inbox actions"
            data-testid="inbox-actions"
          />
        </el-nav-item>
        <el-nav-item value="locked" href="#locked" label="Locked" disabled />
      </el-nav>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const intro = canvas.getByRole('link', { name: 'Introduction' });
    const button = canvas.getByRole('link', { name: 'Button' });
    const components = canvas.getByRole('button', { name: /Components/i });
    const docsLink = canvas.getByRole('link', { name: 'Docs' });
    const docsToggle = canvas.getByRole('button', { name: /Docs/i });
    const locked = canvas.getByRole('link', { name: 'Locked' });
    const actions = canvas.getByRole('button', { name: 'Inbox actions' });

    await step('Pointer: activates leaf link', async () => {
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-current', 'page');
    });

    await step('Pointer: parent disclosure toggles and stays collapsed', async () => {
      await userEvent.click(components);
      await expect(components).toHaveAttribute('aria-expanded', 'false');
      await expect(button).toHaveAttribute('aria-current', 'page');
    });

    await step('Keyboard: Enter toggles disclosure parent', async () => {
      components.focus();
      await userEvent.keyboard('{Enter}');
      await expect(components).toHaveAttribute('aria-expanded', 'true');
    });

    await step('Keyboard: href parent chevron toggles without activating the link', async () => {
      docsToggle.focus();
      await userEvent.keyboard('{Enter}');
      await expect(docsToggle).toHaveAttribute('aria-expanded', 'false');
      await expect(docsLink).not.toHaveAttribute('aria-current', 'page');
    });

    await step('Actions click does not activate item', async () => {
      await userEvent.click(actions);
      await expect(canvas.getByRole('link', { name: 'Inbox' })).not.toHaveAttribute(
        'aria-current',
        'page',
      );
    });

    await step('Disabled item stays inactive', async () => {
      await expect(locked).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(locked);
      await expect(locked).not.toHaveAttribute('aria-current', 'page');
    });

    await step('Focus returns to intro link', async () => {
      intro.focus();
      await expect(intro).toHaveFocus();
    });
  },
};
