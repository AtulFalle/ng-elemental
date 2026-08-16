import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ElCarousel, ElCarouselSlide } from './carousel';

const SLIDE_STYLE =
  'display:flex;align-items:center;justify-content:center;min-height:12rem;font:600 1.25rem/1.2 var(--el-font-sans, sans-serif);color:var(--el-color-on-primary)';

const meta: Meta<ElCarousel> = {
  title: 'Components/Carousel',
  component: ElCarousel,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loop: { control: 'boolean' },
  },
  args: {
    size: 'md',
    loop: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ElCarousel, ElCarouselSlide] },
    template: `
      <el-carousel
        [size]="size"
        [loop]="loop"
        ariaLabel="Screenshots"
        style="max-width: 28rem"
      >
        <el-carousel-slide>
          <div style="${SLIDE_STYLE};background:var(--el-color-primary)">One</div>
        </el-carousel-slide>
        <el-carousel-slide>
          <div style="${SLIDE_STYLE};background:var(--el-color-secondary)">Two</div>
        </el-carousel-slide>
        <el-carousel-slide>
          <div style="${SLIDE_STYLE};background:var(--el-color-tertiary, var(--el-color-primary))">Three</div>
        </el-carousel-slide>
      </el-carousel>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElCarousel>;

export const Default: Story = {};

export const Loop: Story = {
  args: { loop: true },
};

@Component({
  selector: 'el-carousel-autoplay-story-host',
  imports: [ElCarousel, ElCarouselSlide],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-carousel
      loop
      [autoplay]="3000"
      [(index)]="index"
      ariaLabel="Autoplay screenshots"
      style="max-width: 28rem"
    >
      <el-carousel-slide>
        <div style="${SLIDE_STYLE};background:var(--el-color-primary)">One</div>
      </el-carousel-slide>
      <el-carousel-slide>
        <div style="${SLIDE_STYLE};background:var(--el-color-secondary)">Two</div>
      </el-carousel-slide>
      <el-carousel-slide>
        <div style="${SLIDE_STYLE};background:var(--el-color-primary)">Three</div>
      </el-carousel-slide>
    </el-carousel>
  `,
})
class CarouselAutoplayStoryHost {
  protected readonly index = signal(0);
}

export const Autoplay: Story = {
  render: () => ({
    moduleMetadata: { imports: [CarouselAutoplayStoryHost] },
    template: `<el-carousel-autoplay-story-host />`,
  }),
};

export const Peek: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElCarousel, ElCarouselSlide] },
    template: `
      <el-carousel
        loop
        [peek]="24"
        ariaLabel="Peeking slides"
        style="max-width: 28rem"
      >
        <el-carousel-slide>
          <div style="${SLIDE_STYLE};background:var(--el-color-primary)">One</div>
        </el-carousel-slide>
        <el-carousel-slide>
          <div style="${SLIDE_STYLE};background:var(--el-color-secondary)">Two</div>
        </el-carousel-slide>
        <el-carousel-slide>
          <div style="${SLIDE_STYLE};background:var(--el-color-primary)">Three</div>
        </el-carousel-slide>
        <el-carousel-slide>
          <div style="${SLIDE_STYLE};background:var(--el-color-secondary)">Four</div>
        </el-carousel-slide>
      </el-carousel>
    `,
  }),
};

export const ManySlides: Story = {
  render: () => ({
    props: { slides: [1, 2, 3, 4, 5, 6, 7, 8] },
    moduleMetadata: { imports: [ElCarousel, ElCarouselSlide] },
    template: `
      <el-carousel loop ariaLabel="Many slides" style="max-width: 28rem">
        @for (n of slides; track n) {
          <el-carousel-slide>
            <div style="${SLIDE_STYLE};background:var(--el-color-primary)">{{ n }}</div>
          </el-carousel-slide>
        }
      </el-carousel>
    `,
  }),
};
