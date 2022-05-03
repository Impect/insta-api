const restutil = require('../../../utils/response.util');
const db = require('../../../configs/db.config');
var randomstring = require("randomstring");
var passwordHash = require('password-hash');
const { body, validationResult } = require('express-validator');
// const mailutil = require('../../../utils/mail.util');
const jwtutil = require('../../../utils/jwt.util');

exports.list = async(req, res, next) =>{
    try {
       db.category.findAll({
        attributes : ['id', 'name', 'createdAt'],
        order : [[ 'id', 'ASC' ]],
       }).then(results => {
           restutil.returnDataResponce(res, results);
       })
    }
    catch (error) {
        next(error);
    }
}

exports.categorycreate = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        
        let customerId = jwtutil.userTokenData(req, 'id')
        let name = req.body.name;
        db.category.create({
            name: name,
            customerId : customerId
        },{
            where : { customerId : customerId}
        }
        ).then(() => {
            restutil.returnActionSuccesResponse(res);   
        })
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }

        let id = req.body.id;
        let name = req.body.name;
        db.category.update({
            name: name,
        },{
            where: { id: id }
        }).then(() => {
            restutil.returnActionSuccesResponse(res);
        })
    }
    catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        let { id } = req.params;
        db.category.destroy({
         where : { id : id}
        }).then(() => {
            restutil.returnActionSuccesResponse(res);
        })

    }
    catch (error) {
        next(error);
    }
}

exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('name', 'Хоосон утга зөвшөөрөхгүй').notEmpty(),
            ]
        }
        case 'update': {
            return [
                body('id', 'Хоосон утга зөвшөөрөхгүй').notEmpty(),
                body('name', 'Хоосон утга зөвшөөрөхгүй').notEmpty(),
            ]
        }
    }
}