const express = require('express');
const app = express();
const api = require('./conntroler/api');
const argv = require('minimist')(process.argv.slice(2));
const swagger = require("swagger-node-express");
const bodyParser = require( 'body-parser' );
const subpath = express();

app.use(bodyParser());
app.use("/v1", subpath);

swagger.setAppHandler(subpath);
app.use(express.static('dist'));

swagger.setApiInfo({
    title: "example API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
});

subpath.get('/', function (req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});

swagger.configureSwaggerPaths('', 'api-docs', '');

let domain = 'localhost';

if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".');

let applicationUrl = 'http://' + domain;
swagger.configure(applicationUrl, '1.0.0');

app.listen(4000,()=>{
    console.log('port listen');
})

api.initApp(app);