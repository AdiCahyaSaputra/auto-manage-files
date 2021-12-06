const { existsSync, mkdirSync } = require('fs');
const fs = require('fs/promises');
// select pathDir (src path)
const pathDir = '../../Downloads';


// get list of file and folder in ('path') directory
async function getFilesInDir() {
    return await fs.readdir(pathDir);
}

// fking promises 
getFilesInDir().then(files => {
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
    // moveFile(path, file) path to destination and file is the file in the spesific category

    // images
    for (let i in category.images) {
        moveFile(`${pathDir}/img`, category.images[i]);
        console.log('Images File Succesed to move!');
    }

    // documents
    for (let i in category.documents) {
        moveFile(`${pathDir}/document`, category.documents[i]);
        console.log('Documents File Successed to move!');
    }

    // video
    for (let i in category.videos) {
        moveFile(`${pathDir}/video`, category.videos[i]);
        console.log('Video File Successed to move!');
    }

    // design
    for (let i in category.designs) {
        moveFile(`${pathDir}/design`, category.designs[i]);
        console.log('Design File Successed to move!');
    }

    // software
    for (let i in category.softwares) {
        moveFile(`${pathDir}/software`, category.softwares[i]);
        console.log('Software File Successed to move!');
    }

    // font
    for (let i in category.fonts) {
        moveFile(`${pathDir}/font`, category.fonts[i]);
        console.log('Font File Successed to move!');
    }

    // etc
    for (let i in category.web) {
        moveFile(`${pathDir}/web`, category.web[i]);
        console.log('Web File Successed to move!');
    }
})

// check is document or not
function isDocument(file) {
    if (file.split('.').pop() === 'docx'
        || file.split('.').pop() === 'doc'
        || file.split('.').pop() === 'pptx'
        || file.split('.').pop() === 'ppt'
        || file.split('.').pop() === 'pdf'
        || file.split('.').pop() === 'xlsx'
        || file.split('.').pop() === 'zip'
        || file.split('.').pop() === '7z'
        || file.split('.').pop() === 'rar') {
        return true;
    }
}

// check is image or not
function isImage(file) {
    if (file.split('.').pop() === 'jpg'
        || file.split('.').pop() === 'jpeg'
        || file.split('.').pop() === 'png'
        || file.split('.').pop() === 'svg') {
        return true;
    }
}

// check is design or not
function isDesign(file) {
    if (file.split('.').pop() === 'xd'
        || file.split('.').pop() === 'fprg'
        || file.split('.').pop() === 'psd') {
        return true;
    }
}

// check is web or not
function isWeb(file) {
    if (file.split('.').pop() === 'html'
        || file.split('.').pop() === 'css'
        || file.split('.').pop() === 'sql'
        || file.split('.').pop() === 'js') {
        return true;
    }
}

// check is software or not
function isSoftware(file) {
    if (file.split('.').pop() === 'exe'
        || file.split('.').pop() === 'cso'
        || file.split('.').pop() === 'iso'
        || file.split('.').pop() === 'msi') {
        return true;
    }
}

// check is video or not
function isVideo(file) {
    if (file.split('.').pop() === 'mp4'
        || file.split('.').pop() === '3gp') {
        return true;
    }
}

// check is video or not
function isFont(file) {
    if (file.split('.').pop() === 'ttf'
        || file.split('.').pop() === 'otf') {
        return true;
    }
}

// move file
function moveFile(path, file) {
    // check existing dir
    // if not exist
    if (existsSync(path) == false) {
        mkdirSync(path);
    }

    // if exist
    return fs.rename(`${pathDir}/${file}`, `${path}/${file}`, function (err) {
        if (err) throw err;
        return 'Move file Success!';
    })
};

