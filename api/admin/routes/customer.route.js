const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/customer.controller')

    /**
    *  @api {get} /api/admin/customer test GET ALL 
    *  @apiGroup customer
    *  @apiPermission users
    **/

    app.post('/api/admin/customer/register', controller.create);

    app.post('/api/admin/customer/login', controller.login);

    app.put('/api/admin/customer/customerinfo',jwtutil.verifyCustomer , controller.customerinfo);

    app.put('/api/admin/customer/forgetpassword',jwtutil.verifyCustomer, controller.forgetpassword);

    //app.delete('/api/admin/customer/deletecustomer:id', controller.deletecustomer);

}