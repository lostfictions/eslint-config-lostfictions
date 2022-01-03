# eslint-config-lostfictions

<p align="center">
<img height="50" src="logos.svg" />
</p>

<p align="center">
<a href="https://www.npmjs.com/package/eslint-config-lostfictions">
<img src="https://img.shields.io/npm/v/eslint-config-lostfictions.svg?logo=npm" alt="NPM version" />
</a>
</p>

`eslint-config-lostfictions` is a (gently) opinionated shareable configuration for
[ESLint](https://eslint.org/).

**Features**

- Intended for use with [TypeScript](https://www.typescriptlang.org/), using
  [typescript-eslint](https://typescript-eslint.io/)'s parser and type-aware
  rules. (Also supports JavaScript in projects with a
  [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#writing-a-configuration-file)
  configured.)
- Includes an alternate React config that adds additional rules from
  [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react/) and
  [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  to catch errors and uphold best practices in React code.
- Delegates all formatting to [Prettier](https://prettier.io/). No more noisy
  warnings in your editor shouting that you forgot to indent your code!
- Includes rules for best practices when writing tests with
  [Jest](https://jestjs.io/). (But use of Jest is not required to use this
  config!)
- Prefers warnings to errors for most lints, which helps distinguish between
  genuine problems (like TypeScript typechecking errors) and lesser code smells.
  ([Read more](#red-is-for-errors).)
- Deviations and disabled rules relative to base ESLint, React and Typescript
  recommended configs are documented and include a rationale.
- Adds [warnings about
  deprecations](https://github.com/gund/eslint-plugin-deprecation) for both
  internal and external code (by checking JSDoc annotations), [best practices
  around imports](https://github.com/import-js/eslint-plugin-import/),
  [Node.js-specific lints](https://github.com/mysticatea/eslint-plugin-node/),
  and select additional rules from the wonderful
  [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn/).
- Batteries included: just add ESLint and this package to your existing project
  and start linting! Unlike many other shareable configs,
  `eslint-config-lostfictions` doesn't declare any `peerDependencies` besides
  ESLint and TypeScript, so there's no extra ESLint plugins and parsers
  cluttering your `package.json` that need to be audited for compatibility on
  version bumps. (See [below](#usage) for why this is now possible.)

Read on for the rationale, or jump to the [Usage](#usage) section below to get
started.

## Why?

TypeScript and ESLint might seem like they're used for the exact same thing —
catching errors in JavaScript — but they have different, complementary uses.
TypeScript generally limits itself to typechecking, while ESLint can catch a
broad variety of other errors, from simple oversights like [expressions that do
nothing](https://eslint.org/docs/rules/no-unused-expressions) or [comparing a
value to itself](https://eslint.org/docs/rules/no-self-compare), to [technically
legal but dangerous
syntax](https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain),
to analysis of [possible race
conditions](https://eslint.org/docs/rules/require-atomic-updates). The
[typescript-eslint](https://typescript-eslint.io/) project not only enables
ESLint to parse and validate TypeScript code directly, it adds support for a
wide range of TypeScript-specific lints and error-checking not covered by the
TypeScript compiler. In fact, the TypeScript developers [use ESLint and
typescript-eslint on their own
codebase](https://github.com/microsoft/TypeScript/blob/main/.eslintrc.json)!
(Another tool called [TSLint](https://github.com/palantir/tslint) formerly
fulfilled a similar role for TypeScript, but it's been deprecated for a while
now in favour of ESLint.)

`eslint-config-lostfictions` is based on a few key principles:

### Linters are for linting.

After untold numbers of code reviews nitpicking whitespace or semicolons,
programmers are finally coming around to the idea that it's usually easier to
let the computer fix those things for you. A consistent team-wide code style
helps to improve readability and avoid bikeshedding that arises from minor
differences in opinion, but time and experience have shown that the ideal way to
enforce style is via editor tooling and runnning checks in continuous
integration. (Who cares about "tabs versus spaces" if you can treat leading
whitespace as tabstops on your machine but save them to disk as spaces?)

Languages like Go and Rust make things easy here by integrating opinionated
formatters in their toolchain. In JavaScript-land, there are two main options
for formatting: ESLint and [Prettier](https://prettier.io/). Both are viable,
but I've found that Prettier is much easier to configure, more consistent, and
allows for a better separation of concerns.

(For example, when saving a file in your editor you may want to automatically
reformat your code, but you may _not_ want to simultaneously "auto-fix" other
linter warnings, since these "fixes" occasionally change the semantics of your
code or erase some intermediate work you've done. This is a lot harder when
using ESLint as both a formatter and linter. ESLint also tends to give you angry
messages if a line of text is too long or it detects some other whitespace or
formatting issue, which can mask other more important lints.)

**`eslint-config-lostfictions` assumes that you're using Prettier**. All ESLint
whitespace and formatting rules are turned off via
[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier).

### Red is for errors.

Some [popular ESLint
configs](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
like to scream at you at maximum volume for every possible variety of included
lint. Again, in my experience, this can result in a lot of noise that masks
other more important problems, such as typechecker failures, semantic issues,
and parsing errors.

By contrast, `eslint-config-lostfictions` tries to reserve the "error" lint
level for _genuine suspected errors_ and prefers warnings for lesser code smells
and minor issues.

For example, [`no-lonely-if`](https://eslint.org/docs/rules/no-lonely-if) is a
_warning_. A lonely `if` may be somewhat unidiomatic JavaScript, but by itself
it does not represent a semantic issue. On the other hand,
[`no-self-compare`](https://eslint.org/docs/rules/no-self-compare) is an
_error_. There is almost no imaginable circumstance where you would want to
compare a value to itself, so it very likely represents an oversight that will
lead to unintended behaviour in your code.

All that said, for the same reason you should use a formatter, **it's a good
idea to treat warnings as errors** in your CI to ensure warnings get fixed
before a pull request can be merged. You can use the ESLint CLI option
[`--max-warnings=0`](https://eslint.org/docs/user-guide/command-line-interface#--max-warnings)
to enforce this.

---

## Usage

```bash
npm i -D eslint eslint-config-lostfictions
# or
yarn add -D eslint eslint-config-lostfictions
```

`eslint-config-lostfictions` bundles all its required plugins and parsers as
dependencies. Since ESLint doesn't yet directly support bundling plugins in a
config in this way (the [feature request for
it](https://github.com/eslint/eslint/issues/3458) is by far the most upvoted
open issue in the ESLint repo), `eslint-config-lostfictions` also includes
[`@rushstack/eslint-patch`](https://github.com/microsoft/rushstack/tree/master/eslint/eslint-patch).
You'll need to `require` the latter in your ESLint config like this:

#### `.eslintrc.js`

```js
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  extends: ["lostfictions"],
  parserOptions: { tsconfigRootDir: __dirname },
};
```

For React projects, use the `lostfictions/react` config, which adds additional
React-specific plugins and rules:

```diff
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
---  extends: ["lostfictions"],
+++  extends: ["lostfictions/react"],
  parserOptions: { tsconfigRootDir: __dirname }
};
```

Since we're `require`ing a module in the config, this obviously means you need
to use the `.eslintrc.js` config format rather than JSON, YAML, etc.

`eslint-config-lostfictions` also includes
[`eslint-plugin-jest`](https://github.com/jest-community/eslint-plugin-jest) for
linting your tests (including helpful rules like
[`expect-expect`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/expect-expect.md),
which ensures you haven't forgotten to make assertions in your test cases). By
default the extra Jest rules are enabled for files with a
`.test.{js,jsx,ts,tsx}` suffix, as well as files under a `test` folder — which
should match Jest's default rules for finding tests.

---

## FAQ and additional info

### IDE warnings about unlintable files

If you're using an editor integration like
[vscode-eslint](https://github.com/Microsoft/vscode-eslint), `typescript-eslint`
may complain about any files not listed in your `tsconfig.json` being unlintable
(including `.config.js` files, etc). This is not the fault of
`eslint-config-lostfictions`; it's a quirk of `typescript-eslint`'s type-aware
linting. There are a few solutions to this:

- You can safely ignore these warnings and (at least in VS Code) they'll go away
  when you close the file. Often you don't care too much about linting a config
  file in your project root.
- If you don't want to lint the files in question but are annoyed by the
  warning, add them to a `.eslintignore` file, to an `ignorePatterns` field in
  `.eslintrc.js`, or via [any other method ESLint offers for ignoring
  code](https://eslint.org/docs/user-guide/configuring/ignoring-code).
  (`eslint-config-lostfictions` already excludes `.eslintrc.js` itself from
  linting.)
- If you _do_ want to lint these files, add them to your `tsconfig.json` via the
  `include` or `files` field. If you do this, note that **TypeScript may include
  these files for transpilation** if you're using TypeScript as a transpiler
  rather than purely as a typechecker (typecheck-only mode is typical for
  Babel/SWC/esbuild-based setups, including create-react-app and Next.js).

  If transpiling them isn't what you want, you may need to introduce an
  additional _ESLint-specific_ `tsconfig.json` to your project. It can be named
  something like `tsconfig.eslint.json` and can
  [inherit](https://www.typescriptlang.org/tsconfig#extends) from your existing
  `tsconfig.json`. You should only need to additionally specify
  [`noEmit: true`](https://www.typescriptlang.org/tsconfig#noEmit) and the extra
  files to lint. You can then point the `typescript-eslint` parser at the new
  tsconfig file via the [`project`
  field](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsproject)
  under `parserOptions` in your `.eslintrc.js`.

See [typescript-eslint's
documentation](https://typescript-eslint.io/docs/linting/type-linting#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided)
for further explanation about this warning and example configurations that fix
it.

### Warnings about `Array#at()` and `String#at()`

<!-- ### Warnings about `Object.hasOwn()`, `Array#at()` and `String#at()` -->

[`unicorn/prefer-at`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md)
~~and [`prefer-object-has-own`](https://eslint.org/docs/rules/prefer-object-has-own)~~
are both enabled in this config.

_(EDIT: `Object.hasOwn` doesn't have support
yet in TypeScript's `lib.d.ts`, so we're waiting for that. See the [tracking
issue](https://github.com/microsoft/TypeScript/issues/44253).)_

The respective functions they recommend are cleaner and less error-prone than
their older alternatives, but they're both pretty fresh at the moment.
[`Object.hasOwn()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
shipped in [Node
16.9.0](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md#2021-09-07-version-1690-current-targos)
(2021-09-07).
[`String#at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at)
and
[`Array#at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
shipped in [Node
16.6.0](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md#16.6.0)
(2021-07-29). If you're stuck on an older version of Node, you may prefer to
disable these rules. These functions have shipped in all evergreen browsers and
_should_ be polyfilled by frontend tools that incorporate core-js polyfills
(Next.js, CRA) if your browserslist config indicates that support is required.

### The `in` operator

The [`in`
operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)
has a number of pitfalls that can make it tricky to use. _Using an object with
arbitrary string keys can be a code smell_ if there's any possibility the keys
are user-provided — this can be a source of [prototype
poisoning](https://medium.com/intrinsic-blog/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96),
and even solutions like `Object.create(null)` aren't foolproof (and create new
pitfalls of their own). For this reason, it's recommended to use a `Map` or
`Set` when working with arbitrary keys.

However, the `in` operator is often more ergonomic than the more "correct"
alternatives and works as a type guard in TypeScript where other forms of
membership checking do not. For example, given this type declaration:

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

For these reasons, `eslint-config-lostfictions` warns when using the `in`
operator, _unless the left-hand operand is a string literal_. This should catch
a majority of code-smell cases while still permitting the relatively safer case
of using `in` to narrow a union of TypeScript types.

Keep in mind that the preferred way to narrow union types is the use of a
_discriminant property_. (For example, the **`kind`** property in
`type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; size: number }`)
Discriminants sidestep the need to reach for something like `in` in the first
place.
