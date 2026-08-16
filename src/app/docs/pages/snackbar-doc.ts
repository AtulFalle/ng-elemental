import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElSnackbar,
  ElSnackbarService,
  type ElSnackbarColor,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-snackbar-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElSnackbar, CodeBlock, Preview, PropsTable],
  templateUrl: './snackbar-doc.html',
  styleUrl: './page.scss',
})
export class SnackbarDocPage {
  private readonly snackbar = inject(ElSnackbarService);

  protected readonly open = signal(false);
  protected readonly colorOpen = signal(false);
  protected readonly color = signal<ElSnackbarColor>('success');
  protected readonly bulkOpen = signal(false);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add snackbar`;

  protected readonly importCode = `import { ElSnackbar } from './ui/snackbar/snackbar';
import { ElSnackbarService } from './ui/snackbar/snackbar.service';

@Component({
  imports: [ElSnackbar],
  template: \`
    <el-snackbar [(open)]="open" message="File deleted" action="Undo"
      (actionClick)="undo()" />
  \`,
})
export class MyComponent {
  private readonly snackbar = inject(ElSnackbarService);
  protected open = false;

  save(): void {
    this.snackbar.open('Saved', { color: 'success' });
  }
}`;

  protected readonly usageCode = `<el-snackbar [(open)]="open" message="File deleted" action="Undo" />
<el-snackbar [(open)]="open" [duration]="0" message="3 selected">
  <div elSnackbarActions>
    <el-button variant="ghost" size="sm">Move</el-button>
    <el-button variant="ghost" size="sm">Delete</el-button>
  </div>
</el-snackbar>
this.snackbar.open('File deleted', { action: 'Undo', duration: 4000 });`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-inverse-surface: #322f35;
  --el-color-inverse-on-surface: #f5eff7;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description: 'Open state. Bind [(open)] to control it.',
    },
    {
      name: 'message',
      type: 'string',
      default: "''",
      description: 'Text shown in the bar.',
    },
    {
      name: 'action',
      type: 'string',
      default: "''",
      description: 'Optional built-in action label. Emits actionClick then dismisses. Prefer elSnackbarActions for more than one control.',
    },
    {
      name: 'color',
      type: "'neutral' | 'success' | 'error' | 'warning' | 'info'",
      default: "'neutral'",
      description: 'Semantic tone. Error uses role="alert".',
    },
    {
      name: 'duration',
      type: 'number',
      default: '4000',
      description: 'Auto-dismiss ms. 0 stays until dismissed.',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'true',
      description: 'Shows a close button.',
    },
    {
      name: 'position',
      type: "'bottom' | 'top'",
      default: "'bottom'",
      description: 'Fixed edge of the viewport.',
    },
  ];

  protected readonly serviceProps: PropDefinition[] = [
    {
      name: 'message',
      type: 'string',
      default: '—',
      description: 'First argument to open().',
    },
    {
      name: 'action',
      type: 'string',
      default: "''",
      description: 'Optional action label.',
    },
    {
      name: 'color',
      type: "'neutral' | 'success' | 'error' | 'warning' | 'info'",
      default: "'neutral'",
      description: 'Same colors as el-snackbar.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '4000',
      description: 'Auto-dismiss ms. 0 is sticky.',
    },
    {
      name: 'position',
      type: "'bottom' | 'top'",
      default: "'bottom'",
      description: 'Fixed edge of the viewport.',
    },
  ];

  protected showColor(color: ElSnackbarColor): void {
    this.color.set(color);
    this.colorOpen.set(true);
  }

  protected showService(): void {
    this.snackbar.open('File deleted', { action: 'Undo' });
  }
}
