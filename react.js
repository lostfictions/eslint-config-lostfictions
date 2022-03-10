const base = require("./index");

module.exports = {
  ...base,
  // we place prettier at the end of the extends stack to ensure it turns
  // off any react rules that shouldn't be enabled.
  extends: [
    ...base.extends.filter((n) => n !== "prettier"),
    "plugin:react/recommended",
    // assume we're using the new jsx transform:
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  plugins: [...base.plugins, "react", "react-hooks"],
  settings: { react: { version: "detect" } },
  rules: {
    ...base.rules,

    /*
     * eslint-plugin-react rules.
     */

    // enforce naming convention for useState hooks.
    "react/hook-use-state": "warn",

    "react/iframe-missing-sandbox": "warn",
    "react/jsx-boolean-value": "warn",
    "react/jsx-fragments": "warn",
    "react/jsx-no-constructed-context-values": "warn",
    "react/jsx-no-script-url": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/jsx-no-useless-fragment": "warn",
    "react/no-access-state-in-setstate": "warn",
    "react/no-deprecated": "warn",
    "react/no-did-mount-set-state": "warn",
    "react/no-did-update-set-state": "warn",
    "react/no-invalid-html-attribute": "warn",
    "react/no-namespace": "warn",
    "react/no-redundant-should-component-update": "warn",
    "react/no-unescaped-entities": "warn",
    "react/no-unsafe": "warn",
    "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],

    // sometimes has false positives; investigate whether it's useful to
    // re-enable
    // "react/no-unused-prop-types": "warn",

    "react/no-unused-state": "warn",
    "react/no-will-update-set-state": "warn",

    // proptypes are usually not used in ts. (though ts _does_ have faculties to
    // infer types when proptypes are declared; this rule can be switched back
    // on in codebases where that style is used).
    "react/prop-types": "off",

    // eslint-plugin-react-hooks rules.
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
  },
};
