const fs = require("fs");
const path = require("path");
const packageJsonPath = path.resolve(__dirname, "../package.json");

const packageJson = fs.readFileSync(packageJsonPath);

module.exports = JSON.parse(packageJson);
