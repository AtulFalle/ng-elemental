import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  Directive,
  inject,
  input,
  output,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import {
  EL_NAV,
  EL_NAV_ITEM,
  type ElNavItemLevel,
} from './navigation.token';

const NESTED_CONTROL =
  'a, button, input, select, textarea, el-button, el-chip, el-slide-toggle, el-checkbox, [href]';

@Directive({ selector: '[elNavLeading]' })
export class ElNavLeadingSlot {}

@Directive({ selector: '[elNavLabel]' })
export class ElNavLabelSlot {}

@Directive({ selector: '[elNavSublabel]' })
export class ElNavSublabelSlot {}

@Component({
  selector: 'el-nav-item',
  imports: [NgTemplateOutlet, ElIcon],
  templateUrl: './navigation-item.html',
  styleUrl: './navigation-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_NAV_ITEM, useExisting: ElNavItem }],
  host: {
    class: 'el-nav-item-host',
    '[class.el-nav-item-host--active]': 'active()',
    '[class.el-nav-item-host--expanded]': 'expanded()',
    '[class.el-nav-item-host--disabled]': 'isDisabled()',
    '[class.el-nav-item-host--parent]': 'canExpand()',
    '[class.el-nav-item-host--rail]': 'isRail()',
    '[class.el-nav-item-host--soft]': 'isSoft()',
    '[style.--el-nav-level]': 'resolvedLevel()',
  },
})
export class ElNavItem implements ElNavItemLevel {
  private readonly nav = inject(EL_NAV);
  private readonly parentItem = inject(EL_NAV_ITEM, {
    optional: true,
    skipSelf: true,
  });

  readonly value = input.required<string>();
  readonly label = input('');
  readonly sublabel = input('');
  readonly icon = input('');
  readonly href = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly activated = output<void>();

  protected readonly leadingSlot = contentChild(ElNavLeadingSlot);
  protected readonly labelSlot = contentChild(ElNavLabelSlot);
  protected readonly sublabelSlot = contentChild(ElNavSublabelSlot);
  private readonly childItems = contentChildren(ElNavItem, {
    descendants: false,
  });

  readonly resolvedLevel = computed(() => {
    return (this.parentItem?.resolvedLevel() ?? -1) + 1;
  });

  protected readonly canExpand = computed(() => this.childItems().length > 0);

  protected readonly isRail = computed(() => this.nav.appearance() === 'rail');

  protected readonly isSoft = computed(() => this.nav.appearance() === 'soft');

  protected readonly expanded = computed(() =>
    this.nav.isExpanded(this.value()),
  );

  protected readonly active = computed(() => this.nav.isActive(this.value()));

  protected readonly isDisabled = computed(() =>
    this.nav.isItemDisabled(this.disabled()),
  );

  protected readonly isLink = computed(
    () => !!this.href() && !this.canExpand(),
  );

  protected readonly isNavLink = computed(
    () => !!this.href() && this.canExpand(),
  );

  protected readonly isDisclosure = computed(
    () => this.canExpand() && !this.href(),
  );

  protected readonly groupId = computed(() => this.nav.groupId(this.value()));

  protected readonly showFallbackIcon = computed(
    () => !!this.icon() && !this.leadingSlot(),
  );

  protected readonly showLabelInput = computed(
    () => !!this.label() && !this.labelSlot(),
  );

  protected readonly showSublabelInput = computed(
    () => !!this.sublabel() && !this.sublabelSlot(),
  );

  protected readonly hasSublabel = computed(
    () => !!this.sublabelSlot() || !!this.sublabel(),
  );

  protected readonly expandLabel = computed(() => {
    const name = this.label() || this.value();
    return this.expanded() ? `Collapse ${name}` : `Expand ${name}`;
  });

  protected readonly rootClass = computed(() => ({
    'el-nav-item': true,
    [`el-nav-item--${this.nav.size()}`]: true,
    [`el-nav-item--${this.nav.appearance()}`]: true,
    'el-nav-item--active': this.active(),
    'el-nav-item--expanded': this.expanded(),
    'el-nav-item--disabled': this.isDisabled(),
    'el-nav-item--parent': this.canExpand(),
  }));

  nestedItems(): readonly ElNavItem[] {
    return this.childItems();
  }

  protected onToggleExpand(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isDisabled()) {
      return;
    }
    this.nav.toggleExpanded(this.value());
  }

  protected onDisclosureClick(event: Event): void {
    if (this.isDisabled()) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest(NESTED_CONTROL)) {
      const disclosure = target.closest('.el-nav-item__disclosure');
      if (!disclosure) {
        return;
      }
    }
    this.nav.toggleExpanded(this.value());
  }

  protected onLinkClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest(NESTED_CONTROL)) {
      const control = target.closest('.el-nav-item__control');
      const actions = target.closest('.el-nav-item__actions');
      const chevron = target.closest('.el-nav-item__chevron');
      if (actions || chevron) {
        return;
      }
      if (control && control !== target.closest('a.el-nav-item__control')) {
        return;
      }
    }
    this.nav.activate(this.value());
    this.activated.emit();
  }

  protected onButtonLeafClick(event: Event): void {
    if (this.isDisabled()) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest(NESTED_CONTROL)) {
      const control = target.closest('.el-nav-item__control');
      const actions = target.closest('.el-nav-item__actions');
      if (actions) {
        return;
      }
      if (control && !target.closest('button.el-nav-item__control')) {
        return;
      }
    }
    this.nav.activate(this.value());
    this.activated.emit();
  }

}
