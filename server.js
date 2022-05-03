const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4030;
const http = require('http');
const db = require('./configs/db.config.js');
const requestIp = require('request-ip');
const fileUpload = require('express-fileupload');
var initAdminRouters = require('./api/admin/routes');
var fileutil = require('./utils/file.util');
const logutil = require('./utils/log.util')
const serveIndex = require('serve-index');
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync with { force: false }');
});

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.static('public'));
app.use('./assets/images', express.static('public'));
app.options("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.status(200).end();
});
app.get('/', (req, res) => res.send(fileutil.getfiledata('index.html')));
app.use('/errors', express.static('public/errors'), serveIndex('public/errors', {'icons': true}));
initAdminRouters(app);

//#region Error middleware
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    let err = {
        date: new Date(),
        clientIp: requestIp.getClientIp(req),
        status: error.status || 404,
        message: error.message || 'Not found route',
        error: error.toString()
    };
    res.status(error.status || 404).send({
        
    });
});

// error handler middleware
// app.use((error, req, res, next) => {
//     let err = {
//         date: new Date(),
//         clientIp: requestIp.getClientIp(req),
//         status: error.status || 500,
//         message: error.message || 'Internal Server Error',
//         error: error.toString(),
//     };
//     res.status(error.status || 500).send({
//         Алдаа: 'Сервер дээр алдаа гарлаа'
//     });
//     logutil.writeLog(JSON.stringify(err));
// });


http.createServer(app).listen(port, function () {
    console.log('API listening on port %d (http://localhost:%d)', port, port);
});


