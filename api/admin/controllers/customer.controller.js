const restutil = require('../../../utils/response.util');
const db = require('../../../configs/db.config');
var randomstring = require("randomstring");
var passwordHash = require('password-hash');
const { body, validationResult, check } = require('express-validator');
// const mailutil = require('../../../utils/mail.util');
const jwtutil = require('../../../utils/jwt.util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { app } = require('firebase-admin');
const encyptionutil = require('../../../utils/encryption.util');
const encryptionkey = require('../../../configs/env/secret.env');
const imageutil = require('../../../utils/image.util');

exports.register = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }

        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let hashedpass = await bcrypt.hash(password,saltRounds);
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
                    password: hashedpass,
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        
        //Validation
        let email = req.body.email;;
        let password = req.body.password;


        db.customer.findOne({
            where: {
                email: email
            },
            raw : true,
            attributes: ["id","email","username","profileImage","password"],
        })
        .then((data) => {
            if(data != null){
                
                if(bcrypt.compareSync(password, data.password)){
                    let u_data = 
                    encyptionutil.encrypt(JSON.stringify(
                        {
                            email : data.email,
                            id : data.id,
                            type : "Customer"
                        }
                    ));
                    let token = jwt.sign({data : u_data}, encryptionkey.tokenkey, /*{ expiresIn : "168h"}*/);
                   delete  data['password'];
                   
                    restutil.returnDataResponce(res, {userinfo : data, token : encyptionutil.encrypt(token)});
                }else{
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


/*
* profile aas nuuts ug solih
*/ 

exports.changepassword = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let id = jwtutil.userTokenData(req, 'id');
        let oldpassword = req.body.oldpassword;
        let password = req.body.password;
        let newhashedpass = await bcrypt.hash(password,saltRounds);

        db.customer.findOne({
            where: { id : id}
        }).then((data) => {
            if(data == null){
            }
            if( data.password !=null){
                if(bcrypt.compareSync(oldpassword, data.password)){

                    db.customer.update({
                        password : newhashedpass
                    },{
                        where : { id : id }
                    })
                    restutil.returnActionSuccesResponse(res);
                }else{
                    restutil.returnValidationResponse(res, "Хуучин нууц үг таарахгүй байна.");
                }
            }else{
                restutil.returnValidationResponse(res, "Нууц үгээ оруулна уу.");
            }
        })
    }
    catch (error) {
        next(error);
    }
}

exports.customerinfo = async( req, res, next) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        
        let lastname = req.body.lastname;
        let firstname = req.body.firstname;
        let phonenumber = req.body.phonenumber;
        //let birth = req.body.birth;

        db.customer.update(
        {   lastname : lastname,
            firstname : firstname,
            phonenumber : phonenumber,
            // birth : birth,
        },
        { where :{
                username : username
            }
        }).then(() =>{   
            imageutil.imageupload(req,'/assets/profileimages/').then(imageaddress =>{
                if(imageaddress == ''){
                    restutil.returnValidationResponse(res, 'Зургыг заавал хавсаргах шаардлагатай')
                }else{
                    db.customer.update({
                        profileImage : imageaddress,}, {
                        where : {
                            id : id
                        }
                    }).then(() => {
                        restutil.returnActionSuccesResponse(res)
                    })
                }
            })  })
        
    } catch (error) {
        next(error)
    }
}

exports.validate = (method) => {
    switch (method) {
        case 'register': {
            return [
                body('username','Нэр талбар дээр хоосон утга зөвшөөрөхгүй').notEmpty(),
                body('email','Майл хаягаа оруулна уу').notEmpty(),
                body('email','Майл хаяг оруулна уу.').isEmail(),
                body('password', 'Нууц үгээ оруулна уу.').notEmpty(),
                body('password', ' Нууц үг дор хаяж 6 тэмдэгттэй байх ёстой.').isLength({ min: 6 }),
            ]
        }
        case 'login': {
            return [
                body('email','Майл хаягаа оруулна уу.').notEmpty(),
                body('email','Майл хаяг оруулна уу.').isEmail(),
                body('password', 'Нууц үгээ оруулна уу.').notEmpty(),
                body('password', ' Нууц үг дор хаяж 6 тэмдэгттэй байх ёстой.').isLength({ min: 6 }),
            ]
        }
        case 'changepassword': {
            return [
                body('oldpassword', 'Нууц үгээ оруулна уу.').notEmpty(),
                body('oldpassword','Нууц үг дор хаяж 6 тэмдэгттэй байх ёстой.').isEmail({ min:6 }),
                body('password', 'Нууц үгээ оруулна уу.').notEmpty(),
                body('password','Нууц үг дор хаяж 6 тэмдэгттэй байх ёстой.').isEmail({ min:6 }),                
            ]
        }
        case  'customerinfo': {
            return [
                body('lastname','Овогоо оруулна уу.').notEmpty(),
                body('firstname','Нэрээ оруулна уу.').notEmpty(),
                body('phonenumber','Зөвхөн тоон утга орно.').isNumeric(),
                body('phonenumber','Утасны дугаараа оруулна уу.').notEmpty(),
            ]
        }
    }
}