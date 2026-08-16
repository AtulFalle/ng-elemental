import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElEmptyState } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-empty-state-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElEmptyState, CodeBlock, Preview, PropsTable],
  templateUrl: './empty-state-doc.html',
  styleUrl: './page.scss',
})
export class EmptyStateDocPage {
  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add empty-state`;

  protected readonly importCode = `import { ElEmptyState } from './ui/empty-state/empty-state';
import { ElButton } from './ui/button/button';

@Component({
  imports: [ElEmptyState, ElButton],
  template: \`
    <el-empty-state
      icon="folder-open"
      title="No projects"
      description="Create a project to get started."
    >
      <div elEmptyStateActions>
        <el-button>Create project</el-button>
        <el-button variant="ghost">Learn more</el-button>
      </div>
    </el-empty-state>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-empty-state icon="inbox" title="Inbox zero" description="You are all caught up." />
<el-empty-state title="No results" description="Try a different search.">
  <img elEmptyStateMedia src="empty.svg" alt="" />
  Filters are still applied.
  <div elEmptyStateActions>
    <el-button>Clear filters</el-button>
  </div>
</el-empty-state>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-on-surface-variant: #6b7280;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'icon',
      type: 'string',
      default: "''",
      description: 'Font Awesome name. Omit to hide the icon.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Heading under the media.',
    },
    {
      name: 'description',
      type: 'string',
      default: "''",
      description: 'Supporting copy under the title.',
    },
  ];
}
