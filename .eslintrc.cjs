module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'metarhia',
    'plugin:sonarjs/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'sonarjs', '@typescript-eslint'],
  rules: {
    'arrow-parens': ['error', 'always'],
    'comma-dangle': 'off',
    'handle-callback-err': 'off',
    'consistent-return': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'no-unused-vars': 'warn',
  },
};
