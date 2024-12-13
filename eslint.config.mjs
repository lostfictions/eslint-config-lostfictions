// @ts-check

// the minimal eslint config for this repo.

import globals from "globals";
import js from "@eslint/js";
import json from "@eslint/json";
import prettier from "eslint-config-prettier";

const files = ["**/*.{js,jsx,cjs,mjs}"];

export default /** @type {import("eslint").Linter.Config[]} */ ([
  {
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    language: "json/json",
    ...json.configs.recommended,
  },
  {
    files: ["**/*.jsonc", ".vscode/*.json", "**/tsconfig.json"],
    language: "json/jsonc",
    languageOptions: { allowTrailingCommas: true },
    ...json.configs.recommended,
  },
  {
    files: ["**/*.json5"],
    language: "json/json5",
    ...json.configs.recommended,
  },
  ...[js.configs.recommended, prettier].map((c) => ({ files, ...c })),
  {
    files,
    rules: {
      "no-unused-expressions": "error",
    },
    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: 2025,
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
]);
