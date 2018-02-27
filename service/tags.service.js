const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectId;

class TagsService {
    add(obj) {
        obj.body._id = objectId();
        (obj.body.description) ? true : obj.body.description = null;
        (obj.body.title) ? true : obj.body.title =null;
        return new Promise((resolve, reject) => {
            collection.update(
                { 'portfolio._id': objectId('5a950f52c0c35f23e0028026') },
                {
                    $push:
                        { 'tags': obj.body, 'portfolio.$.tags': "5a942f003db90a1dc3f8d455" }
                }
                , (err) => {
                    if (err) {
                        reject({
                            stutus: 'faild',
                            err
                        })
                    } else {
                        resolve({
                            status: ' ok',
                        })
                    }
                })
        })
    }

    edit(req) {
        return new Promise((resolve, reject) => {
            let obj = {
  
            };
            (req.body.title) ? obj['tags.$.title'] = req.body.title : false;
            (req.body.description) ? obj['tags.$.description'] = req.body.description : false;

            collection.update(
                {
                    _id : objectId('5a942f003db90a1dc3f8d457'),
                    'tags._id' : objectId('5a9437cf1469a7260b8857c8') 
                },
            {$set : obj},(err)=>{
                if(err){
                    reject({
                        status : 'faild',
                        err
                    })
                }else{
                    resolve(({
                        status : 'ok'
                    }))
                }
            })
        })
    }

    remove() {
        return new Promise((resolve, reject) => {
            collection.update(
                { 'portfolio._id': objectId('5a942f003db90a1dc3f8d455') },
                {
                    $pull:
                        {'tags':{_id : objectId('5a942f1f3f904f1dda6fb90e')} }
                }, (err) => {
                    if (err) {
                        reject({
                            status: 'faild',
                            err
                        })
                    } else {
                        resolve({
                            status: 'ok',
                        })
                    }
                })
        })
    }
}

module.exports = new TagsService();