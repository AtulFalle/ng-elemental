import { Directive, inject, TemplateRef } from '@angular/core';

export interface ElAutocompleteSlotContext {
  $implicit: string;
  query: string;
}

@Directive({
  selector: '[elAutocompleteLoading], ng-template[elAutocompleteLoading]',
})
export class ElAutocompleteLoading {
  readonly template = inject(TemplateRef<ElAutocompleteSlotContext>, {
    optional: true,
  });
}
