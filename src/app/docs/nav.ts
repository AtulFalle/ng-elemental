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
      { label: 'Introduction', path: '/' },
      { label: 'Installation', path: '/installation' },
    ],
  },
  {
    title: 'Theming',
    items: [{ label: 'Overview', path: '/theming' }],
  },
  {
    title: 'Components',
    items: [
      { label: 'Button', path: '/components/button' },
      { label: 'Icon', path: '/components/icon' },
      { label: 'Label', path: '/components/label' },
      { label: 'Form Error', path: '/components/form-error' },
      { label: 'Input', path: '/components/input' },
      { label: 'Checkbox', path: '/components/checkbox' },
      { label: 'Slide Toggle', path: '/components/slide-toggle' },
      { label: 'Radio', path: '/components/radio' },
      { label: 'Select', path: '/components/select' },
      { label: 'Date Picker', path: '/components/datepicker' },
      { label: 'Date Range Picker', path: '/components/date-range-picker' },
      { label: 'Chip', path: '/components/chip' },
      { label: 'Progress', path: '/components/progress' },
      { label: 'Slider', path: '/components/slider' },
      { label: 'Avatar', path: '/components/avatar' },
      { label: 'Card', path: '/components/card' },
      { label: 'List', path: '/components/list' },
      { label: 'Infinite Scroll', path: '/components/infinite-scroll' },
      { label: 'Attachment', path: '/components/attachment' },
      { label: 'File Upload', path: '/components/file-upload' },
      { label: 'Tabs', path: '/components/tabs' },
      { label: 'Accordion', path: '/components/accordion' },
      { label: 'Table', path: '/components/table' },
      { label: 'Pagination', path: '/components/pagination' },
      { label: 'Skeleton', path: '/components/skeleton' },
      { label: 'Breadcrumb', path: '/components/breadcrumb' },
      { label: 'Tooltip', path: '/components/tooltip' },
      { label: 'Menu', path: '/components/menu' },
      { label: 'Menubar', path: '/components/menubar' },
      { label: 'Popover', path: '/components/popover' },
      { label: 'Alert', path: '/components/alert' },
      { label: 'Toast', path: '/components/toast' },
      { label: 'Segmented Button', path: '/components/segmented-button' },
    ],
  },
];

export interface PropDefinition {
  name: string;
  type: string;
  default: string;
  description: string;
}
