const BannersRouter = require("express").Router();
const BannersService = require('../service/banners.service');

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

BannersRouter.post('/add', (req, res) => {
    BannersService.add(req.body)
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
})


module.exports = BannersRouter;
