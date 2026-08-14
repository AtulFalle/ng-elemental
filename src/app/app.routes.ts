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
        path: 'components/button',
        loadComponent: () =>
          import('./docs/pages/button-doc').then((m) => m.ButtonDocPage),
      },
      {
        path: 'components/label',
        loadComponent: () =>
          import('./docs/pages/label-doc').then((m) => m.LabelDocPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
