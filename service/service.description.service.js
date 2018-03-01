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
                    console.log(result)
                    let resultLanguege = true;
                    for(let i in result[0].service_description){
                        if (result[0].service_description[i].languege === languege) {
                            resultLanguege = false;
                            resolve(result[0].service_description[i]);
                        }
                    }
                    if(resultLanguege){
                        reject('not fount this language');
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
                console.log(result);
                if (result !== "can not this languege") {
                    reject('faild this languege already eating ')
                } else {
                    collection.update({}, { $push: { service_description: obj } });
                    resolve('ok');
                }
            })
        })
    }

    put(req) {
        return new Promise((res, rej) => {
            this.get(req.body.languege).then((result) => {
                console.log(result);
                if (result === "can not this languege") {
                    rej('faild this languege already eating ')
                } else {
                    let idObj = { _id: objectId('5a8e92f719d8cf34517797f8') };
                    let ObjectUpdate = {};
                    idObj['service_description.languege'] = req.body.languege;
                    (req.body.description) ? ObjectUpdate['service_description.$.description'] = req.body.description : false;
                    (req.body.languege) ? ObjectUpdate['service_description.$.languege'] = req.body.languege : false;
                    collection.update(idObj, { $set: ObjectUpdate });
                    rej('ok');
                }
            })
        })
    }

    remove(languege) {
        return new Promise((res, rej) => {
            let removeObject = {};
            removeObject[keys] = { "languege": languege };
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
    }
}

module.exports = new ServiceDescriptionService;