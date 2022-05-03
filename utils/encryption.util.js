const crypto = require('crypto');
var randomstring = require("randomstring");
var secretkey = require('../configs/env/secret.env');
var fs = require('fs');
var path = require('path');
const algorithm = 'aes-256-cbc';
const digest = 'sha256';
const salt = "eM.':Sm~yt[ALUd=b\ZtSpN2:L*tjn?L";

function encrypt(plainText) {
    const key = crypto.pbkdf2Sync( secretkey.encryptionkey, salt, 65536, 32, digest);
    const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'base64')
    encrypted += cipher.final('base64');
    return encrypted;
};

function decrypt(strToDecrypt) {
    const key = crypto.pbkdf2Sync(secretkey.encryptionkey, salt, 65536, 32, digest);
    const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(strToDecrypt, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
module.exports.parseJwt = parseJwt;