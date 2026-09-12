import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElAlert,
  ElButton,
  ElSegmentedButton,
  ElSegmentedButtonItem,
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
  selector: 'app-button-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElAlert,
    ElButton,
    ElSegmentedButton,
    ElSegmentedButtonItem,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './button-doc.html',
  styleUrl: './page.scss',
})
export class ButtonDocPage {
  protected readonly installTab = signal('cli');
  protected readonly viewMode = signal('list');
  protected readonly pageCopied = signal(false);

  protected readonly heroCode = `<el-button variant="secondary">Button</el-button>
<el-button
  variant="icon"
  iconStart="arrow-up"
  ariaLabel="Submit"
></el-button>`;

  protected readonly addCode = `npx @ng-elemental/cli add button`;

  protected readonly manualIconCode = `npx @ng-elemental/cli add icon`;

  protected readonly manualFilesCode = `ui/button/button.ts
ui/button/button.html
ui/button/button.scss`;

  protected readonly manualImportCode = `import { ElButton } from './ui/button/button';`;

  protected readonly importSnippet = `import { ElButton } from './ui/button/button'`;

  protected readonly usageSnippet = `<el-button variant="secondary">Button</el-button>`;

  protected readonly sizeCode = `<div class="docs-page__size-demo">
  <div class="docs-page__size-row">
    <el-button size="sm" variant="secondary">Small</el-button>
    <el-button
      size="sm"
      variant="icon"
      iconStart="arrow-up-right-from-square"
      ariaLabel="Submit"
    ></el-button>
  </div>
  <div class="docs-page__size-row">
    <el-button size="md" variant="secondary">Medium</el-button>
    <el-button
      size="md"
      variant="icon"
      iconStart="arrow-up-right-from-square"
      ariaLabel="Submit"
    ></el-button>
  </div>
  <div class="docs-page__size-row">
    <el-button size="lg" variant="secondary">Large</el-button>
    <el-button
      size="lg"
      variant="icon"
      iconStart="arrow-up-right-from-square"
      ariaLabel="Submit"
    ></el-button>
  </div>
</div>`;

  protected readonly primaryCode = `<el-button variant="primary">Button</el-button>`;

  protected readonly secondaryCode = `<el-button variant="secondary">Secondary</el-button>`;

  protected readonly outlineCode = `<el-button variant="outline">Outline</el-button>`;

  protected readonly ghostCode = `<el-button variant="ghost">Ghost</el-button>`;

  protected readonly destructiveCode = `<el-button variant="destructive">Delete</el-button>`;

  protected readonly iconCode = `<el-button
  variant="icon"
  iconStart="arrow-up"
  ariaLabel="Submit"
></el-button>`;

  protected readonly withIconCode = `<el-button variant="secondary" iconStart="code-branch">
  New Branch
</el-button>
<el-button variant="secondary" iconEnd="code-fork">
  Fork
</el-button>`;

  protected readonly roundedCode = `<div class="docs-page__rounded">
  <el-button variant="primary">Get Started</el-button>
</div>
<div class="docs-page__rounded">
  <el-button
    variant="icon"
    iconStart="arrow-up"
    ariaLabel="Submit"
  ></el-button>
</div>`;

  protected readonly loadingCode = `<el-button variant="primary" [loading]="true" loadingLabel="Generating">
  Generating
</el-button>
<el-button
  variant="secondary"
  [loading]="true"
  loadingLabel="Downloading"
>
  Downloading
</el-button>`;

  protected readonly segmentedCode = `<el-segmented-button
  [value]="viewMode"
  (valueChange)="viewMode.set($event)"
  ariaLabel="View mode"
>
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
  <el-segmented-button-item value="board">Board</el-segmented-button-item>
</el-segmented-button>`;

  protected readonly rtlCode = `<div dir="rtl" class="docs-row">
  <el-button variant="secondary">زر</el-button>
  <el-button variant="primary" iconEnd="arrow-right">إرسال</el-button>
  <el-button
    variant="icon"
    iconStart="plus"
    ariaLabel="Add"
  ></el-button>
  <el-button
    variant="secondary"
    [loading]="true"
    loadingLabel="جاري التحميل"
  >
    جاري التحميل
  </el-button>
</div>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly pageMarkdown = `# Button

Displays a button or a component that looks like a button.

## Installation

\`\`\`bash
npx @ng-elemental/cli add button
\`\`\`

## Usage

\`\`\`ts
import { ElButton } from './ui/button/button'
\`\`\`

\`\`\`html
<el-button variant="secondary">Button</el-button>
\`\`\`
`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'icon'",
      default: "'primary'",
      description:
        'Visual style of the button. Use outline for a bordered action and destructive for irreversible work.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description:
        'Button size. Icons stay sm through md buttons and use md on lg.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the button.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: 'Native button type attribute.',
    },
    {
      name: 'iconStart',
      type: 'string',
      default: "''",
      description:
        'Font Awesome icon name shown before the label (requires icon component).',
    },
    {
      name: 'iconEnd',
      type: 'string',
      default: "''",
      description:
        'Font Awesome icon name shown after the label (requires icon component).',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "''",
      description:
        'Accessible name for icon-only buttons or when visible text is not descriptive enough.',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description:
        'Shows a spinner, marks the button busy, and disables activation while work is in progress.',
    },
    {
      name: 'loadingLabel',
      type: 'string',
      default: "'Loading'",
      description: 'Text announced and shown for non-icon loading buttons.',
    },
    {
      name: 'iconVariant',
      type: "'solid' | 'regular' | 'brands'",
      default: "'solid'",
      description: 'Font Awesome style for button icons.',
    },
  ];

  protected async copyPage(): Promise<void> {
    await navigator.clipboard.writeText(this.pageMarkdown);
    this.pageCopied.set(true);
    setTimeout(() => this.pageCopied.set(false), 2000);
  }
}
