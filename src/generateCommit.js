const out = require("./spTeeBizOut");
const exec = require("child_process").exec;

function deleteEnter(str) {
  return str.replace(/(\r\n)|(\n)/g, "");
}

function generateCommit(commitDesc) {
  exec("git status", "utf8", (err, stdout, stderr) => {
    if (!err) {
      const temp = stdout.split("\t").slice(1);
      const res = temp.map((item) => deleteEnter(item)).join("\n");
      const commitInfo = out(res, commitDesc);

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
}

module.exports = generateCommit;
