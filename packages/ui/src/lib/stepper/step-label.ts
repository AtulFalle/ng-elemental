import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[elStepLabel]',
})
export class ElStepLabel {
  readonly template = inject(TemplateRef<unknown>);
}
