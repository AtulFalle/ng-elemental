import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[elAccordionSubtitle]',
})
export class ElAccordionSubtitle {
  readonly template = inject(TemplateRef<unknown>);
}
