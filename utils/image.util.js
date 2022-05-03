const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

function imageupload(req, filepath) {
    if (!fs.existsSync(path.resolve("./" + 'public' + filepath))){
        fs.mkdirSync(path.resolve("./" + 'public' + filepath));
    }
    return new Promise(function(resolve, reject) {

        if(req.files === null){
            resolve('');
        }
        if(req.files == undefined){
            resolve('');
        }
        if (req.files || Object.keys(req.files).length > 0) {
            let  file = req.files.image;
           // filename = `${uuidv1()}.${req.file.image.name.split('.')[1]}`;
           filename = `${uuidv4()}.${getExtension(file.name)}`;
            file.mv(path.resolve("./" + 'public' + filepath + filename), function(err) {
                if (err){
                    console.log(err);
                }
                resolve(filepath + filename);
            })
        }
        else{
            resolve('')
        }
    })
}


function fileupload(req, filepath) {
    if (!fs.existsSync(path.resolve("./" + 'public' + filepath))){
        fs.mkdirSync(path.resolve("./" + 'public' + filepath));
    }
    return new Promise(function(resolve, reject) {
        if(req.files === null){
            resolve('');
        }
        if(req.files == undefined){
            resolve('');
        }
        if (req.files || Object.keys(req.files).length > 0) {
            let  file = req.files.file;
            filename = `${uuidv4()}.${getExtension(file.name)}`;
            file.mv(path.resolve("./" + 'public' + filepath + filename), function(err) {
                if (err){
                    console.log(err);
                }
                resolve(filepath + filename);
            })
        }
        else{
            resolve('')
        }
    })
}


function pdfFileUpload(req, filepath) {
    if (!fs.existsSync(path.resolve("./" + 'public' + filepath))){
        fs.mkdirSync(path.resolve("./" + 'public' + filepath));
    }
    return new Promise(function(resolve, reject) {
        if(req.files === null){
            resolve('');
        }
        if(req.files == undefined){
            resolve('');
        }
        if (req.files || Object.keys(req.files).length > 0) {
            let  file = req.files.file;
            filename = `${uuidv4()}.${getExtension(file.name)}`;
            file.mv(path.resolve("./" + 'public' + filepath + filename), function(err) {
                if (err){
                    console.log(err);
                }
                resolve(filepath + filename);
            })
        }
        else{
            resolve('')
        }
    })
}


function getExtension(fileaddres){
    if(fileaddres == null){
        return '';
    }else{
        return fileaddres.split('.').pop();
    }
    
}

function multiimageupload(req, filepath) {
    if (!fs.existsSync(path.resolve("./" + 'public' + filepath))){
        fs.mkdirSync(path.resolve("./" + 'public' + filepath));
    }
    return new Promise(function (resolve, reject) {
        if (req.files === null) {
            resolve('');
        }
        if (req.files || Object.keys(req.files).length > 0) {
            let urls = [];
            var file;
            var promises = [];
            for (var key in req.files) {
                file = req.files[key];
                filename = `${uuidv4()}.png`;
                console.log(filename);
                promises.push(
                    singleimageupload(file, filepath + filename).then(result => {
                        urls.push(result);
                    })
                    .catch(err => {

                    })
                )
            }
            Promise.all(promises).then(() => 
                resolve(urls)
            );
        }
        else {
            resolve('')
        }
    })
}

function multifileupload(req, filepath) {
    if (!fs.existsSync(path.resolve("./" + 'public' + filepath))){
        fs.mkdirSync(path.resolve("./" + 'public' + filepath));
    }
    return new Promise(function (resolve, reject) {
        if (req.files === null) {
            resolve('');
        }
        if (req.files || Object.keys(req.files).length > 0) {
            let urls = [];
            var file;
            var promises = [];
            for (var key in req.files) {
                file = req.files[key];
                filename = `${uuidv4()}.${getExtension(file.name)}`;
                console.log(file.name);
                promises.push(
                    singleimageupload(file, filepath + filename).then(result => {
                        urls.push(result);
                    })
                    .catch(err => {

                    })
                )
            }
            Promise.all(promises).then(() => 
                resolve(urls)
            );
        }
        else {
            resolve('')
        }
    })
}



function singleimageupload(file, filepath){
    return new Promise(function(resolve, reject) {
        file.mv(path.resolve("./" + 'public' + filepath), function(err) {
            if (err){
                console.log(err);
                reject(err);
            }
            resolve(filepath)
        })
    })
}


function pdfThumbnailImage() {
    return new Promise(function(resolve, reject) {
        
    })
}



exports.imageupload = imageupload;
exports.fileupload = fileupload;
exports.multiimageupload = multiimageupload;
exports.multifileupload = multifileupload;
exports.pdfFileUpload = pdfFileUpload;



