import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElAlert,
  ElButton,
  ElIcon,
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
    ElIcon,
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
  styleUrl: './button-doc.scss',
})
export class ButtonDocPage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly timeouts = new Set<ReturnType<typeof setTimeout>>();

  protected readonly installTab = signal('cli');
  protected readonly viewMode = signal('list');
  protected readonly pageCopied = signal(false);
  protected readonly progressState = signal<'idle' | 'running' | 'success'>(
    'idle',
  );
  protected readonly copied = signal(false);
  protected readonly slideOn = signal(false);
  protected readonly saveState = signal<'idle' | 'loading' | 'success'>('idle');
  protected readonly favorited = signal(false);
  protected readonly sparkleBurstId = signal(0);

  protected readonly progressLabel = computed(() =>
    this.progressState() === 'success' ? 'Published' : 'Publish',
  );
  protected readonly copyLabel = computed(() =>
    this.copied() ? 'Copied' : 'Copy',
  );
  protected readonly saveLabel = computed(() => {
    switch (this.saveState()) {
      case 'loading':
        return 'Saving';
      case 'success':
        return 'Saved';
      default:
        return 'Save';
    }
  });

  protected readonly sparkleParticles = [
    {
      id: 1,
      x: 8,
      y: -28,
      size: 5,
      delay: '0ms',
      color: 'var(--el-color-warning)',
      diamond: false,
    },
    {
      id: 2,
      x: 24,
      y: -18,
      size: 4,
      delay: '40ms',
      color: 'var(--el-color-error)',
      diamond: true,
    },
    {
      id: 3,
      x: 28,
      y: 6,
      size: 6,
      delay: '80ms',
      color: 'var(--el-color-warning)',
      diamond: false,
    },
    {
      id: 4,
      x: 16,
      y: 24,
      size: 4,
      delay: '50ms',
      color: 'var(--el-color-success)',
      diamond: false,
    },
    {
      id: 5,
      x: -10,
      y: 26,
      size: 5,
      delay: '90ms',
      color: 'var(--el-color-warning)',
      diamond: true,
    },
    {
      id: 6,
      x: -26,
      y: 8,
      size: 4,
      delay: '30ms',
      color: 'var(--el-color-error)',
      diamond: false,
    },
    {
      id: 7,
      x: -24,
      y: -16,
      size: 6,
      delay: '70ms',
      color: 'var(--el-color-success)',
      diamond: false,
    },
    {
      id: 8,
      x: -6,
      y: -30,
      size: 3,
      delay: '20ms',
      color: 'var(--el-color-warning)',
      diamond: true,
    },
  ] as const;

  constructor() {
    this.destroyRef.onDestroy(() => {
      for (const id of this.timeouts) {
        clearTimeout(id);
      }
      this.timeouts.clear();
    });
  }

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

  protected readonly recipesCode = `<div class="docs-recipe">
  <div
    class="docs-recipe__item docs-recipe__item--progress"
    [class.docs-recipe__item--progress-running]="progressState() === 'running'"
    [class.docs-recipe__item--progress-success]="progressState() === 'success'"
  >
    <el-button
      variant="outline"
      [attr.aria-busy]="progressState() === 'running' ? 'true' : null"
      (click)="runProgress()"
    >
      <span class="docs-recipe__swap" aria-live="polite">
        <span
          class="docs-recipe__swap-layer"
          [class.docs-recipe__swap-layer--in]="progressState() !== 'success'"
        >
          <span class="docs-recipe__wipe">
            <span class="docs-recipe__wipe-base">
              <el-icon name="paper-plane" size="sm" />
              Publish
            </span>
            <span class="docs-recipe__wipe-over" aria-hidden="true">
              <el-icon name="paper-plane" size="sm" />
              Publish
            </span>
          </span>
        </span>
        <span
          class="docs-recipe__swap-layer"
          [class.docs-recipe__swap-layer--in]="progressState() === 'success'"
        >
          <el-icon name="circle-check" size="sm" />
          Published
        </span>
      </span>
    </el-button>
  </div>

  <div
    class="docs-recipe__item docs-recipe__item--copy"
    [class.docs-recipe__item--copy-done]="copied()"
  >
    <el-button
      variant="secondary"
      [ariaLabel]="copyLabel()"
      (click)="copyRecipe()"
    >
      <span class="docs-recipe__morph" aria-live="polite">
        <span class="docs-recipe__morph-icon" aria-hidden="true">
          <span class="docs-recipe__morph-icon-face docs-recipe__morph-icon-face--from">
            <el-icon name="copy" size="sm" />
          </span>
          <span class="docs-recipe__morph-icon-face docs-recipe__morph-icon-face--to">
            <el-icon name="check" size="sm" />
          </span>
        </span>
        <span class="docs-recipe__morph-text">
          <span class="docs-recipe__morph-text-face docs-recipe__morph-text-face--from">
            Copy
          </span>
          <span class="docs-recipe__morph-text-face docs-recipe__morph-text-face--to">
            Copied
          </span>
        </span>
      </span>
    </el-button>
  </div>

  <div
    class="docs-recipe__item docs-recipe__item--slide"
    [class.docs-recipe__item--slide-on]="slideOn()"
  >
    <el-button variant="primary" (click)="playSlide()">
      Continue
      <span class="docs-recipe__arrows" aria-hidden="true">
        <span class="docs-recipe__arrow">
          <el-icon name="arrow-right" size="sm" />
        </span>
        <span class="docs-recipe__arrow">
          <el-icon name="arrow-right" size="sm" />
        </span>
      </span>
    </el-button>
  </div>

  <div class="docs-recipe__item docs-recipe__item--loading">
    <el-button
      variant="primary"
      [attr.aria-busy]="saveState() === 'loading' ? 'true' : null"
      (click)="runSave()"
    >
      <span class="docs-recipe__swap" aria-live="polite">
        <span
          class="docs-recipe__swap-layer"
          [class.docs-recipe__swap-layer--in]="saveState() === 'idle'"
        >
          <el-icon name="cloud-arrow-up" size="sm" />
          Save
        </span>
        <span
          class="docs-recipe__swap-layer"
          [class.docs-recipe__swap-layer--in]="saveState() === 'loading'"
        >
          <el-icon class="docs-recipe__spin" name="spinner" size="sm" />
          Saving
        </span>
        <span
          class="docs-recipe__swap-layer"
          [class.docs-recipe__swap-layer--in]="saveState() === 'success'"
        >
          <el-icon name="check" size="sm" />
          Saved
        </span>
      </span>
    </el-button>
  </div>

  <div class="docs-recipe__item docs-recipe__item--trace">
    <span class="docs-recipe__trace">
      <svg
        class="docs-recipe__trace-svg"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          class="docs-recipe__trace-path"
          pathLength="100"
          d="M 99 1 V 39 H 1 V 1 Z"
        />
      </svg>
      <el-button variant="outline">Hover me</el-button>
    </span>
  </div>

  <div
    class="docs-recipe__item docs-recipe__item--sparkle"
    [class.docs-recipe__item--sparkle-on]="favorited()"
  >
    <span class="docs-recipe__sparkle">
      <el-button
        variant="icon"
        iconStart="heart"
        [iconVariant]="favorited() ? 'solid' : 'regular'"
        [ariaLabel]="favorited() ? 'Unlike' : 'Like'"
        (click)="toggleFavorite()"
      />
    </span>
  </div>
</div>`;

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

  protected runProgress(): void {
    if (this.progressState() !== 'idle') {
      return;
    }
    this.progressState.set('running');
    this.later(() => {
      this.progressState.set('success');
      this.later(() => this.progressState.set('idle'), 1800);
    }, 1100);
  }

  protected async copyRecipe(): Promise<void> {
    if (this.copied()) {
      return;
    }
    try {
      await navigator.clipboard.writeText('npx @ng-elemental/cli add button');
    } catch {
      // Demo still morphs if clipboard permission is denied.
    }
    this.copied.set(true);
    this.later(() => this.copied.set(false), 2000);
  }

  protected playSlide(): void {
    if (this.slideOn()) {
      return;
    }
    this.slideOn.set(true);
    this.later(() => this.slideOn.set(false), 650);
  }

  protected runSave(): void {
    if (this.saveState() !== 'idle') {
      return;
    }
    this.saveState.set('loading');
    this.later(() => {
      this.saveState.set('success');
      this.later(() => this.saveState.set('idle'), 1800);
    }, 1200);
  }

  protected toggleFavorite(): void {
    this.favorited.update((value) => !value);
    this.sparkleBurstId.update((id) => id + 1);
    const burstId = this.sparkleBurstId();
    this.later(() => {
      if (this.sparkleBurstId() === burstId) {
        this.sparkleBurstId.set(0);
      }
    }, 800);
  }

  protected async copyPage(): Promise<void> {
    await navigator.clipboard.writeText(this.pageMarkdown);
    this.pageCopied.set(true);
    this.later(() => this.pageCopied.set(false), 2000);
  }

  private later(fn: () => void, ms: number): void {
    const id = setTimeout(() => {
      this.timeouts.delete(id);
      fn();
    }, this.motionMs(ms));
    this.timeouts.add(id);
  }

  private motionMs(ms: number): number {
    if (
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return Math.min(ms, 80);
    }
    return ms;
  }
}
