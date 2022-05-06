const { oneOf, check, body } = require('express-validator');
const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/customer.controller')

    /**
    *  @api {get} /api/admin/customer test GET ALL 
    *  @apiGroup customer
    *  @apiPermission users
    **/

    app.post('/api/admin/customer/register', controller.validate('register'), controller.register);

    app.post('/api/admin/customer/login', controller.validate('login') , controller.login);

    app.put('/api/admin/customer/info', controller.validate('customerinfo') , controller.customerinfo);

    app.put('/api/admin/customer/changepassword', jwtutil.verifyCustomer , controller.validate('changepassword') , controller.changepassword);

    //app.delete('/api/admin/customer/deletecustomer:id', controller.deletecustomer);

}