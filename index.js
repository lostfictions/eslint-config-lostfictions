const { homepage, version } = require("./package.json");

const docPage = `${homepage}/tree/v${version}`;

const config = {
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
  plugins: [
    "@typescript-eslint",
    "deprecation",
    "eslint-comments",
    "import",
    "node",
    "sonarjs",
    "unicorn",
  ],
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
    "grouped-accessor-pairs": "warn",

    // occasionally useful, but in my experience async code is often serial for
    // good reason (for example, you may not want interleaved disk access). in
    // the end i've found it gives more false positives far more often than not.
    "no-await-in-loop": "off",

    "no-constructor-return": "warn",
    "no-dupe-class-members": "error",
    "no-dupe-else-if": "error",
    "no-else-return": ["warn", { allowElseIf: false }],
    "no-empty": "warn",
    "no-eval": "warn",
    "no-extend-native": "warn",
    "no-extra-bind": "warn",
    "no-floating-decimal": "warn",
    "no-implicit-coercion": "warn",
    "no-import-assign": "warn",
    "no-labels": "error",
    "no-lonely-if": "warn",
    "no-multi-assign": "warn",
    "no-multi-str": "warn",
    "no-new": "warn",
    "no-new-func": "error",
    "no-new-object": "warn",
    "no-new-wrappers": "error",
    "no-nonoctal-decimal-escape": "warn",
    "no-octal-escape": "warn",
    "no-param-reassign": "warn",
    "no-promise-executor-return": "warn",
    "no-restricted-globals": [
      "warn",
      {
        name: "isFinite",
        message: [
          "Prefer `Number.isFinite()` over the global `isFinite()`, since the former is stricter:",
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#description",
        ].join(" "),
      },
      {
        name: "isNaN",
        message: [
          "Prefer `Number.isNaN()` over the global `isNaN()` since the former is stricter:",
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#description",
        ].join(" "),
      },
    ].concat(
      // the following globals are sourced from here:
      // https://github.com/facebook/create-react-app/blob/9673858a3715287c40aef9e800c431c7d45c05a2/packages/confusing-browser-globals/index.js#L10
      // inlined directly to minimize dependency churn and effort required to
      // audit updates, especially since create-react-app versions its packages
      // in lockstep (creating tons of bumps to this package even when there's
      // no changes).

      // the idea (borrowed from eslint-config-airbnb but extended with more
      // descriptive error messages) is that it's too easy to introduce an error
      // by accidentally referring to these globals when writing things like
      // event handlers. if you really mean to refer to the global, use
      // `window`, eg. `window.addEventListener`. some of these may already be
      // covered by deprecation messages or strict mode, but typescript still
      // allows many of them. it doesn't hurt to include them all.

      // prettier-ignore
      [
      'addEventListener', 'blur', 'close', 'closed', 'confirm', 'defaultStatus',
      'defaultstatus', 'event', 'external', 'find', 'focus', 'frameElement',
      'frames', 'history', 'innerHeight', 'innerWidth', 'length', 'location',
      'locationbar', 'menubar', 'moveBy', 'moveTo', 'name', 'onblur', 'onerror',
      'onfocus', 'onload', 'onresize', 'onunload', 'open', 'opener', 'opera',
      'outerHeight', 'outerWidth', 'pageXOffset', 'pageYOffset', 'parent',
      'print', 'removeEventListener', 'resizeBy', 'resizeTo', 'screen',
      'screenLeft', 'screenTop', 'screenX', 'screenY', 'scroll', 'scrollbars',
      'scrollBy', 'scrollTo', 'scrollX', 'scrollY', 'self', 'status',
      'statusbar', 'stop', 'toolbar', 'top',
    ].map(name => ({
      name,
      message: `Use \`window.${name}\` if you really meant to refer to the global.`
    }))
    ),
    "no-restricted-syntax": [
      "warn",
      {
        selector: "ForInStatement",
        message:
          "Use a `for-of` loop with `Object.{keys,values,entries}` for object iteration.",
      },
      {
        selector: "BinaryExpression[left.type!='Literal'][operator='in']",
        message: [
          "Prefer `Object.prototype.hasOwnProperty.call()` or",
          "`Object.hasOwn()` for testing membership (or use a Map or Set).",
          `See ${docPage}#the-in-operator`,
        ].join(" "),
      },
    ],
    "no-return-assign": "error",
    "no-return-await": "warn",
    "no-script-url": "warn",
    "no-self-compare": "error",
    "no-sequences": [
      "error",
      {
        allowInParentheses: false,
      },
    ],
    "no-setter-return": "warn",
    "no-template-curly-in-string": "warn",

    // handled by typescript.
    "no-undef": "off",

    "no-unmodified-loop-condition": "warn",
    "no-unneeded-ternary": "warn",
    "no-unreachable-loop": "warn",
    "no-unused-private-class-members": "warn",
    "no-useless-backreference": "warn",
    "no-useless-call": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-rename": "warn",
    "no-useless-return": "warn",
    "no-var": "error",

    // the `void` keyword in js (distinct from the `void` type in typescript)
    // should generally be avoided. however, the `void` keyword in statement
    // position is useful to express that the return value of a
    // promise-returning function should be discarded ("fire-and-forget"). see
    // the @typescript-eslint/no-floating-promises rule, which enforces this:
    // https://typescript-eslint.io/rules/no-floating-promises
    "no-void": ["warn", { allowAsStatement: true }],

    "object-shorthand": "warn",
    "one-var": ["warn", "never"],
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn",
    "prefer-destructuring": [
      "warn",
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "prefer-exponentiation-operator": "warn",
    "prefer-numeric-literals": "warn",

    // Object.hasOwn() hasn't shipped in typescript. tracking issue:
    // https://github.com/microsoft/TypeScript/issues/44253
    // "prefer-object-has-own": "warn",

    "prefer-object-spread": "warn",
    "prefer-promise-reject-errors": "warn",
    "prefer-regex-literals": "warn",
    "prefer-rest-params": "error",
    "prefer-spread": "warn",
    "prefer-template": "warn",
    radix: "warn",
    "require-atomic-updates": ["warn", { allowProperties: true }],

    // generally good idea, but the performance implications are unclear and it
    // can be cumbersome for existing code. to be revisited.
    // "require-unicode-regexp": "warn",

    // strict is already added by typescript or babel where necessary.
    strict: "warn",

    "symbol-description": "warn",
    "valid-typeof": ["error", { requireStringLiterals: true }],
    yoda: "warn",

    /*
     * eslint rules that have a typescript-eslint equivalent.
     */
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "warn",

    "no-duplicate-imports": "off",
    "@typescript-eslint/no-duplicate-imports": "warn",

    // no-empty-function is enabled in the typescript-eslint recommended set...
    // but empty functions are useful to express no-ops, and typescript itself
    // arguably catches all other interesting cases.
    "no-empty-function": "off",
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
    // given that in my experience async-without-await is almost always benign
    // (especially with typechecking), it seems better to leave it off.
    // note that we _do_ warn about promises that need to be consumed-- that's
    // `@typescript-eslint/no-misused-promises`.
    "require-await": "off",
    "@typescript-eslint/require-await": "off",

    /*
     * other typescript-eslint rules.
     */
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/await-thenable": "warn",
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
    "@typescript-eslint/no-base-to-string": [
      "warn",
      { ignoredTypeNames: ["Error", "RegExp"] },
    ],
    "@typescript-eslint/no-confusing-non-null-assertion": "warn",
    "@typescript-eslint/no-confusing-void-expression": [
      "warn",
      { ignoreArrowShorthand: true },
    ],
    "@typescript-eslint/no-empty-interface": "warn",

    // `any` is occasionally necessary as a workaround. don't abuse it! a more
    // useful alternative is the @typescript-eslint/no-unsafe-* family of rules,
    // though these are also currently disabled in this ruleset.
    "@typescript-eslint/no-explicit-any": "off",

    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-meaningless-void-operator": "warn",
    "@typescript-eslint/no-misused-new": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",

    // even though i wish they weren't... non-null assertions are occasionally
    // necessary.
    "@typescript-eslint/no-non-null-assertion": "off",

    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",

    // `no-unnecessary-condition` is only useful in tandem with
    // `noUncheckedIndexedAccess` in tsconfig.json. where the latter isn't
    // enabled, this rule ends up coming up with a lot of false positives, and
    // removing a condition that checks a field's existence as the lint suggests
    // could actually introduce errors. on the other hand, unnecessarily
    // checking an always-truthy condition is by definition benign. so, while it
    // might seem paradoxical, it's far safer to turn this rule off and make it
    // opt-in.
    "@typescript-eslint/no-unnecessary-condition": "off",

    "@typescript-eslint/no-unnecessary-qualifier": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",

    // the no-unsafe family of rules are a good idea, but somewhat obtrusive.
    // their use could be revisited alongside documentation on how to deal with
    // the lints when they show up, since they'll appear very often in some
    // scenarios.
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",

    // requires cause an implicit `any` in ts and should be used with care, but
    // they're easily caught - whereas the recommended solution of `import x =
    // require('x')` doesn't work in many scenarios.
    "@typescript-eslint/no-var-requires": "off",

    "@typescript-eslint/non-nullable-type-assertion-style": "warn",
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/prefer-enum-initializers": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-includes": "warn",

    // neither the `namespace` nor the `module` keyword should be used for code,
    // but both can be useful for writing typedefs of an untyped npm module.
    "@typescript-eslint/prefer-namespace-keyword": "off",

    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-readonly": "warn",

    // i would prefer to warn against string.match entirely (using regexp.exec
    // for non-global and string.matchall for global matching). as it stands
    // this rule just makes things more confusing.
    "@typescript-eslint/prefer-regexp-exec": "off",

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
     * eslint-plugin-deprecation rules.
     */
    "deprecation/deprecation": "warn",

    /*
     * eslint-plugin-eslint-comments rules.
     */
    "eslint-comments/disable-enable-pair": ["warn", { allowWholeFile: true }],
    "eslint-comments/no-unlimited-disable": "warn",
    "eslint-comments/no-unused-enable": "warn",

    /*
     * eslint-plugin-import rules.
     */

    // anonymous default exports are not only harder to search for, they degrade
    // typescript's ability to suggest automatic imports.
    "import/no-anonymous-default-export": [
      "warn",
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        // allowed by default, and we allow it ourselves since it's useful in
        // some scenarios (HOCs, etc).
        allowCallExpression: true,
        allowLiteral: false,
        allowObject: false,
      },
    ],
    "import/no-commonjs": "warn",

    // no-unused-modules is potentially useful, but currently generates a
    // significant number of false positives (for example, exports in module
    // declaration blocks in .d.ts files). it's also not too rare to have
    // exports that aren't in the "main" file according to the package.json but
    // which are still usable by consumers via namespaced imports, eg.
    // `import x from "my-module/other-file-in-my-module"`.
    //
    // i recommend enabling this rule manually if you need to track down dead
    // code.
    //
    // "import/no-unused-modules": ["warn", { unusedExports: true }],

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

    /*
     * eslint-plugin-node rules.
     */
    "node/no-new-require": "warn",
    "node/no-path-concat": "warn",
    "node/no-process-env": "warn",
    "node/prefer-promises/fs": "warn",
    "node/prefer-promises/dns": "warn",

    /*
     * eslint-plugin-sonarjs rules.
     */
    "sonarjs/no-all-duplicated-branches": "warn",
    "sonarjs/no-element-overwrite": "warn",
    "sonarjs/no-empty-collection": "warn",
    "sonarjs/no-identical-expressions": "warn",
    "sonarjs/no-ignored-return": "warn",
    "sonarjs/no-collection-size-mischeck": "warn",
    "sonarjs/no-inverted-boolean-check": "warn",

    // not hugely useful when using a formatter -- small nested switches haven't
    // been a problem for readability in my experience. hopefully you can notice
    // when a nested switch is becoming cumbersome enough to refactor out
    // without needing a warning.
    "sonarjs/no-nested-switch": "off",

    // this could be good in the future but currently seems to be useless, as
    // all usecases are already covered by the built-in rule `no-else-return`.
    // tracking issue:
    // https://github.com/SonarSource/eslint-plugin-sonarjs/issues/316
    "sonarjs/prefer-single-boolean-return": "off",

    "sonarjs/prefer-while": "warn",

    /*
     * eslint-plugin-unicorn rules.
     */
    "unicorn/consistent-function-scoping": "warn",
    "unicorn/consistent-destructuring": "warn",
    "unicorn/error-message": "warn",
    "unicorn/expiring-todo-comments": "warn",
    "unicorn/explicit-length-check": "warn",
    "unicorn/no-array-for-each": "warn",
    "unicorn/no-instanceof-array": "warn",
    "unicorn/no-invalid-remove-event-listener": "warn",
    "unicorn/no-lonely-if": "warn",
    "unicorn/no-useless-fallback-in-spread": "warn",
    "unicorn/no-useless-length-check": "warn",
    "unicorn/no-useless-promise-resolve-reject": "warn",
    "unicorn/no-useless-spread": "warn",
    "unicorn/prefer-array-find": "warn",
    "unicorn/prefer-array-flat": "warn",
    "unicorn/prefer-array-flat-map": "warn",
    "unicorn/prefer-array-index-of": "warn",
    "unicorn/prefer-array-some": "warn",
    "unicorn/prefer-at": "warn",
    "unicorn/prefer-code-point": "warn",
    "unicorn/prefer-date-now": "warn",
    "unicorn/prefer-dom-node-dataset": "warn",
    "unicorn/prefer-export-from": "warn",
    "unicorn/prefer-includes": "warn",
    "unicorn/prefer-negative-index": "warn",
    "unicorn/prefer-regexp-test": "warn",
    "unicorn/prefer-string-replace-all": "warn",
    "unicorn/prefer-string-slice": "warn",
    "unicorn/prefer-string-starts-ends-with": "warn",
  },
  overrides: [],
};

// this set of overrides tries to conform to the jest defaults for `testMatch`
// paths/filenames: https://jestjs.io/docs/configuration#testmatch-arraystring
// it's admittedly not very configurable at the moment, but in the interests of
// keeping everything simple and in one file let's keep it like this for now.
config.overrides.push({
  files: ["**/__tests__/*.{js,jsx,ts,tsx}", "**/*.{spec,test}.{js,jsx,ts,tsx}"],
  plugins: [...config.plugins, "jest"],
  rules: {
    /*
     * eslint-plugin-jest rules.
     */
    "jest/consistent-test-it": "warn",
    "jest/expect-expect": "warn",
    "jest/no-conditional-expect": "warn",
    "jest/no-done-callback": "warn",
    "jest/no-identical-title": "warn",
    "jest/no-interpolation-in-snapshots": "warn",
    "jest/no-mocks-import": "warn",
    "jest/no-standalone-expect": "error",
    "jest/prefer-snapshot-hint": ["warn", "multi"],
    "jest/prefer-to-be": "warn",
    "jest/prefer-to-contain": "warn",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-describe-callback": "warn",
    "jest/valid-expect": "warn",
    "jest/valid-expect-in-promise": "warn",
    "jest/valid-title": "warn",
  },
});

// tweak some rules for js files.
// note that this config is still designed primarily for typescript and may not
// catch errors that a more js-centric config might (for example, with a more
// thorough eslint-plugin-import config). this is more for best-effort
// compatibility/harm reduction.
config.overrides.push({
  files: ["**/*.{js,jsx}"],
  rules: {
    // `no-undef` might cause a bit of redundant noise if `checkJs` is also on,
    // but better to be noisy than to miss errors.
    "no-undef": "error",

    // this seems to cause many more false positives in js (maybe due to
    // confusion about object vs namespace imports when using `require`?)
    "@typescript-eslint/unbound-method": "off",

    // assume js/jsx files use commonjs (or at least tolerate the use of
    // `require`). the consequences are less dire than for ts code, where
    // `require` results in an untyped import by default.
    "import/no-commonjs": "off",
  },
});

module.exports = config;
