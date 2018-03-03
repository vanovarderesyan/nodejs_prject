const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectId;

class ServiceDescriptionService {
    get(languege) {
        return new Promise((resolve, reject) => {
            collection.aggregate([
                { $match: {} }, // Only look at Luke Skywalker
                {
                    $graphLookup: {
                        from: 'information',
                        startWith: '$service_description',
                        connectFromField: 'service_description',
                        connectToField: '_id',
                        as: 'banners'
                    }
                },
                { $project: { 'service_description': 1 } }
            ])
                .then((result) => {
                    let resultLanguege = true;
                    for (let i in result[0].service_description) {
                        if (result[0].service_description[i].languege === languege) {
                            resultLanguege = false;
                            resolve(result[0].service_description[i]);
                        }
                    }
                    if (resultLanguege) {
                        reject('can not this languege');
                    }
                })
                .catch((err) => (
                    reject(err)
                ))
        })
    }

    post(languege, obj) {
        return new Promise((resolve, reject) => {
            this.get(languege).then((result) => {
                reject('faild this languege already eating ')
            }).catch((err) => {
                collection.update({}, { $push: { service_description: obj } });
                resolve('ok');
            })
        })
    }

    put(req) {
        return new Promise((res, rej) => {
            this.get(req.body.languege).then((result) => {
                let idObj = { };
                let ObjectUpdate = {};
                idObj['service_description.languege'] = req.body.languege;
                (req.body.description) ? ObjectUpdate['service_description.$.description'] = req.body.description : false;
                (req.body.languege) ? ObjectUpdate['service_description.$.languege'] = req.body.languege : false;
                collection.update(idObj, { $set: ObjectUpdate });
                rej('ok');
            })
                .catch((err) => {
                    rej(err);
                })
        })
    }

    remove(languege) {
        return new Promise((res, rej) => {
            this.get(languege)
                .then((result) => {
                    let removeObject = {};
                    removeObject['service_description'] = { "languege": languege };
                    collection.update({}, { $pull: removeObject }, (err) => {
                        if (err) {
                            rej({
                                status: 'faild',
                                err
                            })
                        } else {
                            res({
                                status: 'ok'
                            })
                        }
                    })
                })
                .catch((err) => {
                    rej(err);
                })
        })
    }
}

module.exports = new ServiceDescriptionService;