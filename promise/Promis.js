const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectID;
const getBanners = require('../service/lodash.getElemntBiId');


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

    addObject(obj,keys,models){
        console.log('sdfg')
        return new Promise((res, rej) => {
            models._id = objectId();
            models.title = obj.body.title;
            models.description = obj.body.description;
            models.languege = obj.body.languege;
            models.isactive = obj.body.isactive;
            let ObjectAdd = {};
            ObjectAdd[keys] = models;
            console.log(ObjectAdd)
            collection.update({}, { $push: ObjectAdd }, (err) => {
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

    addObjectAndFile(obj, keys, models) {
        return new Promise((res, rej) => {
            models._id = objectId();
            models.image = obj.file.path;
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
                        status: 'ok'
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

    edit(req, keys) {
        return new Promise((res, rej) => {
            collection.findOne({ _id: objectId('5a8d1e233675e71901945418') }, (err, result) => {
                let banners = getBanners(result[keys], req.body.id, req);
                if (!banners) {
                    rej({
                        status: 'faild',
                    })
                }
                let idArray = `${keys}._id`;
                let idObj = { _id: objectId('5a8d1e233675e71901945418') };
                let ObjectUpdate = {};

                idObj[`${keys}._id`] = objectId(req.body.id);
                ObjectUpdate[`${keys}.$.title`] = (req.body.title) ? req.body.title : banners.title;
                ObjectUpdate[`${keys}.$.description`] = (req.body.description) ? req.body.description : banners.description;
                ObjectUpdate[`${keys}.$.isactive`] = (req.body.isactive) ? req.body.isactive : banners.isactive;
                ObjectUpdate[`${keys}.$.languege`] = (req.body.languege) ? req.body.languege : banners.languege;

                collection.update(idObj, { $set: ObjectUpdate }, (err) => {
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

        })
    }

    editFile(req, keys) {
        return new Promise((res, rej) => {
            collection.findOne({ _id: objectId('5a8d1e233675e71901945418') }, (err, result) => {
                let banners = getBanners(result[keys], req.body.id, req.file.path);

                console.log(banners);
                if (!banners) {
                    rej({
                        status: 'faild',
                    })
                }
                let idArray = `${keys}._id`;
                let idObj = { _id: objectId('5a8d1e233675e71901945418') };
                idObj[`${keys}._id`] = objectId(req.body.id);
                let ObjectUpdate = {};
                ObjectUpdate[`${keys}.$.title`] = (req.body.title) ? req.body.title : banners.title;
                ObjectUpdate[`${keys}.$.description`] = (req.body.description) ? req.body.description : banners.description;
                ObjectUpdate[`${keys}.$.isactive`] = (req.body.isactive) ? req.body.isactive : banners.isactive;
                ObjectUpdate[`${keys}.$.languege`] = (req.body.languege) ? req.body.languege : banners.languege;
                ObjectUpdate[`${keys}.$.image`] = req.file.path;
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

        })
    }
}

module.exports = new GetPromis;