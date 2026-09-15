import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElAspectRatio,
  ElAvatar,
  ElButton,
  ElCard,
  ElGrid,
  ElIcon,
  ElSlideToggle,
  ElStack,
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
  selector: 'app-card-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElAspectRatio,
    ElAvatar,
    ElButton,
    ElCard,
    ElGrid,
    ElIcon,
    ElSlideToggle,
    ElStack,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './card-doc.html',
  styleUrl: './page.scss',
})
export class CardDocPage {
  protected readonly installTab = signal('cli');
  protected readonly marketingEmails = signal(true);
  protected readonly productUpdates = signal(false);

  protected readonly addCode = `npx @ng-elemental/cli add card
# optional — for the recipe examples:
npx @ng-elemental/cli add aspect-ratio
npx @ng-elemental/cli add stack
npx @ng-elemental/cli add grid
npx @ng-elemental/cli add avatar
npx @ng-elemental/cli add button
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add slide-toggle`;

  protected readonly manualFilesCode = `ui/card/card.ts
ui/card/card.html
ui/card/card.scss`;

  protected readonly importSnippet = `import { ElCard } from './ui/card/card';`;

  protected readonly usageSnippet = `<el-card appearance="outlined">
  <div elCardHeader>
    <div elCardTitle>Notifications</div>
    <div elCardDescription>Choose what you want to hear about.</div>
  </div>
  <div elCardContent>…</div>
  <div elCardFooter>
    <el-button size="sm" variant="secondary">Cancel</el-button>
    <el-button size="sm">Save</el-button>
  </div>
</el-card>`;

  protected readonly heroCode = `<el-card style="max-width: 22rem">
  <el-aspect-ratio elCardMedia ratio="16/9">
    <img
      style="width: 100%; height: 100%; object-fit: cover"
      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&q=80"
      alt=""
    />
  </el-aspect-ratio>
  <div elCardHeader>
    <div elCardTitle>Trail overlook pack</div>
    <div elCardDescription>
      Daypack with weather shell for weekend hikes.
    </div>
  </div>
  <div elCardContent>$128</div>
  <div elCardFooter>
    <el-button size="sm" variant="secondary">View</el-button>
    <el-button size="sm">Add to cart</el-button>
  </div>
</el-card>`;

  protected readonly statsCode = `<el-grid minItemWidth="12rem" gap="4" style="width: 100%">
  <el-card>
    <div elCardHeader>
      <div elCardTitle>Revenue</div>
      <div elCardDescription>Last 30 days</div>
    </div>
    <div elCardContent>
      <div class="el-text-h3">$48.2k</div>
      <div class="el-text-muted">+12.4% vs prior</div>
    </div>
  </el-card>
  <el-card>
    <div elCardHeader>
      <div elCardTitle>Active users</div>
      <div elCardDescription>Last 30 days</div>
    </div>
    <div elCardContent>
      <div class="el-text-h3">3,842</div>
      <div class="el-text-muted">+8.1% vs prior</div>
    </div>
  </el-card>
  <el-card>
    <div elCardHeader>
      <div elCardTitle>Churn</div>
      <div elCardDescription>Last 30 days</div>
    </div>
    <div elCardContent>
      <div class="el-text-h3">1.8%</div>
      <div class="el-text-muted">−0.3 pts vs prior</div>
    </div>
  </el-card>
</el-grid>`;

  protected readonly profileCode = `<el-card appearance="elevated" style="max-width: 22rem">
  <div elCardHeader>
    <el-stack direction="row" gap="3" align="center">
      <el-avatar initials="AL" alt="" />
      <el-stack gap="2" style="min-width: 0">
        <div elCardTitle>Ada Lovelace</div>
        <div elCardDescription>Mathematician · London</div>
      </el-stack>
    </el-stack>
  </div>
  <div elCardContent>
    Working on analytical engines and early computing notes.
  </div>
  <div elCardFooter>
    <el-button size="sm" variant="secondary">Message</el-button>
    <el-button size="sm">Follow</el-button>
  </div>
</el-card>`;

  protected readonly settingsCode = `<el-card style="width: 100%">
  <div elCardHeader>
    <div elCardTitle>Email preferences</div>
    <div elCardDescription>
      Choose which product emails you want to receive.
    </div>
  </div>
  <div elCardContent>
    <el-stack gap="4">
      <el-slide-toggle [(checked)]="marketingEmails" inputId="card-marketing">
        Marketing emails
      </el-slide-toggle>
      <el-slide-toggle [(checked)]="productUpdates" inputId="card-updates">
        Product updates
      </el-slide-toggle>
    </el-stack>
  </div>
  <div elCardFooter>
    <el-button size="sm" variant="secondary">Cancel</el-button>
    <el-button size="sm">Save</el-button>
  </div>
</el-card>`;

  protected readonly compactCode = `<div class="docs-stack" style="width: 100%; max-width: 28rem">
  <el-card size="compact">
    <el-icon elCardMedia name="file-lines" />
    <div elCardHeader>report.pdf</div>
    <div elCardContent>2.4 MB</div>
    <div elCardFooter>
      <el-button
        variant="ghost"
        size="sm"
        iconStart="xmark"
        ariaLabel="Remove report.pdf"
      />
    </div>
  </el-card>
  <el-card size="compact">
    <el-icon elCardMedia name="image" />
    <div elCardHeader>
      quarterly-financial-summary-final-v12.png
    </div>
    <div elCardContent>840 KB</div>
    <div elCardFooter>
      <el-button size="sm" variant="ghost">Replace</el-button>
      <el-button
        variant="ghost"
        size="sm"
        iconStart="xmark"
        ariaLabel="Remove quarterly-financial-summary-final-v12.png"
      />
    </div>
  </el-card>
</div>`;

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
        'Media region — full-bleed on top (default) or leading icon/thumb (compact). Compose with el-aspect-ratio for fixed ratios.',
    },
    {
      name: 'elCardHeader',
      type: 'attribute',
      default: '—',
      description: 'Header region (title, avatar row, file name).',
    },
    {
      name: 'elCardTitle',
      type: 'attribute',
      default: '—',
      description: 'Optional title text inside the header (semibold on-surface).',
    },
    {
      name: 'elCardDescription',
      type: 'attribute',
      default: '—',
      description: 'Optional muted description under the title.',
    },
    {
      name: 'elCardContent',
      type: 'attribute',
      default: '—',
      description: 'Body content (copy, KPIs, form rows, file size).',
    },
    {
      name: 'elCardFooter',
      type: 'attribute',
      default: '—',
      description: 'Footer actions or meta (end-aligned by default).',
    },
  ];
}
