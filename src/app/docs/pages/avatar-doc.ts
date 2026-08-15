import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElAvatar } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-avatar-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElAvatar,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './avatar-doc.html',
  styleUrl: './page.scss',
})
export class AvatarDocPage {

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add avatar`;

  protected readonly importCode = `import { ElAvatar } from './ui/avatar/avatar';

@Component({
  imports: [ElAvatar],
  template: \`
    <el-avatar src="/me.jpg" alt="Jane Doe" />
    <el-avatar initials="JD" alt="Jane Doe" />
    <el-avatar icon="user" alt="Account" />
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-avatar src="/me.jpg" alt="Jane Doe" size="lg" />
<el-avatar initials="JD" alt="Jane Doe" />
<el-avatar icon="star" alt="Starred" size="sm" />`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'src',
      type: 'string',
      default: "''",
      description: 'Image URL. When set and load succeeds, shows the image.',
    },
    {
      name: 'alt',
      type: 'string',
      default: "''",
      description:
        'Accessible name for the image, or aria-label for initials/icon.',
    },
    {
      name: 'initials',
      type: 'string',
      default: "''",
      description: 'Fallback text when there is no usable image (e.g. "JD").',
    },
    {
      name: 'icon',
      type: 'string',
      default: "''",
      description:
        'Font Awesome name (no fa- prefix). Used when no image/initials; defaults to "user".',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Avatar diameter.',
    },
  ];
}
