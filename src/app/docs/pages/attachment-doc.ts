import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
  ElButton,
  ElIcon,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-attachment-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
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
  ],
  templateUrl: './attachment-doc.html',
  styleUrl: './page.scss',
})
export class AttachmentDocPage {
  protected readonly heroPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly statesPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly imagePanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly sizesPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly groupPanel = signal<'preview' | 'code' | 'standards'>('preview');

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

  protected readonly statesCode = `<el-attachment state="error">
  <el-attachment-media>
    <el-icon name="file-excel" />
  </el-attachment-media>
  <el-attachment-content>
    <el-attachment-title>financial-model.xlsx</el-attachment-title>
    <el-attachment-description>Upload failed. Try again.</el-attachment-description>
  </el-attachment-content>
  <el-attachment-actions>
    <el-attachment-action ariaLabel="Retry financial-model.xlsx" icon="rotate-right" />
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

  protected readonly sizesCode = `<el-attachment size="lg" state="done">
  <el-attachment-media>
    <el-icon name="file-lines" />
  </el-attachment-media>
  <el-attachment-content>
    <el-attachment-title>Large attachment</el-attachment-title>
    <el-attachment-description>PDF · 2.4 MB</el-attachment-description>
  </el-attachment-content>
</el-attachment>`;

  protected readonly groupCode = `<el-attachment-group ariaLabel="Recent files">
  <el-attachment state="done" orientation="vertical">
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
  </el-attachment>
</el-attachment-group>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
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
