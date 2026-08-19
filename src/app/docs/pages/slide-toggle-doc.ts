import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElIcon, ElSlideToggle } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-slide-toggle-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElIcon, ElSlideToggle, CodeBlock, Preview, PropsTable],
  templateUrl: './slide-toggle-doc.html',
  styleUrl: './page.scss',
})
export class SlideToggleDocPage {
  protected readonly heroPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly iconsPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly statesPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly notifications = signal(true);
  protected readonly wifi = signal(true);
  protected readonly darkMode = signal(true);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add slide-toggle`;

  protected readonly importCode = `import { ElSlideToggle } from './ui/slide-toggle/slide-toggle';

@Component({
  imports: [ElSlideToggle],
  template: \`
    <el-slide-toggle [(checked)]="enabled" inputId="notifications">
      Notifications
    </el-slide-toggle>
  \`,
})
export class MyComponent {}`;

  protected readonly heroCode = `<el-slide-toggle [(checked)]="enabled" inputId="notifications">
  Notifications
</el-slide-toggle>`;

  protected readonly iconsCode = `<el-slide-toggle [(checked)]="wifi" inputId="wifi">
  <el-icon elSlideToggleTrackOnIcon name="check" size="sm" />
  <el-icon elSlideToggleTrackOffIcon name="xmark" size="sm" />
  Wi-Fi
</el-slide-toggle>`;

  protected readonly statesCode = `<el-slide-toggle [checked]="true" inputId="st-on">On</el-slide-toggle>
<el-slide-toggle [disabled]="true" inputId="st-disabled">Disabled</el-slide-toggle>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Two-way bindable on/off state via [(checked)].',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Track and thumb size.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Non-interactive slide toggle state.',
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description:
        'Error border on the track and aria-invalid. Pair with el-form-error for message text.',
    },
    {
      name: 'labelPosition',
      type: "'left' | 'right'",
      default: "'right'",
      description: 'Inline text placement relative to the track.',
    },
    {
      name: 'inputId',
      type: 'string',
      default: "''",
      description: 'Id applied to the native switch input.',
    },
    {
      name: 'name',
      type: 'string',
      default: "''",
      description: 'Name attribute for form submission.',
    },
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Value attribute for form submission.',
    },
  ];
}
