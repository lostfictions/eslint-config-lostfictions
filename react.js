const base = require("./index");

module.exports = {
  // we have to declare the entire extends stack again, i think...
  extends: [
    "lostfictions",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  plugins: ["node", "@typescript-eslint", "react", "react-hooks"],
  settings: { react: { version: "detect" } },
  rules: {
    // ...and because we've redeclared the whole extends stack, i think we have
    // to add our rules back in. sigh
    ...base.rules,
    "react/no-unescaped-entities": "warn",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
