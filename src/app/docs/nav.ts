export interface DocNavItem {
  label: string;
  path: string;
}

export interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

export const DOC_NAV: DocNavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', path: '/docs' },
      { label: 'Installation', path: '/docs/installation' },
      { label: 'MCP server', path: '/docs/mcp' },
    ],
  },
  {
    title: 'Theming',
    items: [{ label: 'Overview', path: '/docs/theming' }],
  },
  {
    title: 'Layout',
    items: [
      { label: 'Container', path: '/docs/components/container' },
      { label: 'Stack', path: '/docs/components/stack' },
      { label: 'Grid', path: '/docs/components/grid' },
      { label: 'Aspect Ratio', path: '/docs/components/aspect-ratio' },
      { label: 'Scroll Area', path: '/docs/components/scroll-area' },
      { label: 'Separator', path: '/docs/components/separator' },
      { label: 'Resizable', path: '/docs/components/resizable' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Button', path: '/docs/components/button' },
      { label: 'Icon', path: '/docs/components/icon' },
      { label: 'Label', path: '/docs/components/label' },
      { label: 'Form Error', path: '/docs/components/form-error' },
      { label: 'Input', path: '/docs/components/input' },
      { label: 'Checkbox', path: '/docs/components/checkbox' },
      { label: 'Slide Toggle', path: '/docs/components/slide-toggle' },
      { label: 'Radio', path: '/docs/components/radio' },
      { label: 'Select', path: '/docs/components/select' },
      { label: 'Date Picker', path: '/docs/components/datepicker' },
      { label: 'Date Range Picker', path: '/docs/components/date-range-picker' },
      { label: 'Chip', path: '/docs/components/chip' },
      { label: 'Progress', path: '/docs/components/progress' },
      { label: 'Slider', path: '/docs/components/slider' },
      { label: 'Carousel', path: '/docs/components/carousel' },
      { label: 'Avatar', path: '/docs/components/avatar' },
      { label: 'Card', path: '/docs/components/card' },
      { label: 'List', path: '/docs/components/list' },
      { label: 'Tree', path: '/docs/components/tree' },
      { label: 'Infinite Scroll', path: '/docs/components/infinite-scroll' },
      { label: 'Attachment', path: '/docs/components/attachment' },
      { label: 'File Upload', path: '/docs/components/file-upload' },
      { label: 'Tabs', path: '/docs/components/tabs' },
      { label: 'Stepper', path: '/docs/components/stepper' },
      { label: 'Accordion', path: '/docs/components/accordion' },
      { label: 'Table', path: '/docs/components/table' },
      { label: 'Pagination', path: '/docs/components/pagination' },
      { label: 'Skeleton', path: '/docs/components/skeleton' },
      { label: 'Breadcrumb', path: '/docs/components/breadcrumb' },
      { label: 'Tooltip', path: '/docs/components/tooltip' },
      { label: 'Menu', path: '/docs/components/menu' },
      { label: 'Menubar', path: '/docs/components/menubar' },
      { label: 'Popover', path: '/docs/components/popover' },
      { label: 'Dialog', path: '/docs/components/dialog' },
      { label: 'Sheet', path: '/docs/components/sheet' },
      { label: 'Drawer', path: '/docs/components/drawer' },
      { label: 'Alert', path: '/docs/components/alert' },
      { label: 'Toast', path: '/docs/components/toast' },
      { label: 'Snackbar', path: '/docs/components/snackbar' },
      { label: 'Empty State', path: '/docs/components/empty-state' },
      { label: 'Segmented Button', path: '/docs/components/segmented-button' },
    ],
  },
];

export interface PropDefinition {
  name: string;
  type: string;
  default: string;
  description: string;
}
