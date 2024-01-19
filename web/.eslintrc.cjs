module.exports = {
  extends: ['@cryptopapers/eslint-config'],
  ignorePatterns: ['**/dist/', 'build/', 'docs/'],
  overrides: [
    {
      extends: [
        '@cryptopapers/eslint-config',
        // '@cryptopapers/eslint-config/react',
        '@cryptopapers/eslint-config/typescript',
        'plugin:solid/recommended'
      ],
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['solid'],
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
            allow: ['**/*.css', '**/*.sass', '**/*.scss'],
          },
        ],
        'jsx-a11y/no-onchange': 'off',
        'sort-imports': 'off',
        'react/display-name': 'off',
        'react/jsx-fragments': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'react/react-in-jsx-scope': 'off',
      },
      settings: {
        'import/resolver': {
          'typescript': {}
        },
      }
    },
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  }
};