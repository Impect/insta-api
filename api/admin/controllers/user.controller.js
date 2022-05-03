const restutil = require('../../../utils/response.util');
const db = require('../../../configs/db.config');
var randomstring = require("randomstring");
var passwordHash = require('password-hash');
const { body, validationResult } = require('express-validator');
// const mailutil = require('../../../utils/mail.util');
const jwtutil = require('../../../utils/jwt.util');

exports.register = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        
        let mail = req.body.mail;
        db.user.create({
            mail: mail,
            password: password
        }).then(() => {
            restutil.returnActionSuccesResponse(res);   
        })

    } catch (error) {
        
        next(error)
    }
}
exports.list = async(req, res, next) => {
    try {
        db.testtable.findAll({
            attributes : ['id', 'mail', 'password']
        }).then(data => {
            restutil.returnDataResponce(res, data);
        })

    } catch (error) {
        next(error)
    }
}

