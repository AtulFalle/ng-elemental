import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ElAvatar } from '../avatar/avatar';
import { ElButton } from '../button/button';
import { ElChip } from '../chip/chip';
import { ElIcon } from '../icon/icon';
import { ElList, ElListItemDef } from './list';
import { ElListItem } from './list-item';

const LIST_IMPORTS = [
  ElList,
  ElListItem,
  ElAvatar,
  ElButton,
  ElChip,
  ElIcon,
];

const meta: Meta<ElList> = {
  title: 'Components/List',
  component: ElList,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['outlined', 'plain'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    divided: { control: 'boolean' },
  },
  args: {
    appearance: 'outlined',
    size: 'md',
    divided: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: LIST_IMPORTS },
    template: `
      <el-list
        [appearance]="appearance"
        [size]="size"
        [divided]="divided"
        ariaLabel="Inbox"
        style="max-width: 24rem"
      >
        <el-list-item>
          <el-avatar elListLeading initials="AL" alt="Ada Lovelace" />
          <span elListTitle>Ada Lovelace</span>
          <span elListDescription>Notes on the Analytical Engine</span>
          <span elListTrailing>09:12</span>
        </el-list-item>
        <el-list-item>
          <el-avatar elListLeading initials="GT" alt="Grace Hopper" />
          <span elListTitle>Grace Hopper</span>
          <span elListDescription>Compiler progress update</span>
          <span elListTrailing>Yesterday</span>
        </el-list-item>
        <el-list-item>
          <el-icon elListLeading name="file-lines" />
          <span elListTitle>Quarterly report</span>
          <span elListDescription>PDF · 2.4 MB</span>
          <el-chip elListTrailing>Review</el-chip>
        </el-list-item>
      </el-list>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElList>;

export const Default: Story = {};

export const PlainText: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElList, ElListItem] },
    template: `
      <el-list ariaLabel="Simple rows" style="max-width: 20rem">
        <el-list-item>Inbox</el-list-item>
        <el-list-item>Starred</el-list-item>
        <el-list-item>Sent</el-list-item>
        <el-list-item disabled>Archive (unavailable)</el-list-item>
      </el-list>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { sizes: ['lg', 'md', 'sm'] as const },
    moduleMetadata: { imports: LIST_IMPORTS },
    template: `
      <div style="display: grid; gap: 1rem; max-width: 24rem">
        @for (size of sizes; track size) {
          <el-list [size]="size" [ariaLabel]="size + ' list'">
            <el-list-item>
              <el-icon elListLeading name="inbox" />
              <span elListTitle>{{ size }} density</span>
              <span elListDescription>Title, description, trailing meta</span>
              <span elListTrailing>2</span>
            </el-list-item>
          </el-list>
        }
      </div>
    `,
  }),
};

@Component({
  selector: 'el-list-interactive-story-host',
  imports: [ElList, ElListItem, ElAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-list ariaLabel="People" style="max-width: 24rem">
      @for (person of people; track person.id) {
        <el-list-item
          interactive
          [selected]="person.id === selectedId()"
          (activated)="selectedId.set(person.id)"
        >
          <el-avatar elListLeading [initials]="person.initials" [alt]="person.name" />
          <span elListTitle>{{ person.name }}</span>
          <span elListDescription>{{ person.role }}</span>
        </el-list-item>
      }
    </el-list>
  `,
})
class ListInteractiveStoryHost {
  protected readonly selectedId = signal('ada');
  protected readonly people = [
    { id: 'ada', name: 'Ada Lovelace', initials: 'AL', role: 'Mathematician' },
    { id: 'grace', name: 'Grace Hopper', initials: 'GH', role: 'Rear Admiral' },
    { id: 'alan', name: 'Alan Turing', initials: 'AT', role: 'Computer scientist' },
  ];
}

export const Interactive: Story = {
  render: () => ({
    moduleMetadata: { imports: [ListInteractiveStoryHost] },
    template: `<el-list-interactive-story-host />`,
  }),
};

export const WithActions: Story = {
  render: () => ({
    moduleMetadata: { imports: LIST_IMPORTS },
    template: `
      <el-list ariaLabel="Files" style="max-width: 28rem">
        <el-list-item>
          <el-icon elListLeading name="file-lines" />
          <span elListTitle>report.pdf</span>
          <span elListDescription>2.4 MB</span>
          <el-button
            elListTrailing
            variant="ghost"
            size="sm"
            iconStart="xmark"
            aria-label="Remove report.pdf"
          />
        </el-list-item>
        <el-list-item>
          <el-icon elListLeading name="image" />
          <span elListTitle>cover.png</span>
          <span elListDescription>840 KB</span>
          <el-button
            elListTrailing
            variant="ghost"
            size="sm"
            iconStart="xmark"
            aria-label="Remove cover.png"
          />
        </el-list-item>
      </el-list>
    `,
  }),
};

@Component({
  selector: 'el-list-virtual-story-host',
  imports: [ElList, ElListItem, ElListItemDef, ElAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-list
      virtual
      [items]="people"
      track="id"
      [itemHeight]="56"
      ariaLabel="Virtual people"
      style="max-height: 16rem; max-width: 24rem"
    >
      <ng-template elListItemDef let-person>
        <el-list-item interactive>
          <el-avatar elListLeading [initials]="person.initials" [alt]="person.name" />
          <span elListTitle>{{ person.name }}</span>
          <span elListDescription>{{ person.role }}</span>
        </el-list-item>
      </ng-template>
    </el-list>
  `,
})
class ListVirtualStoryHost {
  protected readonly people = Array.from({ length: 1000 }, (_, i) => ({
    id: String(i + 1),
    name: `Person ${i + 1}`,
    initials: `P${(i % 99) + 1}`,
    role: i % 2 === 0 ? 'Engineer' : 'Designer',
  }));
}

export const Virtual: Story = {
  render: () => ({
    moduleMetadata: { imports: [ListVirtualStoryHost] },
    template: `<el-list-virtual-story-host />`,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [ListInteractiveStoryHost, ElList, ElListItem] },
    template: `
      <div style="display:grid;gap:1.5rem;max-width:24rem">
        <el-list-interactive-story-host />
        <el-list ariaLabel="Native list semantics">
          <el-list-item>Inbox</el-list-item>
          <el-list-item>Starred</el-list-item>
        </el-list>
      </div>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const list = canvas.getByRole('list', { name: 'People' });
    const nativeList = canvas.getByRole('list', { name: 'Native list semantics' });
    const grace = canvas.getByRole('listitem', { name: /Grace Hopper/i });

    await step('List uses native ul/li semantics', async () => {
      await expect(list.tagName).toBe('UL');
      await expect(nativeList.querySelectorAll('li').length).toBe(2);
    });

    await step('Interactive item activates with Enter', async () => {
      grace.focus();
      await userEvent.keyboard('{Enter}');
      await expect(grace).toHaveAttribute('aria-current', 'true');
    });
  },
};
