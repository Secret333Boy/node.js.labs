module.exports = {
  root: true,
  env: {
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'metarhia',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'sonarjs'],
  rules: {
    'arrow-parens': ['error', 'always'],
    'comma-dangle': 'off',
    'handle-callback-err': 'off',
    'consistent-return': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'no-unused-vars': 'warn',
  },
};
