import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElAvatar, ElButton, ElCard, ElIcon } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-card-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElAvatar,
    ElButton,
    ElCard,
    ElIcon,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './card-doc.html',
  styleUrl: './page.scss',
})
export class CardDocPage {

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add card
# optional — for people-card / file-row examples:
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add avatar
npx @ng-elemental/cli add button`;

  protected readonly importCode = `import { ElCard } from './ui/card/card';

@Component({
  imports: [ElCard],
  template: \`
    <el-card>
      <div elCardHeader>Title</div>
      <div elCardContent>Body</div>
      <div elCardFooter>Actions</div>
    </el-card>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-card appearance="outlined">
  <img elCardMedia src="/cover.jpg" alt="" style="width: 100%; display: block" />
  <div elCardHeader>Trail overlook</div>
  <div elCardContent>Media sits flush at the top of the card.</div>
  <div elCardFooter>…</div>
</el-card>`;

  protected readonly avatarComposeCode = `<el-card appearance="elevated">
  <div elCardHeader style="display: flex; align-items: center; gap: 0.75rem">
    <el-avatar initials="AL" alt="Ada Lovelace" />
    <div>
      <div>Ada Lovelace</div>
      <div>Mathematician</div>
    </div>
  </div>
  <div elCardContent>Compose avatar in the header slot.</div>
  <div elCardFooter>
    <el-button size="sm" variant="secondary">Follow</el-button>
  </div>
</el-card>`;

  protected readonly compactCode = `<el-card size="compact">
  <el-icon elCardMedia name="file-lines" />
  <div elCardHeader>report.pdf</div>
  <div elCardContent>2.4 MB</div>
  <div elCardFooter>
    <el-button variant="ghost" size="sm" iconStart="xmark" aria-label="Remove" />
  </div>
</el-card>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'appearance',
      type: "'outlined' | 'elevated'",
      default: "'outlined'",
      description: 'Outlined border or elevated shadow surface.',
    },
    {
      name: 'size',
      type: "'default' | 'compact'",
      default: "'default'",
      description:
        'Compact is a horizontal row (media | body | footer) for dense lists like file uploads.',
    },
  ];

  protected readonly slots: PropDefinition[] = [
    {
      name: 'elCardMedia',
      type: 'attribute',
      default: '—',
      description:
        'Media region — full-bleed on top (default) or leading icon/thumb (compact).',
    },
    {
      name: 'elCardHeader',
      type: 'attribute',
      default: '—',
      description: 'Header region (title, avatar, file name).',
    },
    {
      name: 'elCardContent',
      type: 'attribute',
      default: '—',
      description: 'Body content (description, file size, meta).',
    },
    {
      name: 'elCardFooter',
      type: 'attribute',
      default: '—',
      description: 'Footer actions or meta (remove, retry).',
    },
  ];
}
