module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
    project: "./tsconfig.json",
  },
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "prettier"],
  plugins: ["node", "@typescript-eslint"],
  // ignore jest snapshots and the eslint config itself by default
  ignorePatterns: ["*.test.ts.snap", ".eslintrc.js"],
  reportUnusedDisableDirectives: true,
  rules: {
    /*
     * base eslint rules not already enabled in eslint:recommended.
     */
    "array-callback-return": "warn",
    curly: ["warn", "multi-line", "consistent"],
    "default-case": "warn",
    "default-case-last": "warn",
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-await-in-loop": "warn",
    "no-buffer-constructor": "error",
    "no-dupe-class-members": "error",
    "no-dupe-else-if": "warn",
    "no-else-return": ["warn", { allowElseIf: false }],
    "no-empty": "warn",
    "no-extra-bind": "error",
    "no-floating-decimal": "warn",
    "no-implicit-coercion": "warn",
    "no-implied-eval": "error",
    "no-import-assign": "warn",
    "no-labels": "error",
    "no-lonely-if": "warn",
    "no-multi-str": "warn",
    "no-new-func": "error",
    "no-new-object": "warn",
    "no-new-require": "warn",
    "no-new-wrappers": "error",
    "no-nonoctal-decimal-escape": "warn",
    "no-param-reassign": "warn",
    "no-promise-executor-return": "warn",
    "no-return-assign": "error",
    "no-return-await": "warn",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-setter-return": "warn",
    "no-template-curly-in-string": "warn",
    "no-undef": "off",
    "no-unmodified-loop-condition": "warn",
    "no-unreachable-loop": "warn",
    "no-unused-expressions": ["error", { enforceForJSX: true }],
    "no-unused-private-class-members": "warn",
    "no-useless-backreference": "warn",
    "no-useless-call": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-constructor": "warn",
    "no-useless-return": "warn",
    "no-var": "warn",

    // void-as-statement is useful to suppress warnings from
    // @typescript-eslint/no-floating-promises. see
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.md
    "no-void": ["warn", { allowAsStatement: true }],

    "one-var": ["warn", "never"],
    "prefer-const": "warn",
    "prefer-promise-reject-errors": "warn",
    "prefer-regex-literals": "warn",
    strict: "warn",
    "symbol-description": "warn",
    "valid-typeof": ["error", { requireStringLiterals: true }],

    /*
     * eslint rules that have a typescript-eslint equivalent.
     */
    "no-duplicate-imports": "off",
    "@typescript-eslint/no-duplicate-imports": "warn",

    "no-loop-func": "off",
    "@typescript-eslint/no-loop-func": "warn",

    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "warn",

    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "warn",

    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": "warn",

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "all",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
      },
    ],

    /*
     * other typescript-eslint rules.
     */
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/consistent-type-exports": "warn",
    "@typescript-eslint/method-signature-style": "warn",
    "@typescript-eslint/no-array-constructor": "warn",
    "@typescript-eslint/no-confusing-non-null-assertion": "warn",
    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-meaningless-void-operator": "warn",
    "@typescript-eslint/no-misused-new": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",
    "@typescript-eslint/no-useless-constructor": "warn",
    "@typescript-eslint/non-nullable-type-assertion-style": "warn",
    "@typescript-eslint/prefer-enum-initializers": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-return-this-type": "warn",
    "@typescript-eslint/restrict-plus-operands": [
      "warn",
      { checkCompoundAssignments: true },
    ],
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    // regression again?
    // "@typescript-eslint/unbound-method": ["warn", { "ignoreStatic": true }],
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/unified-signatures": "warn",

    /*
     * eslint-plugin-node rules.
     */
    "node/no-deprecated-api": "warn",
  },
};
