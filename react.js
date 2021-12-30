const base = require("./index");

module.exports = {
  // we place prettier again at the end of the extends stack to ensure it turns
  // off any react rules that shouldn't be enabled.
  extends: [...base.extends, "plugin:react/recommended", "prettier"],
  plugins: [...base.plugins, "react", "react-hooks"],
  settings: { react: { version: "detect" } },
  rules: {
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
