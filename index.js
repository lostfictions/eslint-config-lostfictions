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
  extends: ["eslint:recommended", "prettier", "prettier/@typescript-eslint"],
  plugins: ["node", "@typescript-eslint"],
  // ignore jest snapshots by default
  ignorePatterns: ["*.test.ts.snap"],
  reportUnusedDisableDirectives: true,
  rules: {
    "array-callback-return": "warn",
    curly: ["warn", "multi-line", "consistent"],
    "default-case": "warn",
    "default-case-last": "warn",
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-await-in-loop": "warn",
    "no-buffer-constructor": "error",
    "no-dupe-class-members": "error",
    "no-dupe-else-if": "warn",
    "no-duplicate-imports": "off", // has ts version
    "no-else-return": ["warn", { allowElseIf: false }],
    "no-empty": "warn",
    "no-extra-bind": "error",
    "no-floating-decimal": "warn",
    "no-implicit-coercion": "warn",
    "no-implied-eval": "error",
    "no-import-assign": "warn",
    "no-labels": "error",
    "no-loop-func": "off", // has ts version
    "no-lonely-if": "warn",
    "no-multi-str": "warn",
    "no-new-func": "error",
    "no-new-object": "warn",
    "no-new-require": "warn",
    "no-new-wrappers": "error",
    "no-param-reassign": "warn",
    "no-promise-executor-return": "warn",
    "no-redeclare": "off", // has ts version
    "no-return-assign": "error",
    "no-return-await": "warn",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-setter-return": "warn",
    "no-shadow": "warn",
    "no-template-curly-in-string": "warn",
    "no-throw-literal": "warn",
    "no-undef": "off",
    "no-unmodified-loop-condition": "warn",
    "no-unreachable-loop": "warn",
    // allow tagged templates for use with graphql-codegen
    "no-unused-expressions": ["error", { allowTaggedTemplates: true }],
    "no-unused-vars": "off", // has ts version
    "no-useless-backreference": "warn",
    "no-useless-call": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-constructor": "warn",
    "no-useless-return": "warn",
    "no-var": "warn",
    "no-void": "warn",
    "one-var": ["warn", "never"],
    "prefer-const": "warn",
    "prefer-promise-reject-errors": "warn",
    "prefer-regex-literals": "warn",
    "symbol-description": "warn",
    "valid-typeof": ["error", { requireStringLiterals: true }],

    "node/no-deprecated-api": "warn",

    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/method-signature-style": "warn",
    "@typescript-eslint/no-array-constructor": "warn",
    "@typescript-eslint/no-confusing-non-null-assertion": "warn",
    "@typescript-eslint/no-duplicate-imports": "warn",
    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-loop-func": "warn",
    "@typescript-eslint/no-misused-new": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/no-redeclare": "warn",
    "@typescript-eslint/no-throw-literal": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "all",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",
    "@typescript-eslint/no-useless-constructor": "warn",
    "@typescript-eslint/prefer-enum-initializers": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/restrict-plus-operands": [
      "warn",
      { checkCompoundAssignments: true },
    ],
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    // regression again?
    // "@typescript-eslint/unbound-method": ["warn", { "ignoreStatic": true }],
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/unified-signatures": "warn",
  },
};
