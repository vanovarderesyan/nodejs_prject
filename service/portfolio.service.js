const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectId;
const GetPromis = require('../promise/Promis');
const models = require('../models/portfolio.json');
const empty = require('is-empty');


class PorfolioService{
    get(languege){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                { $match: {} }, 
                {
                    $graphLookup: {
                        from: 'information',
                        startWith: '$portfolio',
                        connectFromField: 'portfolio',
                        connectToField: '_id',
                        as: 'finish'
                    }
                },
                { $project: { 'portfolio': 1 } }
            ])
                .then((result) => {
                    if (result[0].portfolio[0].languege === languege && result[0].portfolio[0].isactive === 'bool') {
                        resolve(result[0].portfolio);
                    } else {
                        resolve('can not this languege')
                    }
                })
                .catch((err) => (
                    reject(err)
                ))
        })
    }

    getAll(){
        return new Promise((resolve, reject) => {
            collection.aggregate([
                { $match: {} }, // Only look at Luke Skywalker
                {
                    $graphLookup: {
                        from: 'information',
                        startWith: '$portfolio',
                        connectFromField: 'portfolio',
                        connectToField: '_id',
                        as: 'finish'
                    }
                },
                { $project: { 'portfolio': 1 } }
            ])
                .then((result) => {
                        resolve(result);
                })
                .catch((err) => (
                    reject(err)
                ))
        })
    }

    add(keys,req){
        models.tags = req.body.tags;
        models.platforms = req.body.platforms;
        return GetPromis.addObject(req,'portfolio',models);
    }

    addFile(keys,req){
        (req.body.platforms) ? models.platforms = (req.body.platforms).split(',') :models.platforms = [];
        (req.body.tags) ? models.tags = (req.body.tags).split(',') : models.tags = [];
        return GetPromis.addObjectAndFile(req,'portfolio',models)
    }

    edit(req){
        let obj = {};
        (req.body.tags) ? obj['portfolio.$.title'] = req.body.title : false;
        (req.body.platforms) ? obj['portfolio.$.platforms'] = req.body.platforms : false;
        return GetPromis.edit(req,'portfolio',obj,req.params.id);
    }

    editFile(req){
        let obj = {};
        (req.body.tags) ? obj['portfolio.$.tags'] = (req.body.tags).split(',') : false;
        (req.body.platforms) ? obj['portfolio.$.platforms'] = (req.body.platforms).split(',') : false;
        return GetPromis.editFile(req,'portfolio',obj,req.body.id);
    }

    remove(keys,id){
        return GetPromis.remove(id,'portfolio');
    }
}

module.exports = new PorfolioService;