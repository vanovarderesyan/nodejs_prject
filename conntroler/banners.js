const BannersRouter = require("express").Router();
const BannersService = require('../service/banners.service');
const upload = require('./multer/upload');
const validateBanners = require('./middleware_validate/banners.validate');

BannersRouter.use('/',upload.upload.single('file'),(req,res,next)=>{
    console.log('upload');
    validateBanners(req,res,next);
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

BannersRouter.post('/add/file', (req, res) => {
    console.log('post upload')
    BannersService.addFile(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
});

BannersRouter.delete('/remove',(req,res)=>{
    BannersService.remove(req.body.id)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
});

BannersRouter.put('/object',(req,res)=>{
    BannersService.edit(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})

BannersRouter.put('/file',(req,res)=>{
    BannersService.editFile(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})


module.exports = BannersRouter;
