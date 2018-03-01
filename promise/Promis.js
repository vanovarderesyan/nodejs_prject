'use strict'
const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectID;
const getBanners = require('../service/lodash.getElemntBiId');
const _ = require('lodash');
const fs = require('fs');

class GetPromis {
    get(languege, keys) {
        return new Promise((res, rej) => {
            collection.find({}, {}, (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    let listTrueLanguege = [];
                    for (let i in result) {
                        for (let j in result[i][keys]) {
                            if (result[i][keys][j].languege == languege && result[i][keys][j].isactive == true) {
                                listTrueLanguege.push(result[i][keys][j]);
                            }
                        }
                    }

                    if (listTrueLanguege.length) {
                        res(
                            listTrueLanguege
                        )
                    } else {
                        res({ status: 'not found' });
                    }
                }
            })
        })
    }

    getAll(keys) {
        return new Promise((res, rej) => {
            collection.find({}, {}, (err, result) => {
                if (err) {
                    rej({
                        status: "faild",
                        result: err
                    })
                } else {
                    res({
                        status: "ok",
                        result: result[0][keys]
                    })
                }
            })
        })
    }

    addObject(obj, keys, models) {
        return new Promise((res, rej) => {
            models._id = objectId();
            models.title = obj.body.title;
            models.description = obj.body.description;
            models.languege = obj.body.languege;
            models.isactive = obj.body.isactive;
            let ObjectAdd = {};
            ObjectAdd[keys] = models;
            collection.update({}, { $push: ObjectAdd }, (err) => {
                if (err) {
                    rej({
                        status: 'faild',
                        err
                    })
                } else {
                    res({
                        status: 'ok',
                        _id: models._id
                    })
                }
            })
        })
    }

    addFile(obj, keys, models) {
        return new Promise((res, rej) => {
            let objectImgSet = {};
            let idObj = {};
            objectImgSet[`${keys}.$.image`] = obj.file.path;
            idObj[`${keys}._id`] = objectId(obj.body.id);
            collection.update(idObj, { $set: objectImgSet }, (err) => {
                if (err) {
                    rej({
                        status: 'faild',
                        err
                    })
                } else {
                    res({
                        status: 'ok',
                        _id: models._id
                    })
                }
            })
        })
    }

    remove(id, keys) {
        return new Promise((res, rej) => {
            let removeObject = {};
            removeObject[keys] = { _id: objectId(id) };
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

    edit(req, keys, ObjectUpdate, id) {
        return new Promise((res, rej) => {
            let ObjectUpdate = {}
            let idArray = `${keys}._id`;
            let idObj = {};
            idObj[`${keys}._id`] = objectId(req.body.id);
            (req.body.title) ? ObjectUpdate[`${keys}.$.title`] = req.body.title : false;
            (req.body.description) ? ObjectUpdate[`${keys}.$.description`] = req.body.description : false;
            (req.body.isactive) ? ObjectUpdate[`${keys}.$.isactive`] = req.body.isactive : false;
            (req.body.languege) ? ObjectUpdate[`${keys}.$.languege`] = req.body.languege : false;
            collection.update(idObj,
                {
                    $set: ObjectUpdate
                }, (err) => {
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

    editFile(obj, keys, ObjectUpdate, id) {
        return new Promise((res, rej) => {
            collection.aggregate([
                { $match: {} },
                {
                    $graphLookup: {
                        from: 'information',
                        startWith: '$banners',
                        connectFromField: 'banners',
                        connectToField: '_id',
                        as: 'finish'
                    }
                },
                { $project: { 'banners': 1 } }
            ],(err,result)=>{
                let objectOldImg = _.find(result[0].banners, function(o) {
                    if(o._id == obj.body.id){
                        return o;
                    }
                })
                if(objectOldImg.image.length > 10){
                    fs.unlink(objectOldImg.image)
                }
            })
            let objectImgSet = {};
            let idObj = {};
            objectImgSet[`${keys}.$.image`] = obj.file.path;
            idObj[`${keys}._id`] = objectId(obj.body.id);
            collection.update(idObj, { $set: objectImgSet }, (err) => {
                if (err) {
                    rej({
                        status: 'faild',
                        err
                    })
                } else {
                    res({
                        status: 'ok',
                        _id: obj.body.id
                    })
                }
            })
        })
    }
}

module.exports = new GetPromis;