# eslint-config-lostfictions

<p align="center">
<img height="50" src="logos.svg" />
</p>

<p align="center">
<a href="https://www.npmjs.com/package/eslint-config-lostfictions">
<img src="https://img.shields.io/npm/v/eslint-config-lostfictions.svg?logo=npm" alt="NPM version" />
</a>
</p>

`eslint-config-lostfictions` is a shareable, opinionated, batteries-included configuration for [ESLint](https://eslint.org/).

**Features**

- Intended for use with [TypeScript](https://www.typescriptlang.org/), using [typescript-eslint](https://typescript-eslint.io/)'s parser and type-aware rules. (Also supports JavaScript in projects with a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#writing-a-configuration-file) configured.)
- Includes an alternate React config that adds additional rules from [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react) and [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) to catch errors and uphold best practices in React code.
- Delegates all formatting to [Prettier](https://prettier.io/). No more noisy warnings in your editor shouting that you forgot to indent your code!
- Includes rules for best practices when writing tests with [Jest](https://jestjs.io/). (But use of Jest is not required to use this config!)
- Prefers warnings to errors for most lints, which helps distinguish between genuine problems (like TypeScript typechecking errors) and lesser code smells. ([Read more](#red-is-for-errors).)
- Deviations and disabled rules relative to base ESLint, React and Typescript recommended configs are documented and include a rationale.
- Adds [warnings about deprecations](https://typescript-eslint.io/rules/no-deprecated/) for both internal and external code (by checking JSDoc annotations), [best practices around imports](https://github.com/import-js/eslint-plugin-import/), [Node.js-specific lints](https://github.com/eslint-community/eslint-plugin-n), and select additional rules from the wonderful [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn/).
- Batteries included: just add ESLint and this package to your existing project and start linting! Unlike many other shareable configs, `eslint-config-lostfictions` doesn't declare any `peerDependencies` besides ESLint and TypeScript, so there's no extra ESLint plugins and parsers cluttering your `package.json` that need to be audited for compatibility on version bumps.

  > Note that this is less of a concern in the shiny new era of "flat" ESLint configs, whose new plugin resolution allows configs to bundle plugins without difficulty.

Read on for the rationale, or jump to the [Usage](#usage) section below to get started.

## Why?

TypeScript and ESLint might seem like they're used for the exact same thing — catching errors in JavaScript — but they have different, complementary uses. TypeScript generally limits itself to typechecking, while ESLint can catch a broad variety of other errors, from simple oversights like [expressions that do nothing](https://eslint.org/docs/rules/no-unused-expressions) or [comparing a value to itself](https://eslint.org/docs/rules/no-self-compare), to [technically legal but dangerous syntax](https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain), to analysis of [possible race conditions](https://eslint.org/docs/rules/require-atomic-updates). The [typescript-eslint](https://typescript-eslint.io/) project not only enables ESLint to parse and validate TypeScript code directly, it adds support for a wide range of TypeScript-specific lints and error-checking not covered by the TypeScript compiler. In fact, the TypeScript developers [use ESLint and typescript-eslint on their own codebase](https://github.com/microsoft/TypeScript/blob/main/.eslintrc.json)! (Another tool called [TSLint](https://github.com/palantir/tslint) formerly fulfilled a similar role for TypeScript, but it's been deprecated for a while now in favour of ESLint.)

`eslint-config-lostfictions` is based on a few key principles:

### Linters are for linting.

After untold numbers of code reviews nitpicking whitespace or semicolons, programmers are finally coming around to the idea that it's usually easier to let the computer fix those things for you. A consistent team-wide code style helps to improve readability and avoid bikeshedding that arises from minor differences in opinion, but time and experience have shown that the ideal way to enforce style is via editor tooling and runnning checks in continuous integration. (Who cares about "tabs versus spaces" if you can treat leading whitespace as tabstops on your machine but save them to disk as spaces?)

Languages like Go and Rust make things easy here by integrating opinionated formatters in their toolchain. In JavaScript-land, there are two main options for formatting: ESLint and [Prettier](https://prettier.io/). Both are viable, but I've found that Prettier is much easier to configure, more consistent, and allows for a better separation of concerns.

(For example, when saving a file in your editor you may want to automatically reformat your code, but you may _not_ want to simultaneously "auto-fix" other linter warnings, since these "fixes" occasionally change the semantics of your code or erase some intermediate work you've done. This is a lot harder when using ESLint as both a formatter and linter. ESLint also tends to give you angry messages if a line of text is too long or it detects some other whitespace or formatting issue, which can mask other more important lints.)

**`eslint-config-lostfictions` assumes that you're using Prettier**. All ESLint whitespace and formatting rules are turned off via [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier).

### Red is for errors.

Some [popular ESLint configs](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) like to scream at you at maximum volume for every possible variety of included lint. Again, in my experience, this can result in a lot of noise that masks other more important problems, such as typechecker failures, semantic issues, and parsing errors.

By contrast, `eslint-config-lostfictions` tries to reserve the "error" lint level for _genuine suspected errors_ and prefers warnings for lesser code smells and minor issues.

For example, [`no-lonely-if`](https://eslint.org/docs/rules/no-lonely-if) is a _warning_. A lonely `if` may be somewhat unidiomatic JavaScript, but by itself it does not represent a semantic issue. On the other hand, [`no-self-compare`](https://eslint.org/docs/rules/no-self-compare) is an _error_. There is almost no imaginable circumstance where you would want to compare a value to itself, so it very likely represents an oversight that will lead to unintended behaviour in your code.

All that said, for the same reason you should use a formatter, **it's a good idea to treat warnings as errors** in your CI to ensure warnings get fixed before a pull request can be merged. You can use the ESLint CLI option [`--max-warnings=0`](https://eslint.org/docs/user-guide/command-line-interface#--max-warnings) to enforce this.

---

## Usage

```bash
npm i -D eslint eslint-config-lostfictions
# or
yarn add -D eslint eslint-config-lostfictions
# or
pnpm i -D eslint eslint-config-lostfictions
```

`eslint-config-lostfictions` bundles all its plugins and parsers as dependencies. ~~ESLint doesn't yet directly support bundling plugins in a config in this way, `eslint-config-lostfictions` also re-exports [`@rushstack/eslint-patch`](https://github.com/microsoft/rushstack/tree/master/eslint/eslint-patch).~~ **`eslint-config-lostfictions` is now based on ESLint 9, no ESLint patching needed!**

#### `eslint.config.mjs`

```js
export { default } from "eslint-config-lostfictions";
```

For React projects, use the `lostfictions/react` config, which adds additional React-specific plugins and rules:

```js
export { react as default } from "eslint-config-lostfictions";
```

`eslint-config-lostfictions` also includes [`eslint-plugin-jest`](https://github.com/jest-community/eslint-plugin-jest) for linting your tests (including helpful rules like [`expect-expect`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/expect-expect.md), which ensures you haven't forgotten to make assertions in your test cases). By default the extra Jest rules are enabled for files with a `.test.{js,jsx,ts,tsx}` suffix, as well as files under a `test` folder — which should match Jest's default rules for finding tests.

---

## Additional info about specific rules

### Warnings about `Object.hasOwn()`, `Array#at()` and `String#at()`

[`unicorn/prefer-at`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md) and [`prefer-object-has-own`](https://eslint.org/docs/rules/prefer-object-has-own) are both enabled in this config.

The respective functions they recommend are cleaner and less error-prone than their older alternatives, but they're both pretty fresh at the moment. [`Object.hasOwn()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn) shipped in [Node 16.9.0](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md#2021-09-07-version-1690-current-targos) (2021-09-07). [`String#at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at) and [`Array#at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) shipped in [Node 16.6.0](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md#16.6.0) (2021-07-29). If you're stuck on an older version of Node, you may prefer to disable these rules. These functions have shipped in all evergreen browsers and _should_ be polyfilled by frontend tools that incorporate core-js polyfills (Next.js, CRA) if your browserslist config indicates that support is required.

### The `in` operator

The [`in` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) has a number of pitfalls that can make it tricky to use. _Using an object with arbitrary string keys can be a code smell_ if there's any possibility the keys are user-provided — this can be a source of [prototype poisoning](https://medium.com/intrinsic-blog/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96), and even solutions like `Object.create(null)` aren't foolproof (and create new pitfalls of their own). For this reason, it's recommended to use a `Map` or `Set` when working with arbitrary keys.

However, the `in` operator is often more ergonomic than the more "correct" alternatives and works as a type guard in TypeScript where other forms of membership checking do not. For example, given this type declaration:

```ts
type XorY = { x: string } | { y: number };
let thing: XorY;
```

This code will typecheck correctly:

```ts
if ("x" in thing) {
  // narrowed to { x: string } in this block
  console.log(thing.x);
} else {
  // narrowed to { y: number } in this block
  console.log(thing.y + 3);
}
```

But this will not:

```ts
if (Object.prototype.hasOwnProperty.call(thing, "x")) {
  // ERROR: Property 'x' does not exist on type 'XorY'.
  // Property 'x' does not exist on type '{ y: number; }'.
  console.log(thing.x);
}
```

For these reasons, `eslint-config-lostfictions` warns when using the `in` operator, _unless the left-hand operand is a string literal_. This should catch a majority of code-smell cases while still permitting the relatively safer case of using `in` to narrow a union of TypeScript types.

Keep in mind that the preferred way to narrow non-literal union types is the use of a _discriminant property_. (For example, the **`kind`** property in `type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; size: number }` is a discriminant.) Discriminants sidestep the need to reach for something like `in` in the first place.

### Warnings about `process.env`

As noted in eslint-plugin-n's [`no-process-env` rule](https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-env.md), Node's [`process.env`](https://nodejs.org/dist/latest/docs/api/process.html#processenv) is effectively a kind of global mutable variable. But even if you don't mutate it, spreading it around your codebase can make it difficult to reason about your application's configuration. Instead, it's recommended to declare and validate all your configuration up-front in a single file, and then export those validated bindings for use across your application. (Something like [znv](https://github.com/lostfictions/znv) could help you with this.)

`no-process-env` is thus enabled by default, with the expectation that you'll disable it in the file that handles your app configuration. This might be a bit noisy for brownfield projects that don't already follow the single-point-of-declaration convention, but in my experience it's worth it to clean up those stray uses of `process.env`.

### `for-of` vs. `forEach()`

`forEach()` methods — mainly `Array#forEach()`, though equivalents also exist for Maps, Sets, TypedArrays, and some "array-like" DOM entities — are a holdover from an earlier age of JavaScript. Before the block-scoped declarations `let` and `const` became widely supported, iteration blocks were either clunky or risky to use. Even a simple `for(var i = 0; i < x; i++)` often needed its body wrapped in an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). In these dire circumstances, `forEach()` emerged as a more elegant and humane alternative for iteration.

Fortunately, things are better for JavaScript these days, and `for-of` loops are generally a simpler and more readable construct. Every built-in with a `forEach()` method also supports iteration via `for-of`.

Digging a bit deeper, `forEach()` has some issues in that it's imperative but _looks functional_; it can sometimes be tempting to add it at the end of a chain of array `.map()` and `.filter()` calls. Unfortunately, the resulting code is generally the worst of both worlds, with none of the benefits of truly functional code but all of the drawbacks.

In this config, the rule forbidding `forEach()` comes by way of [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md), but [Github's ESLint docs about `forEach()`](https://github.com/github/eslint-plugin-github/blob/main/docs/rules/array-foreach.md) go into more detail and outline some further compelling reasons to avoid it.
