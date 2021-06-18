a shareable eslint config. custom ruleset that assumes the use of prettier and
typescript. some popular configs like to scream at you loudly and constantly for
all flavours of lint. by contrast, this config tries to reserve the "error" lint
level for genuine suspected errors, and prefers warnings for lesser code smells
and minor issues (for example, unescaped entities in react).

bundles all required plugins and parsers. to allow for this (since eslint
maintainers haven't been able to figure out a resolution to bundling plugins
thus far), it includes
[@rushstack/eslint-patch](https://github.com/microsoft/rushstack/tree/master/stack/eslint-patch),
but you'll need to require it yourself. use it like this:

#### .eslintrc.js

```js
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  extends: ["lostfictions"],
  parserOptions: { tsconfigRootDir: __dirname }
};
```

for react projects, use the react config:

```diff
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
---  extends: ["lostfictions"],
+++  extends: ["lostfictions/react"],
  parserOptions: { tsconfigRootDir: __dirname }
};
```

this obviously means you'll need to use the js config format, not json, yaml,
etc.

if you're using an editor integration like vscode-eslint, typescript-eslint
may contain about any files not listed in your `tsconfig.json` being unlintable
(including `.config.js` files, etc). this is a quirk of typescript-eslint's
type-aware linting; you can safely ignore these warnings and (at least in vscode)
they'll go away when you close the file. see
[typescript-eslint's documentation](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided) 
for further explanation.
