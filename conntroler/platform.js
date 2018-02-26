const PlatformRouter = require('express').Router();
const PlatformService = require('../service/platform.service');


PlatformRouter.post('/',(req,res)=>{
    PlatformService.add()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PlatformRouter.put('/',(req,res)=>{
    PlatformService.edit()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PlatformRouter.delete('/',(req,res)=>{
    PlatformService.remove()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

module.exports = PlatformRouter;