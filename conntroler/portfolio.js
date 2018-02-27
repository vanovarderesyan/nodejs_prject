const PortfolioRouter = require('express').Router();
const PortfolioService = require('../service/portfolio.service');
const upload = require('./multer/upload');

PortfolioRouter.get('/:languege',(req,res)=>{
    PortfolioService.get(req.params.languege)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.get('/',(req,res)=>{
    PortfolioService.getAll()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.post('/',(req,res)=>{
    PortfolioService.add('portfolio',req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.post('/file',upload.upload.single('file'),(req,res)=>{
    PortfolioService.addFile('portfolio',req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.put('/:id',(req,res)=>{
    PortfolioService.edit(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.put('/edit/file',upload.upload.single('file'),(req,res)=>{
    PortfolioService.editFile(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.delete('/',(req,res)=>{
    PortfolioService.remove('portfolio',req.body.id)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.delete('/tags',(req,res)=>{
    PortfolioService.removeTagsByValue(req.body.id)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})
module.exports = PortfolioRouter;