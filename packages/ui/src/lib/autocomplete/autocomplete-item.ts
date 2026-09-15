import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { EL_AUTOCOMPLETE } from './autocomplete.token';

@Component({
  selector: 'el-autocomplete-item',
  templateUrl: './autocomplete-item.html',
  styleUrl: './autocomplete-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-autocomplete-item',
    '[class.el-autocomplete-item--selected]': 'selected()',
    '[class.el-autocomplete-item--disabled]': 'isDisabled()',
    '[class.el-autocomplete-item--active]': 'active()',
    role: 'option',
    '[id]': 'optionId',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '[attr.tabindex]': '-1',
    '[attr.hidden]': 'hidden() || null',
    '(mousedown)': 'onMouseDown($event)',
    '(click)': 'onClick()',
    '(pointerenter)': 'onPointerEnter()',
  },
})
export class ElAutocompleteItem {
  private static nextId = 0;

  private readonly autocomplete = inject(EL_AUTOCOMPLETE);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly value = input.required<string>();
  readonly label = input('');
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly optionId = `el-autocomplete-option-${ElAutocompleteItem.nextId++}`;

  readonly displayLabel = computed(() => this.label() || this.value());

  private readonly hiddenState = signal(false);

  protected readonly selected = computed(() =>
    this.autocomplete.isSelected(this.value()),
  );

  protected readonly isDisabled = computed(() =>
    this.autocomplete.isItemDisabled(this.disabled()),
  );

  protected readonly active = computed(() =>
    this.autocomplete.isActive(this.optionId),
  );

  protected readonly hidden = computed(() => this.hiddenState());

  readonly element = this.elementRef.nativeElement;

  constructor() {
    this.autocomplete.register(this);
    inject(DestroyRef).onDestroy(() => this.autocomplete.unregister(this));
  }

  matchesQuery(query: string): boolean {
    return this.displayLabel().toLowerCase().includes(query);
  }

  setHidden(hidden: boolean): void {
    this.hiddenState.set(hidden);
  }

  protected onMouseDown(event: Event): void {
    // Keep focus on the combobox input (aria-activedescendant pattern).
    event.preventDefault();
  }

  protected onClick(): void {
    if (this.isDisabled() || this.hidden()) {
      return;
    }
    this.autocomplete.select(this.value());
  }

  protected onPointerEnter(): void {
    if (this.isDisabled() || this.hidden()) {
      return;
    }
    this.autocomplete.setActive(this.optionId);
  }
}
