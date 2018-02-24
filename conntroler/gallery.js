const GalleryRouter = require('express').Router();
const GalleryService = require('../service/gallery.service');

GalleryRouter.post('/',(req,res)=>{
    GalleryService.add(req.body,'5a91a5e4f609912010044acf')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{

    })
})

GalleryRouter.put('/',(req,res)=>{
    GalleryService.edit()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

GalleryRouter.delete('/',(req,res)=>{
    GalleryService.remove('5a91a5e4f609912010044acf','5a91ae1eb1e59525d92eea36')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

module.exports = GalleryRouter;