module.exports = {
  extends: [
    'get-off-my-lawn',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "function-call-argument-newline": 0,
    "no-unused-vars": 0,
    "import/named": 0,
    "import/no-unresolved": 0,
    'max-params': ['error', 4],
    'new-cap': [2, { "capIsNewExceptions": ['Touchable', 'Ripple'] }],
    'node/no-unpublished-import': 0,
    'no-shadow': 0,
    'sort-keys': ['error', 'asc',
      { caseSensitive: false, natural: true }
    ],
    'require-atomic-updates': 0,
    'jest/no-expect-resolves': 0,
    'jest/no-if': 0,
    'jest/no-truthy-falsy': 0,
    'jest/prefer-spy-on': 0,
    'jest/prefer-strict-equal': 0,
    'react/prefer-stateless-function': 0,
    'react/static-property-placement': 0,
    'react/jsx-fragment': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-filename-extension': 0,
    'react-native/no-raw-text': 0,
    'react-native/sort-styles': 0,
    'unicorn/no-console-spaces': 0,
    'unicorn/no-unused-properties': 0,
    'unicorn/no-zero-fractions': 0,
    'unicorn/filename-case': 0,
    'import/exports-last': 0
  },
  overrides: [
    {
      // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
      files: [ "src/**/*.ts", "src/**/*.tsx", "test/**/*.ts", "test/**/*.tsx" ],
      excludedFiles: [],
      rules: {
        "@typescript-eslint/interface-name-prefix": [2, {prefixWithI: 'always'}],
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/no-unused-vars": ["error", {
          "vars": "all",
          "args": "after-used",
          "ignoreRestSiblings": false
        }],
        "@typescript-eslint/member-delimiter-style": [2, {
          multiline: {
            "delimiter": "none",
            "requireLast": false
          },
          singleline: {
            "delimiter": "comma",
            "requireLast": false
          }
        }],
      }
    },
    {
      files: [ "**/*.test.js", "**/*.test.ts", "**/*.test.tsx" ],
      excludedFiles: [],
      rules: {
        'max-nested-callbacks': 0,
        'jest/consistent-test-it': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-non-null-assertion': 0
      }
    }
  ]
};
