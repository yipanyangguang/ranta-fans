/**
 * 判断当前是不是小店海报的项目
 */
const fs = require("fs");
const { resolve } = require("path");

const curCmdPath = resolve("./");
const packageJsonPath = resolve(curCmdPath, "package.json");

let isSpTeeBiz = false;
try {
  const packageJson = fs.readFileSync(packageJsonPath);
  if (JSON.parse(packageJson).name === "sp-tee-biz") {
    isSpTeeBiz = true;
  }
} catch (error) {
  isSpTeeBiz = false;
}

module.exports = isSpTeeBiz;
