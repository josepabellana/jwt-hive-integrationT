

const axios = require('axios');

let baseURL = `https://api-test.hivestreaming.com/v1`

let client = axios.create({
    baseURL,
    headers: {
        'X-Hive-Partner-Token': 'a758gehgj2hgdw78yd87g321jaa',
        'Content-Type': 'application/json'
    }
});


// let data = client.get(`/publickey/9001?includeDeleted=false`).then(data => console.log(data)); //list all keys
    
let data2 = client.get(`/publickey/9001/key-616`).then(data2=>console.log(data2)).catch(err=>console.log('error'));


//this get should return null in https://github.com/hivestreaming/hive-jwt-auth/blob/master/nodejs/src/lib/HivePublicKeyServiceClient.ts