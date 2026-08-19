import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ElPagination, type ElPaginationSize } from './pagination';

@Component({
  selector: 'el-pagination-story-host',
  imports: [ElPagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-pagination
      [(page)]="page"
      [(pageSize)]="pageSize"
      [total]="total()"
      [size]="size()"
      [showFirstLast]="showFirstLast()"
      [showPageSize]="showPageSize()"
      [siblingCount]="siblingCount()"
    />
  `,
})
class PaginationStoryHost {
  readonly total = input(240);
  readonly size = input<ElPaginationSize>('md');
  readonly showFirstLast = input(true);
  readonly showPageSize = input(false);
  readonly siblingCount = input(1);
  protected readonly page = signal(1);
  protected readonly pageSize = signal(10);
}

const meta: Meta<ElPagination> = {
  title: 'Components/Pagination',
  component: ElPagination,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showFirstLast: { control: 'boolean' },
    showPageSize: { control: 'boolean' },
  },
  args: {
    size: 'md',
    showFirstLast: true,
    showPageSize: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [PaginationStoryHost] },
    template: `
      <el-pagination-story-host
        [size]="size"
        [showFirstLast]="showFirstLast"
        [showPageSize]="showPageSize"
      />
    `,
  }),
};

export default meta;
type Story = StoryObj<ElPagination>;

export const Default: Story = {};

export const ManyPages: Story = {
  render: () => ({
    moduleMetadata: { imports: [PaginationStoryHost] },
    template: `
      <el-pagination-story-host [total]="1000" [siblingCount]="1" />
    `,
  }),
};

export const WithPageSize: Story = {
  render: () => ({
    moduleMetadata: { imports: [PaginationStoryHost] },
    template: `<el-pagination-story-host [total]="480" showPageSize />`,
  }),
};

export const Compact: Story = {
  render: () => ({
    moduleMetadata: { imports: [PaginationStoryHost] },
    template: `
      <el-pagination-story-host
        [total]="40"
        size="sm"
        [showFirstLast]="false"
      />
    `,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [PaginationStoryHost] },
    template: `<el-pagination-story-host [total]="120" showPageSize />`,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const nav = canvas.getByRole('navigation', { name: 'Pagination' });
    const pageTwo = canvas.getByRole('button', { name: 'Page 2' });
    const next = canvas.getByRole('button', { name: 'Next page' });

    await step('Navigation landmark and current page', async () => {
      await expect(nav).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Page 1' })).toHaveAttribute(
        'aria-current',
        'page',
      );
    });

    await step('Page buttons update current page', async () => {
      await userEvent.click(pageTwo);
      await expect(pageTwo).toHaveAttribute('aria-current', 'page');
      await userEvent.click(next);
      await expect(canvas.getByRole('button', { name: 'Page 3' })).toHaveAttribute(
        'aria-current',
        'page',
      );
    });
  },
};
