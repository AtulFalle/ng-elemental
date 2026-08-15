import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[elTabLabel]',
})
export class ElTabLabel {
  readonly template = inject(TemplateRef<unknown>);
}
