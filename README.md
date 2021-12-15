# a shareable eslint config.

`eslint-config-lostfictions` is a (gently) opinionated custom configuration for
[eslint](https://eslint.org/) intended for use with
[typescript](https://www.typescriptlang.org/) (or javascript). it's based on a
few key principles:

## linters are for linting.

after untold thousands of code reviews nitpicking whitespace, line length, or
semicolons, programmers are finally coming around to the idea that it's usually
easier to let the computer fix those things for you. a consistent team-wide
code style helps speed up readability and smooths over conflicts that arise from
minor differences in opinion. (who cares about tabs versus spaces if you can
treat leading whitespace as tabstops on your machine but save them to disk as
spaces?)

languages like go and rust make things easy here by integrating opinionated
formatters in their toolchain. in javascript-land, there are two main options
for formatting: eslint and [prettier](https://prettier.io/). both are viable,
but i've found that prettier is much easier to configure, more consistent, and
allows for a better separation of concerns.

(for example, when saving a file in your editor you may want to automatically
reformat your code, but you may _not_ want to simultaneously "auto-fix" other
linter warnings, since these "fixes" occasionally change the semantics of your
code or erase some intermediate work you've done. this is a lot harder when
using eslint as both a formatter and linter. eslint also tends to give you angry
messages if a line of text is too long or it detects some other whitespace or
formatting issue, which can mask other more important lints.)

`eslint-config-lostfictions` assumes that you're using prettier. all eslint
whitespace and formatting rules are turned off via
[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier).

## red is for errors.

some [popular eslint
configs](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
like to scream at you at maximum volume for every possible variety of included
lint. again, in my experience, this can result in a lot of noise that masks
other more important problems, such as typechecker failures, semantic issues,
and parsing errors.

by contrast, `eslint-config-lostfictions` tries to reserve the "error" lint
level for _genuine suspected errors_ and prefers warnings for lesser code smells
and minor issues.

for example, [`no-lonely-if`](https://eslint.org/docs/rules/no-lonely-if) is a
_warning_. a lonely `if` may be somewhat unidiomatic javascript, but by itself
it does not represent a semantic issue. on the other hand,
[`no-self-compare`](https://eslint.org/docs/rules/no-self-compare) is an
_error_. there is almost no imaginable circumstance where you would want to
compare a value to itself, so it very likely represents an oversight that will
lead to unintended behaviour in your code.

all that said, for the same reason you should use a formatter, **it's a good
idea to treat warnings as errors** in your ci to ensure warnings get fixed
before a pull request can be merged. you can use the eslint cli option
[`--max-warnings=0`](https://eslint.org/docs/user-guide/command-line-interface#--max-warnings)
to enforce this.

---

## usage

```bash
npm i -D eslint eslint-config-lostfictions
# or
yarn add -D eslint eslint-config-lostfictions
```

`eslint-config-lostfictions` bundles all its required plugins and parsers as
dependencies. since eslint doesn't yet directly support bundling plugins in a
config in this way (the [feature request for
it](https://github.com/eslint/eslint/issues/3458) is by far the most upvoted
open issue in the eslint repo), `eslint-config-lostfictions` also includes
[`@rushstack/eslint-patch`](https://github.com/microsoft/rushstack/tree/master/eslint/eslint-patch).
you'll need to `require` the latter in your eslint config like this:

#### `.eslintrc.js`

```js
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  extends: ["lostfictions"],
  parserOptions: { tsconfigRootDir: __dirname },
};
```

for react projects, use the `lostfictions/react` config, which adds additional
react-specific plugins and rules:

```diff
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
---  extends: ["lostfictions"],
+++  extends: ["lostfictions/react"],
  parserOptions: { tsconfigRootDir: __dirname }
};
```

since we're `require`ing a module in the config, this obviously means you need
to use the `.eslintrc.js` config format rather than json, yaml, etc.

---

## quirks

### ide warnings about unlintable files

if you're using an editor integration like
[vscode-eslint](https://github.com/Microsoft/vscode-eslint), `typescript-eslint`
may complain about any files not listed in your `tsconfig.json` being unlintable
(including `.config.js` files, etc). this is not the fault of
`eslint-config-lostfictions`; it's a quirk of `typescript-eslint`'s type-aware
linting. there are a few solutions to this:

- you can safely ignore these warnings and (at least in vscode) they'll go away
  when you close the file. often you don't care too much about linting a config
  file in your project root.
- if you don't want to lint the files in question but are annoyed by the
  warning, add them to a `.eslintignore` file, to an `ignorePatterns` field in
  `.eslintrc.js`, or via [any other method eslint offers for ignoring
  code](https://eslint.org/docs/user-guide/configuring/ignoring-code).
  (`eslint-config-lostfictions` already excludes `.eslintrc.js` itself from
  linting.)
- if you _do_ want to lint these files, add them to your `tsconfig.json` via the
  `include` or `files` field. if you do this, note that **typescript may include
  these files for transpilation** if you're using typescript as a transpiler
  rather than purely as a typechecker (as is typical in babel/swc/esbuild-based
  setups). if transpiling them isn't what you want, you may need to introduce an
  additional _typecheck-only_ `tsconfig.json` to your project. it can be named
  something like `tsconfig.eslint.json` and can
  [inherit](https://www.typescriptlang.org/tsconfig#extends) from your existing
  `tsconfig.json`. you only need to additionally specify [`noEmit: true`](https://www.typescriptlang.org/tsconfig#noEmit) (and the extra files to
  lint). you can then point the `typescript-eslint` parser at the new tsconfig
  file via the [`project`
  field](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsproject)
  under `parserOptions` in your `.eslintrc.js`.

see [typescript-eslint's
documentation](https://typescript-eslint.io/docs/linting/type-linting#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided)
for further explanation about this warning and example configurations that fix
it.
