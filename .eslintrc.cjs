module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'path/to/folder',
      },
    },
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'metarhia',
    'plugin:sonarjs/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'sonarjs', '@typescript-eslint', 'import'],
  rules: {
    'arrow-parens': ['error', 'always'],
    'comma-dangle': 'off',
    'handle-callback-err': 'off',
    'consistent-return': 'off',
    'sonarjs/no-duplicate-string': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
