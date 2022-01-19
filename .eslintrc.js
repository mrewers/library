module.exports = {
  extends: ['@cryptopapers/eslint-config'],
  ignorePatterns: ['**/dist/', 'build/', 'docs/'],
  overrides: [
    {
      extends: [
        '@cryptopapers/eslint-config',
        '@cryptopapers/eslint-config/react',
        '@cryptopapers/eslint-config/typescript',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as', // Angle bracket notation, while preferred, doesn't play well with JSX.
          },
        ],
        '@typescript-eslint/no-type-alias': [
          'error',
          {
            allowAliases: 'in-unions',
            allowGenerics: 'always'
          }
        ],
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        'capitalized-comments': [
          'error',
          'always',
          {
            ignoreConsecutiveComments: true,
            ignoreInlineComments: true,
            ignorePattern: 'pragma|ignore|prettier-ignore',
          }
        ],
        'func-names': [
          'warn',
          'always',
          {
            generators: 'as-needed',
          },
        ],
        'import/no-unassigned-import': [
          'error',
          {
            allow: ['**/*.css', '**/*.sass', '**/*.scss', 'preact/devtools'],
          },
        ],
        'jsx-a11y/no-onchange': 'off',
        'sort-imports': 'off',
      },
      settings: {
        'import/resolver': {
          'typescript': {}
        },
        react: {
          pragma: 'h',
          version: '16', // Since we're using Preact, we manually specify the React version.
        },
      }
    },
  ],
  parser: '@babel/eslint-parser',
};