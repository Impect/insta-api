const restutil = require('../../../utils/response.util');
const db = require('../../../configs/db.config');
var randomstring = require("randomstring");
var passwordHash = require('password-hash');
const { body, validationResult } = require('express-validator');
// const mailutil = require('../../../utils/mail.util');
const jwtutil = require('../../../utils/jwt.util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const encyptionutil = require('../../../utils/encryption.util');
const encryptionkey = require('../../../configs/env/secret.env');
const imageutil = require('../../../utils/image.util');

exports.follow = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        
        let followerId = req.body.customerId;
        let customerId = jwtutil.userTokenData(req, 'id'); 
        db.customer_follow.create({
            followerId : followerId,
            customerId : customerId
        }
        ).then(() => {
            restutil.returnActionSuccesResponse(res);   
        })
    }
    catch (error) {
        next(error);
    }
}

exports.myfollowerlist = async(req, res, next) =>{
    try {
        let customerId = jwtutil.userTokenData(req, 'id');
        db.customer_follow.findAll({
        attributes : ['id','followerId','customerId'],
        where : { customerId : customerId},
       }).then(results => {
           restutil.returnDataResponce(res, results);
       })
    }
    catch (error) {
        next(error);
    }
}

exports.customerfollowerlist = async(req, res, next) =>{
    try {
        let customerId = req.body.customerId;
        db.customer_follow.findAll({
        attributes : ['id','followerId','customerId'],
        where : { customerId : customerId},
       }).then(results => {
           restutil.returnDataResponce(res, results);
       })
    }
    catch (error) {
        next(error);
    }
}

exports.unfollow = async (req, res, next) =>{
    try {
        
        let followerId = req.body.followerId;
        let customerId = jwtutil.userTokenData(req, 'id'); 
        db.customer_follow.destroy({
         where : { followerId : followerId, customerId : customerId}
        }).then(() => {
            restutil.returnActionSuccesResponse(res);
        })

    } catch (error) {
        next(error)
    }
}