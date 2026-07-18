import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // Define o diretório base para buscar os plugins/extends
  baseDirectory: import.meta.dirname,
});

export default [
  // 1. Definição Global de arquivos ignorados (Substitui o ignorePatterns)
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/*.config.js",
      "**/*.setup.js"
    ],
  },

  // 2. Tradução das suas configurações antigas para o formato Flat Config
  ...compat.config({
    extends: ["next/core-web-vitals", "prettier"],
    plugins: ["@typescript-eslint"],
    rules: {
      "prefer-const": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
        },
      ],
      "react/no-unescaped-entities": "warn",
    },
  }),
];