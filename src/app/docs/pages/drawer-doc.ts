import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  EL_DRAWER_DATA,
  ElButton,
  ElDrawer,
  ElDrawerClose,
  ElDrawerRef,
  ElDrawerService,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

interface WorkspaceDrawerData {
  workspace: string;
}

@Component({
  selector: 'app-workspace-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElButton, ElDrawerClose],
  template: `
    <p>{{ data.workspace }} settings.</p>
    <div
      style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem"
    >
      <el-button elDrawerClose variant="ghost">Cancel</el-button>
      <el-button (click)="drawerRef.close(true)">Save</el-button>
    </div>
  `,
})
export class WorkspaceDrawer {
  readonly data = inject<WorkspaceDrawerData>(EL_DRAWER_DATA);
  readonly drawerRef = inject(ElDrawerRef);
}

@Component({
  selector: 'app-drawer-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElDrawer,
    ElDrawerClose,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './drawer-doc.html',
  styleUrl: './page.scss',
})
export class DrawerDocPage {
  private readonly drawer = inject(ElDrawerService);

  protected readonly open = signal(false);
  protected readonly rightOpen = signal(false);
  protected readonly serviceResult = signal<string | null>(null);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add drawer`;

  protected readonly importCode = `import { ElDrawer, ElDrawerClose } from './ui/drawer/drawer';
import { ElButton } from './ui/button/button';

@Component({
  imports: [ElDrawer, ElDrawerClose, ElButton],
  template: \`
    <el-button (click)="open.set(true)">Menu</el-button>
    <el-drawer [(open)]="open" title="Navigation" side="left">
      <div elDrawerContent>Nav links</div>
      <div elDrawerFooter>
        <el-button elDrawerClose variant="ghost">Close</el-button>
      </div>
    </el-drawer>
  \`,
})
export class MyComponent {
  protected open = false;
}`;

  protected readonly usageCode = `<el-drawer [(open)]="open" title="Navigation" side="left" size="md">
  <div elDrawerContent>Any HTML or components.</div>
  <div elDrawerFooter>
    <el-button elDrawerClose variant="ghost">Close</el-button>
  </div>
</el-drawer>`;

  protected readonly serviceCode = `import { ElDrawerService, ElDrawerRef, EL_DRAWER_DATA } from './ui/drawer/drawer.service';

const ref = this.drawer.open(WorkspaceDrawer, {
  data: { workspace: 'Acme' },
  title: 'Workspace',
  side: 'left',
  size: 'sm',
});
const saved = await ref.afterClosed;`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly drawerProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description: 'Open state. Bind [(open)] to control it.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description:
        'Header text when elDrawerHeader is omitted. Sets aria-labelledby.',
    },
    {
      name: 'side',
      type: "'left' | 'right'",
      default: "'left'",
      description: 'Edge the panel attaches to.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Panel width. Height is always the viewport.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: 'Shows a close button in the header.',
    },
    {
      name: 'closeOnBackdrop',
      type: 'boolean',
      default: 'true',
      description: 'Dismiss when the backdrop is clicked.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Dismiss on Escape.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible name when there is no title.',
    },
  ];

  protected readonly serviceProps: PropDefinition[] = [
    {
      name: 'data',
      type: 'unknown',
      default: 'undefined',
      description: 'Injected as EL_DRAWER_DATA in the opened component.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Shell title for service-opened drawers.',
    },
    {
      name: 'side',
      type: "'left' | 'right'",
      default: "'left'",
      description: 'Same sides as el-drawer.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Same sizes as el-drawer.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: 'Header close button.',
    },
    {
      name: 'closeOnBackdrop',
      type: 'boolean',
      default: 'true',
      description: 'Dismiss when the backdrop is clicked.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Dismiss on Escape. Only the top stacked drawer responds.',
    },
  ];

  protected async openService(): Promise<void> {
    const ref = this.drawer.open(WorkspaceDrawer, {
      data: { workspace: 'Acme' },
      title: 'Workspace',
      size: 'sm',
      side: 'left',
    });
    const saved = await ref.afterClosed;
    this.serviceResult.set(saved ? 'saved' : 'dismissed');
  }
}
