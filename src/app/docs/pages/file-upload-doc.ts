import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElFileUpload } from '@ng-elemental/ui';
import { FILE_UPLOAD_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-file-upload-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElFileUpload,
    CodeBlock,
    Preview,
    PropsTable,
    TokensTable,
  ],
  templateUrl: './file-upload-doc.html',
  styleUrl: './page.scss',
})
export class FileUploadDocPage {
  protected readonly fileUploadTokens = FILE_UPLOAD_TOKENS;
  protected readonly singleFiles = signal<File[]>([]);
  protected readonly multiFiles = signal<File[]>([]);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add form-error
npx @ng-elemental/cli add attachment
npx @ng-elemental/cli add file-upload`;

  protected readonly importCode = `import { signal } from '@angular/core';
import { ElFileUpload } from './ui/file-upload/file-upload';

@Component({
  imports: [ElFileUpload],
  template: \`
    <el-file-upload [(files)]="files" multiple accept="image/*,.pdf">
      PNG, JPG, or PDF up to 5 MB
    </el-file-upload>
  \`,
})
export class MyComponent {
  readonly files = signal<File[]>([]);
}`;

  protected readonly usageCode = `<el-file-upload
  [(files)]="files"
  multiple
  accept="image/*,.pdf"
  [maxFiles]="5"
  [maxSize]="5242880"
>
  PNG, JPG, or PDF — up to 5 files, 5 MB each
</el-file-upload>`;

  protected readonly globalTokensCode = `:root {
  --el-file-upload-radius: 1rem;
  --el-file-upload-border-active: #2563eb;
  --el-file-upload-padding-md: 1.75rem;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'files',
      type: 'File[]',
      default: '[]',
      description: 'Selected files (two-way via model).',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Allow more than one file. When false, keeps at most one.',
    },
    {
      name: 'accept',
      type: 'string',
      default: "''",
      description: 'Native accept filter (e.g. image/*,.pdf).',
    },
    {
      name: 'maxFiles',
      type: 'number | null',
      default: 'null',
      description: 'Maximum files when multiple is on.',
    },
    {
      name: 'maxSize',
      type: 'number | null',
      default: 'null',
      description: 'Maximum size per file in bytes.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Blocks browse, drop, and remove.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Dropzone and attachment density.',
    },
    {
      name: 'browseLabel',
      type: 'string',
      default: "'Browse files'",
      description: 'Label for the browse button.',
    },
    {
      name: 'dropTitle',
      type: 'string',
      default: "'Drop files here'",
      description: 'Primary title inside the dropzone.',
    },
  ];
}
