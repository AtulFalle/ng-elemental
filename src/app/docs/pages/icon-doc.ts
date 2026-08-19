import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElChip, ElIcon } from '@ng-elemental/ui';
import { ICON_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-icon-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElIcon, ElButton, ElChip, CodeBlock, Preview, PropsTable, TokensTable],
  templateUrl: './icon-doc.html',
  styleUrl: './page.scss',
})
export class IconDocPage {
  protected readonly iconTokens = ICON_TOKENS;
  protected readonly filterActive = signal(true);
  protected readonly tags = signal(['Angular', 'Design']);

  protected readonly commonPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly sizesPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly buttonPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly chipPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly installCode = `npm install @fortawesome/fontawesome-free`;

  protected readonly stylesCode = `@use './app/ui/theme/tokens';
@use './app/ui/icon/fontawesome';`;

  protected readonly addCode = `npx @ng-elemental/cli add icon`;

  protected readonly importCode = `import { ElIcon } from './ui/icon/icon';

@Component({
  imports: [ElIcon],
  template: \`<el-icon name="check" />\`,
})
export class MyComponent {}`;

  protected readonly commonCode = `<el-icon name="check" />
<el-icon name="xmark" />
<el-icon name="star" />
<el-icon name="github" variant="brands" />`;

  protected readonly sizesCode = `<el-icon name="star" size="sm" />
<el-icon name="star" size="md" />
<el-icon name="star" size="lg" />`;

  protected readonly buttonCode = `<el-button variant="primary" iconStart="plus">Add</el-button>
<el-button variant="secondary" iconEnd="arrow-right">Next</el-button>`;

  protected readonly chipCode = `<el-chip type="assist" iconStart="key">Assist</el-chip>
<el-chip type="filter" [(selected)]="active">Filter</el-chip>
<el-chip type="suggestion" appearance="filled" [removable]="true">Tag</el-chip>`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'name',
      type: 'string',
      default: '(required)',
      description:
        'Font Awesome icon name without the fa- prefix (e.g. check, xmark, user). See fontawesome.com/icons.',
    },
    {
      name: 'variant',
      type: "'solid' | 'regular' | 'brands'",
      default: "'solid'",
      description: 'Font Awesome icon style.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Icon size mapped to design tokens.',
    },
    {
      name: 'decorative',
      type: 'boolean',
      default: 'true',
      description: 'When true, hides the icon from assistive technology.',
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Accessible label when decorative is false.',
    },
  ];

  protected removeTag(tag: string): void {
    this.tags.update((items) => items.filter((item) => item !== tag));
  }
}
