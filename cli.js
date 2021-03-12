#!/usr/bin/env node
var exec = require("child_process").exec;
var out = require("./generateCommit");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`输入本次的修改：`, (content) => {
  exec("git status", "utf8", (err, stdout, stderr) => {
    if (!err) {
      const temp = stdout.split("\t").slice(1);
      const res = temp.map((item) => deleteEnter(item)).join("\n");
      const commitInfo = out(res, content);
      exec(`git commit -m "${commitInfo}"`, "utf8", (err, stdout, stderr) => {
        if (!err) {
          console.log(stdout);
          process.exit();
        } else {
          console.log("error", err);
          process.exit();
        }
      });
    } else {
      console.log("error", err);
      process.exit();
    }
  });
});

function deleteEnter(str) {
  return str.replace(/(\r\n)|(\n)/g, "");
}
