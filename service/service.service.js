const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectId;
const getService = require('./lodash.getElemntBiId');
const GetPromis = require('../promise/Promis');
const serviceModel = require('../models/service.json');

class ServiceService{
    get(languege){
        return  GetPromis.get(languege,'service');
    }

    getAll(){
        if (collection.manager._state === 'open') {
            return GetPromis.getAll('service');
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

    remove(id){
        return GetPromis.remove(id,'service');
    }

    addObject(obj){
        return GetPromis.addObject(obj,'service',serviceModel);
    }

    addObjectAndFile(obj){
        return GetPromis.addObjectAndFile(obj,'service',serviceModel)
    }

    addFile(req){
        return GetPromis.editFile(req,'service');
    }

    edit(req){
        return GetPromis.edit(req,'service');
    }
}

module.exports = new ServiceService;