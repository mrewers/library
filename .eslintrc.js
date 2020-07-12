module.exports = {
  extends: [
    '@cryptopapers/eslint-config',
    '@cryptopapers/eslint-config/react',
    '@cryptopapers/eslint-config/typescript',
  ],
  ignorePatterns: ['dist/**/*', '/node_modules/**/*'],
  rules: {
    // preact
    'react/no-unknown-property': ['error', { ignore: ['class', 'for'] }],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
        depth: 3,
      },
    ],
    // typescript
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'class', format: ['PascalCase'] },
      { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
      { selector: 'typeAlias', format: ['PascalCase'], prefix: ['Type'] },
      { selector: 'variable', format: ['camelCase'] },
      { selector: 'variable', types: ['function'], format: ['camelCase', 'PascalCase'] },
    ],
    '@typescript-eslint/no-type-alias': ['error', { allowAliases: 'in-unions' }],
  },
  settings: {
    react: {
      pragma: 'h',
      version: '16.0',
    },
  },
};
