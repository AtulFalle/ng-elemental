import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElAlert } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-alert-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElAlert, CodeBlock, Preview, PropsTable],
  templateUrl: './alert-doc.html',
  styleUrl: './page.scss',
})
export class AlertDocPage {
  protected readonly showBanner = signal(true);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add alert`;

  protected readonly importCode = `import { ElAlert } from './ui/alert/alert';

@Component({
  imports: [ElAlert],
  template: \`
    @if (show()) {
      <el-alert color="success" title="Saved" dismissible (dismissed)="show.set(false)">
        Your changes were written.
      </el-alert>
    }
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-alert color="info">Something needs your attention.</el-alert>
<el-alert color="success" title="Saved">Your changes were written.</el-alert>
<el-alert color="error" dismissible (dismissed)="onDismiss()">Could not save.</el-alert>`;

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
