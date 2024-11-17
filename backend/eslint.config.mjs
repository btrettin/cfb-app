import globals from 'globals';

import js from '@eslint/js';
import tsLint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules', '**/node_modules'],
  },
  js.configs.recommended,
  ...tsLint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {},
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
