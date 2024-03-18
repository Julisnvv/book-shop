module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: './',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest'
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'standard'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: './',
        project: ['./tsconfig.json']
      }
    }
  ],
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/comma-dangle': 0,
    'react/jsx-one-expression-per-line': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] }
    ],
    'react/no-array-index-key': 0
  }
}
