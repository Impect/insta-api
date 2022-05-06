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

exports.comment = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let customerId = jwtutil.userTokenData(req, 'id');
        let text = req.body.text;
        let postId = req.body.postId;
        
        db.post_comment.create({
            text: text,
            postId : postId,
            customerId : customerId,
            
        }).then(()=>{

            db.post_comment.findAll({
                where :  {
                    postId : postId
                },
                include : [{
                    model : db.customer,
                    attributes : ['lastname','firstname','username','email','phonenumber','gender','birth','profileImage',]
                }]
            }).then(comments=>  {
                restutil.returnDataResponce(res, comments)
                
            })
        })
    } catch (error) {
        next(error);
    }
}
exports.commentlist = async(req , res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        db.post_comment.findAll({
            attributes : ['text','postId','customerId'],
        }).then(data => {
            restutil.returnDataResponce(res, data);
        })
    } catch (error) { 
        next(error)
    }
}



exports.commentupdate = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let id = req.body.id;
        let text = req.body.text;
        db.testtable.update({
            text: text,
            },{
                where: { id: id }
            }
        ).then(() => {
            db.post_comment.findAll({
                where :  {
                    postId : postId
                },
                include : [{
                    model : db.customer,
                    attributes : ['lastname','firstname','username','email','phonenumber','gender','birth','profileimage',]
                }]
            })
            restutil.returnActionSuccesResponse(res);
        })
        
    } catch (error) {
        console.log(error);
        next(error)        
    }
}

exports.commentdelete = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let { id } = req.params;
        db.post_comment.destroy({
         where : { id : id }
        }).then(() => {
            db.post_comment.findAll({
                where :  {
                    postId : postId
                },
                include : [{
                    model : db.customer,
                    attributes : ['lastname','firstname','username','email','phonenumber','gender','birth','profileimage',]
                }]
            })
            restutil.returnActionSuccesResponse(res);
        })

    }
    catch (error) {
        next(error);
    }
}

//comment delete