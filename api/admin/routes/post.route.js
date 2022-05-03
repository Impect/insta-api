const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/post.controller')

    /**
    *  @api {get} /post/create test GET ALL 
    *  @apiGroup customer
    *  @apiPermission users
    **/

    app.post('/api/admin/post/create',jwtutil.verifyCustomer, controller.createpost);


    app.get('/api/admin/post/list', controller.postlist); 

    app.get('/api/admin/post/mypost', jwtutil.verifyCustomer , controller.myposts); 

    app.get('/api/admin/post/customerpost', controller.customerpost); 

    app.get('/api/admin/post/listrandom', controller.postlistrandom); 

    app.get('/api/admin/post/listtoken', controller.postlisttoken); 

    app.put('/api/admin/post/updatepost', jwtutil.verifyCustomer, controller.updatepost);

    //app.get('/api/admin/post/list/getid', controller.postgetid); 

    app.put('/api/admin/post/uploadtestimage/:id', controller.uploadtestimage)

    //app.post('/api/admin/customer/login', controller.login);

    //app.put('/api/admin/customer/forget', controller.forgetpassword);

    //app.delete('/api/admin/customer/deletecustomer:id', controller.deletecustomer);

}