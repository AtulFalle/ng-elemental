import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

const NESTED_CONTROL =
  'a, button, input, select, textarea, el-button, el-chip, el-slide-toggle, [href]';

@Component({
  selector: 'el-list-item',
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-list-item-host',
    role: 'listitem',
    '[class.el-list-item-host--interactive]': 'interactive()',
    '[class.el-list-item-host--selected]': 'selected()',
    '[class.el-list-item-host--disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-current]': 'selected() || null',
    '[attr.tabindex]': 'hostTabIndex()',
    '(click)': 'onHostClick($event)',
    '(keydown.enter)': 'onHostActivate($event)',
    '(keydown.space)': 'onHostActivate($event)',
  },
})
export class ElListItem {
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly selected = input(false, { transform: booleanAttribute });
  readonly interactive = input(false, { transform: booleanAttribute });

  readonly activated = output<void>();

  protected readonly rootClass = computed(() => ({
    'el-list-item': true,
    'el-list-item--interactive': this.interactive(),
    'el-list-item--selected': this.selected(),
    'el-list-item--disabled': this.disabled(),
  }));

  protected readonly hostTabIndex = computed(() => {
    if (!this.interactive() || this.disabled()) {
      return null;
    }
    return 0;
  });

  protected onHostClick(event: Event): void {
    if (!this.canActivate()) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest(NESTED_CONTROL)) {
      return;
    }
    this.activated.emit();
  }

  protected onHostActivate(event: Event): void {
    if (!this.canActivate()) {
      return;
    }
    event.preventDefault();
    this.activated.emit();
  }

  private canActivate(): boolean {
    return this.interactive() && !this.disabled();
  }
}
