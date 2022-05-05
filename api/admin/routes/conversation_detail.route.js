const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/conversation_detail.controller')

    /**
    *  @api {get} /api/admin/customer test GET ALL 
    *  @apiGroup customer
    *  @apiPermission users
    **/

    app.get('/api/admin/conver_detail/text', jwtutil.verifyCustomer , controller.textconversation);

    app.delete('/api/admin/conver_detail/delete', jwtutil.verifyCustomer , controller.textdeleteconversation);

    //app.get('/api/admin/follower/myfollowers', jwtutil.verifyCustomer , controller.myfollowerlist);

    //app.delete('/api/admin/customer/deletecustomer:id', controller.deletecustomer);

}