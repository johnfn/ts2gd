module.exports = {
  ignorePatterns: [
    "**/_godot_defs/**",
    "**/mockProject/**",
    "**/godot_src/**",
    "**/js/**",
    ".eslintrc.js",
  ],
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["import", "prettier", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": ["error", { "newlines-between": "always" }],
    "@typescript-eslint/no-floating-promises": "error",
    // we could look into turning these on
    "prefer-const": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
}
