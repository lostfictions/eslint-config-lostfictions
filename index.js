module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2021,
    ecmaFeatures: {
      modules: true,
    },
    project: "./tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  plugins: ["node", "import", "@typescript-eslint"],
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
    "no-unused-private-class-members": "warn",
    "no-useless-backreference": "warn",
    "no-useless-call": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-return": "warn",
    "no-var": "warn",

    // void-as-statement is useful to suppress warnings from
    // @typescript-eslint/no-floating-promises. see
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.md
    "no-void": ["warn", { allowAsStatement: true }],

    "one-var": ["warn", "never"],
    "prefer-const": "warn",
    // "prefer-object-has-own": "warn", // still too fresh
    "prefer-promise-reject-errors": "warn",
    "prefer-regex-literals": "warn",
    strict: "warn",
    "symbol-description": "warn",
    "valid-typeof": ["error", { requireStringLiterals: true }],

    /*
     * eslint rules that have a typescript-eslint equivalent.
     */

    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "warn",

    "no-duplicate-imports": "off",
    "@typescript-eslint/no-duplicate-imports": "warn",

    // enabled in recommended set but not that useful
    "@typescript-eslint/no-empty-function": "off",

    "no-implied-eval": "off",
    "@typescript-eslint/no-implied-eval": ["error"],

    "no-loop-func": "off",
    "@typescript-eslint/no-loop-func": "warn",

    "no-loss-of-precision": "off",
    "@typescript-eslint/no-loss-of-precision": ["error"],

    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "warn",

    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "warn",

    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": "warn",

    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      { enforceForJSX: true },
    ],

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

    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "warn",

    // require-await can catch some legitimate (if benign) oversights, but it
    // also forces things like async handlers that only do sync work to be
    // refactored into an awkward and more confusing form. for example,
    // handleMessage(async (msg) => console.log(msg));
    // would need to be refactored to something much more verbose, like
    // handleMessage((msg) => {
    //   console.log(msg);
    //   return Promise.resolve();
    // });
    // given that from experience async-without-await is almost always benign
    // (especially with typechecking), it seems better to leave it off.
    "require-await": "off",
    "@typescript-eslint/require-await": "off",

    /*
     * other typescript-eslint rules.
     */

    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/ban-tslint-comment": "warn",
    "@typescript-eslint/ban-types": [
      "warn",
      {
        extendDefaults: true,
        types: {
          object: {
            message: [
              "The `object` type rarely has a practical use and is often included in error (especially when importing JSDoc types).",
              "You may be looking for `Record<string, unknown>` or an object literal type instead.",
            ].join("\n"),
          },
        },
      },
    ],
    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/consistent-type-exports": "warn",
    "@typescript-eslint/method-signature-style": "warn",
    "@typescript-eslint/no-base-to-string": "warn",
    "@typescript-eslint/no-confusing-non-null-assertion": "warn",
    "@typescript-eslint/no-confusing-void-expression": [
      "warn",
      { ignoreArrowShorthand: true },
    ],
    "@typescript-eslint/no-empty-interface": "warn",

    // `any` is occasionally necessary as a workaround. don't abuse it!
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-meaningless-void-operator": "warn",
    "@typescript-eslint/no-misused-new": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",

    // non-null assertions are occasionally necessary.
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",

    // `no-unnecessary-condition` is only useful in tandem with
    // `noUncheckedIndexedAccess` in tsconfig.json. where the latter isn't
    // enabled, this rule ends up coming up with a lot of false positives, and
    // removing the conditional to fix the lint could actually introduce errors.
    // on the other hand, unnecessarily checking an always-truthy condition is
    // benign by definition. paradoxically enough, it seems safer to turn this
    // rule off and make it opt-in.
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unnecessary-qualifier": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",

    // the no-unsafe family of rules are a good idea, but somewhat obtrusive.
    // their use could be revisited alongside documentation on how to deal with
    // the lints when they show up, since they'll appear very often in some
    // scenarios.
    "@typescript-eslint/no-unsafe-argument": "off", //"warn",
    "@typescript-eslint/no-unsafe-assignment": "off", //"warn",
    "@typescript-eslint/no-unsafe-call": "off", //"warn",
    "@typescript-eslint/no-unsafe-member-access": "off", //"warn",
    "@typescript-eslint/no-unsafe-return": "off", //"warn",

    // requires cause an implicit any in ts and should be used with care, but
    // they're easily caught - whereas the recommended solution of `import x =
    // require('x')` doesn't work in many scenarios.
    "@typescript-eslint/no-var-requires": "off",

    "@typescript-eslint/non-nullable-type-assertion-style": "warn",
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/prefer-enum-initializers": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/prefer-namespace-keyword": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/prefer-regexp-exec": "warn",
    "@typescript-eslint/prefer-return-this-type": "warn",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/restrict-plus-operands": [
      "warn",
      { checkCompoundAssignments: true },
    ],

    // desirable cases should be handled already by "@typescript-eslint/no-base-to-string".
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    "@typescript-eslint/unbound-method": ["warn", { ignoreStatic: true }],
    "@typescript-eslint/unified-signatures": "warn",

    /*
     * eslint-plugin-node rules.
     */
    "node/no-deprecated-api": "warn",

    /*
     * eslint-plugin-import rules.
     */
    "import/no-anonymous-default-export": [
      "warn",
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        // allowed by default, and we allow it ourselves since it's useful in
        // some scenarios.
        allowCallExpression: true,
        allowLiteral: false,
        allowObject: false,
      },
    ],
    "import/no-deprecated": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index", "unknown"],
          "object",
          "type",
        ],
      },
    ],
  },
};
