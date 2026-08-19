import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElToast,
  ElToaster,
  ElToastService,
  type ElToastColor,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-toast-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElToast,
    ElToaster,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './toast-doc.html',
  styleUrl: './page.scss',
})
export class ToastDocPage {
  private readonly toast = inject(ElToastService);

  protected readonly servicePanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly presentationalPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add toast`;

  protected readonly importCode = `import { ElToaster } from './ui/toast/toaster';
import { ElToastService } from './ui/toast/toast.service';

@Component({
  imports: [ElToaster],
  template: \`<el-toaster /><router-outlet />\`,
})
export class App {
  private readonly toast = inject(ElToastService);

  save(): void {
    this.toast.show('Saved', { color: 'success' });
  }
}`;

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
    this.toast.show(`This is a ${color} toast.`, {
      color,
      title: color === 'neutral' ? '' : color,
      duration: 0,
    });
  }
}
