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



// post create
exports.createpost = async(req, res, next) => {
    try {
        let customerid = jwtutil.userTokenData(req, 'id');
        let title = req.body.title;
        let descr = req.body.descr;
        let qty = req.body.qty;
        let price = req.body.price;
        let order = req.body.order;
        
        
        db.post.create({
            title : title,
            descr : descr,
            qty : qty,
            price : price,
            order : order,
            customerId: customerid,
        }).then(newPost => {
            imageutil.multiimageupload(req,'/assets/images').then(imageaddress =>{
                if(imageaddress == ''){
                    restutil.returnValidationResponse(res, 'Зургыг заавал хавсаргах шаардлагатай')
                }else{
                    imageaddress.forEach(async element => {
                        await db.post_images.create({
                            image : element,
                            postId : newPost.id
                        })
                   });
                    restutil.returnActionSuccesResponse(res);
                }
            })
        })
    } catch (error) {
        next(error)
    }
}

exports.updatepost = async(req,res,next) =>{
        try {
            let customerid = jwtutil.userTokenData(req, 'id');
            let title = req.body.title;
            let descr = req.body.descr;
            let qty = req.body.qty;
            let price = req.body.price;
            let order = req.body.order;
            let id = req.body.id;

            db.post.update(
                {
                    title : title,
                    descr : descr,
                    qty : qty,
                    price :price,
                    order : order,
                },
                {where : {                    
                    id: id,
                    customerid : customerid
                }}).then(()=>{
                imageutil.multiimageupload(req , '/assets/images').then(imageaddress =>{
               
                    db.post_images.destroy({
                        where : { postId : id }
                    }).then(() => {
                        imageaddress.forEach(async element => {
                            await db.post_images.create({
                                image : element,
                                postId : id
                            })
                       });
                       restutil.returnActionSuccesResponse(res);
                    })
               

                })

            })
        } catch (error) {
            next(error)
        }
}

//post listFindAll
exports.postlist = async(req, res, next) => {
        try {
            db.post.findAll({
                attributes : ['id', 'title','descr','qty','price','order'],

                include : [{
                    model: db.post_comment,
                    attributes : ['id', 'text','customerId','createdAt','updatedAt'],
                    include :  [{
                        model: db.customer,
                        attributes : ['lastname','firstname','username','profileImage']
                    }]

                },
                {
                    model: db.post_like, 
                    attributes : ['id','customerId']
                },
                {
                    model : db.post_images,
                    attributes : ['image'],
                },
                {
                    model : db.customer,
                    attributes : ['id','username','email','profileImage']
                }

            ]

            }).then(data => {
                restutil.returnDataResponce(res, data);
            })
        } catch (error) { 
            next(error)
        }
}

exports.postlistrandom = async(req, res, next) =>{
    try {
        db.post.findAll(
            {
            attributes : ['id', 'title','descr','qty','price','order'],
                
            
            include : [{
                model: db.post_comment,
                attributes : ['id', 'text','customerId',]
            },
            {
                model: db.post_like, 
                attributes : ['id','customerId']
            },
            {
                model : db.post_images,
                attributes : ['image'],
            },
            {
                model : db.customer,
                attributes : ['username','email']
            },
            

        ] ,
        order : db.Sequelize.literal('RAND()'),
        limit : 10
    },
        
        
        ).then(data => {
            restutil.returnDataResponce(res, data);
        })

    } catch (error) {
        next(error)
    }
}

exports.postlisttoken = async(req, res, next) =>{
    try {
        let customerid = jwtutil.userTokenData(req, 'id');
        db.post.findAll(
            {
            attributes : ['id', 'title','descr','qty','price','order'],
            
            include : [{
                model: db.post_comment,
                attributes : ['id', 'text','customerId',]
            },
            {
                model: db.post_like, 
                attributes : ['id','customerId']
            },
            {
                model : db.post_images,
                attributes : ['image'],
            },
            {
                model : db.customer,
                attributes : ['username','email']
            }

        ]},
        {
            where: {
                customerid : customerid
            }
        }).then(data => {
            restutil.returnDataResponce(res, data);
        })

    } catch (error) {
        next(error)
    }
}



exports.uploadtestimage = async(req, res, next) => {
    try {

        let p_id = req.params.id;

        db.post.findOne(
        {where : {
            id : p_id
        }}).then(async data => {
            if(data != null){
                imageutil.multiimageupload(req, '/assets/images/').then(imageaddress => {
                    if(imageaddress == ''){
                        restutil.returnValidationResponse(res, "Зургийг заавал хавсаргана уу!")
        
                    }else{
                        //restutil.returnDataResponce(res, imageaddress);

                        imageaddress.forEach(async element => {
                          await db.post_images.create({
                                image : element,
                                postId : p_id
                            })
                        });

                        restutil.returnActionSuccesResponse(res);

                        // db.post.update({
                        //     image : imageaddress
                        // }, {
                        //     where : {
                        //         id : p_id
                        //     }
                        // }).then(() => {
                        //     restutil.returnActionSuccesResponse(res);
                        // })
                    }
                })
            }else{
                restutil.returnValidationResponse(res, "Постын мэдээлэл олдсонгүй")
            }
        })



    } catch (error) {
        
    }
}