module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:prettier/recommended",
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier"
  ],
  plugins: ["prettier"],

  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"]
  },

  parserOptions: {
    parser: "babel-eslint"
  }
};
