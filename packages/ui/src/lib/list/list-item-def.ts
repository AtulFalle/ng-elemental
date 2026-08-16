import { Directive, inject, TemplateRef } from '@angular/core';

export interface ElListItemContext {
  $implicit: object;
  index: number;
  last: boolean;
}

@Directive({
  selector: 'ng-template[elListItemDef]',
})
export class ElListItemDef {
  readonly template = inject(TemplateRef<ElListItemContext>);
}
