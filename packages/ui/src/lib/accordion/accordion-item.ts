import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import { ElAccordionContent } from './accordion-content';
import { ElAccordionSubtitle } from './accordion-subtitle';
import { ElAccordionTitle } from './accordion-title';
import { EL_ACCORDION } from './accordion.token';

const NESTED_CONTROL =
  'a, button, input, select, textarea, el-button, el-chip, el-slide-toggle, [href]';

export { ElAccordionContent } from './accordion-content';
export { ElAccordionSubtitle } from './accordion-subtitle';
export { ElAccordionTitle } from './accordion-title';

@Component({
  selector: 'el-accordion-item',
  imports: [NgTemplateOutlet, ElIcon],
  templateUrl: './accordion-item.html',
  styleUrl: './accordion-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-accordion-item',
    '[class.el-accordion-item--expanded]': 'expanded()',
    '[class.el-accordion-item--disabled]': 'isDisabled()',
  },
})
export class ElAccordionItem {
  private readonly accordion = inject(EL_ACCORDION);

  readonly value = input.required<string>();
  readonly title = input('');
  readonly subtitle = input('');
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly customTitle = contentChild(ElAccordionTitle);
  private readonly customSubtitle = contentChild(ElAccordionSubtitle);
  private readonly content = contentChild(ElAccordionContent);
  private readonly triggerRef =
    viewChild<ElementRef<HTMLButtonElement>>('trigger');

  readonly titleTemplate = computed(() => this.customTitle()?.template);
  readonly subtitleTemplate = computed(() => this.customSubtitle()?.template);
  readonly contentTemplate = computed(() => this.content()?.template);

  protected readonly expanded = computed(() =>
    this.accordion.isExpanded(this.value()),
  );

  protected readonly isDisabled = computed(() =>
    this.accordion.isItemDisabled(this.disabled()),
  );

  protected readonly headerId = computed(() =>
    this.accordion.headerId(this.value()),
  );

  protected readonly panelId = computed(() =>
    this.accordion.panelId(this.value()),
  );

  protected readonly hasSubtitle = computed(
    () => !!this.subtitleTemplate() || !!this.subtitle(),
  );

  focus(): void {
    this.triggerRef()?.nativeElement.focus();
  }

  protected onToggle(event: Event): void {
    if (this.isDisabled()) {
      return;
    }
    const target = event.target;
    if (target instanceof Element) {
      const nested = target.closest(NESTED_CONTROL);
      const trigger = this.triggerRef()?.nativeElement;
      if (nested && nested !== trigger) {
        return;
      }
    }
    this.accordion.toggle(this.value());
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    this.accordion.onHeaderKeydown(event, this.value());
  }
}
