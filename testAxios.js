

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
    
let data2 = client.get(`/publickey/9001/key-617`).then(data2=>console.log(data2.text())).catch(err=>console.log('error'));