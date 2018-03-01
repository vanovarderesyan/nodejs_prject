let Validator = require('validator-json');


let schema = {
    languege: { type: 'string', required: true},
    description: { type: 'string', required: true },
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
            break;
        case 'DELETE':
            break;
        default:
            res.send(`Cannot POST${req.url}`);
            break;
    }
}

module.exports = serviceDescriptionValidate;