export interface ElTreeNode {
  id: string;
  label: string;
  children?: ElTreeNode[];
  hasChildren?: boolean;
  hasMore?: boolean;
  disabled?: boolean;
  icon?: string;
}

export type ElTreeCheckState = 'checked' | 'unchecked' | 'indeterminate';
export type ElTreeRowKind = 'node' | 'loadMore';

export interface ElTreeVisibleRow {
  kind: ElTreeRowKind;
  id: string;
  node: ElTreeNode | null;
  parentId: string | null;
  level: number;
  hasChildren: boolean;
}

export interface ElTreeIndex {
  byId: ReadonlyMap<string, ElTreeNode>;
  parentId: ReadonlyMap<string, string | null>;
  children: ReadonlyMap<string, readonly string[]>;
  roots: readonly string[];
}

export function nodeHasChildren(node: ElTreeNode): boolean {
  return node.hasChildren === true || (node.children?.length ?? 0) > 0;
}

export function buildTreeIndex(nodes: readonly ElTreeNode[]): ElTreeIndex {
  const byId = new Map<string, ElTreeNode>();
  const parentId = new Map<string, string | null>();
  const children = new Map<string, string[]>();
  const roots: string[] = [];

  const visit = (list: readonly ElTreeNode[], parent: string | null): void => {
    for (const node of list) {
      byId.set(node.id, node);
      parentId.set(node.id, parent);
      const childIds = (node.children ?? []).map((child) => child.id);
      children.set(node.id, childIds);
      if (parent === null) {
        roots.push(node.id);
      }
      if (node.children?.length) {
        visit(node.children, node.id);
      }
    }
  };

  visit(nodes, null);
  return { byId, parentId, children, roots };
}

export function findNode(
  nodes: readonly ElTreeNode[],
  id: string,
): ElTreeNode | null {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    const nested = node.children?.length
      ? findNode(node.children, id)
      : null;
    if (nested) {
      return nested;
    }
  }
  return null;
}

export function flattenVisible(
  nodes: readonly ElTreeNode[],
  expanded: readonly string[],
  options: { rootHasMore?: boolean } = {},
): ElTreeVisibleRow[] {
  const expandedSet = new Set(expanded);
  const rows: ElTreeVisibleRow[] = [];

  const visit = (
    list: readonly ElTreeNode[],
    parentId: string | null,
    level: number,
  ): void => {
    for (const node of list) {
      const hasChildren = nodeHasChildren(node);
      rows.push({
        kind: 'node',
        id: node.id,
        node,
        parentId,
        level,
        hasChildren,
      });
      if (!expandedSet.has(node.id)) {
        continue;
      }
      visit(node.children ?? [], node.id, level + 1);
      if (node.hasMore) {
        rows.push({
          kind: 'loadMore',
          id: `${node.id}__more`,
          node,
          parentId: node.id,
          level: level + 1,
          hasChildren: false,
        });
      }
    }
  };

  visit(nodes, null, 0);
  if (options.rootHasMore) {
    rows.push({
      kind: 'loadMore',
      id: '__root_more',
      node: null,
      parentId: null,
      level: 0,
      hasChildren: false,
    });
  }
  return rows;
}

export function isChecked(
  id: string,
  checked: ReadonlySet<string>,
  parentId: ReadonlyMap<string, string | null>,
): boolean {
  let current: string | null = id;
  while (current) {
    if (checked.has(current)) {
      return true;
    }
    current = parentId.get(current) ?? null;
  }
  return false;
}

function someDescendantChecked(
  id: string,
  checked: ReadonlySet<string>,
  index: ElTreeIndex,
): boolean {
  for (const child of index.children.get(id) ?? []) {
    if (
      isChecked(child, checked, index.parentId) ||
      someDescendantChecked(child, checked, index)
    ) {
      return true;
    }
  }
  return false;
}

export function checkState(
  id: string,
  checked: readonly string[],
  index: ElTreeIndex,
): ElTreeCheckState {
  const set = new Set(checked);
  if (isChecked(id, set, index.parentId)) {
    return 'checked';
  }
  if (someDescendantChecked(id, set, index)) {
    return 'indeterminate';
  }
  return 'unchecked';
}

function enabledChildIds(index: ElTreeIndex, parentId: string): string[] {
  return (index.children.get(parentId) ?? []).filter(
    (child) => !index.byId.get(child)?.disabled,
  );
}

function checkNode(
  set: Set<string>,
  id: string,
  index: ElTreeIndex,
): void {
  const removeDescendants = (current: string): void => {
    for (const child of index.children.get(current) ?? []) {
      set.delete(child);
      removeDescendants(child);
    }
  };
  removeDescendants(id);
  set.add(id);

  let current = id;
  while (true) {
    const parent = index.parentId.get(current);
    if (!parent) {
      return;
    }
    const enabled = enabledChildIds(index, parent);
    const allChecked =
      enabled.length > 0 &&
      enabled.every((child) => isChecked(child, set, index.parentId));
    if (!allChecked) {
      return;
    }
    for (const child of index.children.get(parent) ?? []) {
      set.delete(child);
    }
    set.add(parent);
    current = parent;
  }
}

function uncheckNode(
  set: Set<string>,
  id: string,
  index: ElTreeIndex,
): void {
  if (set.has(id)) {
    set.delete(id);
    return;
  }

  const up: string[] = [];
  let current: string | null = id;
  let explicit: string | null = null;
  while (current) {
    up.push(current);
    if (set.has(current)) {
      explicit = current;
      break;
    }
    current = index.parentId.get(current) ?? null;
  }
  if (!explicit) {
    return;
  }

  set.delete(explicit);
  const path = [...up].reverse();
  for (let i = 0; i < path.length - 1; i++) {
    const nodeId = path[i];
    const next = path[i + 1];
    for (const child of index.children.get(nodeId) ?? []) {
      if (child !== next) {
        set.add(child);
      }
    }
  }
}

export function toggleChecked(
  checked: readonly string[],
  id: string,
  nodes: readonly ElTreeNode[],
): string[] {
  const index = buildTreeIndex(nodes);
  const node = index.byId.get(id);
  if (!node || node.disabled) {
    return [...checked];
  }
  const set = new Set(checked);
  if (isChecked(id, set, index.parentId)) {
    uncheckNode(set, id, index);
  } else {
    checkNode(set, id, index);
  }
  return [...set];
}

export function toggleExpanded(
  expanded: readonly string[],
  id: string,
): string[] {
  const next = expanded.filter((value) => value !== id);
  if (next.length === expanded.length) {
    return [...expanded, id];
  }
  return next;
}
