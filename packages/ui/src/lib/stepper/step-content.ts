import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[elStepContent]',
})
export class ElStepContent {
  readonly template = inject(TemplateRef<unknown>);
}
