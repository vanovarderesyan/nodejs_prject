const body_parser = require('body-parser');
const BannersRouter = require('./banners');
const db = require('../database/db');
const logger = require('morgan');
const cors = require('cors');

class API {
    initApp(app){
        app.use(function(req,res,next){
            req.db = db;
            next();
        });
        app.use(body_parser.json());
        app.use(body_parser.urlencoded({
            extends:true
        }));
        app.use(logger('dev'));
        app.use(cors());
        app.use('/banners',BannersRouter);
    }

};

module.exports = new API();