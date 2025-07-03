import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
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

export default defineConfig([globalIgnores([
    "**/node_modules/",
    "**/lib/",
    "**/playwright-report/",
    "**/scripts/release.js",
    "**/eslint.config.ts",
    "**/src/reporter/html/src/files/report.js",
    "**/*.js",
]), {
    extends: fixupConfigRules(compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
    )),

    plugins: {
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",

            "editor.codeActionsOnSave": {
                "source.fixAll": true,
            },
        },
    },

    rules: {
        "import/extensions": ["error", {
            extensions: [".js", ".ts"],
        }],

        indent: ["error", 4, {
            SwitchCase: 1,
        }],

        "@/indent": ["error", 4, {
            SwitchCase: 1,
        }],

        "linebreak-style": "off",
        "max-len": "off",
        "import/prefer-default-export": "off",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "react/require-default-props": "off",
        "@typescript-eslint/ban-types": "off",
        "no-use-before-define": "off",
        "no-nested-ternary": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "@typescript-eslint/no-floating-promises": ["error"],
    },
}]);