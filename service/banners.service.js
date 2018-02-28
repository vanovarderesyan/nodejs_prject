const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectID;
const bannersModel = require('../models/banners.json');
const getBanners = require('./lodash.getElemntBiId');
const GetPromis = require('../promise/Promis');

class BannersService {
    get(languge) {

        return GetPromis.get(languge, 'banners');
    }

    getAll() {
        if (collection.manager._state === 'open') {
            return GetPromis.getAll('banners');
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

    addObject(obj){
        return GetPromis.addObject(obj,'banners',bannersModel);
    }

    addFile(obj) {
        return GetPromis.addFile(obj,'banners',bannersModel);
    }

    remove(id) {
        return GetPromis.remove(id, 'banners');
    }

    edit(req) {
        return GetPromis.edit(req,'banners');
    }

    editFile(req) {
        console.log(req.body.id);
        return GetPromis.editFile(req,'banners');
    }
}

module.exports = new BannersService();