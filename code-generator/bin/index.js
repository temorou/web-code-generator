let express = require('express');
let bodyParser = require('body-parser')
let app = express();
let sql = require('./common/sql.js');
let config = require("./config.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/getTables', function (req, res) {
    sql.getTables(req.body,function (data) {
        res.send(JSON.stringify(data));
    });
})

app.post('/api/getConfigs', function (req, res) {
    sql.getConfigs(req.body,function (data) {
        res.send(JSON.stringify(data));
    });
})

app.post('/api/genFile', function (req, res) {
    sql.genFile(req.body,function (data) {
        res.send(JSON.stringify(data));
    });
})

app.post('/api/getConfig', function (req, res) {
    res.send(JSON.stringify(config));
})

app.listen(8341, function () {

})