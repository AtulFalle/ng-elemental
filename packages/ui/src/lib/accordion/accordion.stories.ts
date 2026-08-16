import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ElButton } from '../button/button';
import { ElChip } from '../chip/chip';
import { ElIcon } from '../icon/icon';
import {
  ElAccordion,
  ElAccordionContent,
  ElAccordionItem,
  ElAccordionSubtitle,
  ElAccordionTitle,
} from './accordion';

const ACCORDION_IMPORTS = [
  ElAccordion,
  ElAccordionItem,
  ElAccordionTitle,
  ElAccordionSubtitle,
  ElAccordionContent,
  ElButton,
  ElChip,
  ElIcon,
];

const meta: Meta<ElAccordion> = {
  title: 'Components/Accordion',
  component: ElAccordion,
  argTypes: {
    variant: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
  args: {
    variant: 'single',
    disabled: false,
    ariaLabel: 'Order details',
  },
  render: (args) => ({
    props: { ...args, open: 'shipping' },
    moduleMetadata: { imports: ACCORDION_IMPORTS },
    template: `
      <el-accordion
        [variant]="variant"
        [disabled]="disabled"
        [ariaLabel]="ariaLabel"
        [value]="open"
        (valueChange)="open = $event"
        style="max-width: 36rem"
      >
        <el-accordion-item
          value="shipping"
          title="Shipping"
          subtitle="2–5 business days"
        >
          <ng-template elAccordionContent>
            <p>Ships from Pune. Express options are available at checkout.</p>
          </ng-template>
        </el-accordion-item>
        <el-accordion-item
          value="billing"
          title="Billing"
          subtitle="Invoices and payment methods"
        >
          <ng-template elAccordionContent>
            <p>Card on file ending 4242. Billing contact is finance@example.com.</p>
          </ng-template>
        </el-accordion-item>
        <el-accordion-item
          value="team"
          title="Team"
          subtitle="Members and roles"
        >
          <ng-template elAccordionContent>
            <p>Three members. Invite more people from settings.</p>
          </ng-template>
        </el-accordion-item>
      </el-accordion>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElAccordion>;

export const Default: Story = {};

export const Multiple: Story = {
  args: {
    variant: 'multiple',
    ariaLabel: 'FAQ',
  },
  render: (args) => ({
    props: { ...args, open: ['payments', 'refunds'] },
    moduleMetadata: { imports: ACCORDION_IMPORTS },
    template: `
      <el-accordion
        [variant]="variant"
        [disabled]="disabled"
        [ariaLabel]="ariaLabel"
        [value]="open"
        (valueChange)="open = $event"
        style="max-width: 36rem"
      >
        <el-accordion-item value="payments" title="How do payments work?">
          <ng-template elAccordionContent>
            <p>We charge when the order ships. Several panels can stay open.</p>
          </ng-template>
        </el-accordion-item>
        <el-accordion-item value="refunds" title="Can I get a refund?">
          <ng-template elAccordionContent>
            <p>Yes, within 30 days of delivery.</p>
          </ng-template>
        </el-accordion-item>
        <el-accordion-item value="shipping" title="Where do you ship?">
          <ng-template elAccordionContent>
            <p>India and selected international destinations.</p>
          </ng-template>
        </el-accordion-item>
      </el-accordion>
    `,
  }),
};

export const CustomTemplates: Story = {
  render: () => ({
    props: { open: 'order' },
    moduleMetadata: { imports: ACCORDION_IMPORTS },
    template: `
      <el-accordion
        variant="single"
        [value]="open"
        (valueChange)="open = $event"
        ariaLabel="Shipment"
        style="max-width: 36rem"
      >
        <el-accordion-item value="order">
          <ng-template elAccordionTitle>
            <el-icon name="box" size="sm" />
            Order #1284
          </ng-template>
          <ng-template elAccordionSubtitle>
            <el-chip>In transit</el-chip>
          </ng-template>
          <ng-template elAccordionContent>
            <p>Left the warehouse on 12 Aug. Expected Friday.</p>
          </ng-template>
        </el-accordion-item>
        <el-accordion-item value="documents">
          <ng-template elAccordionTitle>
            <el-icon name="file-lines" size="sm" />
            Documents
          </ng-template>
          <ng-template elAccordionSubtitle>
            Invoice and packing list
          </ng-template>
          <ng-template elAccordionContent>
            <p>Download from the billing tab after delivery.</p>
          </ng-template>
        </el-accordion-item>
      </el-accordion>
    `,
  }),
};

export const HeaderActions: Story = {
  render: () => ({
    props: { open: 'shipping' },
    moduleMetadata: { imports: ACCORDION_IMPORTS },
    template: `
      <el-accordion
        variant="single"
        [value]="open"
        (valueChange)="open = $event"
        ariaLabel="Order details"
        style="max-width: 36rem"
      >
        <el-accordion-item
          value="shipping"
          title="Shipping"
          subtitle="2–5 business days"
        >
          <div elAccordionActions>
            <el-button variant="ghost" size="sm">Edit</el-button>
          </div>
          <ng-template elAccordionContent>
            <p>Header actions do not toggle the panel.</p>
          </ng-template>
        </el-accordion-item>
        <el-accordion-item
          value="billing"
          title="Billing"
          subtitle="Card ending 4242"
        >
          <div elAccordionActions>
            <el-button variant="ghost" size="sm">Change</el-button>
          </div>
          <ng-template elAccordionContent>
            <p>Update the card on file from settings.</p>
          </ng-template>
        </el-accordion-item>
      </el-accordion>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledItem: Story = {
  render: () => ({
    props: { open: 'overview' },
    moduleMetadata: { imports: ACCORDION_IMPORTS },
    template: `
      <el-accordion
        variant="single"
        [value]="open"
        (valueChange)="open = $event"
        ariaLabel="Account"
        style="max-width: 36rem"
      >
        <el-accordion-item value="overview" title="Overview">
          <ng-template elAccordionContent>
            <p>Enabled panel.</p>
          </ng-template>
        </el-accordion-item>
        <el-accordion-item value="billing" title="Billing" disabled>
          <ng-template elAccordionContent>
            <p>This panel cannot open.</p>
          </ng-template>
        </el-accordion-item>
      </el-accordion>
    `,
  }),
};
