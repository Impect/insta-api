const restutil = require('../../../utils/response.util');
const db = require('../../../configs/db.config');
var randomstring = require("randomstring");
var passwordHash = require('password-hash');
const { body, validationResult } = require('express-validator');
// const mailutil = require('../../../utils/mail.util');
const jwtutil = require('../../../utils/jwt.util');

exports.list = async(req, res, next) => {
    try {
        db.testtable.findAll({
            attributes : ['id', 'name', 'value']
        }).then(data => {
            restutil.returnDataResponce(res, data);
        })

    } catch (error) {
        next(error)
    }
}


exports.create = async(req, res, next) => {
    try {
        let name = req.body.name;
        let value = req.body.value;
        db.testtable.create({
            name: name,
            value: value,
        }).then(()=>
        {
            restutil.returnActionSuccesResponse(res);
        }
        )
    } catch (error) {
        next(error);
    }
}


exports.update = async(req, res, next) => {
    try {
        let id = req.body.id;
        let name = req.body.name;
        db.testtable.update({
            name: name,
        },{
            where: { id: id }
        }).then(() => {
            restutil.returnActionSuccesResponse(res);
        })
        
    } catch (error) {
        console.log(error);
        next(error)        
    }
}

exports.delete = async(req, res, next) => {

    try {
        let { id } = req.params;
        db.testtable.destroy({
         where : { id : id}
        }).then(() => {
            restutil.returnActionSuccesResponse(res);
        })
    } catch (error) {
        next(error);
    }
}
