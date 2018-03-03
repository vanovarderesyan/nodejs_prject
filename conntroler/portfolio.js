const PortfolioRouter = require('express').Router();
const PortfolioService = require('../service/portfolio.service');
const upload = require('./multer/upload');
const validatePortfolio = require('./middleware_validate/portfolio.validate');

PortfolioRouter.use('/',upload.upload.single('file'),(req,res,next)=>{
    validatePortfolio(req,res,next);
})

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

PortfolioRouter.post('/add',(req,res)=>{
    PortfolioService.add('portfolio',req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.post('/add/file',(req,res)=>{
    console.log(req.body.id)
    PortfolioService.addFile('portfolio',req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.put('/edit/object',(req,res)=>{
    PortfolioService.edit(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.put('/edit/file',(req,res)=>{
    PortfolioService.editFile(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.delete('/remove',(req,res)=>{
    PortfolioService.remove('portfolio',req.body.id)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

PortfolioRouter.delete('/remove/tags',(req,res)=>{
    PortfolioService.removeTagsByValue(req.body.value)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})
PortfolioRouter.delete('/remove/platform',(req,res)=>{

})
module.exports = PortfolioRouter;