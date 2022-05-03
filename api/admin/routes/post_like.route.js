const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/post_like.controller')

    /**
    *  @api {get} /api/admin/customer test GET ALL 
    *  @apiGroup customer
    *  @apiPermission users
    **/

    app.post('/api/admin/post/like', jwtutil.verifyCustomer, controller.like);

    app.get('/api/admin/post/likelist', jwtutil.verifyCustomer, controller.likelist);

    app.delete('/api/admin/post/unlike/:id',  jwtutil.verifyCustomer, controller.unlike);

    //app.post('/api/admin/customer/login', controller.login);

    //app.put('/api/admin/customer/forget', controller.forgetpassword);

    //app.delete('/api/admin/customer/deletecustomer:id', controller.deletecustomer);

}