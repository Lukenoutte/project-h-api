const path = require("path");

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "^src/(.*)": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  rootDir: ".",
  moduleDirectories: ["node_modules", path.join(__dirname, "src")],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
