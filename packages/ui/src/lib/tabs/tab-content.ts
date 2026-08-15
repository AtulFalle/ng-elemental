import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[elTabContent]',
})
export class ElTabContent {
  readonly template = inject(TemplateRef<unknown>);
}
