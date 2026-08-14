import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElIcon, ElSlideToggle } from '@ng-elemental/ui';
import { SLIDE_TOGGLE_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-slide-toggle-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElIcon,
    ElSlideToggle,
    CodeBlock,
    Preview,
    PropsTable,
    TokensTable,
  ],
  templateUrl: './slide-toggle-doc.html',
  styleUrl: './page.scss',
})
export class SlideToggleDocPage {
  protected readonly slideToggleTokens = SLIDE_TOGGLE_TOKENS;
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

  protected readonly usageCode = `<el-slide-toggle [(checked)]="enabled" inputId="notifications">
  Notifications
</el-slide-toggle>

<el-slide-toggle labelPosition="left" [(checked)]="wifi" inputId="wifi">
  Wi-Fi
</el-slide-toggle>

<el-slide-toggle [(checked)]="wifi" inputId="wifi">
  <el-icon elSlideToggleTrackOnIcon name="check" size="sm" />
  <el-icon elSlideToggleTrackOffIcon name="xmark" size="sm" />
  Wi-Fi
</el-slide-toggle>

<el-slide-toggle [(checked)]="darkMode" inputId="dark-mode">
  <el-icon elSlideToggleThumbOnIcon name="check" size="sm" />
  <el-icon elSlideToggleThumbOffIcon name="xmark" size="sm" />
  Dark mode
</el-slide-toggle>`;

  protected readonly globalTokensCode = `:root {
  --el-slide-toggle-track-on-bg: #6750a4;
  --el-slide-toggle-track-off-bg: #f9fafb;
  --el-slide-toggle-track-off-border: #79747e;
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
