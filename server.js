/*! 
 * Server Load
 */
var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var ejs = require('ejs');

var app = express();
var appConfig=require('./config.js');
appConfig.ejsSetup(app, ejs, express);
var conn=appConfig.dbConnect(mysql);

var appControler=require('./routes/controler.js');
appControler.init(conn, app, bodyParser);

//app.use(bodyParser.urlencoded({extended: false}));


var server = app.listen(8880, '10.0.0.125', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App runing at http://%s:%s', host, port);
});


