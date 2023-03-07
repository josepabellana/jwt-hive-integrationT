const Express = require('express');
const app = Express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();


app.use(bodyParser.json());

const {computePublicKey} = require('./utils/jwtLogic.js');
const Jwt = require('./utils/jwt');

const jwtInstance = new Jwt(process.env.PARTNER_ID, process.env.PARTNER_TOKEN, process.env.ENVIRONMENT);


app.post('/jwtHive', async function(req,res){
    let {videoId, manifest} = req.body;
    try{
        res.status(200).send(await computePublicKey(jwtInstance));
    }catch(err){
        res.status(500).send(`Internal Server Error: ${err}`)
    }
    res.end();
});

app.listen(3000,function (){
    try{
        console.log(`connected to port ${3000}`);
    }catch(err){
        console.log(err);
    }
});