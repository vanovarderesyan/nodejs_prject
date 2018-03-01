const serviceJson = require('../../models/service.json');
const _ = require('lodash');

let Validator = require('validator-json');


let schema = {
    languege: { type: 'string', required: true},
    isactive: { type: 'boolean', required: true },
    description: { type: 'string', required: true },
    title: { type: 'string', required: true },
}

let schemaFalse = {
    languege: { type: 'string', required: false},
    isactive: { type: 'string', required: false },
    description: { type: 'string', required: false },
    title: { type: 'string', required: false },
} 
// let passValidator = new Validator(object4pass, schema, 'object4npass');
// let passErrors = passValidator.validate();

function get(req, res, next) {
    console.log(req.method)
    switch (req.method) {
        case 'GET':
            next();
            break;
        case 'POST':
            if (req.url === '/add') {
                if(_.keys(schema).length === _.keys(req.body).length){
                    let passValidator = new Validator(req.body,schema,'req.body');
                    if(passValidator.validate().length){
                        res.send(passValidator.validate());
                    }else{
                        next();
                    }
                }else{
                    console.log(req.body)
                    res.send({
                        status : 'faild no valid json',
                        example : {
                            title:"require : true",
                            description :"require : true",
                            isactive : "require : true",
                            languege :"require : true"
                        }
                    });
                }
            }
            else if (req.url === '/add/file') {
                if(req.file && req.body.id){
                        next()
                }else{
                    res.send('input to file and id service object')
                }
            }else{
                res.send(`Cannot POST${req.url}`)
            }
            break;
        case 'PUT':
            if(req.url === '/object'){
                console.log(_.keys(req.body).length)
                if(_.keys(schema).length === _.keys(req.body).length-1){
                    let passValidator = new Validator(req.body,schema,'req.body');
                    if(passValidator.validate().length){
                        res.send(passValidator.validate());
                    }else{
                        console.log(req.body)
                        next();
                    }
                }else{
                    res.send(
                        {
                            status : 'faild no valid json',
                            example : {
                                title:"requireKeys : true",
                                description :"requireKeys : true",
                                isactive : "requireKeys : true",
                                languege :"requireKeys : true",
                                id : "requireValue : true"
                            }
                        }
                    )
                }
            }
            else if(req.url === '/file'){
                next();
            }else{
                res.send(`Cannot POST${req.url}`);   
            }
            break;
        case 'DELETE':
            if(req.url === '/remove'){
                if(req.body.id){
                    next();
                }else{
                    res.send('input to service id');
                }
            }else{
                res.send(`Cannot POST${req.url}`);     
            }
            break;
        default:
            res.send(`Cannot POST${req.url}`);   
            break;
    }
}

module.exports = get;