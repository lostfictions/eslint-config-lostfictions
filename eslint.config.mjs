// @ts-check
import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

// the minimal eslint config for this repo.

export default /** @type {import("eslint").Linter.Config[]} */ ([
  js.configs.recommended,
  prettier,
  {
    rules: {
      "no-unused-expressions": "error",
    },
    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: 2023,
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
]);
