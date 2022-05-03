const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/answer_type.controller')

    /**
    *  @api {get} /api/admin/answertypes answer_types GET ALL 
    *  @apiGroup answer_types
    *  @apiPermission users
    **/

   app.get('/api/admin/answertypes', jwtutil.verifyAdmin,  controller.list);

    /**
    *  @api {post} /api/admin/answertypes answer_types CREATE 
    *  @apiGroup answer_types
    *  @apiPermission users
    *  @apiParamExample {json} Input
    * {
    *    "name" : "name",
    * }
    **/
    // app.post('/api/admin/answertypes', jwtutil.verifyAdmin, controller.validate('create'), controller.create)

    /**
    *  @api {put} /api/admin/answertypes answer_types UPDATE 
    *  @apiGroup answer_types
    *  @apiPermission users
    *  @apiParamExample {json} Input
    * {
    *    "id" : "id",
    *    "name" : "name",
    * }
    **/
    // app.put('/api/admin/answertypes', jwtutil.verifyAdmin, controller.validate('update'), controller.update);


    
    /**
    *  @api {delete} /api/admin/answertypes/{id} answer_types DELETE 
    *  @apiGroup answer_types
    *  @apiPermission users
    **/
    // app.delete('/api/admin/answertypes/:id', jwtutil.verifyAdmin, controller.delete);
}
