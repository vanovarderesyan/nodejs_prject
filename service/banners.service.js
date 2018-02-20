const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectID;

class BannersService {
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
                    if(listTrueLanguge.length){
                        res(
                            listTrueLanguge
                        )
                    }else{
                        res({status:'not found'});
                    }
                }
            })
        })

    }

    getAll() {
        if(collection.manager._state === 'open'){
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
        }else{
            return new Promise((res,rej)=>{
                let err = new Error();
                if(err){
                    rej({
                        status : 'faild',
                        err : 'can not start mongodb'
                    })
                }
            })
        }
    }

    add(obj) {
        return new Promise((res,rej)=>{
            collection.update({},{$push : {banners : obj}},(err)=>{
                if(err){
                    rej({
                        status : 'faild',
                        err
                    })
                }else{
                    res({
                        status : 'ok'
                    })
                }
            })
        })
    }

    remove(id) {
        return new Promise((res,rej)=>{
            collection.update({},{$pull: {banners :{_id : objectId(id)}}},(err)=>{
                if(err){
                    rej({
                        status : 'faild',
                        err
                    })
                }else{
                    res({
                        status : 'ok'
                    })
                }
            })
        })
    }

    edit(req) {
        return new Promise((res,rej)=>{
            collection.apdate()
        })
    }
}

module.exports = new BannersService();