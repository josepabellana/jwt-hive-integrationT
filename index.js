const Express = require('express');
const app = Express();
const {computePublicKey} = require('./utils/jwtLogic.js');

app.get('/jwtHive', async function(req,res){
    res.send(await computePublicKey(req.body));
});

app.listen(3001,function (){
    try{
        console.log(`connected to port ${3001}`);
    }catch(err){
        console.log(err);
    }
});