const Express = require('express');
const app = Express();
const {computePublicKey} = require('./utils/jwtLogic.js');
const jwt = require('./utils/jwt');

const jwtInstance = new jwt('9001', 'a758gehgj2hgdw78yd87g321jaa', 'prod');
app.get('/jwtHive', async function(req,res){
    console.log(jwtInstance)
    try{
        res.status(200).send(await computePublicKey(req.body));
    }catch(err){
        res.status(500).send(`Internal Server Error: ${err}`)
    }
});

app.listen(3001,function (){
    try{
        console.log(`connected to port ${3001}`);
    }catch(err){
        console.log(err);
    }
});