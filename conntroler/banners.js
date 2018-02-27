const BannersRouter = require("express").Router();
const BannersService = require('../service/banners.service');
const upload = require('./multer/upload');


const validateBanners = require('./middleware_validate/banners.validate');
BannersRouter.use('/',(req,res,next)=>{
    validateBanners(req,res,next);
})
BannersRouter.use('/:id',(req,res,next)=>{
    console.log(req.params.id);
    next();
})


BannersRouter.get('/:languege', (req, res) => {
    BannersService.get(req.params.languege)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    });
});

BannersRouter.get('/', (req, res) => {
    BannersService.getAll()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.send(err);
        })
});

BannersRouter.post('/add', (req, res) => {
    BannersService.addObject(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
});

BannersRouter.post('/add/file',upload.upload.array('photos', 12), (req, res) => {
    BannersService.addObjectAndFile(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
});

BannersRouter.delete('/',(req,res)=>{
    BannersService.remove(req.body.id)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
});

BannersRouter.put('/',(req,res)=>{
    BannersService.edit(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

BannersRouter.put('/file',upload.upload.single('file'),(req,res)=>{
    BannersService.editFile(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})


module.exports = BannersRouter;
