import { Directive, inject, TemplateRef } from '@angular/core';
import type { ElTreeNode } from './tree-utils';

export interface ElTreeNodeContext {
  $implicit: ElTreeNode;
  node: ElTreeNode;
  level: number;
  index: number;
  last: boolean;
}

@Directive({
  selector: 'ng-template[elTreeNodeDef]',
})
export class ElTreeNodeDef {
  readonly template = inject(TemplateRef<ElTreeNodeContext>);
}
