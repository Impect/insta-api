const jwtutil = require('../../../utils/jwt.util');

module.exports = function (app) {
    const controller = require('../controllers/test_controller')

    /**
    *  @api {get} /api/admin/test_table test GET ALL 
    *  @apiGroup TEST
    *  @apiPermission users
    **/

    app.get('/api/admin/test_table', controller.list);

    app.post('/api/admin/test_table', controller.create)

    app.put('/api/admin/test_table',  controller.update);

    app.delete('/api/admin/test_table/:id', controller.delete);
}