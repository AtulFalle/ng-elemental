import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from '../button/button';
import { ElChip } from '../chip/chip';
import { ElIcon } from '../icon/icon';
import {
  ElSelect,
  ElSelectGroup,
  ElSelectItem,
  ElSelectValue,
} from './select';

const panelSpace = 'min-height: 18rem; max-width: 24rem;';

const meta: Meta<ElSelect> = {
  title: 'Components/Select',
  component: ElSelect,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
  args: {
    size: 'md',
    multiple: false,
    disabled: false,
    placeholder: 'Choose a city',
    ariaLabel: 'City',
    value: 'pune',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [ElSelect, ElSelectItem],
    },
    template: `<div style="${panelSpace}">
      <el-select
        [(value)]="value"
        [size]="size"
        [multiple]="multiple"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [ariaLabel]="ariaLabel"
      >
        <el-select-item value="pune" label="Pune">Pune</el-select-item>
        <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
        <el-select-item value="delhi" label="Delhi">Delhi</el-select-item>
      </el-select>
    </div>`,
  }),
};

export default meta;
type Story = StoryObj<ElSelect>;

export const SimpleList: Story = {};

export const Sizes: Story = {
  render: () => ({
    props: { sm: 'pune', md: 'mumbai', lg: 'delhi' },
    moduleMetadata: { imports: [ElSelect, ElSelectItem] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; ${panelSpace}">
        <el-select [(value)]="sm" size="sm" placeholder="Small" ariaLabel="Small">
          <el-select-item value="pune" label="Pune">Pune</el-select-item>
          <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
        </el-select>
        <el-select [(value)]="md" size="md" placeholder="Medium" ariaLabel="Medium">
          <el-select-item value="pune" label="Pune">Pune</el-select-item>
          <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
        </el-select>
        <el-select [(value)]="lg" size="lg" placeholder="Large" ariaLabel="Large">
          <el-select-item value="delhi" label="Delhi">Delhi</el-select-item>
          <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
        </el-select>
      </div>
    `,
  }),
};

export const MultipleCheckboxes: Story = {
  args: { multiple: true, value: ['pune'], placeholder: 'Choose cities' },
};

export const GroupedList: Story = {
  render: () => ({
    props: { value: 'apple' },
    moduleMetadata: { imports: [ElSelect, ElSelectItem, ElSelectGroup] },
    template: `
      <div style="${panelSpace}">
        <el-select [(value)]="value" placeholder="Choose produce" ariaLabel="Produce">
          <el-select-group label="Fruits">
            <el-select-item value="apple" label="Apple">Apple</el-select-item>
            <el-select-item value="banana" label="Banana">Banana</el-select-item>
          </el-select-group>
          <el-select-group label="Vegetables">
            <el-select-item value="carrot" label="Carrot">Carrot</el-select-item>
            <el-select-item value="spinach" label="Spinach">Spinach</el-select-item>
          </el-select-group>
        </el-select>
      </div>
    `,
  }),
};

export const NestedList: Story = {
  render: () => ({
    props: { value: 'tokyo' },
    moduleMetadata: { imports: [ElSelect, ElSelectItem, ElSelectGroup] },
    template: `
      <div style="${panelSpace}">
        <el-select [(value)]="value" placeholder="Choose a city" ariaLabel="City">
          <el-select-group label="Asia">
            <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
            <el-select-group label="Japan">
              <el-select-item value="tokyo" label="Tokyo">Tokyo</el-select-item>
              <el-select-item value="osaka" label="Osaka">Osaka</el-select-item>
            </el-select-group>
          </el-select-group>
          <el-select-group label="Europe">
            <el-select-item value="paris" label="Paris">Paris</el-select-item>
            <el-select-item value="berlin" label="Berlin">Berlin</el-select-item>
          </el-select-group>
        </el-select>
      </div>
    `,
  }),
};

export const UserList: Story = {
  render: () => ({
    props: {
      value: 'ada',
      onView(event: Event) {
        event.stopPropagation();
      },
    },
    moduleMetadata: {
      imports: [ElSelect, ElSelectItem, ElIcon, ElButton],
    },
    template: `
      <div style="${panelSpace}">
        <el-select [(value)]="value" placeholder="Choose a user" ariaLabel="User">
          <el-select-item value="ada" label="Ada Lovelace">
            <el-icon name="user" size="sm" />
            <span>Ada Lovelace</span>
            <el-button variant="ghost" size="sm" (click)="onView($event)">View</el-button>
          </el-select-item>
          <el-select-item value="grace" label="Grace Hopper">
            <el-icon name="user" size="sm" />
            <span>Grace Hopper</span>
            <el-button variant="ghost" size="sm" (click)="onView($event)">View</el-button>
          </el-select-item>
          <el-select-item value="alan" label="Alan Turing">
            <el-icon name="user" size="sm" />
            <span>Alan Turing</span>
            <el-button variant="ghost" size="sm" (click)="onView($event)">View</el-button>
          </el-select-item>
        </el-select>
      </div>
    `,
  }),
};

export const ChipsValue: Story = {
  render: () => ({
    props: {
      value: ['angular', 'signals'],
    },
    moduleMetadata: {
      imports: [ElSelect, ElSelectItem, ElSelectValue, ElChip],
    },
    template: `
      <div style="${panelSpace}">
        <el-select
          #select
          multiple
          [(value)]="value"
          placeholder="Select tags"
          ariaLabel="Tags"
        >
          <ng-template elSelectValue let-selected>
            @if (selected.length === 0) {
              <span>Select tags</span>
            } @else {
              @for (item of selected; track item.value) {
                <el-chip
                  type="suggestion"
                  appearance="filled"
                  [removable]="true"
                  (click)="$event.stopPropagation()"
                  (removed)="select.toggle(item.value)"
                >{{ item.label }}</el-chip>
              }
            }
          </ng-template>
          <el-select-item value="angular" label="Angular">Angular</el-select-item>
          <el-select-item value="signals" label="Signals">Signals</el-select-item>
          <el-select-item value="a11y" label="Accessibility">Accessibility</el-select-item>
          <el-select-item value="theming" label="Theming">Theming</el-select-item>
        </el-select>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true, value: 'pune' },
};
