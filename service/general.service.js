const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectID;
const empty = require('is-empty');

class GeneralService {
    get() {
        return new Promise((resolve, reject) => {
            collection.find({})
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
    edit(req) {
        return new Promise((resolve, reject) => {
            let objectMail = {};
            if (empty(req.body)) {
                reject('empty');
            } else {
                (req.body.e_mail_concat) ? objectMail['e_mail_concat'] = req.body.e_mail_concat : false;
                (req.body.e_mail_hr) ? objectMail['e_mail_hr'] = req.body.e_mail_hr : false;
                (req.body.e_mail_info) ? objectMail['e_mail_info'] = req.body.e_mail_info : false;
                collection.update({}, { $set: objectMail })
                    .then(() => {
                        resolve({
                            status : 'ok',
                            result : objectMail
                        });
                    })
                    .catch((err) => {
                        reject({
                            status : 'faild',
                            err
                        });
                    })
            }
        })
    }
}

module.exports = new GeneralService;