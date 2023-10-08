module.exports = {
  root: true,
  env: {
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-promise-executor-return": "off",
    "max-classes-per-file": "off",
    "no-restricted-syntax": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
      },
    ],
  },
  plugins: ["prettier", "jest"],
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
  },
};
