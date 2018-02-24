const body_parser = require('body-parser');
const BannersRouter = require('./banners');
const ServiceRouter = require('./service');
const GeneralRouter = require('./general');
const ServiceDescriptionRouter = require('./service_description');
const PortfolioRouter = require('./portfolio');
const GalleryRouter = require('./gallery');
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
        app.use('/service',ServiceRouter);
        app.use('/general',GeneralRouter);
        app.use('/service_description',ServiceDescriptionRouter);
        app.use('/portfolio',PortfolioRouter);
        app.use('/gallery',GalleryRouter);
    }
};

module.exports = new API();