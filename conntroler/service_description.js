const ServiceDescriptionRouter = require('express').Router();
const ServiceDescriptionService = require('../service/service.description.service');


ServiceDescriptionRouter.get('/:languege',(req,res)=>{
    ServiceDescriptionService.get(req.params.languege)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceDescriptionRouter.post('/',(req,res)=>{
    ServiceDescriptionService.post(req.body.languege,req.body)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceDescriptionRouter.put('/',(req,res)=>{
    ServiceDescriptionService.put(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceDescriptionRouter.delete('/',(req,res)=>{

})

module.exports = ServiceDescriptionRouter;