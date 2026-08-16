import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  EL_SHEET_DATA,
  ElButton,
  ElSheet,
  ElSheetClose,
  ElSheetRef,
  ElSheetService,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

interface EditFiltersData {
  userId: number;
}

@Component({
  selector: 'app-edit-filters-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElButton, ElSheetClose],
  template: `
    <p>Filters for user {{ data.userId }}.</p>
    <div
      style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem"
    >
      <el-button elSheetClose variant="ghost">Cancel</el-button>
      <el-button (click)="sheetRef.close(true)">Apply</el-button>
    </div>
  `,
})
export class EditFiltersSheet {
  readonly data = inject<EditFiltersData>(EL_SHEET_DATA);
  readonly sheetRef = inject(ElSheetRef);
}

@Component({
  selector: 'app-sheet-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElSheet,
    ElSheetClose,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './sheet-doc.html',
  styleUrl: './page.scss',
})
export class SheetDocPage {
  private readonly sheet = inject(ElSheetService);

  protected readonly open = signal(false);
  protected readonly sideOpen = signal(false);
  protected readonly serviceResult = signal<string | null>(null);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add sheet`;

  protected readonly importCode = `import { ElSheet, ElSheetClose } from './ui/sheet/sheet';
import { ElButton } from './ui/button/button';

@Component({
  imports: [ElSheet, ElSheetClose, ElButton],
  template: \`
    <el-button (click)="open.set(true)">Filters</el-button>
    <el-sheet [(open)]="open" title="Filters" side="bottom">
      <div elSheetContent>Filter fields</div>
      <div elSheetFooter>
        <el-button elSheetClose variant="ghost">Cancel</el-button>
        <el-button>Apply</el-button>
      </div>
    </el-sheet>
  \`,
})
export class MyComponent {
  protected open = false;
}`;

  protected readonly usageCode = `<el-sheet [(open)]="open" title="Filters" side="bottom" size="md">
  <div elSheetContent>Any HTML or components.</div>
  <div elSheetFooter>
    <el-button elSheetClose variant="ghost">Cancel</el-button>
    <el-button>Apply</el-button>
  </div>
</el-sheet>`;

  protected readonly serviceCode = `import { ElSheetService, ElSheetRef, EL_SHEET_DATA } from './ui/sheet/sheet.service';

const ref = this.sheet.open(EditFiltersSheet, {
  data: { userId: 1 },
  title: 'Filters',
  side: 'bottom',
  size: 'sm',
});
const applied = await ref.afterClosed;`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly sheetProps: PropDefinition[] = [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description: 'Open state. Bind [(open)] to control it.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description:
        'Header text when elSheetHeader is omitted. Sets aria-labelledby.',
    },
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'bottom'",
      description: 'Edge the panel attaches to.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description:
        'Max-height for top/bottom, width for left/right. Content scrolls.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: 'Shows a close button in the header.',
    },
    {
      name: 'closeOnBackdrop',
      type: 'boolean',
      default: 'true',
      description: 'Dismiss when the backdrop is clicked.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Dismiss on Escape.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible name when there is no title.',
    },
  ];

  protected readonly serviceProps: PropDefinition[] = [
    {
      name: 'data',
      type: 'unknown',
      default: 'undefined',
      description: 'Injected as EL_SHEET_DATA in the opened component.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Shell title for service-opened sheets.',
    },
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'bottom'",
      description: 'Same sides as el-sheet.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Same sizes as el-sheet.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: 'Header close button.',
    },
    {
      name: 'closeOnBackdrop',
      type: 'boolean',
      default: 'true',
      description: 'Dismiss when the backdrop is clicked.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Dismiss on Escape. Only the top stacked sheet responds.',
    },
  ];

  protected async openService(): Promise<void> {
    const ref = this.sheet.open(EditFiltersSheet, {
      data: { userId: 42 },
      title: 'Filters',
      size: 'sm',
      side: 'bottom',
    });
    const saved = await ref.afterClosed;
    this.serviceResult.set(saved ? 'applied' : 'dismissed');
  }
}
