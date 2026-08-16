import { InjectionToken, TemplateRef } from '@angular/core';
import type { ElTreeNodeContext } from './tree-node-def';
import type { ElTreeCheckState, ElTreeNode } from './tree-utils';

export type ElTreeAppearance = 'outlined' | 'plain';
export type ElTreeSize = 'sm' | 'md' | 'lg';

export interface ElTreeItemLevel {
  resolvedLevel(): number;
}

export interface ElTreeContext {
  checkbox(): boolean;
  disabled(): boolean;
  size(): ElTreeSize;
  isExpanded(id: string): boolean;
  isActive(id: string): boolean;
  isLoading(id: string): boolean;
  isItemDisabled(itemDisabled: boolean): boolean;
  checkState(id: string): ElTreeCheckState;
  nodeTemplate(): TemplateRef<ElTreeNodeContext> | null;
  nodeContext(id: string, level: number, index: number, last: boolean): ElTreeNodeContext | null;
  toggleExpanded(id: string): void;
  toggleChecked(id: string): void;
  activate(id: string): void;
  setActive(id: string): void;
  onItemKeydown(event: KeyboardEvent, id: string): void;
  requestLoadMore(parent: ElTreeNode | null): void;
}

export const EL_TREE = new InjectionToken<ElTreeContext>('ElTree');
export const EL_TREE_ITEM = new InjectionToken<ElTreeItemLevel>('ElTreeItem');
