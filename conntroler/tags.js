const TagsRouter = require('express').Router();
const TagsService = require('../service/tags.service');


TagsRouter.post('/',(req,res)=>{
    TagsService.add()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

TagsRouter.put('/',(req,res)=>{
    TagsService.edit()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

TagsRouter.delete('/',(req,res)=>{
    TagsService.remove()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

module.exports = TagsRouter;