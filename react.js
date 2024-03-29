const base = require("./index");

// TODO: it might make sense to inline this in the main file as an override for
// `.{jsx,tsx}` extensions instead of maintaining a separate config.

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

    ///////////////////////////////////////////////////////////////////
    // eslint-plugin-react rules.
    ///////////////////////////////////////////////////////////////////

    /**
     * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
     *
     * enforce naming convention for useState hooks.
     */
    "react/hook-use-state": ["warn", { allowDestructuredState: true }],

    "react/iframe-missing-sandbox": "warn",
    "react/jsx-boolean-value": "warn",
    "react/jsx-fragments": "warn",
    "react/jsx-no-constructed-context-values": "warn",

    /**
     * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
     *
     * this rule might seem annoying if you're working in a typed codebase and
     * confident that you're only using the `x && <Component />` pattern in
     * situations where `x` is a boolean. (and in an ideal world, there'd be a
     * typescript-aware version of the react plugin that could detect just such
     * a case, which is safe.) but imo it's better to be on the safe side, even
     * if it's slightly more verbose to have to say `x ? <Component /> : null`.
     */
    "react/jsx-no-leaked-render": [
      "warn",
      { validStrategies: ["ternary", "coerce"] },
    ],

    "react/jsx-no-script-url": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/jsx-no-useless-fragment": "warn",
    "react/no-access-state-in-setstate": "warn",
    "react/no-deprecated": "warn",
    "react/no-did-mount-set-state": "warn",
    "react/no-did-update-set-state": "warn",
    "react/no-invalid-html-attribute": "warn",
    "react/no-namespace": "warn",

    /**
     * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-object-type-as-default-prop.md
     */
    "react/no-object-type-as-default-prop": "warn",

    "react/no-redundant-should-component-update": "warn",
    "react/no-unescaped-entities": "warn",
    "react/no-unsafe": "warn",
    "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],

    // sometimes has false positives; investigate whether it's useful to
    // re-enable
    // "react/no-unused-prop-types": "warn",

    "react/no-unused-state": "warn",
    "react/no-will-update-set-state": "warn",

    /**
     * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
     *
     * [proptypes](https://reactjs.org/docs/typechecking-with-proptypes.html) is
     * a react feature that provides runtime type checking for component
     * property types; it's rarely used or needed when writing react with
     * typescript. (that said, ts _does_ have special faculties to infer types
     * when proptypes are declared; this rule can be switched back on in
     * codebases where such a style is used.)
     */
    "react/prop-types": "off",

    ///////////////////////////////////////////////////////////////////
    // eslint-plugin-react-hooks rules.
    ///////////////////////////////////////////////////////////////////

    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
  },
};
