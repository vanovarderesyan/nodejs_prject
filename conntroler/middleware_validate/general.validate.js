const validator = require('validator');

function validate(req,res,next){
    switch (req.method) {
        case 'GET':
            next();
            break;
        case 'PUT':
            if(req.url === '/edit'){
                (req.body.e_mail_concat && validator.isEmail(req.body.e_mail_concat)) ? 
                    true:(req.body.e_mail_concat) ? 
                        res.send('no validate email concat') : false;
                (req.body.e_mail_hr && validator.isEmail(req.body.e_mail_hr)) ? 
                    true: (req.body.e_mail_hr) ?
                        res.send('no validate email hr'):false;
                (req.body.e_mail_info && validator.isEmail(req.body.e_mail_info)) ? 
                    true:(req.body.e_mail_info) ? 
                        res.send('no validate email info') : false;
                next();
            }else{
                res.send(`Cannot POST${req.url}`)
            }
            break;
        default:
            res.send(`Cannot POST${req.url}`)
            break;
    }
}

module.exports = validate;