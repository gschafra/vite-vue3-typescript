import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import parser from "vue-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: [
    "**/node_modules",
    "**/.DS_Store",
    "**/dist",
    "**/dist-ssr",
    "**/*.local",
    "**/index.html",
  ],
}, ...compat.extends(
  "plugin:@typescript-eslint/recommended",
  "plugin:vue/vue3-essential",
  "plugin:vue/vue3-strongly-recommended",
  "prettier",
), {
  plugins: {
    "@typescript-eslint": typescriptEslint,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },

    parser: parser,
    ecmaVersion: 5,
    sourceType: "module",

    parserOptions: {
      parser: "@typescript-eslint/parser",
    },
  },

  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off",
  },
}];
