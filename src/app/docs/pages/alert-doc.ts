import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElAlert, ElTab, ElTabContent, ElTabs } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-alert-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElAlert,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './alert-doc.html',
  styleUrl: './page.scss',
})
export class AlertDocPage {
  protected readonly installTab = signal('cli');
  protected readonly showBanner = signal(true);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add alert`;

  protected readonly manualIconCode = `npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button`;

  protected readonly manualFilesCode = `ui/alert/alert.ts
ui/alert/alert.html
ui/alert/alert.scss`;

  protected readonly importSnippet = `import { ElAlert } from './ui/alert/alert';`;

  protected readonly usageSnippet = `@if (show()) {
  <el-alert color="success" title="Saved" dismissible (dismissed)="show.set(false)">
    Your changes were written.
  </el-alert>
}`;

  protected readonly colorsCode = `<el-alert color="neutral">Neutral update.</el-alert>
<el-alert color="success">Saved successfully.</el-alert>
<el-alert color="error">Could not save changes.</el-alert>
<el-alert color="warning">This action cannot be undone.</el-alert>
<el-alert color="info">A newer version is available.</el-alert>`;

  protected readonly titleCode = `<el-alert color="success" title="Saved">
  Your changes were written.
</el-alert>`;

  protected readonly dismissCode = `@if (show()) {
  <el-alert
    color="info"
    title="New version"
    dismissible
    (dismissed)="show.set(false)"
  >
    A newer version of the design system is available.
  </el-alert>
}`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-success-container: #c4eed0;
  --el-color-on-success-container: #00210a;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'color',
      type: "'neutral' | 'success' | 'error' | 'warning' | 'info'",
      default: "'info'",
      description: 'Semantic tone. Error and warning use role="alert"; others use role="status".',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Optional heading above the message.',
    },
    {
      name: 'icon',
      type: 'string',
      default: '—',
      description:
        'Font Awesome name. Omit for the default icon, pass an empty string to hide, or set a custom name.',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      description: 'Shows a close button that emits dismissed. Parent should remove the alert.',
    },
    {
      name: 'dismissed',
      type: 'void',
      default: '—',
      description: 'Emitted when the close button is clicked.',
    },
  ];
}
