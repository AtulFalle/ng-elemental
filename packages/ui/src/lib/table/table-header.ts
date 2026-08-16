import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[elTableHeader]',
})
export class ElTableHeader {
  readonly template = inject(TemplateRef<unknown>);
}
