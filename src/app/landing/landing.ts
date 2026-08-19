import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElAlert,
  ElButton,
  ElCard,
  ElChip,
  ElIcon,
  ElSeparator,
  ElStack,
} from '@ng-elemental/ui';
import { CodeBlock } from '../docs/ui/code-block';

@Component({
  selector: 'app-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElCard, ElChip, ElIcon, ElSeparator, ElStack, ElAlert, CodeBlock],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingPage {
  protected readonly initCode = `npx @ng-elemental/cli init
npx @ng-elemental/cli add button
npx @ng-elemental/cli add dialog toast table`;

  protected readonly usageCode = `import { ElButton } from './ui/button/button';

@Component({
  imports: [ElButton],
  template: \`<el-button variant="primary">Save</el-button>\`,
})
export class MyComponent {}`;

  protected readonly mcpCode = `{
  "mcpServers": {
    "ng-elemental": {
      "url": "https://ng-elemental.vercel.app/mcp"
    }
  }
}`;

  protected readonly componentGroups = [
    {
      icon: 'keyboard',
      title: 'Forms & Inputs',
      items: ['Button', 'Input', 'Select', 'Checkbox', 'Date Picker', 'Slider'],
    },
    {
      icon: 'table-columns',
      title: 'Layout',
      items: ['Stack', 'Grid', 'Container', 'Card', 'Resizable', 'Scroll Area'],
    },
    {
      icon: 'compass',
      title: 'Navigation',
      items: ['Tabs', 'Breadcrumb', 'Pagination', 'Menubar', 'Stepper', 'Accordion'],
    },
    {
      icon: 'layer-group',
      title: 'Overlays',
      items: ['Dialog', 'Sheet', 'Drawer', 'Popover', 'Menu', 'Tooltip'],
    },
    {
      icon: 'bell',
      title: 'Feedback',
      items: ['Toast', 'Alert', 'Snackbar', 'Progress', 'Skeleton', 'Empty State'],
    },
    {
      icon: 'database',
      title: 'Data Display',
      items: ['Table', 'List', 'Tree', 'Carousel', 'Infinite Scroll', 'Avatar'],
    },
  ];

  protected readonly reasons = [
    {
      icon: 'code',
      title: 'You own the source',
      description:
        'Components land in your project as TypeScript, HTML, and SCSS. Modify structure, styling, or behavior freely — no overrides, no fighting a black-box library.',
    },
    {
      icon: 'bolt',
      title: 'Signal-first Angular',
      description:
        'Built with Angular 22 signals, computed state, and standalone components. OnPush throughout. No NgModules, no legacy patterns.',
    },
    {
      icon: 'robot',
      title: 'AI-agent ready',
      description:
        'The MCP server lets Cursor, Claude, and other AI agents discover, inspect, and install components without typing CLI commands.',
    },
    {
      icon: 'palette',
      title: 'Design-token theming',
      description:
        'CSS custom properties drive every color, size, and radius. Change --el-color-primary once and the whole component set updates.',
    },
  ];
}
