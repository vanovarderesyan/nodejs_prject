const ServiceRouter = require('express').Router();
const ServiveService = require('../service/service.service');
const upload = require('./multer/upload');

ServiceRouter.get('/:languege',(req,res)=>{
    ServiveService.get(req.params.languege)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceRouter.get('/',(req,res)=>{
    ServiveService.getAll()
    .then((result)=>{
        console.log(result.result);
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceRouter.delete('/',(req,res)=>{
    ServiveService.remove(req.body.id)
    .then((result)=>{
        console.log(result.result);
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceRouter.post('/add',(req,res)=>{
    ServiveService.addObject(req)
    .then((result)=>{
        console.log(result.result);
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceRouter.post('/add/file',upload.upload.single('file'),(req,res)=>{
    ServiveService.addObjectAndFile(req)
    .then((result)=>{
        console.log(result.result);
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceRouter.put('/file',upload.upload.single('file'),(req,res)=>{
    ServiveService.addFile(req)
    .then((result)=>{
        console.log(result.result);
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

ServiceRouter.put('/',(req,res)=>{
    ServiveService.edit(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

module.exports = ServiceRouter;