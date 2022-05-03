const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/post_comment.controller')

    /**
    *  @api {get} /api/admin/customer test GET ALL 
    *  @apiGroup customer
    *  @apiPermission users
    **/

    app.post('/api/admin/post/comment', jwtutil.verifyCustomer, controller.comment);
    
    app.get('/api/admin/post/commentlist', controller.commentlist);

    //app.get('/api/admin/post/postcustomergetid', controller.postgetid);

    //app.post('/api/admin/customer/login', controller.login);

    app.put('/api/admin/post/commentupdate', jwtutil.verifyCustomer, controller.commentupdate);

    app.get('/api/admin/post/commentdelete/:id', controller.commentdelete);

}