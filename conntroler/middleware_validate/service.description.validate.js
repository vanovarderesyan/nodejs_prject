let Validator = require('validator-json');
let _ = require('lodash');

let schema = {
    languege: { type: 'string', required: true},
    description: { type: 'string', required: true },
}

let schemaLanguage  = {
    languege: { type: 'string', required: true}
}


function serviceDescriptionValidate(req,res,next){
    console.log(req.url)
    switch (req.method) {
        case 'GET':
            next();
            break;
        case 'POST':
            if(req.url === '/'){
                let validate = new Validator(req.body,schema,'req.body'); 
                if(validate.validate().length){
                    res.send(validate.validate())
                }else{
                    next()
                }
            }else{
                res.send(`Cannot POST${req.url}`);  
            }
            break;
        case 'PUT':
            if(req.url === '/edit'){
                let validate = new Validator(req.body,schema,'req.body'); 
                if(validate.validate().length){
                    res.send(validate.validate())
                }else{
                    next()
                }
            }else{
                res.send(`Cannot POST${req.url}`);
            }
            break;
        case 'DELETE':
            if(req.url === '/remove'){
                let validate = new Validator(req.body,schemaLanguage,'req.body'); 
                console.log(_.keys(req.body).length)
                if(_.keys(req.body).length !== 1){
                    res.send('no valid json');
                }
                if(validate.validate().length){
                    res.send(validate.validate())
                }else{
                    next()
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

module.exports = serviceDescriptionValidate;