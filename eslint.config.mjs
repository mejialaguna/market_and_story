import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  // ✅ Next.js recommended configs (flat config style)
  ...nextVitals,
  ...nextTs,

  // ✅ Override / extend ignores from eslint-config-next
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    plugins: {
      "@typescript-eslint": tsPlugin,
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "no-console": "error",
      "no-debugger": "error",
      "no-alert": "error",

      // Disable base unused-vars
      "no-unused-vars": "off",

      "max-len": [
        "error",
        {
          code: 120,
          ignorePattern: "^\\s*//\\s*\\d+$",
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      quotes: ["error", "single", { avoidEscape: true }],
      "jsx-quotes": ["error", "prefer-single"],
      semi: ["error", "always"],

      // ✅ Ensure an Empty Line at the End of Every File
      "eol-last": ["error", "always"],

      // ✅ TypeScript Rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowIIFEs: true,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["PascalCase", "UPPER_CASE"],
        },
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
      ],

      // ✅ React Rules
      "react/react-in-jsx-scope": "off", // Not needed for Next.js
      "react/display-name": "off",
      "react/prop-types": "off", // Using TypeScript instead
      "react/self-closing-comp": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],

      // ✅ Enforce Correct Hook Order & Usage
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ⛔ This rule is for class components; usually not useful in modern React
      "react/sort-comp": "off",

      // ✅ Accessibility (a11y) Rules
      // jsx-a11y plugin is already included via eslint-config-next/core-web-vitals
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",

      // ✅ Enforce Proper Import Order & Grouping
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],

      // Prefer plugin duplicate-imports rule
      "no-duplicate-imports": "off",
      "import/no-duplicates": "error",

      // ✅ Lodash policy: forbid default import, allow subpath imports (lodash/map)
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lodash",
              message: "Use specific lodash methods like `lodash/map` instead.",
            },
          ],
          // patterns: [] // left blank so `lodash/*` is allowed
        },
      ],

      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],

      "prefer-template": "error",
      "object-shorthand": "error",

      // ✅ Performance & Safety
      "no-constant-condition": ["error", { checkLoops: false }],

      // ✅ Additional Code Style
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
    },
  },
]);

export default eslintConfig;