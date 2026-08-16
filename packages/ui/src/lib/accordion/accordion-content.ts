import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[elAccordionContent]',
})
export class ElAccordionContent {
  readonly template = inject(TemplateRef<unknown>);
}
