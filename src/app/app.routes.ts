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
        path: 'components/form-error',
        loadComponent: () =>
          import('./docs/pages/form-error-doc').then((m) => m.FormErrorDocPage),
      },
      {
        path: 'components/input',
        loadComponent: () =>
          import('./docs/pages/input-doc').then((m) => m.InputDocPage),
      },
      {
        path: 'components/checkbox',
        loadComponent: () =>
          import('./docs/pages/checkbox-doc').then((m) => m.CheckboxDocPage),
      },
      {
        path: 'components/slide-toggle',
        loadComponent: () =>
          import('./docs/pages/slide-toggle-doc').then((m) => m.SlideToggleDocPage),
      },
      {
        path: 'components/radio',
        loadComponent: () =>
          import('./docs/pages/radio-doc').then((m) => m.RadioDocPage),
      },
      {
        path: 'components/select',
        loadComponent: () =>
          import('./docs/pages/select-doc').then((m) => m.SelectDocPage),
      },
      {
        path: 'components/datepicker',
        loadComponent: () =>
          import('./docs/pages/datepicker-doc').then((m) => m.DatepickerDocPage),
      },
      {
        path: 'components/date-range-picker',
        loadComponent: () =>
          import('./docs/pages/date-range-picker-doc').then(
            (m) => m.DateRangePickerDocPage,
          ),
      },
      {
        path: 'components/chip',
        loadComponent: () =>
          import('./docs/pages/chip-doc').then((m) => m.ChipDocPage),
      },
      {
        path: 'components/progress',
        loadComponent: () =>
          import('./docs/pages/progress-doc').then((m) => m.ProgressDocPage),
      },
      {
        path: 'components/avatar',
        loadComponent: () =>
          import('./docs/pages/avatar-doc').then((m) => m.AvatarDocPage),
      },
      {
        path: 'components/card',
        loadComponent: () =>
          import('./docs/pages/card-doc').then((m) => m.CardDocPage),
      },
      {
        path: 'components/attachment',
        loadComponent: () =>
          import('./docs/pages/attachment-doc').then(
            (m) => m.AttachmentDocPage,
          ),
      },
      {
        path: 'components/file-upload',
        loadComponent: () =>
          import('./docs/pages/file-upload-doc').then(
            (m) => m.FileUploadDocPage,
          ),
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
