a shareable eslint config. custom ruleset that assumes the use of prettier and
typescript. favours warnings over errors for code smells and minor issues like
unescaped entities.

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

```js
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  extends: ["lostfictions/react"],
  parserOptions: { tsconfigRootDir: __dirname }
};
```

this obviously means you'll need to use the js config format, not json, yaml,
etc. if you're using an editor integration like vscode-eslint, typescript-eslint
itself may contain about `.eslintrc.js` not being included in your
`tsconfig.json`. unfortunately, even adding `/* eslint-disable */` at the top of
your config won't resolve this. you can safely ignore the warning and it will go
away when you close the file, or if you want you can add it to your
`tsconfig.json` as it recommends.
