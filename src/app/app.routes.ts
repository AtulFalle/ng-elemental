import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./docs/layout/doc-layout').then((m) => m.DocLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./docs/pages/home').then((m) => m.HomePage),
      },
      {
        path: 'installation',
        loadComponent: () =>
          import('./docs/pages/installation').then((m) => m.InstallationPage),
      },
      {
        path: 'theming',
        loadComponent: () =>
          import('./docs/pages/theme-doc').then((m) => m.ThemeDocPage),
      },
      {
        path: 'components/button',
        loadComponent: () =>
          import('./docs/pages/button-doc').then((m) => m.ButtonDocPage),
      },
      {
        path: 'components/icon',
        loadComponent: () =>
          import('./docs/pages/icon-doc').then((m) => m.IconDocPage),
      },
      {
        path: 'components/label',
        loadComponent: () =>
          import('./docs/pages/label-doc').then((m) => m.LabelDocPage),
      },
      {
        path: 'components/checkbox',
        loadComponent: () =>
          import('./docs/pages/checkbox-doc').then((m) => m.CheckboxDocPage),
      },
      {
        path: 'components/radio',
        loadComponent: () =>
          import('./docs/pages/radio-doc').then((m) => m.RadioDocPage),
      },
      {
        path: 'components/chip',
        loadComponent: () =>
          import('./docs/pages/chip-doc').then((m) => m.ChipDocPage),
      },
      {
        path: 'components/segmented-button',
        loadComponent: () =>
          import('./docs/pages/segmented-button-doc').then(
            (m) => m.SegmentedButtonDocPage,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
