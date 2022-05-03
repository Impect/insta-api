const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/conversation.controller')

    /**
    *  @api {get} /api/admin/customer test GET ALL 
    *  @apiGroup customer
    *  @apiPermission users
    **/

    app.post('/api/admin/conversation/new', jwtutil.verifyCustomer , controller.newconversation);

    //app.get('/api/admin/follower/myfollowers', jwtutil.verifyCustomer , controller.myfollowerlist);

    //app.get('/api/admin/follower/customerfollowers', controller.customerfollowerlist);

    //app.delete('/api/admin/follower/unfollow', jwtutil.verifyCustomer , controller.unfollow);

    //app.post('/api/admin/customer/login', controller.login);

    //app.put('/api/admin/customer/customerinfo',jwtutil.verifyCustomer , controller.customerinfo);

    //app.put('/api/admin/customer/forgetpassword',jwtutil.verifyCustomer, controller.forgetpassword);

    //app.delete('/api/admin/customer/deletecustomer:id', controller.deletecustomer);

}