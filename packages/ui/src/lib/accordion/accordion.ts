import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
  model,
} from '@angular/core';
import { ElAccordionItem } from './accordion-item';
import {
  EL_ACCORDION,
  type ElAccordionContext,
  type ElAccordionValue,
  type ElAccordionVariant,
} from './accordion.token';

export type { ElAccordionValue, ElAccordionVariant } from './accordion.token';
export { EL_ACCORDION, type ElAccordionContext } from './accordion.token';
export { ElAccordionItem } from './accordion-item';
export { ElAccordionTitle } from './accordion-title';
export { ElAccordionSubtitle } from './accordion-subtitle';
export { ElAccordionContent } from './accordion-content';

@Component({
  selector: 'el-accordion',
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_ACCORDION, useExisting: ElAccordion }],
  host: {
    class: 'el-accordion',
    '[class.el-accordion--single]': 'variant() === "single"',
    '[class.el-accordion--multiple]': 'variant() === "multiple"',
    '[class.el-accordion--disabled]': 'disabled()',
    '[attr.role]': 'ariaLabel() ? "group" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class ElAccordion implements ElAccordionContext {
  private static nextId = 0;

  readonly value = model<ElAccordionValue>('');
  readonly variant = input<ElAccordionVariant>('single');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  private readonly uid = ElAccordion.nextId++;
  private readonly items = contentChildren(ElAccordionItem);

  isExpanded(itemValue: string): boolean {
    const current = this.value();
    if (Array.isArray(current)) {
      return current.includes(itemValue);
    }
    return current === itemValue;
  }

  isItemDisabled(itemDisabled: boolean): boolean {
    return this.disabled() || itemDisabled;
  }

  toggle(itemValue: string): void {
    if (this.disabled()) {
      return;
    }

    if (this.variant() === 'single') {
      this.value.set(this.isExpanded(itemValue) ? '' : itemValue);
      return;
    }

    const current = this.value();
    const open = Array.isArray(current)
      ? [...current]
      : current
        ? [current]
        : [];
    const index = open.indexOf(itemValue);
    if (index >= 0) {
      open.splice(index, 1);
    } else {
      open.push(itemValue);
    }
    this.value.set(open);
  }

  headerId(itemValue: string): string {
    return `el-accordion-${this.uid}-header-${this.idPart(itemValue)}`;
  }

  panelId(itemValue: string): string {
    return `el-accordion-${this.uid}-panel-${this.idPart(itemValue)}`;
  }

  onHeaderKeydown(event: KeyboardEvent, itemValue: string): void {
    if (this.disabled()) {
      return;
    }

    const enabled = this.items().filter(
      (item) => !this.isItemDisabled(item.disabled()),
    );
    if (enabled.length === 0) {
      return;
    }

    const currentIndex = enabled.findIndex(
      (item) => item.value() === itemValue,
    );
    const resolved = currentIndex >= 0 ? currentIndex : 0;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = (resolved + 1) % enabled.length;
      enabled[next].focus();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = (resolved - 1 + enabled.length) % enabled.length;
      enabled[next].focus();
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      enabled[0].focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      enabled[enabled.length - 1].focus();
    }
  }

  private idPart(itemValue: string): string {
    return itemValue.replace(/[^a-zA-Z0-9_-]/g, '-') || 'item';
  }
}
