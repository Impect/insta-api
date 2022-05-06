const restutil = require('../../../utils/response.util');
const fileutil = require('../../../utils/file.util');
const fs = require("fs");
const db = require('../../../configs/db.config');
var randomstring = require("randomstring");
var passwordHash = require('password-hash');
const { body, validationResult, Result } = require('express-validator');
// const mailutil = require('../../../utils/mail.util');
const jwtutil = require('../../../utils/jwt.util');
const imageutil = require('../../../utils/image.util');

exports.like = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let customerId = jwtutil.userTokenData(req, 'id')
        let postId = req.body.postId;
        
        db.post_like.create({
            postId : postId,
            customerId : customerId
        }).then(()=>{
            db.post_like.findAll({
                where: {
                    postId : postId
                },
                attributes: ['CustomerId']
                
            })
            restutil.returnActionSuccesResponse(res);
        })
    } catch (error) {
        next(error);
    }
}
exports.likelist = async(req , res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        db.post_like.findAll({
            attributes : ['id','postId','customerId']
        }).then(data => {
            restutil.returnDataResponce(res, data);
        })
    } catch (error) { 
        next(error)
    }
}
exports.unlike = async (req, res, next) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let { id } = req.params;
        db.post_like.destroy({
            where : { id : id }
        }).then(() => {
            db.post_like.findAll({
                where: {
                    id : id
                },
                attributes: ['CustomerId']
                
            })
            restutil.returnActionSuccesResponse(res);
        })
    } catch (error) {
        next(error)
    }
}