import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElFormError, ElInput, ElLabel } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-form-error-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElFormError,
    ElInput,
    ElLabel,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './form-error-doc.html',
  styleUrl: './page.scss',
})
export class FormErrorDocPage {
  protected readonly fieldPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly messagePanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly email = signal('');
  protected readonly emailInvalid = signal(true);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add label
npx @ng-elemental/cli add input
npx @ng-elemental/cli add form-error`;

  protected readonly importCode = `import { ElFormError } from './ui/form-error/form-error';
import { ElLabel } from './ui/label/label';
import { ElInput } from './ui/input/input';

@Component({
  imports: [ElFormError, ElLabel, ElInput],
  template: \`
    <el-label htmlFor="email" required>Email</el-label>
    <el-input inputId="email" [(value)]="email" [error]="invalid" ariaDescribedby="email-err" />
    @if (invalid) {
      <el-form-error id="email-err">Email is required</el-form-error>
    }
  \`,
})
export class MyComponent {}`;

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
