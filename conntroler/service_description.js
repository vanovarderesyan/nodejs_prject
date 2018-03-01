const ServiceDescriptionRouter = require('express').Router();
const ServiceDescriptionService = require('../service/service.description.service');
const validateServiceDescription = require('./middleware_validate/service.description.validate');

ServiceDescriptionRouter.use('/',(req,res,next)=>{
    validateServiceDescription(req,res,next);
})

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

ServiceDescriptionRouter.put('/edit',(req,res)=>{
    ServiceDescriptionService.put(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceDescriptionRouter.delete('/remove',(req,res)=>{

})

module.exports = ServiceDescriptionRouter;