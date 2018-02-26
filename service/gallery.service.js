const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectId;

class GalleryService {

    add(obj, id) {
        return new Promise((resolve, reject) => {
            obj._id = objectId();
            collection.update({ 'portfolio._id': objectId(id) }, { $push: { 'portfolio.$.gallery': obj } }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        status: 'ok'
                    })
                }
            })
        })
    }

    remove(portfolioId, removeId) {
        return new Promise((resolve, reject) => {
            collection.update({ 'portfolio._id': objectId(portfolioId) }, { $pull: { 'portfolio.$.gallery': { _id: objectId(removeId) } } }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        status: 'ok'
                    })
                }
            })
        })
    }
}

module.exports = new GalleryService;


