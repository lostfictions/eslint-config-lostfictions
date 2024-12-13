// @ts-check
import globals from "globals";
import eslint from "@eslint/js";
import json from "@eslint/json";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import node from "eslint-plugin-n";

import pkg from "./package.json" with { type: "json" };

const docPage = `${pkg.homepage}/tree/v${pkg.version}`;

const jsFiles = ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"];

// for some reason this imports as possibly undefined
const reactConfig =
  /** @type {NonNullable<typeof reactPlugin.configs.flat> } */ (
    reactPlugin.configs.flat
  );

const config = tseslint.config(
  {
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    language: "json/json",
    ...json.configs.recommended,
  },
  {
    files: ["**/*.jsonc", ".vscode/*.json", "**/tsconfig.json"],
    language: "json/jsonc",
    // @ts-expect-error thanks bud
    languageOptions: { allowTrailingCommas: true },
    ...json.configs.recommended,
  },
  {
    files: ["**/*.json5"],
    language: "json/json5",
    ...json.configs.recommended,
  },
  // this hard-to-read little dance-about is necessary, since otherwise eslint
  // will attempt to lint json files with these rules and explode.
  ...[
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    node.configs["flat/recommended-module"],
    prettier,
  ]
    .flat()
    .map((c) => ({ files: jsFiles, ...c })),
  {
    files: jsFiles,
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      ecmaVersion: 2025,
      sourceType: "module",
      parserOptions: {
        projectService: { allowDefaultProject: ["*.js", "*.mjs"] },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
    settings: {
      node: { version: ">=18.20.5" },
      react: { version: "detect" },
    },
    rules: {
      ///////////////////////////////////////////////////////////////////
      // base eslint rules not already enabled in eslint:recommended.
      ///////////////////////////////////////////////////////////////////

      "array-callback-return": "warn",
      curly: ["warn", "multi-line", "consistent"],
      "default-case": "warn",
      "default-case-last": "warn",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "grouped-accessor-pairs": "warn",

      /**
       * https://eslint.org/docs/rules/no-await-in-loop
       *
       * `no-await-in-loop` is occasionally useful for avoiding code that is
       * serial when it could be parallel -- like sending off multiple requests --
       * but in my experience async code is often serial for good reason (for
       * example, you may not want interleaved disk access). in the end i've found
       * it gives more false positives more often than not.
       */
      "no-await-in-loop": "off",

      /** https://eslint.org/docs/rules/no-constant-binary-expression */
      "no-constant-binary-expression": "error",

      "no-constructor-return": "warn",
      "no-dupe-class-members": "error",
      "no-dupe-else-if": "error",
      "no-else-return": ["warn", { allowElseIf: false }],
      "no-empty": "warn",

      /** https://eslint.org/docs/latest/rules/no-empty-static-block */
      "no-empty-static-block": "warn",

      "no-eval": "warn",
      "no-extend-native": "warn",
      "no-extra-bind": "warn",

      /** https://eslint.org/docs/latest/rules/no-extra-boolean-cast */
      "no-extra-boolean-cast": ["warn", { enforceForInnerExpressions: true }],

      /** https://eslint.org/docs/latest/rules/no-fallthrough */
      "no-fallthrough": [
        "error",
        { allowEmptyCase: true, reportUnusedFallthroughComment: true },
      ],

      "no-implicit-coercion": "warn",
      "no-import-assign": "warn",

      /** https://eslint.org/docs/latest/rules/no-inner-declarations */
      "no-inner-declarations": "warn",

      "no-labels": "error",
      "no-lonely-if": "warn",

      /** https://eslint.org/docs/latest/rules/no-loss-of-precision */
      "no-loss-of-precision": "error",

      "no-multi-assign": "warn",
      "no-multi-str": "warn",
      "no-new": "warn",
      "no-new-func": "error",

      /**
       * https://eslint.org/docs/latest/rules/no-new-native-nonconstructor
       *
       * already handled by typescript, but this provides a more helpful error
       * message and works in plain js too.
       */
      "no-new-native-nonconstructor": "error",

      "no-new-wrappers": "error",
      "no-nonoctal-decimal-escape": "warn",
      "no-object-constructor": "warn",
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
        // the following browser globals are sourced from here:
        // https://github.com/facebook/create-react-app/blob/9673858a3715287c40aef9e800c431c7d45c05a2/packages/confusing-browser-globals/index.js#L10
        // i've inlined them directly to minimize dependency churn and effort
        // required to audit updates, especially since create-react-app versions
        // its packages in lockstep (creating tons of bumps to this package even
        // when there's no changes).

        // the idea (borrowed from `eslint-config-airbnb`, but extended with more
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
    })),
      ),

      "no-restricted-syntax": [
        "warn",
        {
          selector: "ForInStatement",
          message:
            "Use a `for-of` loop with `Object.{keys,values,entries}` for object iteration.",
        },
        // the `in` operator is only allowed when testing whether a *literal
        // value* is present as a key in an object. see the repo's readme for more
        // details.
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

      /**
       * https://eslint.org/docs/rules/no-undef
       *
       * undeclared vars are already caught by typescript. the eslint override
       * block for untyped js files re-enables this rule.
       */
      "no-undef": "off",

      "no-unmodified-loop-condition": "warn",
      "no-unneeded-ternary": "warn",
      "no-unreachable-loop": "warn",
      "no-unused-private-class-members": "warn",

      /** https://eslint.org/docs/latest/rules/no-useless-assignment */
      "no-useless-assignment": "warn",

      "no-useless-backreference": "warn",
      "no-useless-call": "warn",
      "no-useless-computed-key": "warn",
      "no-useless-concat": "warn",
      "no-useless-rename": "warn",
      "no-useless-return": "warn",
      "no-var": "error",

      /**
       * https://eslint.org/docs/rules/no-void
       *
       * the `void` keyword in js (distinct from the `void` type in typescript)
       * should generally be avoided. however, the `void` keyword in statement
       * position can be useful to express that the return value of a
       * promise-returning function should be discarded ("fire-and-forget"). see
       * the `@typescript-eslint/no-floating-promises` rule, which enforces this:
       *
       * https://typescript-eslint.io/rules/no-floating-promises
       */
      "no-void": ["warn", { allowAsStatement: true }],

      "object-shorthand": "warn",
      "one-var": ["warn", "never"],
      "prefer-arrow-callback": "warn",
      "prefer-const": "warn",
      "prefer-exponentiation-operator": "warn",
      "prefer-numeric-literals": "warn",

      // Note that `Object.hasOwn()` hasn't shipped with narrowing in typescript
      // yet. tracking issue:
      // https://github.com/microsoft/TypeScript/issues/44253
      "prefer-object-has-own": "warn",

      "prefer-object-spread": "warn",
      "prefer-regex-literals": "warn",
      "prefer-rest-params": "error",
      "prefer-spread": "warn",
      "prefer-template": "warn",

      /**
       * https://eslint.org/docs/rules/radix
       *
       * note that with `as-needed` we assume we're running in at least an es5
       * environment (ie. at least IE9). if you're not... godspeed, brave one.
       */
      radix: ["warn", "as-needed"],

      "require-atomic-updates": ["warn", { allowProperties: true }],

      // generally good idea, but the performance implications are unclear and it
      // can be cumbersome for existing code. to be revisited.
      // "require-unicode-regexp": "warn",

      /**
       * https://eslint.org/docs/rules/strict
       *
       * strict is already added by typescript or babel where necessary.
       */
      strict: "warn",

      "symbol-description": "warn",
      "valid-typeof": ["error", { requireStringLiterals: true }],
      yoda: "warn",

      ///////////////////////////////////////////////////////////////////
      // eslint rules that have a typescript-eslint or import equivalent.
      ///////////////////////////////////////////////////////////////////

      "no-array-constructor": "off",
      "@typescript-eslint/no-array-constructor": "warn",

      // no-empty-function is enabled in the typescript-eslint recommended set...
      // but empty functions are useful to express no-ops, and typescript itself
      // arguably catches all other interesting cases.
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "off",

      "no-implied-eval": "off",
      "@typescript-eslint/no-implied-eval": ["error"],

      "no-loop-func": "off",
      "@typescript-eslint/no-loop-func": "warn",

      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "warn",

      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "warn",

      /** https://typescript-eslint.io/rules/only-throw-error/ */
      "no-throw-literal": "off",
      "@typescript-eslint/only-throw-error": "warn",

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

      /** https://eslint.org/docs/rules/prefer-destructuring */
      "prefer-destructuring": "off",
      "@typescript-eslint/prefer-destructuring": [
        "warn",
        {
          VariableDeclarator: { array: false, object: true },
          AssignmentExpression: { array: false, object: false },
        },
        { enforceForRenamedProperties: false },
      ],

      /** https://typescript-eslint.io/rules/prefer-promise-reject-errors/ */
      "prefer-promise-reject-errors": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "warn",

      /**
       * https://eslint.org/docs/rules/require-await
       * https://typescript-eslint.io/rules/require-await/
       *
       * require-await can catch some legitimate (if benign) oversights, but it
       * also forces things like async handlers that only do sync work to be
       * refactored into an awkward and more confusing form. for example,
       *
       * ```js
       * handleMessage(async (msg) => console.log(msg));
       * ```
       *
       * would need to be refactored to something much more verbose, like
       *
       * ```js
       * handleMessage((msg) => {
       *   console.log(msg);
       *   return Promise.resolve();
       * });
       * ```
       *
       * given that in my experience async-without-await is almost always benign
       * (especially with typechecking), it seems better to leave it off. note
       * that we _do_ warn about promises that need to be _consumed_: that's
       * `@typescript-eslint/no-misused-promises`.
       */
      "require-await": "off",
      "@typescript-eslint/require-await": "off",

      // use import/no-duplicates instead
      "no-duplicate-imports": "off",

      ///////////////////////////////////////////////////////////////////
      // additional typescript-eslint rules not enabled in @typescript-eslint/recommended.
      ///////////////////////////////////////////////////////////////////

      "@typescript-eslint/adjacent-overload-signatures": "warn",

      /** https://typescript-eslint.io/rules/array-type/ */
      "@typescript-eslint/array-type": "warn",
      "@typescript-eslint/await-thenable": "warn",

      /** https://typescript-eslint.io/rules/ban-ts-comment */
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        {
          minimumDescriptionLength: 3,
          "ts-check": false,
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": false,
        },
      ],
      "@typescript-eslint/ban-tslint-comment": "warn",

      /** https://typescript-eslint.io/rules/consistent-generic-constructors */
      "@typescript-eslint/consistent-generic-constructors": [
        "warn",
        "constructor",
      ],

      "@typescript-eslint/consistent-type-assertions": "warn",
      "@typescript-eslint/consistent-type-exports": "warn",
      "@typescript-eslint/method-signature-style": "warn",
      /** https://typescript-eslint.io/rules/no-array-delete/ */
      "@typescript-eslint/no-array-delete": "warn",
      "@typescript-eslint/no-base-to-string": [
        "warn",
        { ignoredTypeNames: ["Error", "RegExp"] },
      ],
      "@typescript-eslint/no-confusing-non-null-assertion": "warn",

      /**
       * https://typescript-eslint.io/rules/no-confusing-void-expression
       *
       * From the above documentation page:
       *
       * > Returning the results of an expression whose type is void can be
       * > misleading. Attempting to do so is likely a symptom of expecting a
       * > different return type from a function. Even if used correctly, it can
       * > be misleading for other developers, who don't know what a particular
       * > function does and if its result matters.
       *
       * we could use the `ignoreArrowShorthand` option to allow expressions like
       * this one:
       *
       * ```js
       * promise.then(value => window.postMessage(value))
       * ```
       *
       * however, it might be preferable to use the `ignoreVoidOperator` option
       * instead, which instead requires we be more explicit:
       *
       * ```js
       * promise.then(value => void window.postMessage(value))
       * ```
       *
       * the latter also aligns nicely with the `ignoreVoid` option for the
       * `@typescript-eslint/no-floating-promises` rule. that said, using
       * `ignoreVoidOperator` for this rule is likely to flag many more benign
       * cases in transitional codebases.
       */
      "@typescript-eslint/no-confusing-void-expression": [
        "warn",
        { ignoreVoidOperator: true },
      ],

      /** https://typescript-eslint.io/rules/no-deprecated/ */
      "@typescript-eslint/no-deprecated": "warn",

      /** https://typescript-eslint.io/rules/no-duplicate-enum-values */
      "@typescript-eslint/no-duplicate-enum-values": "warn",

      /** https://typescript-eslint.io/rules/no-duplicate-type-constituents */
      "@typescript-eslint/no-duplicate-type-constituents": "warn",

      /** https://typescript-eslint.io/rules/no-dynamic-delete/ */
      "@typescript-eslint/no-dynamic-delete": "warn",

      /** https://typescript-eslint.io/rules/no-empty-object-type/ */
      "@typescript-eslint/no-empty-object-type": "warn",

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

      /** https://typescript-eslint.io/rules/no-mixed-enums */
      "@typescript-eslint/no-mixed-enums": "error",

      "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",

      // even though i wish they weren't... non-null assertions are occasionally
      // necessary.
      "@typescript-eslint/no-non-null-assertion": "off",

      "@typescript-eslint/no-this-alias": "warn",
      "@typescript-eslint/no-redundant-type-constituents": "warn",

      // TODO: disable for js
      /** https://typescript-eslint.io/rules/no-require-imports */
      "@typescript-eslint/no-require-imports": "warn",

      "@typescript-eslint/no-restricted-types": [
        "warn",
        {
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

      /** https://typescript-eslint.io/rules/no-unnecessary-parameter-property-assignment/ */
      "@typescript-eslint/no-unnecessary-parameter-property-assignment": "warn",
      "@typescript-eslint/no-unnecessary-qualifier": "warn",

      /** https://typescript-eslint.io/rules/no-unnecessary-template-expression */
      "@typescript-eslint/no-unnecessary-template-expression": "warn",
      "@typescript-eslint/no-unnecessary-type-arguments": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-unnecessary-type-constraint": "warn",
      /** https://typescript-eslint.io/rules/no-unnecessary-type-parameters/ */
      "@typescript-eslint/no-unnecessary-type-parameters": "warn",

      // the no-unsafe family of rules are a good idea, but somewhat obtrusive.
      // their use could be revisited alongside documentation on how to deal with
      // the lints when they show up, since they'll appear very often in some
      // scenarios.
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",

      /**
       * https://typescript-eslint.io/rules/no-unsafe-declaration-merging
       *
       * among the no-unsafe- family of rules, no-unsafe-declaration-merging is
       * useful at catching mistakes and easy to turn on.
       */
      "@typescript-eslint/no-unsafe-declaration-merging": "warn",

      /** https://typescript-eslint.io/rules/no-unsafe-enum-comparison */
      "@typescript-eslint/no-unsafe-enum-comparison": "warn",

      /** https://typescript-eslint.io/rules/no-unsafe-function-type/ */
      "@typescript-eslint/no-unsafe-function-type": "error",

      "@typescript-eslint/no-unsafe-member-access": "off",

      /** https://typescript-eslint.io/rules/no-unsafe-return */
      "@typescript-eslint/no-unsafe-return": "warn",

      /** https://typescript-eslint.io/rules/no-unsafe-type-assertion/ */
      "@typescript-eslint/no-unsafe-type-assertion": "off",

      /** https://typescript-eslint.io/rules/no-unsafe-unary-minus/ */
      "@typescript-eslint/no-unsafe-unary-minus": "error",

      /** https://typescript-eslint.io/rules/no-wrapper-object-types/ */
      "@typescript-eslint/no-wrapper-object-types": "error",

      "@typescript-eslint/non-nullable-type-assertion-style": "warn",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/prefer-enum-initializers": "warn",
      /** https://typescript-eslint.io/rules/prefer-find/ */
      "@typescript-eslint/prefer-find": "warn",
      "@typescript-eslint/prefer-for-of": "warn",
      "@typescript-eslint/prefer-function-type": "warn",
      "@typescript-eslint/prefer-includes": "warn",

      // neither the `namespace` nor the `module` keyword should be used for code,
      // but both can be useful for writing typedefs of an untyped npm module.
      "@typescript-eslint/prefer-namespace-keyword": "off",

      /** https://typescript-eslint.io/rules/prefer-nullish-coalescing */
      "@typescript-eslint/prefer-nullish-coalescing": [
        "warn",
        { ignoreTernaryTests: false },
      ],

      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/prefer-readonly": "warn",

      // i would prefer to warn against string.match entirely (using regexp.exec
      // for non-global and string.matchall for global matching). as it stands
      // this rule just makes things more confusing.
      "@typescript-eslint/prefer-regexp-exec": "off",
      /** https://typescript-eslint.io/rules/prefer-reduce-type-parameter/ */
      "@typescript-eslint/prefer-reduce-type-parameter": "warn",
      "@typescript-eslint/prefer-return-this-type": "warn",
      "@typescript-eslint/prefer-string-starts-ends-with": "warn",

      /** https://typescript-eslint.io/rules/related-getter-setter-pairs/ */
      "@typescript-eslint/related-getter-setter-pairs": "warn",

      /**
       * https://typescript-eslint.io/rules/require-array-sort-compare
       *
       * technically we may want to require that string arrays are always compared
       * with `String#localeCompare()`. in practice i haven't found this to always
       * be necessary, so we allow `sort()` without args for string arrays.
       */
      "@typescript-eslint/require-array-sort-compare": [
        "warn",
        { ignoreStringArrays: true },
      ],

      /**
       * https://typescript-eslint.io/rules/restrict-plus-operands
       *
       * generally template strings or explicit conversion are preferable to
       * coercion via the plus operator. we allow plus operands typed as `any`;
       * generally it's benign, and disallowing it causes many false positives,
       * especially in js. a better option is restricting the use of `any`
       * outright.
       */
      "@typescript-eslint/restrict-plus-operands": [
        "warn",
        {
          skipCompoundAssignments: false,
          allowAny: true,
        },
      ],

      /**
       * https://typescript-eslint.io/rules/restrict-template-expressions
       *
       * desirable cases are usually handled already by
       * "@typescript-eslint/no-base-to-string", but there are a few interesting
       * exceptions, like `never`
       */
      "@typescript-eslint/restrict-template-expressions": [
        "warn",
        { allowNever: false },
      ],

      "@typescript-eslint/switch-exhaustiveness-check": "warn",

      /**
       * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unbound-method.md
       *
       * `unbound-method` is a good idea, but unfortunately it still causes false
       * positives with third-party code, like `useForm()` from `react-hook-form`.
       */
      "@typescript-eslint/unbound-method": "off",

      /** https://typescript-eslint.io/rules/unified-signatures/ */
      "@typescript-eslint/unified-signatures": [
        "warn",
        { ignoreDifferentlyNamedParameters: true },
      ],
      /** https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable/ */
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "warn",

      ///////////////////////////////////////////////////////////////////
      // eslint-plugin-n rules.
      ///////////////////////////////////////////////////////////////////

      // handled by ts, and fails fast at runtime
      "n/no-missing-import": "off",
      "n/no-missing-require": "off",

      "n/no-new-require": "warn",
      "n/no-path-concat": "warn",

      /**
       * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-env.md
       *
       * it's strongly recommended to centralize reading `process.env` in a single
       * file rather than accessing it ad-hoc across your codebase. the file
       * (which you could call something like `env.ts`) should parse, validate and
       * export sanitized env vars. within that file (and only that file) this
       * rule, `no-process-env`, should be disabled.
       *
       * you can use a package like znv (https://github.com/lostfictions/znv) to
       * simplify doing this in a typesafe way. see this repo's readme for
       * details.
       */
      "n/no-process-env": "warn",

      /** https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-node-protocol.md */
      "n/prefer-node-protocol": "warn",

      "n/prefer-promises/fs": "warn",
      "n/prefer-promises/dns": "warn",
    },
  },
);

export default config;

export const react = [
  ...config,
  ...[
    // another dance
    reactConfig.recommended,
    reactConfig["jsx-runtime"],
  ]
    .flat()
    .map((c) => ({ files: jsFiles, ...c })),
  {
    files: jsFiles,
    plugins: { "react-hooks": reactHooks },
    languageOptions: {
      ...reactConfig.recommended.languageOptions,
      globals: {
        ...globals.node,
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      ///////////////////////////////////////////////////////////////////
      // eslint-plugin-react rules.
      ///////////////////////////////////////////////////////////////////

      /** https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/checked-requires-onchange-or-readonly.md */
      "react/checked-requires-onchange-or-readonly": "warn",

      /**
       * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
       *
       * enforce naming convention for useState hooks.
       */
      "react/hook-use-state": ["warn", { allowDestructuredState: true }],

      /** https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forward-ref-uses-ref.md */
      "react/forward-ref-uses-ref": "warn",

      "react/iframe-missing-sandbox": "warn",
      "react/jsx-boolean-value": "warn",
      "react/jsx-fragments": "warn",

      /** https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spread-multi.md */
      "react/jsx-props-no-spread-multi": "error",

      "react/jsx-no-constructed-context-values": "warn",

      /**
       * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
       *
       * this rule might seem annoying if you're working in a typed codebase and
       * confident that you're only using the `x && <Component />` pattern in
       * situations where `x` is a boolean. (and in an ideal world, there'd be a
       * typescript-aware version of the react plugin that could detect just such
       * a case, which is safe.) but imo it's better to be on the safe side, even
       * if it's slightly more verbose to have to say `x ? <Component /> : null`.
       */
      "react/jsx-no-leaked-render": [
        "warn",
        { validStrategies: ["ternary", "coerce"] },
      ],

      "react/jsx-no-script-url": "warn",
      "react/jsx-no-target-blank": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/no-access-state-in-setstate": "warn",
      "react/no-deprecated": "warn",
      "react/no-did-mount-set-state": "warn",
      "react/no-did-update-set-state": "warn",
      "react/no-invalid-html-attribute": "warn",
      "react/no-namespace": "warn",

      /**
       * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-object-type-as-default-prop.md
       */
      "react/no-object-type-as-default-prop": "warn",

      "react/no-redundant-should-component-update": "warn",

      /** https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md */
      "react/no-string-refs": "warn",

      "react/no-unescaped-entities": "warn",
      "react/no-unsafe": "warn",
      "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],

      // sometimes has false positives; investigate whether it's useful to
      // re-enable
      // "react/no-unused-prop-types": "warn",

      "react/no-unused-state": "warn",
      "react/no-will-update-set-state": "warn",

      /**
       * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
       *
       * [proptypes](https://reactjs.org/docs/typechecking-with-proptypes.html) is
       * a react feature that provides runtime type checking for component
       * property types; it's rarely used or needed when writing react with
       * typescript. (that said, ts _does_ have special faculties to infer types
       * when proptypes are declared; this rule can be switched back on in
       * codebases where such a style is used.)
       */
      "react/prop-types": "off",

      ///////////////////////////////////////////////////////////////////
      // eslint-plugin-react-hooks rules.
      ///////////////////////////////////////////////////////////////////

      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
    },
  },
];

// TODO:
// "eslint-import-resolver-typescript": "^3.5.5",
// "eslint-plugin-eslint-comments": "^3.2.0",
// "eslint-plugin-import": "^2.28.0",
// "eslint-plugin-jest": "^27.2.3",
// "eslint-plugin-sonarjs": "^0.19.0",
// "eslint-plugin-unicorn": "^48.0.1",

const oldConfig = {
  extends: ["plugin:import/typescript"],
  plugins: ["eslint-comments", "import", "node", "sonarjs", "unicorn"],
  // ignore jest snapshots and the eslint config itself by default.
  ignorePatterns: ["*.test.ts.snap", ".eslintrc.js"],
  reportUnusedDisableDirectives: true,
  rules: {
    ///////////////////////////////////////////////////////////////////
    // eslint-plugin-eslint-comments rules.
    ///////////////////////////////////////////////////////////////////

    "eslint-comments/disable-enable-pair": ["warn", { allowWholeFile: true }],
    "eslint-comments/no-unlimited-disable": "warn",
    "eslint-comments/no-unused-enable": "warn",

    ///////////////////////////////////////////////////////////////////
    // eslint-plugin-import rules.
    ///////////////////////////////////////////////////////////////////

    /**
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
     *
     * anonymous default exports are not only harder to search for, they degrade
     * typescript's ability to suggest automatic imports.
     */
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
        allowNew: false,
        allowObject: false,
      },
    ],

    "import/no-commonjs": "warn",

    /**
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
     */
    "import/no-duplicates": "warn",

    /**
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-empty-named-blocks.md
     */
    "import/no-empty-named-blocks": "warn",

    // no-unused-modules is potentially useful, but currently generates a
    // significant number of false positives (for example, exports in module
    // declaration blocks in .d.ts files). it's also not too rare to have
    // exports that aren't in the "main" file according to the package.json but
    // which are still usable by consumers via namespaced imports, eg.
    // `import x from "my-module/other-file-in-my-module"`.
    // as far as i can tell eslint-plugin-import doesn't yet have good solutions
    // for all of these edge cases.
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

    /////////////////////////////////////////////////////////////////////
    // eslint-plugin-sonarjs rules.
    /////////////////////////////////////////////////////////////////////

    "sonarjs/no-all-duplicated-branches": "warn",

    /**
     * https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-collection-size-mischeck.md
     */
    "sonarjs/no-collection-size-mischeck": "warn",

    "sonarjs/no-element-overwrite": "warn",
    "sonarjs/no-empty-collection": "warn",
    "sonarjs/no-identical-expressions": "warn",
    "sonarjs/no-ignored-return": "warn",
    "sonarjs/no-inverted-boolean-check": "warn",

    /**
     * https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-nested-switch.md
     *
     * not hugely useful when using a formatter -- small nested switches haven't
     * been a problem for readability in my experience. hopefully you can notice
     * when a nested switch is becoming cumbersome enough to refactor out
     * without needing a warning.
     */
    "sonarjs/no-nested-switch": "off",

    /**
     * https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-redundant-boolean.md
     *
     * already handled by
     * "@typescript-eslint/no-unnecessary-boolean-literal-compare":
     * https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare/
     */
    "sonarjs/no-redundant-boolean": "off",

    /**
     * https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-redundant-jump.md
     *
     * this overlaps with the eslint built-in no-useless-return, but handles
     * some other cases, like a useless `continue` in a for-of loop.
     */
    "sonarjs/no-redundant-jump": "warn",

    "sonarjs/prefer-single-boolean-return": "warn",
    "sonarjs/prefer-while": "warn",

    ///////////////////////////////////////////////////////////////////
    // eslint-plugin-unicorn rules.
    ///////////////////////////////////////////////////////////////////

    "unicorn/consistent-function-scoping": "warn",
    "unicorn/consistent-destructuring": "warn",
    "unicorn/error-message": "warn",
    "unicorn/expiring-todo-comments": "warn",
    "unicorn/explicit-length-check": "warn",
    "unicorn/no-array-for-each": "warn",
    "unicorn/no-instanceof-array": "warn",
    "unicorn/no-invalid-remove-event-listener": "warn",
    "unicorn/no-lonely-if": "warn",

    /**
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negated-condition.md
     *
     * the premise of this rule is that negation is always harder to read. but
     * imo sometimes it's valuable for readability to have negation as the base
     * case or thing that comes first -- discretion is better than enforcement
     * here.
     */
    "unicorn/no-negated-condition": "off",

    /**
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-typeof-undefined.md
     */
    "unicorn/no-typeof-undefined": "warn",

    "unicorn/no-useless-fallback-in-spread": "warn",
    "unicorn/no-useless-length-check": "warn",
    "unicorn/no-useless-promise-resolve-reject": "warn",
    "unicorn/no-useless-spread": "warn",
    "unicorn/no-useless-switch-case": "warn",
    "unicorn/prefer-array-find": "warn",
    "unicorn/prefer-array-flat": "warn",
    "unicorn/prefer-array-flat-map": "warn",
    "unicorn/prefer-array-index-of": "warn",
    "unicorn/prefer-array-some": "warn",
    "unicorn/prefer-at": "warn",

    /**
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-blob-reading-methods.md
     */
    "unicorn/prefer-blob-reading-methods": "warn",

    "unicorn/prefer-code-point": "warn",
    "unicorn/prefer-date-now": "warn",
    "unicorn/prefer-dom-node-dataset": "warn",
    "unicorn/prefer-export-from": "warn",
    "unicorn/prefer-includes": "warn",
    "unicorn/prefer-math-trunc": "warn",
    "unicorn/prefer-negative-index": "warn",
    "unicorn/prefer-regexp-test": "warn",

    /**
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-size.md
     */
    "unicorn/prefer-set-size": "warn",

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
// config.overrides.push({
//   files: ["**/__tests__/*.{js,jsx,ts,tsx}", "**/*.{spec,test}.{js,jsx,ts,tsx}"],
//   plugins: [...config.plugins, "jest"],
//   rules: {
//     ///////////////////////////////////////////////////////////////////
//     // eslint-plugin-jest rules.
//     ///////////////////////////////////////////////////////////////////

//     "jest/consistent-test-it": "warn",
//     "jest/expect-expect": "warn",

//     /**
//      * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-alias-methods.md
//      */
//     "jest/no-alias-methods": "warn",

//     "jest/no-conditional-expect": "warn",
//     "jest/no-done-callback": "warn",
//     "jest/no-identical-title": "warn",
//     "jest/no-interpolation-in-snapshots": "warn",
//     "jest/no-mocks-import": "warn",
//     "jest/no-standalone-expect": "error",

//     /**
//      * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-each.md
//      */
//     "jest/prefer-each": "warn",

//     /**
//      * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-in-order.md
//      */
//     "jest/prefer-hooks-in-order": "warn",

//     /**
//      * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-on-top.md
//      */
//     "jest/prefer-hooks-on-top": "warn",

//     /**
//      * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-mock-promise-shorthand.md
//      */
//     "jest/prefer-mock-promise-shorthand": "warn",

//     "jest/prefer-snapshot-hint": ["warn", "multi"],
//     "jest/prefer-to-be": "warn",
//     "jest/prefer-to-contain": "warn",
//     "jest/prefer-to-have-length": "warn",
//     "jest/valid-describe-callback": "warn",
//     "jest/valid-expect": "warn",
//     "jest/valid-expect-in-promise": "warn",
//     "jest/valid-title": "warn",
//   },
// });

// // tweak some rules for js files.
// //
// // note that this config is still designed primarily for typescript and may not
// // catch errors that a more js-centric config might (for example, with a more
// // thorough eslint-plugin-import config). this is more for best-effort
// // compatibility/harm reduction.
// config.overrides.push({
//   files: ["**/*.{js,jsx}"],
//   rules: {
//     // `no-undef` might cause a bit of redundant noise if `checkJs` is also on,
//     // but better to be noisy than to miss errors.
//     "no-undef": "error",

//     /**
//      * https://eslint.org/docs/rules/no-use-before-define
//      */
//     "no-use-before-define": [
//       "error",
//       {
//         // functions are always hoisted; this is safe.
//         functions: false,

//         // these lines are a little more dangerous -- it'll squelch warnings for
//         // classes and variables that are defined later in an *upper* scope --
//         // but should still catch use-before-defines for both in the current
//         // scope.
//         classes: false,
//         variables: false,

//         // named exports in `export {}` are always safe, even if they contain
//         // references to variables declared later in the code.
//         allowNamedExports: true,
//       },
//     ],

//     // per the documentation for `strict`
//     // (https://eslint.org/docs/rules/strict), correctly detecting whether 'use
//     // strict' is necessary require setting eslint's parser options. (it's not
//     // necessary in es modules, typescript, jsx, or files transformed by babel,
//     // swc or another transpiler, for example.) as it stands, we don't know
//     // enough about the context of plain js files to safely warn about adding OR
//     // removing 'use strict'. maintainers of js files where there would be
//     // significant benefit to enforcing this should add it in their repo eslint
//     // config (or an .eslintrc file in a subdirectory where the rule should be
//     // enforced).
//     strict: "off",

//     /**
//      * https://typescript-eslint.io/rules/require-array-sort-compare
//      *
//      * when the type of the array can't be determined, this rule will always
//      * yield a warning -- which results a lot of false positives for string
//      * arrays.
//      */
//     "@typescript-eslint/require-array-sort-compare": "off",

//     /**
//      * https://typescript-eslint.io/rules/unbound-method
//      *
//      * this is already disabled in the base config, but i hope to re-enable it
//      * someday, if issues like false positives for third-party code are ever
//      * resolved. but it seems to cause even more false positives in js than in
//      * typescript (even with a `tsconfig.json` in strict mode with `checkJs`
//      * on). the upshot is that we probably can't turn it on for plain js files
//      * anytime soon.
//      */
//     "@typescript-eslint/unbound-method": "off",

//     /**
//      * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-commonjs.md
//      *
//      * assume js/jsx files use commonjs (or at least tolerate the use of
//      * `require`). the consequences are less dire than for ts code, where
//      * `require` results in an untyped import by default.
//      */
//     "import/no-commonjs": "off",
//   },
// });
