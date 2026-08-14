import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElChip } from '@ng-elemental/ui';
import { CHIP_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-chip-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElChip, CodeBlock, Preview, PropsTable, TokensTable],
  templateUrl: './chip-doc.html',
  styleUrl: './page.scss',
})
export class ChipDocPage {
  protected readonly chipTokens = CHIP_TOKENS;
  protected readonly filterActive = signal(true);
  protected readonly tags = signal(['Angular', 'Material', 'Design']);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add chip`;

  protected readonly importCode = `import { ElChip } from './ui/chip/chip';

@Component({
  imports: [ElChip],
  template: \`
    <el-chip type="filter" [(selected)]="active">Filter</el-chip>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-chip type="assist" iconStart="key">Assist</el-chip>

<el-chip type="filter" [(selected)]="active">Filter</el-chip>

<el-chip type="suggestion" appearance="filled" iconStart="check">Selected look</el-chip>

<el-chip type="suggestion" appearance="filled" [removable]="true" (removed)="onRemove()">
  Tag
</el-chip>`;

  protected readonly globalTokensCode = `:root {
  --el-chip-bg-filled: #e8def8;
  --el-chip-fg-filled: #1e192b;
  --el-chip-border: #79747e;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'type',
      type: "'assist' | 'filter' | 'suggestion'",
      default: "'assist'",
      description: 'Chip category: assist actions, filter toggles, or suggestions.',
    },
    {
      name: 'appearance',
      type: "'outlined' | 'filled' | 'elevated'",
      default: "'outlined'",
      description:
        'Surface style for suggestion chips. Filter chips switch between outlined and filled based on selection.',
    },
    {
      name: 'iconStart',
      type: 'string',
      default: "''",
      description:
        'Font Awesome icon name for the start icon. Filter chips show check automatically when selected.',
    },
    {
      name: 'selected',
      type: 'boolean',
      default: 'false',
      description: 'Two-way bindable selection state for filter chips via [(selected)].',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Non-interactive chip state.',
    },
    {
      name: 'removable',
      type: 'boolean',
      default: 'false',
      description: 'Shows a Font Awesome close icon at the end.',
    },
    {
      name: 'removeLabel',
      type: 'string',
      default: "'Remove'",
      description: 'Accessible label for the close button.',
    },
    {
      name: 'removed',
      type: 'void',
      default: '—',
      description: 'Emitted when the close button is clicked.',
    },
  ];

  protected removeTag(tag: string): void {
    this.tags.update((items) => items.filter((item) => item !== tag));
  }
}
