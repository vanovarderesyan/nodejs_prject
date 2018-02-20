const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectID;
const bannersModel = require('../models/banners.json');

class BannersService {
    constructor(){
        console.log('constructor');
    }
    get(languge) {
        return new Promise((res, rej) => {
            collection.find({}, {}, (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    let listTrueLanguge = [];

                    for (let i in result) {
                        for (let j in result[i]['banners']) {
                            if (result[i]['banners'][j].languge == languge && result[i]['banners'][j].isactive == true) {
                                listTrueLanguge.push(result[i]['banners'][j]);
                            }
                        }
                    }
                    if (listTrueLanguge.length) {
                        res(
                            listTrueLanguge
                        )
                    } else {
                        res({ status: 'not found' });
                    }
                }
            })
        })

    }

    getAll() {
        if (collection.manager._state === 'open') {
            return new Promise((res, rej) => {
                collection.find({}, {}, (err, result) => {
                    console.log('eee')
                    if (err) {
                        rej({
                            status: "faild",
                            result: err
                        })
                    } else {
                        res({
                            status: "ok",
                            result
                        })
                    }
                })
            })
        } else {
            return new Promise((res, rej) => {
                let err = new Error();
                if (err) {
                    rej({
                        status: 'faild',
                        err: 'can not start mongodb'
                    })
                }
            })
        }
    }

    add(obj) {
        return new Promise((res, rej) => {
            bannersModel._id = objectId();
            bannersModel.image = obj.file.path;
            bannersModel.title = obj.body.title;
            bannersModel.description = obj.body.description;
            bannersModel.languge = obj.body.languge;
            bannersModel.isactive = obj.body.isactive;
            collection.update({}, { $push: { banners: bannersModel } }, (err) => {
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

    remove(id) {
        return new Promise((res, rej) => {
            collection.update({}, { $pull: { banners: { _id: objectId(id) } } }, (err) => {
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

    edit(req) {
        return new Promise((res, rej) => {
            collection.findOneAndUpdate({ _id: objectId('5a8a99b8171cbd238df7ef32'), 'banners._id': objectId(req.body.id) },
                {
                    $set: {
                        "banners.$.title": (req.body.title) ? req.body.title : bannersModel.title,
                        "banners.$.description": (req.body.description) ? req.body.description : bannersModel.description,
                        "banners.$.isactive": (req.body.isactive) ? req.body.isactive : bannersModel.isactive,
                        "banners.$.languge": (req.body.languge) ? req.body.languge : bannersModel.languge,
                        "banners.$.image": req.file.path
                    }
                }, (err, db) => {
                    console.log(db)
                    if (err) {
                        rej({
                            status: 'faild',
                        });
                    } else {
                        res({
                            status: 'ok'
                        })
                    }
                });
        })
    }
}

module.exports = new BannersService();