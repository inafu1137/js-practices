// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const eslintConfigPrettier = require("eslint-config-prettier");

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      js,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  eslintConfigPrettier,
];
