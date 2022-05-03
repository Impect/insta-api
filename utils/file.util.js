
const fs = require('fs');
const path = require('path');


function getfiledata(filename){
    let textdata = fs.readFileSync(path.resolve("./" + `public/html/${filename}`), 'utf8');
    return textdata;
}



function getFractalAscii(){
    let textdata = fs.readFileSync(path.resolve("./" + `utils/fractal.txt`), 'utf8');
    return textdata;
}

function getFileSize(filepath) {
    return new Promise(function(resolve, reject) {
        try{
            var stats = fs.statSync(path.resolve("./" + 'public' + filepath))
            var fileSizeInBytes = stats.size;
            resolve(fileSizeInBytes);
        }catch(error){
            resolve(0)
        }

    })
}

module.exports.getfiledata = getfiledata;
module.exports.getFileSize = getFileSize;
module.exports.getFractalAscii = getFractalAscii;


