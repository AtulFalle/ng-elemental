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
import { ElStepContent } from './step-content';
import { ElStepLabel } from './step-label';

export { ElStepContent } from './step-content';
export { ElStepLabel } from './step-label';

@Component({
  selector: 'el-step',
  templateUrl: './step.html',
  styleUrl: './step.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-step',
  },
})
export class ElStep {
  readonly value = input.required<string>();
  readonly label = input('');
  readonly description = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly completed = input(false, { transform: booleanAttribute });

  private readonly content = contentChild(ElStepContent);
  private readonly customLabel = contentChild(ElStepLabel);
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
