// common 组件配置表
function commonTable(key) {
  const table = {
    "common-share": ["poster-detail"],
    "common-after-share-toast": [
      "poster-invite",
      "poster-template",
      "homepage",
    ],
    "common-generator-invite-poster": ["poster-invite", "poster-template"],
    "common-poster-container": ["poster-detail", "poster-template"],
    "common-remove-ads": ["poster-detail", "poster-share"],
  };
  return table[key];
}

function out(gitLog, commitContent = "**这里填写你的修改内容**") {
  const paths = gitLog.trim().split("src").slice(1);

  let resScenes = new Set();
  let resExtensions = new Set();
  let resBizs = new Set();
  paths.forEach((word) => {
    let item = getScenesAndExtensionName(word);
    if (item.scenesName && item.scenesName !== "common") {
      resScenes.add(item.scenesName);
    }
    if (item.extensionName) {
      resExtensions.add(item.extensionName);
      if (commonTable(item.extensionName)) {
        let s = commonTable(item.extensionName);
        for (let i = 0; i < s.length; i++) {
          resScenes.add(s[i]);
        }
      }
    }
    if (item.bizName) {
      resBizs.add(item.bizName);
    }
  });

  const str_1 = `fix (场景: ${[...resScenes]}) : ${commitContent}`;
  let str_2 = `
      
      需要发布的 extensions :
      `;
  for (let v of resExtensions) {
    str_2 += `  ${v}
      `;
  }
  let str_3 = `
      
      需要更新/发布的 biz :
      `;

  for (let v of resBizs) {
    str_3 += `  ${v}
      `;
  }

  let res = str_1;
  if (resExtensions.size !== 0) {
    res += str_2;
  }
  if (resBizs.size !== 0) {
    res += str_3;
  }

  return res;
}

function getScenesAndExtensionName(word) {
  const paths = word.trim().split("/");

  // 初始化
  let scenesStart = 0;
  let scenesEnd = 0;

  // common
  if (paths.some((item) => item === "common")) {
    scenesStart = paths.findIndex((item) => {
      return item === "extensions";
    });
    scenesEnd = scenesStart + 2;
  } else {
    scenesStart = paths.findIndex((item) => {
      return item === "pages" || item === "packages";
    });
    scenesEnd = paths.findIndex((item) => {
      return item === "biz.config.js" || item === "extensions";
    });
  }

  // 取出场景名称
  let scenesName = "";
  for (let i = scenesStart + 1; i < scenesEnd; i++) {
    scenesName += paths[i] + "-";
  }
  scenesName = scenesName.substring(0, scenesName.length - 1);

  // 取出extension的名称
  let extensionName = null;
  let bizName = null;

  if (paths.some((item) => item === "biz.config.js")) {
    // biz
    bizName = scenesName + " -> " + paths[scenesEnd];
  } else {
    // extensions
    // other
    extensionName = scenesName + "-" + paths[scenesEnd + 1];

    // common
    if (paths.some((item) => item === "common")) {
      extensionName = scenesName + "-" + paths[scenesEnd];
    }
  }

  // 重要 biz被修改
  return {
    scenesName,
    extensionName,
    bizName,
  };
}

module.exports = out;
