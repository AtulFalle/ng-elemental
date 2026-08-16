import { Directive, inject, TemplateRef } from '@angular/core';

export interface ElTableCellContext {
  $implicit: object;
}

@Directive({
  selector: 'ng-template[elTableCell]',
})
export class ElTableCell {
  readonly template = inject(TemplateRef<ElTableCellContext>);
}
