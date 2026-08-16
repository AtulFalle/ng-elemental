import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[elAccordionTitle]',
})
export class ElAccordionTitle {
  readonly template = inject(TemplateRef<unknown>);
}
