import { Directive, inject, TemplateRef } from '@angular/core';
import type { ElAutocompleteSlotContext } from './autocomplete-loading';

@Directive({
  selector: '[elAutocompleteEmpty], ng-template[elAutocompleteEmpty]',
})
export class ElAutocompleteEmpty {
  readonly template = inject(TemplateRef<ElAutocompleteSlotContext>, {
    optional: true,
  });
}
