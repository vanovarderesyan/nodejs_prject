const BannersRouter = require("express").Router();
const BannersService = require('../service/banners.service');
const upload = require('./multer/upload');

BannersRouter.get('/:languge', (req, res) => {
    BannersService.get(req.params.languge)
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
            console.log(result.result);
            res.send(result);
        })
        .catch((err)=>{
            res.send(err);
        })
});

BannersRouter.post('/add',upload.upload.single('file'), (req, res) => {
    BannersService.add(req)
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

BannersRouter.put('/',upload.upload.single('file'),(req,res)=>{
    BannersService.edit(req)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    })
})


module.exports = BannersRouter;
