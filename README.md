# a shareable eslint config.

`eslint-config-lostfictions` is a custom ruleset for
[eslint](https://eslint.org/) that assumes you're also using
[prettier](https://prettier.io/) and
[typescript](https://www.typescriptlang.org/). some popular eslint configs like
to scream at you at maximum volume for every possible variety of included lint
(and they seem to try to include as many lints as humanly possible). in my
experience, this can result in a lot of noise that masks other more important
problems, such as typecheck problems, semantic issues, and parsing errors.

**by contrast**, this config tries to reserve the "error" lint level for
_genuine suspected errors_ and prefers warnings for lesser code smells and minor
issues.

for example, [`no-lonely-if`](https://eslint.org/docs/rules/no-lonely-if) is a
_warning_. it's somewhat unidiomatic javascript, but by itself it does not
represent a semantic issue. by constrast,
[`no-self-compare`](https://eslint.org/docs/rules/no-self-compare) is an
_error_. there is almost no imaginable circumstance where you would want to
compare a value to itself, so it very likely represents an oversight that will
lead to unintended behaviour in your code.

you may still wish to treat warnings as errors in your ci step to ensure they
get fixed before a pr can be merged. you can use the eslint cli option
[`--max-warnings=0`](https://eslint.org/docs/user-guide/command-line-interface#--max-warnings)
to enforce this.

---

`eslint-config-lostfictions` bundles all its required plugins and parsers. since
eslint doesn't yet directly support bundling plugins in a config (the [feature
request for it](https://github.com/eslint/eslint/issues/3458) is by far the most
upvoted open issue in the eslint repo), `eslint-config-lostfictions` includes
[@rushstack/eslint-patch](https://github.com/microsoft/rushstack/tree/master/eslint/eslint-patch).
you'll need to require it in your eslintrc, but it's still cleaner than a long
list of peer dependencies. use it like this:

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
to use the `.eslintrc.js` eslint config format rather than json, yaml, etc.

---

## quirks

### ide warnings about unlintable files

if you're using an editor integration like
[vscode-eslint](https://github.com/Microsoft/vscode-eslint), `typescript-eslint`
may contain about any files not listed in your `tsconfig.json` being unlintable
(including `.config.js` files, etc). this is not the fault of
`eslint-config-lostfictions` -- it's a quirk of typescript-eslint's type-aware
linting. there are a few solutions to this:

- you can safely ignore these warnings and (at least in vscode) they'll go away
  when you close the file. often you don't care too much about linting a config
  file in your project root.
- if you don't want to lint the files in question but are annoyed by the
  warning, add them to a `.eslintignore` file, `ignorePatterns` field in the
  config, or [any other method eslint offers for ignoring
  code](https://eslint.org/docs/user-guide/configuring/ignoring-code).
  (`eslint-config-lostfictions` already excludes `.eslintrc.js` itself from
  linting.)
- if you _do_ want to lint them, add them to your `tsconfig.json` via the
  `include` or `files` field. in this case note that typescript may include
  these files for transpilation (only if you're using typescript as a
  transpiler, rather than a pure typechecker as in babel- or swc/esbuild-based
  setups). if this isn't what you want, you may need to introduce an additional
  _typecheck-only_ `tsconfig.json` to your project (which can
  [inherit](https://www.typescriptlang.org/tsconfig#extends) from your existing
  `tsconfig.json` but should specify [`noEmit: true`](https://www.typescriptlang.org/tsconfig#noEmit) in addition to the
  extra files to lint). you can then point the `typescript-eslint` parser at the
  new tsconfig file via the [`project`
  field](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsproject)
  under `parserOptions` in your `.eslintrc.js`.

see [typescript-eslint's
documentation](https://typescript-eslint.io/docs/linting/type-linting#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided)
for further explanation about this warning.
