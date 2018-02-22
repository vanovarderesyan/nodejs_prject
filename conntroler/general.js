const GeneralRouter = require('express').Router();
const GeneralService = require('../service/general.service');

GeneralRouter.get('/',(req,res)=>{
    GeneralService.get()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

GeneralRouter.put('/',(req,res)=>{
    GeneralService.edit(req)
    .then((result)=>{
        res.send((result))
    })
    .catch((err)=>{
        res.send((err));
    })
})

module.exports = GeneralRouter;