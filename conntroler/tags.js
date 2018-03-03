const TagsRouter = require('express').Router();
const TagsService = require('../service/tags.service');


TagsRouter.post('/add',(req,res)=>{
    TagsService.add(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

TagsRouter.put('/edit',(req,res)=>{
    TagsService.edit(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

TagsRouter.delete('/remove',(req,res)=>{
    TagsService.remove()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

module.exports = TagsRouter;