const bannerJson = require('../../models/banners.json');
const _ = require('lodash');
function get(req, res, next) {
    console.log(req.method)
    switch (req.method) {
        case 'GET':
            next();
            break;
        case 'POST':
            console.log(req.url);
            if (req.url === '/add') {
                if (_.intersection(_.keys(req.body), _.keys(bannerJson)).length === _.keys(bannerJson).length) {
                    let result = _.valuesIn(req.body).filter(function (sub) {
                        return sub.length;
                    })
                    if (result.length === _.keys(bannerJson).length) {
                        next();
                    }else{
                        res.send('no valid json');
                    }
                } else {
                    res.send('no valid json');
                }
            }
            else if (req.url === '/add/file') {
                console.log(req)
                if(req.files){
                    next();
                }else{
                    res.send('pleas input to file')
                }
            }
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
        default:
            console.log('default');
            next();
            break;
    }
}

module.exports = get;