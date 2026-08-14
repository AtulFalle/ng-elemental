import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElSlider } from '@ng-elemental/ui';
import { SLIDER_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-slider-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElSlider, CodeBlock, Preview, PropsTable, TokensTable],
  templateUrl: './slider-doc.html',
  styleUrl: './page.scss',
})
export class SliderDocPage {
  protected readonly sliderTokens = SLIDER_TOKENS;
  protected readonly volume = signal(40);
  protected readonly minPrice = signal(25);
  protected readonly maxPrice = signal(75);
  protected readonly rating = signal(3);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add slider`;

  protected readonly importCode = `import { ElSlider } from './ui/slider/slider';

@Component({
  imports: [ElSlider],
  template: \`
    <el-slider [(value)]="volume" showValue />
    <el-slider range [(start)]="min" [(end)]="max" [step]="5" showTicks showValue />
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-slider [(value)]="volume" [min]="0" [max]="100" showValue />
<el-slider
  range
  [(start)]="minPrice"
  [(end)]="maxPrice"
  [step]="5"
  showTicks
  showValue
/>`;

  protected readonly globalTokensCode = `:root {
  --el-slider-fill-bg: #1d4ed8;
  --el-slider-track-bg: #e5e7eb;
  --el-slider-thumb-border: #1d4ed8;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'value',
      type: 'ModelSignal<number>',
      default: '0',
      description: 'Current value in single-thumb mode (`[(value)]`).',
    },
    {
      name: 'start',
      type: 'ModelSignal<number>',
      default: '0',
      description: 'Range lower thumb (`[(start)]`). Used when `range` is set.',
    },
    {
      name: 'end',
      type: 'ModelSignal<number>',
      default: '100',
      description: 'Range upper thumb (`[(end)]`). Used when `range` is set.',
    },
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'Lower bound. Invalid min/max pairs fall back to 0…100.',
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Upper bound.',
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'Snap increment. Non-positive values fall back to 1.',
    },
    {
      name: 'range',
      type: 'boolean',
      default: 'false',
      description: 'Enable dual thumbs bound to `start` / `end`.',
    },
    {
      name: 'showTicks',
      type: 'boolean',
      default: 'false',
      description: 'Show tick marks at each step (density capped when many).',
    },
    {
      name: 'showValue',
      type: 'boolean',
      default: 'false',
      description: 'Show the current value label above each thumb.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Track thickness and thumb diameter.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disable pointer and keyboard interaction.',
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: 'Error styling on the fill and thumb border.',
    },
  ];
}
