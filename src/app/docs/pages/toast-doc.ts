import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElTab,
  ElTabContent,
  ElTabs,
  ElToast,
  ElToaster,
  ElToastService,
  type ElToastColor,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-toast-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElToast,
    ElToaster,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './toast-doc.html',
  styleUrl: './page.scss',
})
export class ToastDocPage {
  private readonly toast = inject(ElToastService);

  protected readonly installTab = signal('cli');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add toast`;

  protected readonly manualIconCode = `npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button`;

  protected readonly manualFilesCode = `ui/toast/toast.ts
ui/toast/toast.html
ui/toast/toast.scss
ui/toast/toaster.ts
ui/toast/toaster.html
ui/toast/toaster.scss
ui/toast/toast.service.ts`;

  protected readonly importSnippet = `import { ElToaster } from './ui/toast/toaster';
import { ElToastService } from './ui/toast/toast.service';`;

  protected readonly usageSnippet = `<el-toaster /><router-outlet />

this.toast.show('Saved', { color: 'success' });`;

  protected readonly serviceCode = `<el-toaster position="bottom-end" />

this.toast.show('Saved to your library.');
this.toast.show('Could not save', { color: 'error', title: 'Error' });
this.toast.show('Sticky', { duration: 0 });`;

  protected readonly presentationalCode = `<el-toast color="success" title="Saved">Your changes were written.</el-toast>
<el-toast color="error" title="Could not save">Check your connection.</el-toast>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-inverse-surface: #111827;
  --el-color-inverse-on-surface: #f9fafb;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'color',
      type: "'neutral' | 'success' | 'error' | 'warning' | 'info'",
      default: "'neutral'",
      description: 'Semantic tone on el-toast / show() options.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Optional heading on el-toast / show() options.',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'true',
      description: 'Shows a close button. Parent/service removes the toast.',
    },
    {
      name: 'position',
      type: "'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'",
      default: "'bottom-end'",
      description: 'Viewport corner for el-toaster.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '4000',
      description: 'Auto-dismiss milliseconds on show(). 0 keeps the toast until dismissed.',
    },
  ];

  protected show(color: ElToastColor): void {
    const samples: Record<ElToastColor, { message: string; title: string }> = {
      success: { message: 'Saved to your library.', title: 'Saved' },
      error: { message: 'Check your connection and try again.', title: 'Could not save' },
      warning: { message: 'Leave without saving?', title: 'Unsaved changes' },
      info: { message: 'A newer version is available.', title: '' },
      neutral: { message: 'Link copied to clipboard.', title: '' },
    };
    const sample = samples[color];
    this.toast.show(sample.message, {
      color,
      title: sample.title,
      duration: 0,
    });
  }
}
