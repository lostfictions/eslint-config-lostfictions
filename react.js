const base = require("./index");

module.exports = {
  // we have to declare the whole "extends" stack and all plugins again...
  extends: ["lostfictions", "plugin:react/recommended", "prettier"],
  plugins: ["node", "@typescript-eslint", "react", "react-hooks"],
  settings: { react: { version: "detect" } },
  rules: {
    // ...and because we've redeclared the whole "extends" stack, we have to add
    // our rules back in.
    ...base.rules,

    // these rules can be disabled when using the new jsx transform.
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",

    // eslint-plugin-react rules.
    "react/no-unescaped-entities": "warn",
    "react/prop-types": "off",
    "react/jsx-no-constructed-context-values": "warn",
    "react/no-invalid-html-attribute": "warn",
    "react/no-namespace": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/jsx-no-useless-fragment": "warn",

    // eslint-plugin-react-hooks rules.
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
