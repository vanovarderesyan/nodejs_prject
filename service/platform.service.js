import { resolve } from 'path';

const db = require('../database/db');
const collection = db.get('information');
const objectId = require('mongodb').ObjectId;

class PlatformService{
    add(){
        return new Promise((resolve,reject)=>{
            collection.update({},{},(err)=>{
                if(err){
                    reject({
                        stutus : 'faild',
                        err
                    })
                }else{
                    resolve({
                        status :' ok',
                    })
                }
            })
        })
    }

    edit(){
        return new Promise((resolve,reject)=>{
            collection.update()
        })
    }

    remove(){
        return new Promise((resolve,reject)=>{
            collection.remove({},{},(err)=>{
                if(err){
                    reject({
                        status : 'faild',
                        err
                    })
                }else{
                    resolve({
                        status : 'ok',
                    })
                }
            })
        })
    }
}

module.exports = new PlatformService();