import { Directive, inject, TemplateRef } from '@angular/core';

export interface ElTableExpandContext {
  $implicit: object;
}

@Directive({
  selector: 'ng-template[elTableExpand]',
})
export class ElTableExpand {
  readonly template = inject(TemplateRef<ElTableExpandContext>);
}
