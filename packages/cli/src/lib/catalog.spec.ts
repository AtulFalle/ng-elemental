import { AVAILABLE_COMPONENTS } from './component-registry';
import {
  COMPONENT_CATALOG,
  formatCatalogList,
  getCatalogEntry,
  listCatalog,
  searchCatalog,
} from './catalog';

describe('component catalog', () => {
  it('covers every registry component', () => {
    const names = COMPONENT_CATALOG.map((entry) => entry.name).sort();
    expect(names).toEqual([...AVAILABLE_COMPONENTS].sort());
    expect(new Set(names).size).toBe(names.length);
  });

  it('requires catalog metadata on every entry', () => {
    for (const entry of COMPONENT_CATALOG) {
      expect(entry.title.length, entry.name).toBeGreaterThan(0);
      expect(entry.description.length, entry.name).toBeGreaterThan(0);
      expect(entry.keywords.length, entry.name).toBeGreaterThan(0);
      expect(entry.classNames.length, entry.name).toBeGreaterThan(0);
      expect(entry.usage.length, entry.name).toBeGreaterThan(0);
      expect(entry.docsPath.startsWith('/'), entry.name).toBe(true);
    }
  });

  it('returns a catalog entry by name', () => {
    const button = getCatalogEntry('button');
    expect(button.title).toBe('Button');
    expect(button.kind).toBe('component');
    expect(button.classNames).toContain('ElButton');
    expect(button.selectors).toContain('el-button');
    expect(button.registryDependencies).toContain('icon');
    expect(button.docsPath).toBe('/components/button');
  });

  it('throws for an unknown catalog name', () => {
    expect(() => getCatalogEntry('not-a-widget')).toThrow(/unknown component/i);
  });

  it('maps intent keywords to the right components', () => {
    expect(searchCatalog('dropdown').map((entry) => entry.name)).toContain('select');
    expect(searchCatalog('modal').map((entry) => entry.name)).toContain('dialog');
    expect(searchCatalog('snackbar').map((entry) => entry.name)[0]).toBe('snackbar');
    expect(searchCatalog('notification').map((entry) => entry.name)).toContain('toast');
    expect(searchCatalog('switch').map((entry) => entry.name)).toContain('slide-toggle');
  });

  it('filters list and search by kind', () => {
    expect(listCatalog({ kind: 'directive' }).map((entry) => entry.name)).toEqual(
      expect.arrayContaining(['infinite-scroll', 'tooltip']),
    );
    expect(listCatalog({ kind: 'theme' }).map((entry) => entry.name)).toEqual(['theme']);
    expect(searchCatalog('scroll', { kind: 'directive' }).map((entry) => entry.name)).toContain(
      'infinite-scroll',
    );
    expect(searchCatalog('scroll', { kind: 'directive' }).map((entry) => entry.name)).not.toContain(
      'scroll-area',
    );
  });

  it('formats a catalog list for the CLI', () => {
    const output = formatCatalogList(listCatalog({ kind: 'theme' }));
    expect(output).toContain('theme');
    expect(output).toContain('Theme');
    expect(formatCatalogList([])).toBe('No components found.');
  });
});
