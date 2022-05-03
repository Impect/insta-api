const restutil = require('../../../utils/response.util');
const db = require('../../../configs/db.config');
var randomstring = require("randomstring");
var passwordHash = require('password-hash');
const { body, validationResult } = require('express-validator');
// const mailutil = require('../../../utils/mail.util');
const jwtutil = require('../../../utils/jwt.util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { app } = require('firebase-admin');
const encyptionutil = require('../../../utils/encryption.util');
const encryptionkey = require('../../../configs/env/secret.env');
const imageutil = require('../../../utils/image.util');

exports.create = async(req, res, next) => {
    try {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let profileImage = '/assets/profileimages/profile.png';

        db.customer.findOne({
            where : {
                email : email,
                username : username
            }
        }).then(oldcustomer => {
            if(oldcustomer != null){
                restutil.returnValidationResponse(res, 'Мэйл хаяг эсвэл хэрэглэгчийн нэр давхцаж байна. Та өөр хаягаар бүртгүүлнэ үү.')
            }else{
                db.customer.create({
                    email: email,
                    username : username,
                    password: password,
                    profileImage : profileImage
                    
                })
                .then(()=>
                {
                    restutil.returnActionSuccesResponse(res)
                }).catch(error => {
                    console.log(error);
                    next(error)
                });
            }
        })

    } catch (error) {
        next(error)
    }
}



exports.login = async (req, res, next) => {
    try {
        let email = req.body.email;

        let password = req.body.password;

        db.customer.findOne({
            where: {
                email: email,
            },
            attributes: ["id","email", "password", "username"],
        })
        .then((data) => {
            if(data != null){
                if(data.password == password){
                    //login success
                    let u_data = 
                    encyptionutil.encrypt(JSON.stringify(
                        {
                            email : data.email,
                            id : data.id,
                            type : "Customer"
                        }
                    ));
                    
                    let token = jwt.sign({data : u_data}, encryptionkey.tokenkey, /*{ expiresIn : "168h"}*/);
                    restutil.returnDataResponce(res, {userinfo : data, token : encyptionutil.encrypt(token)});
                }else{
                    //login failed
                    restutil.returnValidationResponse(res, "Нууц үг буруу байна")
                }
            }else{
                //user not found
                restutil.returnValidationResponse(res, "Хэрэглэгч олдсонгүй");
            }
           // restutil.returnDataResponce(res, data);
        }).catch(error => {
            console.log(error);
            next(error)
        });
    } catch (error) {
        next(error);
    }
};
exports.forgetpassword = async(req, res, next) =>{
    try {
        let id = jwtutil.userTokenData(req, 'id')
        let password = req.body.password;
        db.customer.findOne({
            where: {
                id : id,
            },
            attributes : ["email", "password"],
        }).then(() => 
        {
                db.customer({
                    password: password,
                })
                restutil.returnValidationResponse(res, "Нууц үг шинэчлэгдлээ")
            
        }).catch(error => {
            console.log(error);
            next(error)
        });
    } catch (error) {
        next(error);
    }
}

exports.customerinfo = async( req, res, next) =>{
    try {
        let id = jwtutil.userTokenData(req, 'id');
        let lastname = req.body.lastname;
        let firstname = req.body.firstname;
        let phonenumber = req.body.phonenumber;
        //let birth = req.body.birth;

        db.customer.update(
        {
            lastname : lastname,
            firstname : firstname,
            phonenumber : phonenumber,
            // birth : birth,
        },
        {
            where :
            {
                id : id
            }
        }).then(() =>{
            
            imageutil.imageupload(req,'/assets/profileimages/').then(imageaddress =>{
                if(imageaddress == ''){
                    restutil.returnValidationResponse(res, 'Зургыг заавал хавсаргах шаардлагатай')
                }else{

                    db.customer.update({
                        profileImage : imageaddress,
                    }, {
                        where : {
                            id : id
                        }
                    }).then(() => {
                        restutil.returnActionSuccesResponse(res)
                    })
                }
            })
                
            })
        
    } catch (error) {
        next(error)
    }
}