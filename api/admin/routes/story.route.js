const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/story.controller')

    /**
    *  @api {get} /post/create test GET ALL 
    *  @apiGroup customer
    *  @apiPermission users
    **/

    app.post('/api/admin/story/create', jwtutil.verifyCustomer, controller.createstory);

    app.delete('/api/admin/story/delete/:id', jwtutil.verifyCustomer, controller.deletestory);

    app.put('/api/admin/story/update', jwtutil.verifyCustomer, controller.updatestory);

    // app.get('/api/admin/post/list', controller.postlist); 

    //app.put('/api/admin/customer/forget', controller.forgetpassword);



}