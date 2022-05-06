const restutil = require('../../../utils/response.util');
const db = require('../../../configs/db.config');
var randomstring = require("randomstring");
var passwordHash = require('password-hash');
const { body, validationResult, check } = require('express-validator');
// const mailutil = require('../../../utils/mail.util');
const jwtutil = require('../../../utils/jwt.util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { app } = require('firebase-admin');
const encyptionutil = require('../../../utils/encryption.util');
const encryptionkey = require('../../../configs/env/secret.env');
const imageutil = require('../../../utils/image.util');

exports.customerprofileinfo = async( req, res, next) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        
        let username = req.body.username;
        
        db.customer.findOne({ 
            where :{
                username : username
            }, attributes: ["firstname","lastname","email","username","profileImage"], 
                include: [{
                model: db.post,
                attributes : ['id', 'title','descr','qty','price','order','createdAt','updatedAt'],
                include: [{
                    model : db.post_images,
                    attributes : ['image'],
                },{
                    model: db.post_like,
                    attributes: ['id', 'customerId']
                },{
                    model: db.post_comment,
                    attributes : ['id', 'text','customerId','createdAt','updatedAt']
                }],

            }]
        }).then((data) =>{
                        restutil.returnDataResponce(res, data)
                    })
    } catch (error) {
        next(error)
    }
}
