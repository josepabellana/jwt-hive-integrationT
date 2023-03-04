const Express = require('express');
const app = Express();



app.listen(3001,function (){
    try{
        console.log(`connected to port ${3001}`);
    }catch(err){
        console.log(err);
    }
})