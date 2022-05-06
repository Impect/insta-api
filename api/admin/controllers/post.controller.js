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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let customerId = jwtutil.userTokenData(req, 'id');
        let descr = req.body.descr;
        let qty = req.body.qty;
        let price = req.body.price;
        let order = req.body.order;
        let categoryId = req.body.categoryId;
        
        
        db.post.create({
            title : title,
            descr : descr,
            qty : qty,
            price : price,
            order : order,
            customerId : customerId,
            categoryId : categoryId
        }).then(newPost => {
            imageutil.multifileupload(req,'/assets/post/image_videos/').then(fileaddress =>{
                if(fileaddress == ''){
                    restutil.returnValidationResponse(res, 'Файлыг заавал хавсаргах шаардлагатай')
                }else{
                    fileaddress.forEach(async element => {
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
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
                imageutil.multiimageupload(req , '/assets/post/image_videos/').then(imageaddress =>{
               
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

exports.deletepost = async(req, res, next) => {
    try {
        let customerid = jwtutil.userTokenData(req, 'id');
        let { id } = req.params;

        db.post.destroy({
            where : { id : id, customerid : customerid }
        }).then((data)=>{
            db.post_images({
                where : { postId : data.id }
            })
            restutil.returnActionSuccesResponse(res);
        })
    } catch (error) {
        next(error)
    }
}

//post listFindAll
exports.postlist = async(req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
            db.post.findAll({
                attributes : ['id', 'title','descr','qty','price','order','createdAt','updatedAt'],

                include : [{
                    model: db.post_comment,
                    attributes : ['id', 'text','customerId','createdAt','updatedAt'],
                    include :  [{
                        model: db.customer,
                        attributes : ['username','profileImage']
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

//post listFindAll
exports.myposts = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let customerid = jwtutil.userTokenData(req, 'id');
        db.post.findAll({
            where : { customerid: customerid },
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

exports.customerpost = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let customerId = req.body.customerId;
        db.post.findAll({
            where : { customerId: customerId },
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        db.post.findAll(
            {
            attributes : ['id', 'title','descr','qty','price','order','createdAt','updatedAt'],
            
            
            include : [{
                model: db.post_comment,
                attributes : ['id', 'text','customerId','createdAt','updatedAt'],
                include :  [{
                    model: db.customer,
                    attributes : ['username','profileImage']
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
                attributes : ['username','email','profileImage']
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
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

exports.postsearch = async(req, res, next) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let title = req.body.title;
        db.post.findAll({
            where : { title : title }
        }).then((data)=>{
            restutil.returnActionSuccesResponse(res, data)
            // if(data ==  ''){
            //     restutil.returnValidationResponse(res)    
            // }else
            // {  
            //     db.customer.findAll({
            //         where : { username : title }
            //     }).then(()=>(
            //         restutil.returnActionSuccesResponse(res, data)
            //     ))
            // }
            
        })
    } catch (error) {
        next(error)
    }
}



exports.uploadtestimage = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }

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

exports.validate = (method) => {
    switch (method) {
        case 'createpost': {
            return [

                body('descr','Тайлбараа оруулна уу.').notEmpty(),
                body('qty','Тоо ширхэгээ оруулна уу.').notEmpty(),
                body('qty','Тоо оруулна уу.').isNumeric(),
                body('price', 'Үнэ оруулна уу.').notEmpty(),
                body('price','Тоо оруулна уу.').isNumeric(),
                body('order','order хэсгийн мэдээллийг оруулна уу.').notEmpty(),
                body('order','Тоо оруулна уу.').isNumeric(),
                
            ]
        }
        case 'updatepost': {
            return [
                body('title','Гарчигаа оруулна уу.').notEmpty(),
                body('descr','Тайлбараа оруулна уу.').notEmpty(),
                body('qty','Тоо ширхэгээ оруулна уу.').notEmpty(),
                body('qty','Тоо оруулна уу.').isNumeric(),
                body('price', 'Үнэ оруулна уу.').notEmpty(),
                body('price','Тоо оруулна уу.').isNumeric(),
                body('order','order хэсгийн мэдээллийг оруулна уу.').notEmpty(),
                body('order','Тоо оруулна уу.').isNumeric(),
                body('id','Постны Id-г оруулна уу.')

            ]
        }
    }
}