export { run } from './lib/cli';
export {
  addCommand,
  copyRegistryComponent,
  toAppImportPath,
  type AddResult,
} from './lib/add';
export { initCommand, type InitResult } from './lib/init';
export {
  COMPONENT_CATALOG,
  formatCatalogList,
  getCatalogEntry,
  listCatalog,
  searchCatalog,
  type CatalogEntry,
  type CatalogQuery,
  type ComponentCategory,
  type ComponentKind,
} from './lib/catalog';
export {
  AVAILABLE_COMPONENTS,
  type AvailableComponent,
} from './lib/component-registry';
export {
  CONFIG_FILENAME,
  DEFAULT_COMPONENTS_DIR,
  readConfig,
  type ElementalConfig,
} from './lib/config';
