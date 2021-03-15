#!/usr/bin/env node
const helpStr = require("./help");
const packageJson = require("./src/getPackage");
const isSpTeeBiz = require("./src/env");
const generateCommit = require("./src/generateCommit");
/**
 * @description 入口判断参数
 */
const args = process.argv.slice(2);

// 直接输入ranta-fans
if (args.length === 0) {
  console.log(`输入 ranta-fans --help 查看帮助`);
  return;
}

switch (args[0]) {
  case "--help":
    console.log(helpStr);
    break;

  case "--version":
    console.log(packageJson.version);
    break;

  case "--env":
    console.log(
      `当前${isSpTeeBiz ? "*是*" : "*不是*"}小店海报项目子仓库的根目录`
    );
    break;

  case "-m":
    if (!isSpTeeBiz) {
      return console.log(`请在 sp-tee-biz 目录下使用`);
    }
    if (!args[1]) {
      return console.log(`请输入修改的内容`);
    }
    generateCommit(args[1]);
    break;

  default:
    console.log(`不存在的命令，输入--help查看帮助`);
    break;
}
