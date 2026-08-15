import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  input,
  TemplateRef,
} from '@angular/core';
import { ElTabContent } from './tab-content';
import { ElTabLabel } from './tab-label';

export { ElTabContent } from './tab-content';
export { ElTabLabel } from './tab-label';

@Component({
  selector: 'el-tab',
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-tab',
  },
})
export class ElTab {
  readonly value = input.required<string>();
  readonly label = input('');
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly content = contentChild(ElTabContent);
  private readonly customLabel = contentChild(ElTabLabel);
  private readonly templates = contentChildren(TemplateRef);

  readonly labelTemplate = computed(() => this.customLabel()?.template);
  readonly contentTemplate = computed(() => {
    const named = this.content()?.template;
    if (named) {
      return named;
    }
    const label = this.labelTemplate();
    return this.templates().find((template) => template !== label);
  });
}
