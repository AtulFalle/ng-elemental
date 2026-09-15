import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add autocomplete e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElAutocomplete', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'autocomplete');

      const autocompleteTs = await readFile(
        componentUiPath(tmp, 'autocomplete', 'autocomplete.ts'),
        'utf8',
      );
      expect(autocompleteTs).toContain("selector: 'el-autocomplete'");
      expect(autocompleteTs).toContain('export class ElAutocomplete');
      expect(autocompleteTs).toContain("ElAutocompleteSize");
      expect(autocompleteTs).toContain('ElInput');
      expect(autocompleteTs).toContain('ElIcon');

      const itemTs = await readFile(
        componentUiPath(tmp, 'autocomplete', 'autocomplete-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-autocomplete-item'");
      expect(itemTs).toContain('export class ElAutocompleteItem');

      const emptyTs = await readFile(
        componentUiPath(tmp, 'autocomplete', 'autocomplete-empty.ts'),
        'utf8',
      );
      expect(emptyTs).toContain('elAutocompleteEmpty');

      const loadingTs = await readFile(
        componentUiPath(tmp, 'autocomplete', 'autocomplete-loading.ts'),
        'utf8',
      );
      expect(loadingTs).toContain('elAutocompleteLoading');

      const tokenTs = await readFile(
        componentUiPath(tmp, 'autocomplete', 'autocomplete.token.ts'),
        'utf8',
      );
      expect(tokenTs).toContain('EL_AUTOCOMPLETE');

      const autocompleteHtml = await readFile(
        componentUiPath(tmp, 'autocomplete', 'autocomplete.html'),
        'utf8',
      );
      expect(autocompleteHtml).toContain('el-input');
      expect(autocompleteHtml).toContain('role="combobox"');
      expect(autocompleteHtml).toContain('role="listbox"');
      expect(autocompleteHtml).toContain('chevron-down');

      const autocompleteScss = await readFile(
        componentUiPath(tmp, 'autocomplete', 'autocomplete.scss'),
        'utf8',
      );
      expect(autocompleteScss).toContain('.el-autocomplete');
      expect(autocompleteScss).toContain('--el-color-outline-variant');
      expect(autocompleteScss).toContain('prefers-reduced-motion');

      expect(
        existsSync(componentUiPath(tmp, 'autocomplete', 'autocomplete.stories.ts')),
      ).toBe(false);
      expect(
        existsSync(componentUiPath(tmp, 'autocomplete', 'empty-state.ts')),
      ).toBe(false);
      expect(
        existsSync(componentUiPath(tmp, 'autocomplete', 'progress.ts')),
      ).toBe(false);
    });
  });
});
