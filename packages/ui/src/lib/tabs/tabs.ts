import { NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import { ElTab } from './tab';

export { ElTab, ElTabContent, ElTabLabel } from './tab';

@Component({
  selector: 'el-tabs',
  imports: [NgTemplateOutlet, ElIcon],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-tabs',
    '[class.el-tabs--disabled]': 'disabled()',
    '[class.el-tabs--overflow]': 'overflow()',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class ElTabs {
  private static nextId = 0;

  readonly value = model<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  private readonly uid = ElTabs.nextId++;
  readonly tabs = contentChildren(ElTab);
  private readonly listRef = viewChild<ElementRef<HTMLElement>>('tabList');
  private readonly tabButtons =
    viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  private readonly destroyRef = inject(DestroyRef);
  private watchedList: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  protected readonly overflow = signal(false);
  protected readonly canScrollStart = signal(false);
  protected readonly canScrollEnd = signal(false);

  protected readonly activeTab = computed(() => {
    const items = this.tabs();
    const current = this.value();
    const match = items.find(
      (tab) => tab.value() === current && !this.isItemDisabled(tab.disabled()),
    );
    if (match) {
      return match;
    }
    return items.find((tab) => !this.isItemDisabled(tab.disabled()));
  });

  protected readonly activeIndex = computed(() => {
    const active = this.activeTab();
    if (!active) {
      return -1;
    }
    return this.tabs().indexOf(active);
  });

  constructor() {
    this.destroyRef.onDestroy(() => this.disconnectOverflowWatch());

    afterRenderEffect(() => {
      this.tabs();
      this.tabButtons();
      const el = this.listRef()?.nativeElement;
      if (!el) {
        return;
      }
      this.attachOverflowWatch(el);
      this.updateScrollState();
    });
  }

  isItemDisabled(itemDisabled: boolean): boolean {
    return this.disabled() || itemDisabled;
  }

  protected isSelected(tab: ElTab): boolean {
    return this.activeTab() === tab;
  }

  protected tabIndex(tab: ElTab): number {
    if (this.isItemDisabled(tab.disabled())) {
      return -1;
    }
    return this.isSelected(tab) ? 0 : -1;
  }

  tabId(index: number): string {
    return `el-tabs-${this.uid}-tab-${index}`;
  }

  panelId(index: number): string {
    return `el-tabs-${this.uid}-panel-${index}`;
  }

  select(itemValue: string): void {
    if (this.disabled()) {
      return;
    }
    const tab = this.tabs().find((item) => item.value() === itemValue);
    if (!tab || this.isItemDisabled(tab.disabled())) {
      return;
    }
    this.value.set(itemValue);
  }

  protected onTabClick(tab: ElTab, index: number): void {
    this.select(tab.value());
    this.scrollTabIntoView(index);
  }

  protected scrollTabs(direction: -1 | 1): void {
    const list = this.listRef()?.nativeElement;
    if (!list || this.disabled()) {
      return;
    }

    const maxScroll = Math.max(0, list.scrollWidth - list.clientWidth);
    if (maxScroll <= 1) {
      return;
    }

    const page = Math.max(list.clientWidth * 0.8, 64);
    const current = list.scrollLeft;
    let next = current + direction * page;

    if (direction < 0) {
      next = next <= page * 0.35 ? 0 : next;
    } else {
      next = next >= maxScroll - page * 0.35 ? maxScroll : next;
    }

    this.scrollListTo(list, next);
  }

  onTabListKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const enabled = this.tabs()
      .map((tab, index) => ({ tab, index }))
      .filter(({ tab }) => !this.isItemDisabled(tab.disabled()));
    if (enabled.length === 0) {
      return;
    }

    const currentIndex = enabled.findIndex(({ tab }) => this.isSelected(tab));
    const resolved = currentIndex >= 0 ? currentIndex : 0;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const next = (resolved + 1) % enabled.length;
      this.selectAndFocus(enabled[next].index);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const next = (resolved - 1 + enabled.length) % enabled.length;
      this.selectAndFocus(enabled[next].index);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.selectAndFocus(enabled[0].index);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.selectAndFocus(enabled[enabled.length - 1].index);
    }
  }

  private selectAndFocus(index: number): void {
    const tab = this.tabs()[index];
    this.select(tab.value());
    this.focusTab(index);
  }

  private focusTab(index: number): void {
    const button = this.tabButtons()[index]?.nativeElement;
    button?.focus();
    this.scrollTabIntoView(index);
  }

  private scrollTabIntoView(index: number): void {
    const list = this.listRef()?.nativeElement;
    const tab = this.tabButtons()[index]?.nativeElement;
    if (!list || !tab) {
      return;
    }

    const { start, end } = this.tabRangeInList(tab, list);
    const viewStart = list.scrollLeft;
    const viewEnd = viewStart + list.clientWidth;

    if (start < viewStart + 1) {
      this.scrollListTo(list, start);
      return;
    }

    if (end > viewEnd - 1) {
      this.scrollListTo(list, end - list.clientWidth);
    }
  }

  private tabRangeInList(
    tab: HTMLElement,
    list: HTMLElement,
  ): { start: number; end: number } {
    const tabRect = tab.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    const start = list.scrollLeft + (tabRect.left - listRect.left);
    return { start, end: start + tabRect.width };
  }

  private scrollListTo(list: HTMLElement, left: number): void {
    const maxScroll = Math.max(0, list.scrollWidth - list.clientWidth);
    list.scrollTo({
      left: Math.min(maxScroll, Math.max(0, left)),
      behavior: 'smooth',
    });
  }

  private attachOverflowWatch(el: HTMLElement): void {
    if (this.watchedList === el) {
      return;
    }

    this.disconnectOverflowWatch();
    this.watchedList = el;
    el.addEventListener('scroll', this.onListScroll, { passive: true });

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.updateScrollState());
    this.resizeObserver.observe(el);
  }

  private disconnectOverflowWatch(): void {
    this.watchedList?.removeEventListener('scroll', this.onListScroll);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.watchedList = null;
  }

  private readonly onListScroll = (): void => {
    this.updateScrollState();
  };

  private updateScrollState(): void {
    const el = this.listRef()?.nativeElement;
    if (!el) {
      this.overflow.set(false);
      this.canScrollStart.set(false);
      this.canScrollEnd.set(false);
      return;
    }

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const overflowing = maxScroll > 1;
    this.overflow.set(overflowing);
    this.canScrollStart.set(overflowing && el.scrollLeft > 1);
    this.canScrollEnd.set(overflowing && el.scrollLeft < maxScroll - 1);
  }
}
