const path = require("path");

module.exports = {
  moduleNameMapper: {
    "^src/(.*)": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["js", "jsx"],
  rootDir: ".",
  moduleDirectories: ["node_modules", path.join(__dirname, "src")],
};
