import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import {
  ElIcon,
  type ElIconSize,
} from '../icon/icon';
import {
  ElInput,
  ElInputSuffix,
  type ElInputSize,
} from '../input/input';
import { ElAutocompleteEmpty } from './autocomplete-empty';
import { ElAutocompleteLoading } from './autocomplete-loading';
import type {
  ElAutocompleteContext,
  ElAutocompleteOption,
} from './autocomplete.token';
import { EL_AUTOCOMPLETE } from './autocomplete.token';

export type ElAutocompleteSize = ElInputSize;

export { ElAutocompleteEmpty } from './autocomplete-empty';
export { ElAutocompleteLoading } from './autocomplete-loading';
export { ElAutocompleteItem } from './autocomplete-item';
export {
  EL_AUTOCOMPLETE,
  type ElAutocompleteContext,
  type ElAutocompleteOption,
} from './autocomplete.token';
export { ElInputPrefix, ElInputSuffix } from '../input/input';

@Component({
  selector: 'el-autocomplete',
  imports: [NgTemplateOutlet, ElInput, ElInputSuffix, ElIcon],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_AUTOCOMPLETE, useExisting: ElAutocomplete }],
  host: {
    class: 'el-autocomplete',
    '[class.el-autocomplete--sm]': 'size() === "sm"',
    '[class.el-autocomplete--md]': 'size() === "md"',
    '[class.el-autocomplete--lg]': 'size() === "lg"',
    '[class.el-autocomplete--open]': 'open()',
    '[class.el-autocomplete--disabled]': 'disabled()',
    '[class.el-autocomplete--error]': 'error()',
    '[class.el-autocomplete--panel-above]': 'panelAbove()',
    '(document:click)': 'onDocumentClick($event)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ElAutocomplete implements ElAutocompleteContext {
  private static nextId = 0;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);

  readonly value = model('');
  readonly query = model('');
  readonly size = input<ElAutocompleteSize>('md');
  readonly placeholder = input('');
  readonly inputId = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly error = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly filter = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();
  readonly ariaLabelledby = input('');
  readonly ariaDescribedby = input('');

  private readonly inputCmp = viewChild(ElInput);
  private readonly listRef = viewChild<ElementRef<HTMLElement>>('listbox');
  private readonly suffixSlot = contentChild(ElInputSuffix);
  private readonly loadingSlot = contentChild(ElAutocompleteLoading);
  private readonly emptySlot = contentChild(ElAutocompleteEmpty);

  private readonly registered = signal<ElAutocompleteOption[]>([]);
  private readonly hiddenIds = signal<ReadonlySet<string>>(new Set());
  protected readonly open = signal(false);
  private readonly activeOptionId = signal<string | null>(null);
  protected readonly panelAbove = signal(false);

  protected readonly listboxId = `el-autocomplete-listbox-${ElAutocomplete.nextId++}`;

  protected readonly hasCustomSuffix = computed(() => !!this.suffixSlot());

  protected readonly loadingTemplate = computed(
    () => this.loadingSlot()?.template ?? null,
  );

  protected readonly emptyTemplate = computed(
    () => this.emptySlot()?.template ?? null,
  );

  protected readonly slotContext = computed(() => {
    const q = this.query();
    return { $implicit: q, query: q };
  });

  protected readonly iconSize = computed((): ElIconSize => this.size());

  protected readonly activeDescendant = computed(
    () => this.activeOptionId() ?? '',
  );

  protected readonly visibleCount = computed(() => {
    const hidden = this.hiddenIds();
    return this.registered().filter((item) => !hidden.has(item.optionId))
      .length;
  });

  protected readonly showLoading = computed(
    () => this.open() && this.loading() && !!this.loadingSlot(),
  );

  protected readonly showEmpty = computed(
    () =>
      this.open() &&
      !this.loading() &&
      this.visibleCount() === 0 &&
      !!this.emptySlot(),
  );

  protected readonly showStatus = computed(
    () => this.showLoading() || this.showEmpty(),
  );

  register(item: ElAutocompleteOption): void {
    this.registered.update((items) =>
      items.some((existing) => existing.optionId === item.optionId)
        ? items
        : [...items, item],
    );
    // Required inputs are not readable in the item constructor (NG0950).
    afterNextRender(
      () => {
        if (this.value() === item.value() && this.query() === '') {
          this.query.set(item.displayLabel());
        }
        this.applyFilter();
      },
      { injector: this.injector },
    );
  }

  unregister(item: ElAutocompleteOption): void {
    this.registered.update((items) =>
      items.filter((existing) => existing.optionId !== item.optionId),
    );
    if (this.activeOptionId() === item.optionId) {
      this.activeOptionId.set(null);
    }
    this.applyFilter();
  }

  isSelected(itemValue: string): boolean {
    return this.value() === itemValue;
  }

  isItemDisabled(itemDisabled: boolean): boolean {
    return this.disabled() || itemDisabled;
  }

  isActive(optionId: string): boolean {
    return this.activeOptionId() === optionId;
  }

  isVisible(optionId: string): boolean {
    return !this.hiddenIds().has(optionId);
  }

  select(itemValue: string): void {
    if (this.disabled()) {
      return;
    }

    const item = this.registered().find((entry) => entry.value() === itemValue);
    if (!item || this.isItemDisabled(item.disabled())) {
      return;
    }

    this.value.set(itemValue);
    this.query.set(item.displayLabel());
    this.closePanel({ restoreQuery: false });
  }

  setActive(optionId: string): void {
    this.activeOptionId.set(optionId);
    this.scrollActiveIntoView();
  }

  protected onQueryChange(next: string): void {
    if (this.disabled()) {
      return;
    }

    this.query.set(next);

    if (next === '') {
      this.value.set('');
    }

    this.applyFilter();
    this.openPanel({ activate: 'first' });
  }

  protected onInputKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const enabled = this.enabledVisibleItems();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.open()) {
        this.openPanel({ activate: 'first' });
        return;
      }
      this.moveActive(1, enabled);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.open()) {
        this.openPanel({ activate: 'last' });
        return;
      }
      this.moveActive(-1, enabled);
      return;
    }

    if (event.key === 'Home') {
      if (!this.open() || enabled.length === 0) {
        return;
      }
      event.preventDefault();
      this.focusItemAt(enabled, 0);
      return;
    }

    if (event.key === 'End') {
      if (!this.open() || enabled.length === 0) {
        return;
      }
      event.preventDefault();
      this.focusItemAt(enabled, enabled.length - 1);
      return;
    }

    if (event.key === 'Enter') {
      if (!this.open()) {
        return;
      }
      event.preventDefault();
      const active = enabled.find(
        (item) => item.optionId === this.activeOptionId(),
      );
      if (active) {
        this.select(active.value());
      }
      return;
    }

    if (event.key === 'Escape') {
      if (!this.open()) {
        return;
      }
      event.preventDefault();
      this.closePanel({ restoreQuery: true });
    }
  }

  protected onFocusOut(event: FocusEvent): void {
    const related = event.relatedTarget as Node | null;
    if (related && this.elementRef.nativeElement.contains(related)) {
      return;
    }
    this.closePanel({ restoreQuery: true });
  }

  protected onChevronClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled()) {
      return;
    }

    if (this.open()) {
      this.closePanel({ restoreQuery: true });
      return;
    }

    this.openPanel({ activate: 'selectedOrFirst' });
    this.inputCmp()?.focus();
  }

  onDocumentClick(event: Event): void {
    if (!this.open()) {
      return;
    }

    const target = event.target as Node | null;
    if (target && this.elementRef.nativeElement.contains(target)) {
      return;
    }

    this.closePanel({ restoreQuery: true });
  }

  private applyFilter(): void {
    const useFilter = this.filter();
    const q = this.query().trim().toLowerCase();
    const hidden = new Set<string>();

    for (const item of this.registered()) {
      const match = !useFilter || q === '' || item.matchesQuery(q);
      item.setHidden(!match);
      if (!match) {
        hidden.add(item.optionId);
      }
    }

    this.hiddenIds.set(hidden);

    if (this.open()) {
      const enabled = this.enabledVisibleItems();
      const activeStillVisible = enabled.some(
        (item) => item.optionId === this.activeOptionId(),
      );
      if (!activeStillVisible) {
        this.activeOptionId.set(enabled[0]?.optionId ?? null);
        this.scrollActiveIntoView();
      }
    }
  }

  private enabledVisibleItems(): ElAutocompleteOption[] {
    const hidden = this.hiddenIds();
    return this.registered().filter(
      (item) =>
        !hidden.has(item.optionId) && !this.isItemDisabled(item.disabled()),
    );
  }

  private openPanel(options: {
    activate: 'first' | 'last' | 'selectedOrFirst';
  }): void {
    this.applyFilter();
    this.open.set(true);
    this.updatePanelPlacement();

    const enabled = this.enabledVisibleItems();
    if (enabled.length === 0) {
      this.activeOptionId.set(null);
      return;
    }

    if (options.activate === 'last') {
      this.focusItemAt(enabled, enabled.length - 1);
      return;
    }

    if (options.activate === 'selectedOrFirst') {
      const selected = enabled.find((item) => this.isSelected(item.value()));
      this.focusItemAt(enabled, selected ? enabled.indexOf(selected) : 0);
      return;
    }

    this.focusItemAt(enabled, 0);
  }

  private closePanel(options: { restoreQuery: boolean }): void {
    this.open.set(false);
    this.activeOptionId.set(null);
    this.panelAbove.set(false);

    if (options.restoreQuery) {
      this.restoreQueryFromValue();
    }
  }

  private restoreQueryFromValue(): void {
    const committed = this.value();
    if (!committed) {
      this.query.set('');
      return;
    }

    const item = this.registered().find((entry) => entry.value() === committed);
    this.query.set(item?.displayLabel() ?? committed);
  }

  private moveActive(delta: number, enabled: ElAutocompleteOption[]): void {
    if (enabled.length === 0) {
      this.activeOptionId.set(null);
      return;
    }

    const currentIndex = enabled.findIndex(
      (item) => item.optionId === this.activeOptionId(),
    );
    const resolved =
      currentIndex >= 0
        ? (currentIndex + delta + enabled.length) % enabled.length
        : delta > 0
          ? 0
          : enabled.length - 1;
    this.focusItemAt(enabled, resolved);
  }

  private focusItemAt(
    items: readonly ElAutocompleteOption[],
    index: number,
  ): void {
    const item = items[index];
    if (!item) {
      this.activeOptionId.set(null);
      return;
    }
    this.activeOptionId.set(item.optionId);
    this.scrollActiveIntoView();
  }

  private scrollActiveIntoView(): void {
    const id = this.activeOptionId();
    if (!id) {
      return;
    }

    afterNextRender(
      () => {
        const item = this.registered().find((entry) => entry.optionId === id);
        item?.element.scrollIntoView({ block: 'nearest' });
      },
      { injector: this.injector },
    );
  }

  private updatePanelPlacement(): void {
    afterNextRender(
      () => {
        const host = this.elementRef.nativeElement;
        const list = this.listRef()?.nativeElement;
        if (!list) {
          return;
        }

        const hostRect = host.getBoundingClientRect();
        const spaceBelow = window.innerHeight - hostRect.bottom;
        const spaceAbove = hostRect.top;
        const panelHeight = Math.min(list.scrollHeight || 256, 256);
        this.panelAbove.set(spaceBelow < panelHeight && spaceAbove > spaceBelow);
      },
      { injector: this.injector },
    );
  }
}
