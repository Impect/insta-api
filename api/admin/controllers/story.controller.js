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



// story create
exports.createstory = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let customerId = jwtutil.userTokenData(req, 'id');
        let title = req.body.title;
        
        db.story.create({
            title : title,
            customerId : customerId
        }).then(newStory => {
            imageutil.fileupload(req,'/assets/story/image_videos/').then(fileaddress =>{
                if(fileaddress == ''){
                    restutil.returnValidationResponse(res, 'Файлыг заавал хавсаргах шаардлагатай')
                }else{
                            db.story_image_video.create({
                            file : fileaddress,
                            storyId : newStory.id
                        });
                    restutil.returnActionSuccesResponse(res);
                }
            })
        })
    } catch (error) {
        next(error)
    }
}

exports.updatestory = async(req,res,next) =>{
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
            let customerid = jwtutil.userTokenData(req, 'id');
            let title = req.body.title;
            let id = req.body.id;

            db.story.update(
                { title : title },
                { where : {
                    id : id , customerid : customerid
                }}).then(() =>{
                    imageutil.fileupload(req , '/assets/story/image_videos/').then(fileaddress =>{
                        db.story_image_video.destroy({
                            where : { storyId : id }
                        }).then(() => {
                                    db.story_image_video.create({
                                    file : fileaddress,
                                    storyId : id
                           });
                           restutil.returnActionSuccesResponse(res);
                        })
                    })
            })
        } catch (error) {
            next(error)
        }
}

exports.deletestory = async(req, res, next) =>  {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            restutil.returnValidationResponse(res, errors.array());
            return;
        }
        let customerId = jwtutil.userTokenData(req, 'id');
        let { id } = req.params;

        db.story.destroy({
            where : { customerId :customerId , id : id }
        }).then(deletedstory =>{
            db.story_image_video.destroy({
                where : { storyId : deletedstory.id }
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
    // hudaldan avalt hiisnii daraa 
    // qty aas hasagdana 
    // yamar hun avsan medeelliig neg talbart hadgalna
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