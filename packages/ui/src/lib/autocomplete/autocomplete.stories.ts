import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ElAvatar } from '../avatar/avatar';
import { ElBadge } from '../badge/badge';
import { ElEmptyState } from '../empty-state/empty-state';
import { ElFormError } from '../form-error/form-error';
import { ElIcon } from '../icon/icon';
import { ElInputSuffix } from '../input/input';
import { ElLabel } from '../label/label';
import { ElProgressCircle } from '../progress/progress-circle';
import {
  ElAutocomplete,
  ElAutocompleteEmpty,
  ElAutocompleteItem,
  ElAutocompleteLoading,
} from './autocomplete';

const openList = async (combobox: HTMLElement) => {
  await userEvent.click(combobox);
  await userEvent.keyboard('{ArrowDown}');
};

const countries = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'au', label: 'Australia' },
];

const longList = Array.from({ length: 40 }, (_, index) => ({
  value: `item-${index + 1}`,
  label: `Option ${index + 1}`,
}));

const panelSpace = 'min-height: 18rem; width: 100%; max-width: 22rem;';

const meta: Meta<ElAutocomplete> = {
  title: 'Components/Autocomplete',
  component: ElAutocomplete,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    loading: { control: 'boolean' },
    filter: { control: 'boolean' },
  },
  args: {
    size: 'md',
    placeholder: 'Search countries…',
    disabled: false,
    error: false,
    loading: false,
    filter: true,
    inputId: 'autocomplete-preview',
    value: '',
    query: '',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElAutocomplete, ElAutocompleteItem],
    },
    template: `<div style="${panelSpace}">
      <el-autocomplete
        [(value)]="value"
        [(query)]="query"
        [size]="size"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [error]="error"
        [loading]="loading"
        [filter]="filter"
        [inputId]="inputId"
        ariaLabel="Country"
      >
        ${countries
          .map(
            (c) =>
              `<el-autocomplete-item value="${c.value}" label="${c.label}">${c.label}</el-autocomplete-item>`,
          )
          .join('\n        ')}
      </el-autocomplete>
    </div>`,
  }),
};

export default meta;
type Story = StoryObj<ElAutocomplete>;

export const Default: Story = {};

export const Filtering: Story = {
  args: {
    query: 'un',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openList(canvas.getByRole('combobox', { name: 'Country' }));
  },
};

export const Prefix: Story = {
  render: () => ({
    props: { value: '', query: '' },
    moduleMetadata: {
      imports: [ElAutocomplete, ElAutocompleteItem, ElIcon, ElInputPrefix],
    },
    template: `<div style="${panelSpace}">
      <el-autocomplete
        [(value)]="value"
        [(query)]="query"
        placeholder="Search countries…"
        inputId="autocomplete-prefix"
        ariaLabel="Country"
      >
        <el-icon elInputPrefix name="magnifying-glass" size="sm" />
        ${countries
          .map(
            (c) =>
              `<el-autocomplete-item value="${c.value}" label="${c.label}">${c.label}</el-autocomplete-item>`,
          )
          .join('\n        ')}
      </el-autocomplete>
    </div>`,
  }),
};

export const CustomRows: Story = {
  render: () => ({
    props: { value: '', query: '' },
    moduleMetadata: {
      imports: [
        ElAutocomplete,
        ElAutocompleteItem,
        ElAvatar,
        ElBadge,
      ],
    },
    template: `<div style="${panelSpace}">
      <el-autocomplete
        [(value)]="value"
        [(query)]="query"
        placeholder="Search people…"
        inputId="autocomplete-rows"
        ariaLabel="Person"
      >
        <el-autocomplete-item value="ada" label="Ada Lovelace">
          <el-avatar initials="AL" alt="" size="sm" />
          Ada Lovelace
          <el-badge content="Eng" />
        </el-autocomplete-item>
        <el-autocomplete-item value="grace" label="Grace Hopper">
          <el-avatar initials="GH" alt="" size="sm" />
          Grace Hopper
          <el-badge content="Ops" />
        </el-autocomplete-item>
        <el-autocomplete-item value="alan" label="Alan Turing">
          <el-avatar initials="AT" alt="" size="sm" />
          Alan Turing
          <el-badge content="Research" />
        </el-autocomplete-item>
      </el-autocomplete>
    </div>`,
  }),
};

export const Loading: Story = {
  render: () => ({
    props: { value: '', query: 'ada', loading: true },
    moduleMetadata: {
      imports: [
        ElAutocomplete,
        ElAutocompleteItem,
        ElAutocompleteLoading,
        ElProgressCircle,
      ],
    },
    template: `<div style="${panelSpace}">
      <el-autocomplete
        [(value)]="value"
        [(query)]="query"
        [loading]="loading"
        [filter]="false"
        placeholder="Search people…"
        inputId="autocomplete-loading"
        ariaLabel="Person"
      >
        <el-progress-circle
          elAutocompleteLoading
          size="sm"
          indeterminate
        />
      </el-autocomplete>
    </div>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openList(canvas.getByRole('combobox', { name: 'Person' }));
  },
};

export const Empty: Story = {
  render: () => ({
    props: { value: '', query: 'zzzz' },
    moduleMetadata: {
      imports: [
        ElAutocomplete,
        ElAutocompleteItem,
        ElAutocompleteEmpty,
        ElEmptyState,
      ],
    },
    template: `<div style="${panelSpace}">
      <el-autocomplete
        [(value)]="value"
        [(query)]="query"
        placeholder="Search countries…"
        inputId="autocomplete-empty"
        ariaLabel="Country"
      >
        <el-empty-state
          elAutocompleteEmpty
          icon="magnifying-glass"
          title="No countries"
          description="Try a different spelling."
        />
        ${countries
          .map(
            (c) =>
              `<el-autocomplete-item value="${c.value}" label="${c.label}">${c.label}</el-autocomplete-item>`,
          )
          .join('\n        ')}
      </el-autocomplete>
    </div>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openList(canvas.getByRole('combobox', { name: 'Country' }));
  },
};

export const EmptyTemplate: Story = {
  render: () => ({
    props: { value: '', query: 'zzzz' },
    moduleMetadata: {
      imports: [
        ElAutocomplete,
        ElAutocompleteItem,
        ElAutocompleteEmpty,
        ElEmptyState,
      ],
    },
    template: `<div style="${panelSpace}">
      <el-autocomplete
        [(value)]="value"
        [(query)]="query"
        placeholder="Search countries…"
        inputId="autocomplete-empty-tpl"
        ariaLabel="Country"
      >
        <ng-template elAutocompleteEmpty let-query>
          <el-empty-state
            icon="magnifying-glass"
            title="No matches"
            [description]="'Nothing for “' + query + '”'"
          />
        </ng-template>
        ${countries
          .map(
            (c) =>
              `<el-autocomplete-item value="${c.value}" label="${c.label}">${c.label}</el-autocomplete-item>`,
          )
          .join('\n        ')}
      </el-autocomplete>
    </div>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openList(canvas.getByRole('combobox', { name: 'Country' }));
  },
};

export const CustomSuffix: Story = {
  render: () => ({
    props: {
      value: 'in',
      query: 'India',
      clear: () => {
        /* bound in play/render via methods */
      },
    },
    moduleMetadata: {
      imports: [
        ElAutocomplete,
        ElAutocompleteItem,
        ElIcon,
        ElInputSuffix,
      ],
    },
    template: `<div style="${panelSpace}">
      <el-autocomplete
        #ac
        [(value)]="value"
        [(query)]="query"
        placeholder="Search countries…"
        inputId="autocomplete-suffix"
        ariaLabel="Country"
      >
        <button
          elInputSuffix
          type="button"
          aria-label="Clear"
          (click)="value = ''; query = ''"
          style="border:0;background:transparent;cursor:pointer;color:var(--el-color-on-surface-variant)"
        >
          <el-icon name="xmark" size="sm" />
        </button>
        ${countries
          .map(
            (c) =>
              `<el-autocomplete-item value="${c.value}" label="${c.label}">${c.label}</el-autocomplete-item>`,
          )
          .join('\n        ')}
      </el-autocomplete>
    </div>`,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'in',
    query: 'India',
  },
};

export const Error: Story = {
  render: () => ({
    props: { value: '', query: '' },
    moduleMetadata: {
      imports: [
        ElAutocomplete,
        ElAutocompleteItem,
        ElLabel,
        ElFormError,
      ],
    },
    template: `<div style="display:flex;flex-direction:column;gap:0.75rem;${panelSpace}">
      <el-label htmlFor="autocomplete-error" variant="error">Country</el-label>
      <el-autocomplete
        [(value)]="value"
        [(query)]="query"
        error
        inputId="autocomplete-error"
        placeholder="Search countries…"
        ariaDescribedby="autocomplete-error-msg"
      >
        ${countries
          .map(
            (c) =>
              `<el-autocomplete-item value="${c.value}" label="${c.label}">${c.label}</el-autocomplete-item>`,
          )
          .join('\n        ')}
      </el-autocomplete>
      <el-form-error id="autocomplete-error-msg">Country is required</el-form-error>
    </div>`,
  }),
};

export const LongList: Story = {
  render: () => ({
    props: { value: '', query: '' },
    moduleMetadata: {
      imports: [ElAutocomplete, ElAutocompleteItem],
    },
    template: `<div style="${panelSpace}">
      <el-autocomplete
        [(value)]="value"
        [(query)]="query"
        placeholder="Search options…"
        inputId="autocomplete-long"
        ariaLabel="Option"
      >
        ${longList
          .map(
            (c) =>
              `<el-autocomplete-item value="${c.value}" label="${c.label}">${c.label}</el-autocomplete-item>`,
          )
          .join('\n        ')}
      </el-autocomplete>
    </div>`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { value: '', query: '' },
    moduleMetadata: {
      imports: [ElAutocomplete, ElAutocompleteItem],
    },
    template: `<div style="display:flex;flex-direction:column;gap:1rem;${panelSpace}">
      <el-autocomplete size="sm" [(value)]="value" [(query)]="query" placeholder="Small" inputId="ac-sm" ariaLabel="Small">
        <el-autocomplete-item value="a" label="Alpha">Alpha</el-autocomplete-item>
        <el-autocomplete-item value="b" label="Beta">Beta</el-autocomplete-item>
      </el-autocomplete>
      <el-autocomplete size="md" [(value)]="value" [(query)]="query" placeholder="Medium" inputId="ac-md" ariaLabel="Medium">
        <el-autocomplete-item value="a" label="Alpha">Alpha</el-autocomplete-item>
        <el-autocomplete-item value="b" label="Beta">Beta</el-autocomplete-item>
      </el-autocomplete>
      <el-autocomplete size="lg" [(value)]="value" [(query)]="query" placeholder="Large" inputId="ac-lg" ariaLabel="Large">
        <el-autocomplete-item value="a" label="Alpha">Alpha</el-autocomplete-item>
        <el-autocomplete-item value="b" label="Beta">Beta</el-autocomplete-item>
      </el-autocomplete>
    </div>`,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  parameters: { docs: { codePanel: true } },
  render: () => ({
    props: {
      value: '',
      query: '',
      disabledValue: 'in',
      disabledQuery: 'India',
      loadingValue: '',
      loadingQuery: 'a',
      longValue: '',
      longQuery: '',
    },
    moduleMetadata: {
      imports: [
        ElAutocomplete,
        ElAutocompleteItem,
        ElAutocompleteLoading,
        ElProgressCircle,
      ],
    },
    template: `<div style="display:flex;flex-direction:column;gap:1.5rem;min-height:22rem;width:100%;max-width:22rem">
      <el-autocomplete
        [(value)]="value"
        [(query)]="query"
        placeholder="Search countries…"
        inputId="ac-interactions"
        ariaLabel="Country"
      >
        ${countries
          .map(
            (c) =>
              `<el-autocomplete-item value="${c.value}" label="${c.label}">${c.label}</el-autocomplete-item>`,
          )
          .join('\n        ')}
      </el-autocomplete>

      <el-autocomplete
        [(value)]="disabledValue"
        [(query)]="disabledQuery"
        disabled
        placeholder="Disabled"
        inputId="ac-disabled"
        ariaLabel="Disabled country"
      >
        <el-autocomplete-item value="in" label="India">India</el-autocomplete-item>
      </el-autocomplete>

      <el-autocomplete
        [(value)]="loadingValue"
        [(query)]="loadingQuery"
        loading
        [filter]="false"
        placeholder="Loading…"
        inputId="ac-busy"
        ariaLabel="Busy search"
      >
        <el-progress-circle elAutocompleteLoading size="sm" indeterminate />
      </el-autocomplete>

      <el-autocomplete
        [(value)]="longValue"
        [(query)]="longQuery"
        placeholder="Long list"
        inputId="ac-long-play"
        ariaLabel="Long list"
      >
        ${longList
          .map(
            (c) =>
              `<el-autocomplete-item value="${c.value}" label="${c.label}">${c.label}</el-autocomplete-item>`,
          )
          .join('\n        ')}
      </el-autocomplete>
    </div>`,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole('combobox', { name: 'Country' });
    const disabled = canvas.getByRole('combobox', { name: 'Disabled country' });
    const busy = canvas.getByRole('combobox', { name: 'Busy search' });
    const long = canvas.getByRole('combobox', { name: 'Long list' });

    await step('ARIA: combobox list autocomplete', async () => {
      await expect(combobox).toHaveAttribute('role', 'combobox');
      await expect(combobox).toHaveAttribute('aria-autocomplete', 'list');
      await expect(combobox).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Pointer: type filters and select option', async () => {
      await userEvent.click(combobox);
      await userEvent.type(combobox, 'uni');
      await expect(combobox).toHaveAttribute('aria-expanded', 'true');
      const option = canvas.getByRole('option', { name: 'United Kingdom' });
      await userEvent.click(option);
      await expect(combobox).toHaveValue('United Kingdom');
      await expect(combobox).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Keyboard: ArrowDown, Enter selects', async () => {
      await userEvent.clear(combobox);
      await userEvent.type(combobox, 'ja');
      await userEvent.keyboard('{ArrowDown}');
      await expect(combobox).toHaveAttribute('aria-activedescendant');
      await userEvent.keyboard('{Enter}');
      await expect(combobox).toHaveValue('Japan');
    });

    await step('Keyboard: Escape restores committed query', async () => {
      await userEvent.type(combobox, '{Backspace}{Backspace}');
      await expect(combobox).toHaveAttribute('aria-expanded', 'true');
      await userEvent.keyboard('{Escape}');
      await expect(combobox).toHaveAttribute('aria-expanded', 'false');
      await expect(combobox).toHaveValue('Japan');
    });

    await step('Disabled combobox is not operable', async () => {
      await expect(disabled).toBeDisabled();
      const onClick = fn();
      disabled.addEventListener('click', onClick);
      await userEvent.click(disabled);
      await expect(onClick).not.toHaveBeenCalled();
    });

    await step('Loading sets aria-busy', async () => {
      await expect(busy).toHaveAttribute('aria-busy', 'true');
      await userEvent.click(busy);
      await userEvent.keyboard('{ArrowDown}');
      await expect(busy).toHaveAttribute('aria-expanded', 'true');
      await expect(canvas.getByRole('status')).toBeInTheDocument();
    });

    await step('Long list: active option scrolls into view', async () => {
      await userEvent.click(long);
      await userEvent.keyboard('{ArrowDown}');
      for (let i = 0; i < 12; i += 1) {
        await userEvent.keyboard('{ArrowDown}');
      }
      const activeId = long.getAttribute('aria-activedescendant');
      await expect(activeId).toBeTruthy();
      const active = canvasElement.querySelector(`#${activeId}`);
      await expect(active).toBeTruthy();
      await expect(active?.hasAttribute('hidden')).toBe(false);
    });
  },
};
