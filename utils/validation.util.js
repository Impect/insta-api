var expressValidator = require('express-validator');

function initCustomValidator(app) {
    app.use(expressValidator({
        customValidators: {
            isImage: function(value, filename) {
                var extension = (path.extname(filename)).toLowerCase();
                switch (extension) {
                    case '.jpg':
                        return '.jpg';
                    case '.jpeg':
                        return '.jpeg';
                    case  '.png':
                        return '.png';
                    default:
                        return false;
                }
            }
        }}));

}


module.exports.initCustomValidator = initCustomValidator;





