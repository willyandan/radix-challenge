import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.js', '**/*.ts'], languageOptions: { sourceType: 'script' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['build/**/*.js'],
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single', { allowTemplateLiterals: false }],
      yoda: 'error',
      'prefer-destructuring': ['error'],
      'array-callback-return': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',
      'no-trailing-spaces': 'error',
      'indent': ['error', 2]
    }
  }
]