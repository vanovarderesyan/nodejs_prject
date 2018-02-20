var express = require('express');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/models');
var collection = db.get('information');


app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/', function(req, res) {
    var db = req.db;
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
});

app.listen(3000,()=>{
    console.log('ddfd');
});