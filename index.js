const Express = require('express');
const app = Express();
var cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

app.use(cors())
app.use(bodyParser.json());

const {computePublicKey} = require('./utils/jwtLogic.js');
const Jwt = require('./utils/jwt');

const jwtInstance = new Jwt(process.env.PARTNER_ID, process.env.PARTNER_TOKEN, process.env.ENVIRONMENT);


app.get('/jwtHive', async function(req,res){

    console.log(jwtInstance)
    try{
        await jwtInstance.init();
        let newJwt = await computePublicKey(jwtInstance)
        res.status(200).send({newJwt});
    }catch(err){
        res.send(`Internal Server Error: ${err}`)
    }
});

app.listen(3000,function (){
    try{
        console.log(`connected to port ${3000}`);
    }catch(err){
        console.log(err);
    }
});