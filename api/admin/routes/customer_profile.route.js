const { oneOf, check } = require('express-validator');
const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/customer_profile.controller')

    /**
    *  @api {get} /api/admin/customer test GET ALL 
    *  @apiGroup customer
    *  @apiPermission users
    **/

    app.get('/api/admin/customer_info', controller.customerprofileinfo);

    // app.post('/api/admin/customer/login', controller.login);

    // app.put('/api/admin/customer/customerinfo',jwtutil.verifyCustomer , controller.customerinfo);

    // app.put('/api/admin/customer/changepassword',jwtutil.verifyCustomer, controller.changepassword);

    // //app.delete('/api/admin/customer/deletecustomer:id', controller.deletecustomer);

}