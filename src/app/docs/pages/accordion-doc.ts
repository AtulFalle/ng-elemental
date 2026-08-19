import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElAccordion,
  ElAccordionContent,
  ElAccordionItem,
  ElAccordionSubtitle,
  ElAccordionTitle,
  ElButton,
  ElChip,
  ElIcon,
  type ElAccordionValue,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-accordion-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElAccordion,
    ElAccordionItem,
    ElAccordionTitle,
    ElAccordionSubtitle,
    ElAccordionContent,
    ElChip,
    ElIcon,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './accordion-doc.html',
  styleUrl: './page.scss',
})
export class AccordionDocPage {
  protected readonly heroPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly multiplePanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly templatesPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly disabledPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly singleOpen = signal<ElAccordionValue>('shipping');
  protected readonly multiOpen = signal<ElAccordionValue>(['payments', 'refunds']);
  protected readonly templateOpen = signal<ElAccordionValue>('order');
  protected readonly disabledOpen = signal<ElAccordionValue>('overview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add accordion`;

  protected readonly importCode = `import {
  ElAccordion,
  ElAccordionItem,
  ElAccordionContent,
} from './ui/accordion/accordion';

@Component({
  imports: [ElAccordion, ElAccordionItem, ElAccordionContent],
  template: \`
    <el-accordion variant="single" [(value)]="open" ariaLabel="Order details">
      <el-accordion-item value="shipping" title="Shipping" subtitle="2–5 business days">
        <ng-template elAccordionContent>
          <p>Any HTML or components go here.</p>
        </ng-template>
      </el-accordion-item>
    </el-accordion>
  \`,
})
export class MyComponent {
  protected open = 'shipping';
}`;

  protected readonly usageCode = `<el-accordion variant="single" [(value)]="open" ariaLabel="Order details">
  <el-accordion-item value="shipping" title="Shipping" subtitle="2–5 business days">
    <ng-template elAccordionContent>
      <p>Ships from Pune. Express options are available at checkout.</p>
    </ng-template>
  </el-accordion-item>
  <el-accordion-item value="billing" title="Billing" subtitle="Invoices and payment methods">
    <ng-template elAccordionContent>
      <p>Card on file ending 4242.</p>
    </ng-template>
  </el-accordion-item>
</el-accordion>`;

  protected readonly multipleCode = `<el-accordion variant="multiple" [(value)]="openIds" ariaLabel="FAQ">
  <el-accordion-item value="payments" title="How do payments work?">
    <ng-template elAccordionContent>
      <p>We charge when the order ships.</p>
    </ng-template>
  </el-accordion-item>
  <el-accordion-item value="refunds" title="Can I get a refund?">
    <ng-template elAccordionContent>
      <p>Yes, within 30 days of delivery.</p>
    </ng-template>
  </el-accordion-item>
</el-accordion>`;

  protected readonly templateCode = `<el-accordion variant="single" [(value)]="open" ariaLabel="Shipment">
  <el-accordion-item value="order">
    <ng-template elAccordionTitle>
      <el-icon name="box" size="sm" />
      Order #1284
    </ng-template>
    <ng-template elAccordionSubtitle>
      <el-chip>In transit</el-chip>
    </ng-template>
    <div elAccordionActions>
      <el-button variant="ghost" size="sm">Edit</el-button>
    </div>
    <ng-template elAccordionContent>
      <p>Left the warehouse on 12 Aug.</p>
    </ng-template>
  </el-accordion-item>
</el-accordion>`;

  protected readonly scopedTokensCode = `.settings-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly accordionProps: PropDefinition[] = [
    {
      name: 'variant',
      type: `'single' | 'multiple'`,
      default: `'single'`,
      description:
        'single: at most one panel open. multiple: any number of panels can stay open. Lives on the group only.',
    },
    {
      name: 'value',
      type: 'string | string[]',
      default: `''`,
      description:
        'Open panel id(s). Two-way bindable. string when variant is single (empty means all collapsed). string[] when variant is multiple.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables every item.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible name for the group when no visible label exists.',
    },
  ];

  protected readonly itemProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: '(required)',
      description: 'Unique id for this item.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description:
        'Header title. Ignored when elAccordionTitle is provided.',
    },
    {
      name: 'subtitle',
      type: 'string',
      default: "''",
      description:
        'Header subtitle. Ignored when elAccordionSubtitle is provided.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables this item only.',
    },
  ];
}
