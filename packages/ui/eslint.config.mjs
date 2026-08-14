import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.base.config.mjs';
import ngElemental from '../../tools/eslint-plugin-ng-elemental/index.mjs';

const angularTsRules = {
  '@angular-eslint/prefer-on-push-component-change-detection': 'error',
  '@angular-eslint/prefer-standalone': 'error',
  '@angular-eslint/prefer-signals': 'error',
  '@angular-eslint/prefer-inject': 'error',
  '@angular-eslint/prefer-host-metadata-property': 'error',
  '@angular-eslint/prefer-signal-model': 'error',
  '@angular-eslint/prefer-output-emitter-ref': 'error',
  'ng-elemental/bem-host-class': 'error',
};

const angularTemplateRules = {
  '@angular-eslint/template/prefer-control-flow': 'error',
  '@angular-eslint/template/prefer-class-binding': 'error',
  'ng-elemental/bem-template-class': 'error',
};

export default [
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  ...baseConfig,
  {
    plugins: {
      'ng-elemental': ngElemental,
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      ...angularTsRules,
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'el',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'el',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: angularTemplateRules,
  },
];
