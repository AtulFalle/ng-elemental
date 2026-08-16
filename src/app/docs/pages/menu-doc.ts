import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElMenu,
  ElMenuItem,
  ElMenuLabel,
  ElMenuPanel,
  ElMenuSeparator,
  ElMenuTrigger,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-menu-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElMenuLabel,
    ElMenuPanel,
    ElMenuSeparator,
    ElMenuTrigger,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './menu-doc.html',
  styleUrl: './page.scss',
})
export class MenuDocPage {
  protected readonly bold = signal(true);
  protected readonly italic = signal(false);
  protected readonly align = signal('start');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add menu`;

  protected readonly importCode = `import {
  ElMenu,
  ElMenuPanel,
  ElMenuItem,
  ElMenuTrigger,
} from './ui/menu/menu';
import { ElButton } from './ui/button/button';

@Component({
  imports: [ElMenu, ElMenuPanel, ElMenuItem, ElMenuTrigger, ElButton],
  template: \`
    <el-menu>
      <el-button elMenuTrigger>Actions</el-button>
      <el-menu-panel>
        <el-menu-item>Cut</el-menu-item>
      </el-menu-panel>
    </el-menu>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-menu ariaLabel="Actions">
  <el-button elMenuTrigger variant="secondary">Actions</el-button>
  <el-menu-panel>
    <el-menu-item icon="scissors">Cut</el-menu-item>
    <el-menu>
      <el-menu-item elMenuTrigger>Share</el-menu-item>
      <el-menu-panel>
        <el-menu-item>Email</el-menu-item>
      </el-menu-panel>
    </el-menu>
  </el-menu-panel>
</el-menu>`;

  protected readonly scopedTokensCode = `.editor-chrome {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly menuProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description: 'Open state. Standalone menus write this model; menubar owns it instead.',
    },
    {
      name: 'trigger',
      type: "'click' | 'contextmenu'",
      default: "'click'",
      description: 'Click to toggle, or open from a right-click at the pointer.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Blocks opening.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Accessible name for the menu panel.',
    },
  ];

  protected readonly itemProps: PropDefinition[] = [
    {
      name: 'type',
      type: "'item' | 'checkbox' | 'radio'",
      default: "'item'",
      description: 'Command, checkbox, or radio. Checked state stays parent-owned.',
    },
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Parent-owned check for checkbox and radio items.',
    },
    {
      name: 'icon',
      type: 'string',
      default: "''",
      description: 'Font Awesome name for a leading icon (requires icon).',
    },
    {
      name: 'shortcut',
      type: 'string',
      default: "''",
      description: 'Displayed shortcut hint only. Does not register a hotkey.',
    },
    {
      name: 'variant',
      type: "'default' | 'danger'",
      default: "'default'",
      description: 'Danger paints the row with error color.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Dims the row and blocks activation.',
    },
  ];

  protected readonly itemOutputs: PropDefinition[] = [
    {
      name: 'selected',
      type: 'void',
      default: '—',
      description: 'Fires on activate. The item does not toggle checked itself.',
    },
  ];
}
