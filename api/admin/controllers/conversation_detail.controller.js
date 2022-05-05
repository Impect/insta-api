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
const { text } = require('express');

exports.textconversation = async(req, res, next) =>{
    try {
        let customerId = jwtutil.userTokenData(req, 'id');
        let text = req.body.text;
        let conversationId = req.body.conversationId;

        db.conversation_detail.create({
            text : text,
            customerId : customerId,
            conversationId : conversationId
        },{
            where : {
                customerId : customerId,
            }
        }
        ).then(()=>{
            db.conversation_detail.findAll({
                where :  {
                    conversationId : conversationId,
                    customerId : customerId
                },
                include : [{
                    model : db.customer,
                    attributes : ['username','profileImage']
                }]
            }).then(customerinfo=>  {
                restutil.returnDataResponce(res, customerinfo)
                
            })
        })

    } catch (error) {
        next(error)
    }
}
exports.textdeleteconversation = async(req, res, next) =>{
    try {
        let customerId = jwtutil.userTokenData(req, 'id');
        let id = req.body.id;
        let conversationId = req.body.conversationId;
        db.conversation_detail.destroy({
            where : { id : id, conversationId : conversationId  , customerId :customerId}
        }).then(()=>{
            db.conversation_detail.findAll({
                where :  {
                    conversationId : conversationId,
                    customerId : customerId
                },
                include : [{
                    model : db.customer,
                    attributes : ['username','profileImage']
                }]
            }).then(customerinfo=>  {
                restutil.returnDataResponce(res, customerinfo)
                
            })
        })
    } catch (error) {
        next(error)
    }
}