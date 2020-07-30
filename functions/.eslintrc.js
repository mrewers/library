module.exports = {
  extends: ['@cryptopapers/eslint-config', '@cryptopapers/eslint-config/typescript'],
  ignorePatterns: ['lib/**/*', '/node_modules/**/*'],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './functions',
  },
  root: true,
  rules: {
    // typescript
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
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
    '@typescript-eslint/prefer-readonly-parameter-types': 'warn',
  },
};
