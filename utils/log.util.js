
var fs = require('fs')
var path = require('path');
const notifier = require('node-notifier');

function todayString() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    return year + "-" + month + "-" + date;

}

function logdata(date) {
    try{
    let log = fs.readFileSync(path.resolve("./" + `/public/errors/${date}_log.log`), 'utf8');
        return log;
    }
    catch(err){
    console.log(err);
        return err;
    }

}

function writeLog(txt) {
    try{
        fs.appendFileSync(`./public/errors/${todayString()}.txt`, txt + '\r\n', function(err, data){
            console.log("Successfully Written to File. ");
        });
    }catch(error){
        fs.writeFile(`./public/errors/${todayString()}.txt`,txt, function (err) {
            console.log('File is created successfully.');
          });
    }
    notifier.notify({
        icon : JSON.parse(txt).status == 500 ? path.join(__dirname, "../public/images/status_code_500.png") :  path.join(__dirname, "../public/images/status_code_400.png"),
        title : JSON.parse(txt).status == 500 ? 'Алдаа' : 'Route олдсонгүй',
        message :JSON.parse(txt).error
    });
}

module.exports.todayString = todayString;
module.exports.logdata = logdata;
module.exports.writeLog = writeLog;
