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
    title: 'Components',
    items: [
      { label: 'Button', path: '/components/button' },
      { label: 'Label', path: '/components/label' },
    ],
  },
];

export interface PropDefinition {
  name: string;
  type: string;
  default: string;
  description: string;
}
