const base = require("./index");

module.exports = {
  // we have to declare the whole "extends" stack and all plugins again...
  extends: ["lostfictions", "plugin:react/recommended", "prettier"],
  plugins: [
    "node",
    "import",
    "deprecation",
    "@typescript-eslint",
    "react",
    "react-hooks",
  ],
  settings: { react: { version: "detect" } },
  rules: {
    // ...and because we've redeclared the whole "extends" stack, we have to add
    // our rules back in.
    ...base.rules,

    // these rules can be disabled when using the new jsx transform.
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    // eslint-plugin-react rules.
    "react/jsx-no-constructed-context-values": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/jsx-no-useless-fragment": "warn",
    "react/no-deprecated": "warn",
    "react/no-invalid-html-attribute": "warn",
    "react/no-namespace": "warn",
    "react/no-unescaped-entities": "warn",
    "react/prop-types": "off",

    // eslint-plugin-react-hooks rules.
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
  },
};
