const base = require("./index");

module.exports = {
  // we have to declare the entire extends stack again, i think...
  extends: ["lostfictions", "plugin:react/recommended", "prettier"],
  plugins: ["node", "@typescript-eslint", "react", "react-hooks"],
  settings: { react: { version: "detect" } },
  rules: {
    // ...and because we've redeclared the whole extends stack, i think we have
    // to add our rules back in. sigh
    ...base.rules,
    //these rules can be disabled when using the new jsx transform
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",

    // normal rules
    "react/no-unescaped-entities": "warn",
    "react/prop-types": "off",
    "react/jsx-no-constructed-context-values": "warn",
    "react/no-namespace": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/jsx-no-useless-fragment": "warn",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
