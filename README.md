personal eslint config. custom ruleset that also bundles plugins and parsers i
commonly use.

includes
[@rushstack/eslint-patch](https://github.com/microsoft/rushstack/tree/master/stack/eslint-patch)
to simplify eslint configuration, but you'll need to require it yourself. use it like this:

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
