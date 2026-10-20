import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Ignorar archivos compilados y reportes
    ignores: ["dist/**", "coverage/**", "node_modules/**"]
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
    }
  }
);