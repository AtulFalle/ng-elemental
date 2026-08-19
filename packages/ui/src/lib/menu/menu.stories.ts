import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ElButton } from '../button/button';
import {
  ElMenu,
  ElMenuItem,
  ElMenuLabel,
  ElMenuPanel,
  ElMenuSeparator,
  ElMenuTrigger,
} from './menu';

const MENU_IMPORTS = [
  ElMenu,
  ElMenuItem,
  ElMenuLabel,
  ElMenuPanel,
  ElMenuSeparator,
  ElMenuTrigger,
  ElButton,
];

const meta: Meta<ElMenu> = {
  title: 'Components/Menu',
  component: ElMenu,
  render: () => ({
    moduleMetadata: { imports: MENU_IMPORTS },
    template: `
      <div style="min-height: 16rem">
        <el-menu ariaLabel="Actions">
          <el-button elMenuTrigger variant="secondary">Actions</el-button>
          <el-menu-panel>
            <el-menu-item icon="scissors" shortcut="Ctrl+X">Cut</el-menu-item>
            <el-menu-item icon="copy" shortcut="Ctrl+C">Copy</el-menu-item>
            <el-menu-item icon="clipboard" shortcut="Ctrl+V">Paste</el-menu-item>
            <el-menu-separator />
            <el-menu-item variant="danger" icon="trash">Delete</el-menu-item>
          </el-menu-panel>
        </el-menu>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElMenu>;

export const Default: Story = {};

export const Nested: Story = {
  render: () => ({
    moduleMetadata: { imports: MENU_IMPORTS },
    template: `
      <div style="min-height: 16rem">
        <el-menu ariaLabel="File">
          <el-button elMenuTrigger variant="secondary">File</el-button>
          <el-menu-panel>
            <el-menu-item icon="file">New</el-menu-item>
            <el-menu-item icon="folder-open">Open</el-menu-item>
            <el-menu>
              <el-menu-item elMenuTrigger>Share</el-menu-item>
              <el-menu-panel>
                <el-menu-item icon="envelope">Email</el-menu-item>
                <el-menu-item icon="link">Copy link</el-menu-item>
              </el-menu-panel>
            </el-menu>
            <el-menu-separator />
            <el-menu-item disabled>Print</el-menu-item>
          </el-menu-panel>
        </el-menu>
      </div>
    `,
  }),
};

@Component({
  selector: 'el-menu-checks-story-host',
  imports: MENU_IMPORTS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="min-height: 16rem">
      <el-menu ariaLabel="View">
        <el-button elMenuTrigger variant="secondary">View</el-button>
        <el-menu-panel>
          <el-menu-label>Style</el-menu-label>
          <el-menu-item
            type="checkbox"
            [checked]="bold()"
            (selected)="bold.set(!bold())"
          >
            Bold
          </el-menu-item>
          <el-menu-item
            type="checkbox"
            [checked]="italic()"
            (selected)="italic.set(!italic())"
          >
            Italic
          </el-menu-item>
          <el-menu-separator />
          <el-menu-label>Align</el-menu-label>
          <el-menu-item
            type="radio"
            [checked]="align() === 'start'"
            (selected)="align.set('start')"
          >
            Start
          </el-menu-item>
          <el-menu-item
            type="radio"
            [checked]="align() === 'center'"
            (selected)="align.set('center')"
          >
            Center
          </el-menu-item>
          <el-menu-item
            type="radio"
            [checked]="align() === 'end'"
            (selected)="align.set('end')"
          >
            End
          </el-menu-item>
        </el-menu-panel>
      </el-menu>
    </div>
  `,
})
class MenuChecksStoryHost {
  protected readonly bold = signal(true);
  protected readonly italic = signal(false);
  protected readonly align = signal('start');
}

export const CheckboxAndRadio: Story = {
  render: () => ({
    moduleMetadata: { imports: [MenuChecksStoryHost] },
    template: `<el-menu-checks-story-host />`,
  }),
};

export const ContextMenu: Story = {
  render: () => ({
    moduleMetadata: { imports: MENU_IMPORTS },
    template: `
      <el-menu trigger="contextmenu" ariaLabel="Canvas">
        <div
          elMenuTrigger
          style="display:flex;align-items:center;justify-content:center;min-height:12rem;width:100%;max-width:24rem;border:var(--el-border-width) dashed var(--el-color-outline);border-radius:var(--el-radius-md);color:var(--el-color-on-surface-variant)"
        >
          Right-click or Shift+F10
        </div>
        <el-menu-panel>
          <el-menu-item icon="scissors">Cut</el-menu-item>
          <el-menu-item icon="copy">Copy</el-menu-item>
          <el-menu-separator />
          <el-menu-item variant="danger">Delete</el-menu-item>
        </el-menu-panel>
      </el-menu>
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: MENU_IMPORTS },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:2rem;min-height:16rem">
        <el-menu ariaLabel="Actions">
          <el-button elMenuTrigger variant="secondary">Actions</el-button>
          <el-menu-panel>
            <el-menu-item icon="copy">Copy</el-menu-item>
            <el-menu-item icon="clipboard">Paste</el-menu-item>
            <el-menu-item variant="danger" icon="trash" disabled>Delete</el-menu-item>
          </el-menu-panel>
        </el-menu>
        <el-menu trigger="contextmenu" ariaLabel="Canvas">
          <div
            elMenuTrigger
            tabindex="0"
            style="display:flex;align-items:center;justify-content:center;min-height:8rem;width:12rem;border:var(--el-border-width) dashed var(--el-color-outline);border-radius:var(--el-radius-md)"
          >
            Context area
          </div>
          <el-menu-panel>
            <el-menu-item icon="scissors">Cut</el-menu-item>
            <el-menu-item icon="copy">Copy</el-menu-item>
          </el-menu-panel>
        </el-menu>
      </div>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole('button', { name: 'Actions' });
    const contextArea = canvas.getByText('Context area');

    await step('Pointer: opens menu from trigger', async () => {
      await userEvent.click(trigger);
      await expect(canvas.getByRole('menu')).toBeVisible();
      await expect(canvas.getByRole('menuitem', { name: 'Copy' })).toBeVisible();
      await userEvent.keyboard('{Escape}');
    });

    await step('Keyboard: ArrowDown opens and focuses first item', async () => {
      trigger.focus();
      await userEvent.keyboard('{ArrowDown}');
      await expect(canvas.getByRole('menu')).toBeVisible();
      await expect(canvas.getByRole('menuitem', { name: 'Copy' })).toHaveFocus();
      await userEvent.keyboard('{Escape}');
    });

    await step('Context menu: Shift+F10 opens at focus', async () => {
      contextArea.focus();
      await userEvent.keyboard('{Shift>}{F10}{/Shift}');
      await expect(canvas.getByRole('menu')).toBeVisible();
      await userEvent.keyboard('{Escape}');
    });
  },
};
