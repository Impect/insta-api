const jwt = require("jsonwebtoken");
const secretkey = require('../configs/env/secret.env');
const crypt = require('./encryption.util');
const restutil = require('./response.util');
const db = require("../configs/db.config.js");


function userTokenData(req, userproperty) {
    try{
        var token = jwt.decode(req.token, secretkey.tokenkey);
        let tokendata = token.data;
        let tokendatajson = JSON.parse(crypt.decrypt(tokendata));
    
        if (userproperty == 'id') {
            return tokendatajson.id;
        }
        if (userproperty == 'email') {
            return tokendatajson.email;
        }
        if (userproperty == 'type') {
            return tokendatajson.type;
        }
    }catch(error){
        console.log(error);
        return 0;
    }
}






function verifyAdmin(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader != 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = crypt.decrypt(bearerToken);
            jwt.verify(req.token, secretkey.tokenkey, (err) => {
                if (err) {
                    restutil.returnUnAuthorizeResponse(res);
                }
                if (userTokenData(req, "type") == "Administrator")
                    checkSystemUserstatus(req).then(results => {
                        if (results) {
                            next();
                        } else {
                            restutil.returnForbiddenResponse(res);
                        }
                    })
                else {
                    restutil.returnForbiddenResponse(res);
                }
            });
        } else {
            restutil.returnForbiddenResponse(res);
        }

    } catch (error) {
        restutil.returnUnAuthorizeResponse(res);
    }
}


function verifyCustomer(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader != 'undefined') {
            const bearer = bearerHeader.split(' ');
            console.log(JSON.stringify(bearer));
            const bearerToken = bearer[1];
            req.token = crypt.decrypt(bearerToken);


            console.log(bearerToken);
            jwt.verify(req.token, secretkey.tokenkey, (err) => {
                if (userTokenData(req, "type") == "Customer")
                            next();
                
                else {
                    restutil.returnForbiddenResponse(res);
                }
            });
        } else {
            restutil.returnForbiddenResponse(res);
        }

    } catch (error) {
        restutil.re
        console.log(error);
        restutil.returnUnAuthorizeResponse(res);
    }
}



function verify(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader != 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = crypt.decrypt(bearerToken);
            jwt.verify(req.token, secretkey.tokenkey, (err) => {
                if (err) {
                    restutil.returnUnAuthorizeResponse(res);
                }
                next();
            });
        } else {
            restutil.returnForbiddenResponse(res);
        }
    } catch (error) {
        console.log(error)
        restutil.returnUnAuthorizeResponse(res);
    }
}


function checkSystemUserstatus(req) {
    return new Promise(function (resolve, reject) {
        try {
            let userid = userTokenData(req, "id");
            db.systemuser.findOne({
                where: { id: userid, status: 1 }
            }).then(currentuser => {
                if (currentuser != null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        } catch (error) {
            console.log(error);
            resolve(false);
        }

    })
}


module.exports.userTokenData = userTokenData;
module.exports.verifyAdmin = verifyAdmin;
module.exports.verifyCustomer = verifyCustomer;
module.exports.verify = verify;


