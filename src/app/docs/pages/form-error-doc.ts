import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElFormError,
  ElInput,
  ElLabel,
  ElTab,
  ElTabContent,
  ElTabs,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-form-error-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElFormError,
    ElInput,
    ElLabel,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './form-error-doc.html',
  styleUrl: './page.scss',
})
export class FormErrorDocPage {
  protected readonly installTab = signal('cli');

  protected readonly email = signal('');
  protected readonly emailInvalid = signal(true);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add label
npx @ng-elemental/cli add input
npx @ng-elemental/cli add form-error`;

  protected readonly manualFilesCode = `ui/form-error/form-error.ts
ui/form-error/form-error.html
ui/form-error/form-error.scss`;

  protected readonly importSnippet = `import { ElFormError } from './ui/form-error/form-error';
import { ElLabel } from './ui/label/label';
import { ElInput } from './ui/input/input';`;

  protected readonly usageSnippet = `<el-label htmlFor="email" required>Email</el-label>
<el-input inputId="email" [(value)]="email" [error]="invalid" ariaDescribedby="email-err" />
@if (invalid) {
  <el-form-error id="email-err">Email is required</el-form-error>
}`;

  protected readonly fieldCode = `<el-label htmlFor="email" required>Email</el-label>
<el-input
  inputId="email"
  [(value)]="email"
  [error]="emailInvalid"
  ariaDescribedby="email-err"
/>
@if (emailInvalid) {
  <el-form-error id="email-err">Email is required</el-form-error>
}`;

  protected readonly messageCode = `<el-form-error>Something went wrong</el-form-error>`;

  protected readonly stackCode = `.my-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: '(content)',
      type: 'ng-content',
      default: '—',
      description: 'Error message text or rich content.',
    },
    {
      name: 'id',
      type: 'string (host attribute)',
      default: '—',
      description:
        'Optional id so a control can reference this message via aria-describedby.',
    },
  ];
}
