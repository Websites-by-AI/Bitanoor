import next from "eslint-config-next";

export default next({
  // Enable TypeScript support
  "@typescript-eslint/eslint-plugin": {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
});
