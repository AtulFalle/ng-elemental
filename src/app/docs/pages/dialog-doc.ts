import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  EL_DIALOG_DATA,
  ElButton,
  ElDialog,
  ElDialogClose,
  ElDialogRef,
  ElDialogService,
  ElStep,
  ElStepContent,
  ElStepper,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

interface EditUserData {
  userId: number;
}

@Component({
  selector: 'app-edit-user-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElButton, ElDialogClose],
  template: `
    <p>Editing user {{ data.userId }}.</p>
    <div
      style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem"
    >
      <el-button elDialogClose variant="ghost">Cancel</el-button>
      <el-button (click)="dialogRef.close(true)">Save</el-button>
    </div>
  `,
})
export class EditUserDialog {
  readonly data = inject<EditUserData>(EL_DIALOG_DATA);
  readonly dialogRef = inject(ElDialogRef);
}

@Component({
  selector: 'app-dialog-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElDialog,
    ElDialogClose,
    ElStepper,
    ElStep,
    ElStepContent,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './dialog-doc.html',
  styleUrl: './page.scss',
})
export class DialogDocPage {
  private readonly dialog = inject(ElDialogService);
  private readonly wizardStepper = viewChild('wizardStepper', {
    read: ElStepper,
  });

  protected readonly open = signal(false);
  protected readonly scrollOpen = signal(false);
  protected readonly headerOpen = signal(false);
  protected readonly wizardOpen = signal(false);
  protected readonly wizardStep = signal('account');
  protected readonly serviceResult = signal<string | null>(null);

  protected readonly heroPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly scrollPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly headerPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly servicePanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly wizardPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add dialog`;

  protected readonly importCode = `import { signal } from '@angular/core';
import { ElDialog, ElDialogClose } from './ui/dialog/dialog';
import { ElButton } from './ui/button/button';

@Component({
  imports: [ElDialog, ElDialogClose, ElButton],
  template: \`
    <el-button (click)="open.set(true)">Edit</el-button>
    <el-dialog [(open)]="open" title="Edit profile">
      <div elDialogContent>Profile fields</div>
      <div elDialogFooter>
        <el-button elDialogClose variant="ghost">Cancel</el-button>
        <el-button>Save</el-button>
      </div>
    </el-dialog>
  \`,
})
export class MyComponent {
  protected readonly open = signal(false);
}`;

  protected readonly usageCode = `<el-button (click)="open.set(true)">Open dialog</el-button>
<el-dialog [(open)]="open" title="Edit profile" size="md">
  <div elDialogContent>
    Header and footer stay put. Long content scrolls inside the panel.
  </div>
  <div elDialogFooter>
    <el-button elDialogClose variant="ghost">Cancel</el-button>
    <el-button (click)="open.set(false)">Save</el-button>
  </div>
</el-dialog>`;

  protected readonly scrollCode = `<el-dialog [(open)]="open" title="Release notes" size="sm">
  <div elDialogContent>
    @for (n of paragraphs; track n) {
      <p>Paragraph {{ n }} of a long body that should scroll.</p>
    }
  </div>
  <div elDialogFooter>
    <el-button elDialogClose variant="ghost">Close</el-button>
  </div>
</el-dialog>`;

  protected readonly headerCode = `<el-dialog [(open)]="open" size="sm">
  <div elDialogHeader>Discard draft?</div>
  <div elDialogContent>Unsaved paragraphs will be lost.</div>
  <div elDialogFooter>
    <el-button elDialogClose variant="ghost">Keep editing</el-button>
    <el-button (click)="open.set(false)">Discard</el-button>
  </div>
</el-dialog>`;

  protected readonly serviceCode = `import { ElDialogService, ElDialogRef, EL_DIALOG_DATA } from './ui/dialog/dialog.service';

const ref = this.dialog.open(EditUserDialog, {
  data: { userId: 1 },
  title: 'Edit user',
  size: 'sm',
});
const saved = await ref.afterClosed;

@Component({ ... })
export class EditUserDialog {
  readonly data = inject(EL_DIALOG_DATA);
  readonly dialogRef = inject(ElDialogRef);
}`;

  protected readonly wizardCode = `<el-dialog [(open)]="open" title="Workspace setup" size="lg">
  <div elDialogContent>
    <el-stepper #stepper [(value)]="step" ariaLabel="Workspace setup">
      <el-step value="account" label="Account">
        <ng-template elStepContent>Account fields</ng-template>
      </el-step>
    </el-stepper>
  </div>
  <div elDialogFooter>
    <el-button variant="ghost" [disabled]="stepper.isFirst()" (click)="stepper.previous()">
      Back
    </el-button>
    <el-button (click)="stepper.next()">Next</el-button>
  </div>
</el-dialog>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly dialogProps: PropDefinition[] = [
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
        'Header text when elDialogHeader is omitted. Names the dialog via the title heading.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Panel width. Content scrolls so the shell stays on screen.',
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
      description: 'Accessible name when there is no visible title.',
    },
  ];

  protected readonly serviceProps: PropDefinition[] = [
    {
      name: 'data',
      type: 'unknown',
      default: 'undefined',
      description: 'Injected as EL_DIALOG_DATA in the opened component.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Shell title for service-opened dialogs.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Same sizes as el-dialog.',
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
      description: 'Dismiss on Escape. Only the top stacked dialog responds.',
    },
  ];

  protected wizardBack(): void {
    this.wizardStepper()?.previous();
  }

  protected wizardNext(): void {
    this.wizardStepper()?.next();
  }

  protected wizardIsFirst(): boolean {
    return this.wizardStepper()?.isFirst() ?? true;
  }

  protected wizardIsLast(): boolean {
    return this.wizardStepper()?.isLast() ?? false;
  }

  protected async openService(): Promise<void> {
    const ref = this.dialog.open(EditUserDialog, {
      data: { userId: 42 },
      title: 'Edit user',
      size: 'sm',
    });
    const saved = await ref.afterClosed;
    this.serviceResult.set(saved ? 'saved' : 'dismissed');
  }
}
