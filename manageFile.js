const {
  existsSync,
  mkdirSync
} = require('fs');
const fs = require('fs/promises');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(`Manage Folder Path : `, path => {
  // select pathDir (src path)
  const pathDir = path;
  
  // Just Start The System
  startManage(pathDir);
  
  readline.close();
});

// get list of file and folder in ('path') directory
async function getFilesInDir(pathDir) {
  return await fs.readdir(pathDir);
}

function startManage(pathDir) {
  let pathDirSplit = pathDir.split("/");
  pathDirSplit = pathDirSplit[pathDirSplit.length -1];
  
  // Promises
  getFilesInDir(pathDir).then(files => {
    // category-ing categories of files
    let category = {
      documents: [],
      images: [],
      videos: [],
      designs: [],
      softwares: [],
      fonts: [],
      web: [],
    };

    // loop every files in directory (pathDir)
    for (let i in files) {
      // check every files & push the file to spesific category
      if (isDocument(files[i])) {
        category.documents.push(files[i]);
      } else if (isImage(files[i])) {
        category.images.push(files[i]);
      } else if (isVideo(files[i])) {
        category.videos.push(files[i]);
      } else if (isDesign(files[i])) {
        category.designs.push(files[i]);
      } else if (isSoftware(files[i])) {
        category.softwares.push(files[i]);
      } else if (isFont(files[i])) {
        category.fonts.push(files[i]);
      } else if (isWeb(files[i])) {
        category.web.push(files[i]);
      }
    }

    // return category which is already filled with files
    return category;

  }).then(category => {
    // move into spesific folder
    // moveFile(srcPath ,path, file) path to destination and file is the file in the spesific category

    // images
    for (let i in category.images) {
      moveFile(pathDir, `${pathDir}/img-${pathDirSplit}`, category.images[i]);
      console.log('Images File Succesed to move!');
    }

    // documents
    for (let i in category.documents) {
      moveFile(pathDir, `${pathDir}/document-${pathDirSplit}`, category.documents[i]);
      console.log('Documents File Successed to move!');
    }

    // video
    for (let i in category.videos) {
      moveFile(pathDir, `${pathDir}/video-${pathDirSplit}`, category.videos[i]);
      console.log('Video File Successed to move!');
    }

    // design
    for (let i in category.designs) {
      moveFile(pathDir, `${pathDir}/design-${pathDirSplit}`, category.designs[i]);
      console.log('Design File Successed to move!');
    }

    // software
    for (let i in category.softwares) {
      moveFile(pathDir, `${pathDir}/software-${pathDirSplit}`, category.softwares[i]);
      console.log('Software File Successed to move!');
    }

    // font
    for (let i in category.fonts) {
      moveFile(pathDir, `${pathDir}/font-${pathDirSplit}`, category.fonts[i]);
      console.log('Font File Successed to move!');
    }

    // etc
    for (let i in category.web) {
      moveFile(pathDir, `${pathDir}/web-${pathDirSplit}`, category.web[i]);
      console.log('Web File Successed to move!');
    }
  });
}

// check is document or not
function isDocument(file) {
  let docVerif = ["docx", "doc", "pptx", "ppt", "pdf", "xlsx", "zip", "7z", "rar"];
  for (let i in docVerif) {
    if (file.split('.').pop() == docVerif[i]) {
      return true;
    }
  }
}

// check is image or not
function isImage(file) {
  let imgVerif = ["jpg",
    "jpeg",
    "png",
    "svg"];

  for (let i in imgVerif) {
    if (file.split(".").pop() == imgVerif[i]) {
      return true;
    }
  }
}

// check is design or not
function isDesign(file) {
  let desVerif = ["xd",
    "fprg",
    "psd"];
  for (let i in desVerif) {
    if (file.split(".").pop() == desVerif[i]) {
      return true;
    }
  }
}

// check is web or not
function isWeb(file) {
  let webVerif = ["html",
    "css",
    "js"];
  for (let i in webVerif) {
    if (file.split(".").pop() == webVerif[i]) {
      return true;
    }
  }

}

// check is software or not
function isSoftware(file) {
  let sofVerif = ["exe",
    "cso",
    "iso",
    "msi",
    "apk"];
  for (let i in sofVerif) {
    if (file.split(".").pop() == sofVerif[i]) {
      return true;
    }
  }
}

// check is video or not
function isVideo(file) {
  let vidVerif = ["mp4",
    "3gp"];
  for (let i in vidVerif) {
    if (file.split(".").pop() == vidVerif[i]) {
      return true;
    }
  }

}

// check is video or not
function isFont(file) {
  let fntVerif = ["ttf",
    "otf"];
  for (let i in fntVerif) {
    if (file.split(".").pop() == fntVerif[i]) {
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
  return fs.rename(`${pathDir}/${file}`, `${path}/${file}`, function (err) {
    if (err) throw err;
    return 'Move file Success!';
  });
}