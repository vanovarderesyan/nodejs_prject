const GeneralRouter = require('express').Router();
const GeneralService = require('../service/general.service');
const validateGeneral = require('./middleware_validate/general.validate');

GeneralRouter.use('/',(req,res,next)=>{
    validateGeneral(req,res,next);
})

GeneralRouter.get('/',(req,res)=>{
    GeneralService.get()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

GeneralRouter.put('/edit',(req,res)=>{
    GeneralService.edit(req)
    .then((result)=>{
        res.send((result))
    })
    .catch((err)=>{
        res.send((err));
    })
})

module.exports = GeneralRouter;