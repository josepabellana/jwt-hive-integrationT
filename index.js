const Express = require('express');
const app = Express();
const dotenv = require('dotenv');
dotenv.config();

const {computePublicKey} = require('./utils/jwtLogic.js');
const Jwt = require('./utils/jwt');

const jwtInstance = new Jwt(process.env.PARTNER_ID, process.env.PARTNER_TOKEN, process.env.ENVIRONMENT);

app.get('/jwtHive', async function(req,res){

    try{
        res.status(200).send(await computePublicKey(jwtInstance));
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