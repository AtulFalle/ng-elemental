import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElAutocomplete,
  ElAutocompleteEmpty,
  ElAutocompleteItem,
  ElAutocompleteLoading,
  ElAvatar,
  ElBadge,
  ElEmptyState,
  ElFormError,
  ElIcon,
  ElInputPrefix,
  ElInputSuffix,
  ElLabel,
  ElProgressCircle,
  ElTab,
  ElTabContent,
  ElTabs,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-autocomplete-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElAutocomplete,
    ElAutocompleteItem,
    ElAutocompleteEmpty,
    ElAutocompleteLoading,
    ElAvatar,
    ElBadge,
    ElEmptyState,
    ElFormError,
    ElIcon,
    ElInputPrefix,
    ElInputSuffix,
    ElLabel,
    ElProgressCircle,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './autocomplete-doc.html',
  styleUrl: './page.scss',
})
export class AutocompleteDocPage {
  protected readonly installTab = signal('cli');

  protected readonly country = signal('');
  protected readonly countryQuery = signal('');
  protected readonly slotsCountry = signal('');
  protected readonly slotsQuery = signal('');
  protected readonly filterCountry = signal('');
  protected readonly filterQuery = signal('');
  protected readonly userId = signal('');
  protected readonly userQuery = signal('');
  protected readonly busy = signal(false);
  protected readonly people = [
    { id: 'ada', name: 'Ada Lovelace', initials: 'AL', team: 'Eng' },
    { id: 'grace', name: 'Grace Hopper', initials: 'GH', team: 'Ops' },
    { id: 'alan', name: 'Alan Turing', initials: 'AT', team: 'Research' },
  ];
  protected readonly asyncResults = signal(this.people);
  protected readonly errorCountry = signal('');
  protected readonly errorQuery = signal('');
  protected readonly disabledCountry = signal('in');
  protected readonly disabledQuery = signal('India');

  protected readonly countries = [
    { value: 'in', label: 'India' },
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'au', label: 'Australia' },
  ] as const;

  protected readonly heroCode = `<el-label htmlFor="country">Country</el-label>
<el-autocomplete
  inputId="country"
  [(value)]="country"
  [(query)]="query"
  placeholder="Search countries…"
>
  <el-autocomplete-item value="in" label="India">India</el-autocomplete-item>
  <el-autocomplete-item value="jp" label="Japan">Japan</el-autocomplete-item>
</el-autocomplete>`;

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add input
npx @ng-elemental/cli add autocomplete

# Optional — only when your examples compose them:
# npx @ng-elemental/cli add empty-state
# npx @ng-elemental/cli add progress
# npx @ng-elemental/cli add avatar
# npx @ng-elemental/cli add badge
# npx @ng-elemental/cli add label
# npx @ng-elemental/cli add form-error`;

  protected readonly manualFilesCode = `ui/autocomplete/autocomplete.ts
ui/autocomplete/autocomplete.html
ui/autocomplete/autocomplete.scss
ui/autocomplete/autocomplete-item.ts
ui/autocomplete/autocomplete-item.html
ui/autocomplete/autocomplete-item.scss
ui/autocomplete/autocomplete-empty.ts
ui/autocomplete/autocomplete-loading.ts
ui/autocomplete/autocomplete.token.ts`;

  protected readonly importSnippet = `import {
  ElAutocomplete,
  ElAutocompleteItem,
  ElAutocompleteEmpty,
  ElAutocompleteLoading,
} from './ui/autocomplete/autocomplete';`;

  protected readonly usageSnippet = `<el-autocomplete [(value)]="country" placeholder="Search…" ariaLabel="Country">
  <el-autocomplete-item value="in" label="India">India</el-autocomplete-item>
  <el-autocomplete-item value="jp" label="Japan">Japan</el-autocomplete-item>
</el-autocomplete>`;

  protected readonly filterCode = `<el-autocomplete
  inputId="filter-country"
  [(value)]="country"
  [(query)]="query"
  placeholder="Type to filter…"
>
  <el-icon elInputPrefix name="magnifying-glass" size="sm" />
  <el-autocomplete-item value="in" label="India">India</el-autocomplete-item>
  <el-autocomplete-item value="us" label="United States">United States</el-autocomplete-item>
  <!-- … -->
</el-autocomplete>`;

  protected readonly asyncCode = `<el-autocomplete
  inputId="user"
  [(value)]="userId"
  [(query)]="q"
  [filter]="false"
  [loading]="busy()"
  placeholder="Search people…"
  (queryChange)="search($event)"
>
  <el-progress-circle elAutocompleteLoading size="sm" indeterminate />
  <el-empty-state
    elAutocompleteEmpty
    icon="magnifying-glass"
    title="No people"
    description="Try a different name."
  />
  @for (person of results(); track person.id) {
    <el-autocomplete-item [value]="person.id" [label]="person.name">
      <el-avatar [initials]="person.initials" [alt]="person.name" size="sm" />
      {{ person.name }}
      <el-badge [content]="person.team" />
    </el-autocomplete-item>
  }
</el-autocomplete>`;

  protected readonly slotsCode = `<el-autocomplete [(value)]="country" [(query)]="query" …>
  <el-icon elInputPrefix name="magnifying-glass" size="sm" />

  <button elInputSuffix type="button" aria-label="Clear" (click)="clear()">
    <el-icon name="xmark" size="sm" />
  </button>

  <el-progress-circle elAutocompleteLoading size="sm" indeterminate />

  <ng-template elAutocompleteEmpty let-query>
    <el-empty-state
      icon="magnifying-glass"
      title="No matches"
      [description]="'Nothing for “' + query + '”'"
    />
  </ng-template>

  <el-autocomplete-item value="in" label="India">India</el-autocomplete-item>
</el-autocomplete>`;

  protected readonly disabledCode = `<el-autocomplete
  disabled
  [(value)]="country"
  [(query)]="query"
  placeholder="Disabled"
  ariaLabel="Country"
>
  <el-autocomplete-item value="in" label="India">India</el-autocomplete-item>
</el-autocomplete>`;

  protected readonly errorCode = `<el-label htmlFor="country-err" variant="error">Country</el-label>
<el-autocomplete
  error
  inputId="country-err"
  [(value)]="country"
  [(query)]="query"
  placeholder="Search…"
  ariaDescribedby="country-err-msg"
>
  <el-autocomplete-item value="in" label="India">India</el-autocomplete-item>
</el-autocomplete>
<el-form-error id="country-err-msg">Country is required</el-form-error>`;

  protected readonly keyboardCode = `↓ / ↑   Open and move the active option (focus stays on the input)
Enter   Commit the active option
Escape  Close without changing the committed value
Tab     Move focus; panel closes and query restores`;

  protected onUserQuery(next: string): void {
    this.userQuery.set(next);
    this.busy.set(true);
    window.setTimeout(() => {
      const q = next.trim().toLowerCase();
      this.asyncResults.set(
        this.people.filter((person) =>
          person.name.toLowerCase().includes(q),
        ),
      );
      this.busy.set(false);
    }, 400);
  }

  protected clearCountry(): void {
    this.slotsCountry.set('');
    this.slotsQuery.set('');
  }

  protected readonly props: PropDefinition[] = [
    {
      name: 'value',
      type: 'string (model)',
      default: "''",
      description: 'Committed option id. Separate from the draft query string.',
    },
    {
      name: 'query',
      type: 'string (model)',
      default: "''",
      description:
        'Text in the field. Typing updates query and opens the list; Escape restores from value.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Field size (matches ElInput).',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Native input placeholder.',
    },
    {
      name: 'inputId',
      type: 'string',
      default: "''",
      description: 'Id for ElLabel htmlFor association.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the field and selection.',
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: 'Invalid styling and aria-invalid on the combobox.',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description:
        'Sets aria-busy and shows the loading slot when projected. Does not fetch data.',
    },
    {
      name: 'filter',
      type: 'boolean',
      default: 'true',
      description:
        'When true, filters projected items by query. Set false for async results you already filtered.',
    },
    {
      name: 'ariaLabel / ariaLabelledby / ariaDescribedby',
      type: 'string',
      default: "''",
      description: 'Accessible name and description (pair with ElFormError).',
    },
  ];

  protected readonly itemProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string (required)',
      default: '—',
      description: 'Committed id written to Autocomplete value on select.',
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description:
        'Display string for filtering and query restore. Falls back to value.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Option is not selectable.',
    },
  ];
}
