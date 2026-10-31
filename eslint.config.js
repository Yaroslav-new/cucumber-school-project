const js = require('@eslint/js');
const globals = require('globals');
const prettier = require('eslint-config-prettier');

module.exports = [
  { ignores: ['node_modules/', 'reports/', 'report.html', 'report.json'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: {
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
  {
    files: ['src/**/test/**/*.js'],
    languageOptions: { globals: { ...globals.mocha } },
  },
  // Turns off ESLint rules that conflict with Prettier: formatting is Prettier's job.
  prettier,
];
