const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectId;
const GetPromis = require('../promise/Promis');
const models = require('../models/portfolio.json');
const empty = require('is-empty');
const _ = require('lodash');


class PorfolioService {
    get(languege) {
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
                    let arrayThisLanguage = []
                    for(let i in result[0].portfolio){
                        if (result[0].portfolio[i].languege === languege && result[0].portfolio[i].isactive == true) {
                           arrayThisLanguage.push(result[0].portfolio[i]);
                        } 
                    }
                    if(arrayThisLanguage.length){
                        resolve(arrayThisLanguage);
                    }else{
                        reject('faild can not this language or isactiv false');
                    }   
                })
                .catch((err) => (
                    reject(err)
                ))
        })
    }

    getAll() {
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
                    resolve(result);
                })
                .catch((err) => (
                    reject(err)
                ))
        })
    }

    add(keys, req) {
        (req.body.tags) ? models.tags = req.body.tags : false;
        (req.body.platforms) ? models.platforms = req.body.platforms : false;
        return GetPromis.addObject(req, 'portfolio', models);
    }

    addFile(keys, req) {
         return GetPromis.addFile(req, 'portfolio')
    }
            
    edit(req) {
        let obj = {};
        (req.body.tags) ? obj['portfolio.$.tags'] = req.body.tags : false;
        (req.body.platforms) ? obj['portfolio.$.platforms'] = req.body.platforms : false;
        return GetPromis.edit(req, 'portfolio', obj, req.params.id);
    }

    editFile(req) {
        return GetPromis.editFile(req, 'portfolio');
    }

    remove(keys, id) {
        return GetPromis.remove(id, 'portfolio');
    }

    removeTagsByValue(value) {
        return new Promise((resolve, reject) => {
            this.getAll()
                .then((result) => {
                    let listId = _.map(result[0].portfolio, '_id');
                    for (let i in listId) {
                        collection.update(
                            { 'portfolio._id': objectId(listId[i]) },
                            { $pull: { 'portfolio.$.tags': { $in: [value] } } }, (err) => {
                                if (err) {
                                    reject({
                                        status: 'faild',
                                        err
                                    })
                                } else {
                                    resolve({
                                        status: 'ok'
                                    })
                                }
                            }
                        )

                    }
                })
                .catch((err) => {
                    reject({
                        status: 'faild',
                        err
                    })
                })
        })

    }

}

module.exports = new PorfolioService;