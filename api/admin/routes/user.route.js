const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/category.controller')

    /**
    *  @api {get} /api/admin/category categorys GET ALL 
    *  @apiGroup categorys
    *  @apiPermission users
    **/

   app.get('/api/admin/category', jwtutil.verifyAdmin,  controller.list);

    /**
    *  @api {post} /api/admin/category categorys CREATE 
    *  @apiGroup categorys
    *  @apiPermission users
    *  @apiParamExample {json} Input
    * {
    *    "name" : "name",
    * }
    **/
    // app.post('/api/admin/category', jwtutil.verifyAdmin, controller.validate('create'), controller.create)

    /**
    *  @api {put} /api/admin/category categorys UPDATE 
    *  @apiGroup categorys
    *  @apiPermission users
    *  @apiParamExample {json} Input
    * {
    *    "id" : "id",
    *    "name" : "name",
    * }
    **/
    // app.put('/api/admin/category', jwtutil.verifyAdmin, controller.validate('update'), controller.update);


    
    /**
    *  @api {delete} /api/admin/category/{id} categorys DELETE 
    *  @apiGroup categorys
    *  @apiPermission users
    **/
    // app.delete('/api/admin/category/:id', jwtutil.verifyAdmin, controller.delete);
}
