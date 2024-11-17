import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import js from '@eslint/js';
import tsLint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules', '**/node_modules'],
  },
  js.configs.recommended,
  ...tsLint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        project: 'tsconfig.json',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
