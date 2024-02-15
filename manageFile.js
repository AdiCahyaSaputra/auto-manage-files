const config = require("./config.json");
const { existsSync, mkdirSync } = require("fs");
const fs = require("fs/promises");

const splitChar = "\\"; // windows using backslash

// Get input
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`Manage Folder Path : `, (pathDir) => {
  // Just Start The System
  startManage(pathDir);

  readline.close();
});

// get list of file and folder in ('path') directory
async function getFilesInDir(pathDir) {
  return await fs.readdir(pathDir);
}

function startManage(pathDir) {
  let pathDirSplit = pathDir.split(splitChar);
  pathDirSplit = pathDirSplit[pathDirSplit.length - 1];

  // Promises
  getFilesInDir(pathDir).then((files) => {
    // sorting rule
    let category = config;

    // loop all rules
    for (const [key, value] of Object.entries(category)) {
      // loop all files
      for (let i in files) {
        // sort
        if (sortFiles(value, files[i])) {
          // move a files
          const path = `${pathDir}${splitChar}${key}-${pathDirSplit}`;
          moveFile(pathDir, path, files[i]);
          console.log(`${key} Files Success To Move!`);
        }
      }
    }
  });
}

// sort file
function sortFiles(arr, file) {
  const sortRules = arr;
  for (let i in sortRules) {
    if (file.split(".").pop() == sortRules[i]) {
      return true;
    }
  }
}

// move file
function moveFile(pathDir, path, file) {
  // check existing dir
  // if not exist
  if (existsSync(path) == false) {
    mkdirSync(path);
  }

  // if exist
  return fs.rename(
    `${pathDir}${splitChar}${file}`,
    `${path}${splitChar}${file}`,
    function (err) {
      if (err) throw err;
      return "Move file Success!";
    },
  );
}
