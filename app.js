const express = require('express');
const app = express();
const api = require('./conntroler/api');

app.listen(3000,()=>{
    console.log('port listen');
})

api.initApp(app);
