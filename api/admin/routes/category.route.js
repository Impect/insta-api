const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/category.controller')

    /**
    *  @api {get} /api/admin/category categorys GET ALL 
    *  @apiGroup CATEGORY
    *  @apiPermission users
    **/

   app.get('/api/admin/category', jwtutil.verifyCustomer,  controller.list);

    /**
    *  @api {post} /api/admin/category categorys CREATE 
    *  @apiGroup CATEGORY
    *  @apiPermission users
    *  @apiParamExample {json} Input
    * {
    *    "name" : "name",
    * }
    **/
    app.post('/api/admin/category/create',jwtutil.verifyCustomer, controller.validate('create'), controller.categorycreate)

    /**
    *  @api {put} /api/admin/category categorys UPDATE 
    *  @apiGroup CATEGORY
    *  @apiPermission users
    *  @apiParamExample {json} Input
    * {
    *    "id" : "id",
    *    "name" : "name",
    * }
    **/
    app.put('/api/admin/category/update', jwtutil.verifyCustomer, controller.validate('update'), controller.update);


    
    /**
    *  @api {delete} /api/admin/category/{id} categorys DELETE 
    *  @apiGroup CATEGORY
    *  @apiPermission users
    **/
     app.delete('/api/admin/category/delete/:id', jwtutil.verifyCustomer, controller.delete);
}
