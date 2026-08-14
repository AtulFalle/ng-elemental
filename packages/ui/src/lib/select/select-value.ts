import { Directive, inject, TemplateRef } from '@angular/core';
import type { ElSelectOptionView } from './select.token';

export interface ElSelectValueContext {
  $implicit: ElSelectOptionView[];
}

@Directive({
  selector: 'ng-template[elSelectValue]',
})
export class ElSelectValue {
  readonly template = inject<TemplateRef<ElSelectValueContext>>(TemplateRef);
}
