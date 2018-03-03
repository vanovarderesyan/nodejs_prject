const serviceJson = require('../../models/portfolio.json');
const _ = require('lodash');
const isArray = require('isarray');

let Validator = require('validator-json');


let schema = {
    languege: { type: 'string', required: true },
    isactive: { type: 'boolean', required: true },
    description: { type: 'string', required: true },
    title: { type: 'string', required: true },
    tags: { required: true },
    platforms: { required: true },
}

let schemaFalse = {
    languege: { type: 'string', required: false },
    isactive: { type: 'string', required: false },
    description: { type: 'string', required: false },
    title: { type: 'string', required: false },
    tags: { type: 'array', required: false },
    platforms: { type: 'array', required: false },
    id: { type: 'string', required: true }
}

function validatePortfolio(req, res, next) {
    switch (req.method) {
        case 'GET':
            next();
            break;
        case 'POST':
            if (req.url === '/add') {
                if (_.keys(schema).length === _.keys(req.body).length) {
                    let passValidator = new Validator(req.body, schema, 'req.body');
                    console.log(typeof (req.body.tags.length))
                    if (isArray(req.body.tags) === false || isArray(req.body.platforms) === false) {
                        res.send('faild tags and platforms type array')
                    }
                    if (passValidator.validate().length) {
                        res.send(passValidator.validate());
                    } else {
                        next();
                    }
                } else {
                    res.send({
                        status: 'faild no valid json',
                        example: {
                            title: "require : true",
                            description: "require : true",
                            isactive: "require : true",
                            languege: "require : true",
                            tags: "type : array,require :true",
                            platform: "type : array,require : true"
                        }
                    });
                }
            }
            else if (req.url === '/add/file') {
                console.log(req.file)
                console.log(req.body.id)
                if (req.file && req.body.id) {
                    next()
                } else {
                    res.send('input to file and id portfolio object')
                }
            } else {
                res.send(`Cannot ${req.method}${req.url}`)
            }
            break;
        case 'PUT':
            if (req.url === '/edit/object') {
                console.log(_.keys(req.body).length)
                if (_.keys(schema).length === _.keys(req.body).length - 1) {
                    let passValidator = new Validator(req.body, schema, 'req.body');
                    if (isArray(req.body.tags) === false || isArray(req.body.platforms) === false) {
                        res.send('faild tags and platforms type array')
                    }
                    if (passValidator.validate().length) {
                        res.send(passValidator.validate());
                    } else {
                        console.log(req.body)
                        next();
                    }
                } else {
                    res.send(
                        {
                            status: 'faild no valid json',
                            example: {
                                title: "requireKeys : true",
                                description: "requireKeys : true",
                                isactive: "requireKeys : true",
                                languege: "requireKeys : true",
                                tags: "requireKeys :true",
                                platforms: "requireKkeys : true",
                                id: "requireValue : true"
                            }
                        }
                    )
                }
            }
            else if (req.url === '/edit/file') {
                if (req.file && req.body.id) {
                    next()
                } else {
                    res.send('input to file and id portfolio object')
                }
            } else {
                res.send(`Cannot ${req.method}${req.url}`);
            }
            break;
        case 'DELETE':
            switch (req.url) {
                case '/remove':
                    if (req.body.id) {
                        
                        next();
                    } else {
                        res.send('input to portfolio id');
                    }
                    break;
                case '/remove/tags':
                    if (req.body.value) {
                        next();
                    } else {
                        res.send('input to portfolio tags value');
                    }
                    break;
                case '/remove/platform':
                    if (req.body.value) {
                        next();
                    } else {
                        res.send('input to portfolio platforms value');
                    }
                    break;
                default:
                    res.send(`Cannot ${req.method}${req.url}`);
                    break;
            }
            break;
        default:
            res.send(`Cannot ${req.method}${req.url}`);
            break;
    }
}

module.exports = validatePortfolio;