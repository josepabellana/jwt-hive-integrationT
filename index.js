const Express = require('express');
const app = Express();
var cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

app.use(cors())
app.use(bodyParser.json());

const Jwt = require('./utils/jwt');

const jwtInstance = new Jwt(process.env.PARTNER_ID, process.env.PARTNER_TOKEN, process.env.ENVIRONMENT);
jwtInstance.init();

app.post('/jwtHive', async function(req,res){
    const {manifest, videoId} = req.body;
    try{
        if(jwtInstance.checkJwtUTD()){
            let jwt = await jwtInstance.getJwt();
            console.log('Jwt reused:', jwt.slice(-20));
            res.status(200).send({jwt});
        }else{
            jwtInstance.updateInfo(manifest,videoId);
            await jwtInstance.publishPublicKey();
            let jwt =  await jwtInstance.createJWT();
            console.log('New jwt created:', jwt.slice(-20))
            res.status(200).send({jwt});
        }
    }catch(err){
        console.log('Error', err)
        res.status(500).send(`Internal Server Error: ${err}`)
    }
});

app.listen(3000,function (){
    try{
        console.log(`connected to port ${3000}`);
    }catch(err){
        console.log(err);
    }
});