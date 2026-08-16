import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElCarousel,
  ElCarouselSlide,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-carousel-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElCarousel,
    ElCarouselSlide,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './carousel-doc.html',
  styleUrl: './page.scss',
})
export class CarouselDocPage {
  protected readonly index = signal(0);
  protected readonly peekIndex = signal(0);
  protected readonly many = [1, 2, 3, 4, 5, 6];

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add carousel
# required — prev/next chevrons:
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button`;

  protected readonly importCode = `import { ElCarousel, ElCarouselSlide } from './ui/carousel/carousel';

@Component({
  imports: [ElCarousel, ElCarouselSlide],
  template: \`
    <el-carousel ariaLabel="Screenshots">
      <el-carousel-slide>One</el-carousel-slide>
      <el-carousel-slide>Two</el-carousel-slide>
    </el-carousel>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-carousel [(index)]="i" loop [autoplay]="4000" [peek]="24" ariaLabel="Screenshots">
  <el-carousel-slide>
    <img src="dashboard.png" alt="Dashboard" />
  </el-carousel-slide>
  <el-carousel-slide>…</el-carousel-slide>
</el-carousel>`;

  protected readonly scopedTokensCode = `.hero {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly carouselProps: PropDefinition[] = [
    {
      name: 'index',
      type: 'number',
      default: '0',
      description: 'Active slide (model). Prev/next/dots update this on the parent.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'false',
      description: 'Wrap from last slide to first and the other way.',
    },
    {
      name: 'autoplay',
      type: 'number',
      default: '0',
      description: 'Interval in ms. 0 is off. Pauses on hover, focus, or drag.',
    },
    {
      name: 'peek',
      type: 'number',
      default: '0',
      description: 'Pixels of neighboring slides visible on each side.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Prev/next control size.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Block arrows, dots, keyboard, drag, and autoplay.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Accessible name for the carousel region.',
    },
  ];
}
