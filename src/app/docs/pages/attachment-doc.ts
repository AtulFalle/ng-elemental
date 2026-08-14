import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElAttachment,
  ElAttachmentAction,
  ElAttachmentActions,
  ElAttachmentContent,
  ElAttachmentDescription,
  ElAttachmentGroup,
  ElAttachmentMedia,
  ElAttachmentTitle,
  ElIcon,
} from '@ng-elemental/ui';
import { ATTACHMENT_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-attachment-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElAttachment,
    ElAttachmentMedia,
    ElAttachmentContent,
    ElAttachmentTitle,
    ElAttachmentDescription,
    ElAttachmentActions,
    ElAttachmentAction,
    ElAttachmentGroup,
    ElIcon,
    CodeBlock,
    Preview,
    PropsTable,
    TokensTable,
  ],
  templateUrl: './attachment-doc.html',
  styleUrl: './page.scss',
})
export class AttachmentDocPage {
  protected readonly attachmentTokens = ATTACHMENT_TOKENS;

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add attachment`;

  protected readonly importCode = `import {
  ElAttachment,
  ElAttachmentAction,
  ElAttachmentActions,
  ElAttachmentContent,
  ElAttachmentDescription,
  ElAttachmentMedia,
  ElAttachmentTitle,
} from './ui/attachment/attachment';
import { ElIcon } from './ui/icon/icon';

@Component({
  imports: [
    ElAttachment,
    ElAttachmentMedia,
    ElAttachmentContent,
    ElAttachmentTitle,
    ElAttachmentDescription,
    ElAttachmentActions,
    ElAttachmentAction,
    ElIcon,
  ],
  template: \`
    <el-attachment state="done">
      <el-attachment-media>
        <el-icon name="file-lines" />
      </el-attachment-media>
      <el-attachment-content>
        <el-attachment-title>report.pdf</el-attachment-title>
        <el-attachment-description>PDF · 2.4 MB</el-attachment-description>
      </el-attachment-content>
      <el-attachment-actions>
        <el-attachment-action ariaLabel="Remove report.pdf" />
      </el-attachment-actions>
    </el-attachment>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-attachment state="uploading">
  <el-attachment-media>
    <el-icon name="file-lines" />
  </el-attachment-media>
  <el-attachment-content>
    <el-attachment-title>design-system.zip</el-attachment-title>
    <el-attachment-description>Uploading · 64%</el-attachment-description>
  </el-attachment-content>
  <el-attachment-actions>
    <el-attachment-action ariaLabel="Cancel upload" />
  </el-attachment-actions>
</el-attachment>`;

  protected readonly imageCode = `<el-attachment orientation="vertical" state="done" style="width: 14rem">
  <el-attachment-media variant="image">
    <img src="/workspace.png" alt="" />
  </el-attachment-media>
  <el-attachment-content>
    <el-attachment-title>workspace.png</el-attachment-title>
    <el-attachment-description>PNG · 820 KB</el-attachment-description>
  </el-attachment-content>
  <el-attachment-actions>
    <el-attachment-action ariaLabel="Remove workspace.png" />
  </el-attachment-actions>
</el-attachment>`;

  protected readonly globalTokensCode = `:root {
  --el-attachment-radius: 1rem;
  --el-attachment-border: #d1d5db;
  --el-attachment-media-size-md: 2.75rem;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'state',
      type: "'idle' | 'uploading' | 'processing' | 'error' | 'done'",
      default: "'done'",
      description: 'Upload lifecycle. Drives error styling and title shimmer.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Attachment density.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Media beside content, or stacked above.',
    },
  ];

  protected readonly mediaProps: PropDefinition[] = [
    {
      name: 'variant',
      type: "'icon' | 'image'",
      default: "'icon'",
      description: 'Icon slot or image preview (project an <img>).',
    },
  ];

  protected readonly actionProps: PropDefinition[] = [
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'required',
      description: 'Accessible name for the icon-only action button.',
    },
    {
      name: 'icon',
      type: 'string',
      default: "'xmark'",
      description: 'Font Awesome icon name (without fa- prefix).',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'sm'",
      description: 'Underlying ElButton size.',
    },
  ];
}
