# eslint-config-lostfictions

<p align="center">
<svg role="img" height="50" fill="#4B32C3" viewBox="0 0 28 24" xmlns="http://www.w3.org/2000/svg" alt="ESLint" title="ESLint"><path d="M7.257 9.132L11.816 6.5a.369.369 0 0 1 .368 0l4.559 2.632a.369.369 0 0 1 .184.32v5.263a.37.37 0 0 1-.184.319l-4.559 2.632a.369.369 0 0 1-.368 0l-4.559-2.632a.369.369 0 0 1-.184-.32V9.452a.37.37 0 0 1 .184-.32M23.852 11.53l-5.446-9.475c-.198-.343-.564-.596-.96-.596H6.555c-.396 0-.762.253-.96.596L.149 11.509a1.127 1.127 0 0 0 0 1.117l5.447 9.398c.197.342.563.517.959.517h10.893c.395 0 .76-.17.959-.512l5.446-9.413a1.069 1.069 0 0 0 0-1.086m-4.51 4.556a.4.4 0 0 1-.204.338L12.2 20.426a.395.395 0 0 1-.392 0l-6.943-4.002a.4.4 0 0 1-.205-.338V8.08c0-.14.083-.269.204-.338L11.8 3.74c.12-.07.272-.07.392 0l6.943 4.003a.4.4 0 0 1 .206.338z"/></svg>
<svg role="img" height="50" fill="#358EF1" viewBox="0 0 28 24" xmlns="http://www.w3.org/2000/svg" alt="TypeScript" title="TypeScript"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>
<svg role="img" height="50" fill="#F7B93E" viewBox="0 0 26 24" xmlns="http://www.w3.org/2000/svg" alt="Prettier" title="Prettier"><path d="M8.571 23.429A.571.571 0 0 1 8 24H2.286a.571.571 0 0 1 0-1.143H8c.316 0 .571.256.571.572zM8 20.57H6.857a.571.571 0 0 0 0 1.143H8a.571.571 0 0 0 0-1.143zm-5.714 1.143H4.57a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zM8 18.286H2.286a.571.571 0 0 0 0 1.143H8a.571.571 0 0 0 0-1.143zM16 16H5.714a.571.571 0 0 0 0 1.143H16A.571.571 0 0 0 16 16zM2.286 17.143h1.143a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zm17.143-3.429H16a.571.571 0 0 0 0 1.143h3.429a.571.571 0 0 0 0-1.143zM9.143 14.857h4.571a.571.571 0 0 0 0-1.143H9.143a.571.571 0 0 0 0 1.143zm-6.857 0h4.571a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zM20.57 11.43H11.43a.571.571 0 0 0 0 1.142h9.142a.571.571 0 0 0 0-1.142zM9.714 12a.571.571 0 0 0-.571-.571H5.714a.571.571 0 0 0 0 1.142h3.429A.571.571 0 0 0 9.714 12zm-7.428.571h1.143a.571.571 0 0 0 0-1.142H2.286a.571.571 0 0 0 0 1.142zm19.428-3.428H16a.571.571 0 0 0 0 1.143h5.714a.571.571 0 0 0 0-1.143zM2.286 10.286H8a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zm13.143-2.857c0 .315.255.571.571.571h5.714a.571.571 0 0 0 0-1.143H16a.571.571 0 0 0-.571.572zm-8.572-.572a.571.571 0 0 0 0 1.143H8a.571.571 0 0 0 0-1.143H6.857zM2.286 8H4.57a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zm16.571-2.857c0 .315.256.571.572.571h1.142a.571.571 0 0 0 0-1.143H19.43a.571.571 0 0 0-.572.572zm-1.143 0a.571.571 0 0 0-.571-.572H12.57a.571.571 0 0 0 0 1.143h4.572a.571.571 0 0 0 .571-.571zm-15.428.571h8a.571.571 0 0 0 0-1.143h-8a.571.571 0 0 0 0 1.143zm5.143-2.857c0 .316.255.572.571.572h11.429a.571.571 0 0 0 0-1.143H8a.571.571 0 0 0-.571.571zm-5.143.572h3.428a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zm0-2.286H16A.571.571 0 0 0 16 0H2.286a.571.571 0 0 0 0 1.143z"/></svg>
<svg role="img" height="50" fill="#61DAFB" viewBox="0 0 26 24" xmlns="http://www.w3.org/2000/svg" alt="React" title="React"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>
<svg role="img" height="50" fill="#C21325" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" alt="Jest" title="Jest"><path d="M22.251 11.82a3.117 3.117 0 0 0-2.328-3.01L22.911 0H8.104L11.1 8.838a3.116 3.116 0 0 0-2.244 2.988c0 1.043.52 1.967 1.313 2.536a8.279 8.279 0 0 1-1.084 1.244 8.14 8.14 0 0 1-2.55 1.647c-.834-.563-1.195-1.556-.869-2.446a3.11 3.11 0 0 0-.91-6.08 3.117 3.117 0 0 0-3.113 3.113c0 .848.347 1.626.903 2.182-.048.097-.097.195-.146.299-.465.959-.993 2.043-1.195 3.259-.403 2.432.257 4.384 1.849 5.489A5.093 5.093 0 0 0 5.999 24c1.827 0 3.682-.917 5.475-1.807 1.279-.632 2.599-1.292 3.898-1.612.48-.118.98-.187 1.508-.264 1.07-.153 2.175-.312 3.168-.89a4.482 4.482 0 0 0 2.182-3.091c.174-.994 0-1.994-.444-2.87.298-.48.465-1.042.465-1.647zm-1.355 0c0 .965-.785 1.75-1.75 1.75a1.753 1.753 0 0 1-1.085-3.126l.007-.007c.056-.042.118-.084.18-.125 0 0 .008 0 .008-.007.028-.014.055-.035.083-.05.007 0 .014-.006.021-.006.028-.014.063-.028.097-.042.035-.014.07-.027.098-.041.007 0 .013-.007.02-.007.028-.007.056-.021.084-.028.007 0 .02-.007.028-.007.034-.007.062-.014.097-.02h.007l.104-.022c.007 0 .02 0 .028-.007.028 0 .055-.007.083-.007h.035c.035 0 .07-.007.111-.007h.09c.028 0 .05 0 .077.007h.014c.055.007.111.014.167.028a1.766 1.766 0 0 1 1.396 1.723zM10.043 1.39h10.93l-2.509 7.4c-.104.02-.208.055-.312.09l-2.64-5.385-2.648 5.35c-.104-.034-.216-.055-.327-.076l-2.494-7.38zm4.968 9.825a3.083 3.083 0 0 0-.938-1.668l1.438-2.904 1.452 2.967c-.43.43-.743.98-.868 1.605H15.01zm-3.481-1.098c.034-.007.062-.014.097-.02h.02c.029-.008.056-.008.084-.015h.028c.028 0 .049-.007.076-.007h.271c.028 0 .049.007.07.007.014 0 .02 0 .035.007.027.007.048.007.076.014.007 0 .014 0 .028.007l.097.02h.007c.028.008.056.015.083.029.007 0 .014.007.028.007.021.007.049.014.07.027.007 0 .014.007.02.007.028.014.056.021.084.035h.007a.374.374 0 0 1 .09.049h.007c.028.014.056.034.084.048.007 0 .007.007.013.007.028.014.05.035.077.049l.007.007c.083.062.16.132.236.201l.007.007a1.747 1.747 0 0 1 .48 1.209 1.752 1.752 0 0 1-3.502 0 1.742 1.742 0 0 1 1.32-1.695zm-6.838-.049c.966 0 1.751.786 1.751 1.751s-.785 1.751-1.75 1.751-1.752-.785-1.752-1.75.786-1.752 1.751-1.752zm16.163 6.025a3.07 3.07 0 0 1-1.508 2.133c-.758.438-1.689.577-2.669.716a17.29 17.29 0 0 0-1.64.291c-1.445.355-2.834 1.05-4.182 1.717-1.724.854-3.35 1.66-4.857 1.66a3.645 3.645 0 0 1-2.154-.688c-1.529-1.056-1.453-3.036-1.272-4.12.167-1.015.632-1.966 1.077-2.877.028-.055.049-.104.077-.16.152.056.312.098.479.126-.264 1.473.486 2.994 1.946 3.745l.264.139.284-.104c1.216-.431 2.342-1.133 3.336-2.071a9.334 9.334 0 0 0 1.445-1.716c.16.027.32.034.48.034a3.117 3.117 0 0 0 3.008-2.327h1.167a3.109 3.109 0 0 0 3.01 2.327c.576 0 1.11-.16 1.57-.43.18.52.236 1.063.139 1.605z"/></svg>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/eslint-config-lostfictions"><img src="https://img.shields.io/npm/v/eslint-config-lostfictions.svg?logo=npm" alt="NPM version" /></a>
</p>

## A shareable ESLint config.

`eslint-config-lostfictions` is a (gently) opinionated custom configuration for
[ESLint](https://eslint.org/).

**Features**

- Intended for use with [TypeScript](https://www.typescriptlang.org/) (also
  supports JavaScript in projects with a
  [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#writing-a-configuration-file)
  configured).
- Includes a React config with
  [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react/) and
  [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  rules to catch errors and uphold best practices in React code.
- Defers all formatting rules to [Prettier](https://prettier.io/). No more noisy
  warnings in your editor shouting that you forgot to indent your code!
- Includes rules for best practices when writing tests with
  [Jest](https://jestjs.io/).
- Batteries included: just add ESLint and this package — no need for extra
  ESLint plugins cluttering your `package.json` that need to be audited for
  compatibility on version bumps.

Read on for the rationale, or jump to the [Usage](#Usage) section below to get
started.

## Why?

TypeScript and ESLint might seem like they're used for the exact same thing —
catching errors in JavaScript — but they have different, complementary uses.
TypeScript generally limits itself to typechecking, while ESLint can catch
things like [expressions that do
nothing](https://eslint.org/docs/rules/no-unused-expressions) or [comparing a
value to itself](https://eslint.org/docs/rules/no-self-compare). In fact, the
TypeScript developers [use ESLint on their own
codebase](https://github.com/microsoft/TypeScript/blob/main/.eslintrc.json)!
(Another tool called [TSLint](https://github.com/palantir/tslint) formerly
fulfilled a similar role for TypeScript, but it's been deprecated for a while
now in favour of ESLint.)

`eslint-config-lostfictions` is based on a few key principles:

### Linters are for linting.

After untold thousands of code reviews nitpicking whitespace, line length, or
semicolons, programmers are finally coming around to the idea that it's usually
easier to let the computer fix those things for you. A consistent team-wide
code style helps speed up readability and smooths over conflicts that arise from
minor differences in opinion. (Who cares about tabs versus spaces if you can
treat leading whitespace as tabstops on your machine but save them to disk as
spaces?)

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

`eslint-config-lostfictions` assumes that you're using Prettier. All ESLint
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
default the extra jest rules are enabled for files with a
`.test.{js,jsx,ts,tsx}` suffix, as well as files under a `test` folder — which
should match Jest's default rules for finding tests.

---

## Quirks

### IDE warnings about unlintable files

If you're using an editor integration like
[vscode-eslint](https://github.com/Microsoft/vscode-eslint), `typescript-eslint`
may complain about any files not listed in your `tsconfig.json` being unlintable
(including `.config.js` files, etc). This is not the fault of
`eslint-config-lostfictions`; it's a quirk of `typescript-eslint`'s type-aware
linting. there are a few solutions to this:

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
  rather than purely as a typechecker (as is typical in Babel/SWC/esbuild-based
  setups). If transpiling them isn't what you want, you may need to introduce an
  additional _typecheck-only_ `tsconfig.json` to your project. It can be named
  something like `tsconfig.eslint.json` and can
  [inherit](https://www.typescriptlang.org/tsconfig#extends) from your existing
  `tsconfig.json`. You only need to additionally specify [`noEmit: true`](https://www.typescriptlang.org/tsconfig#noEmit) (and the extra files to
  lint). You can then point the `typescript-eslint` parser at the new tsconfig
  file via the [`project`
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
pitfalls of their own). for this reason, it's recommended to use a `Map` or
`Set` when working with arbitrary keys.

However, the `in` operator is often more ergonomic than the more "correct"
alternatives and works as a type guard in TypeScript where other forms of
membership checking do not. for example, given this type declaration:

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
_discriminant property_. (For example, the `kind` property in `type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; size: number }`.)
discriminants sidestep the need to reach for something like `in` in the first
place.
