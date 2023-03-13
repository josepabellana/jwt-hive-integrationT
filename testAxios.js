const axios = require('axios');

let baseURL = `https://api-test.hivestreaming.com/v1`

let client = axios.create({
    baseURL,
    headers: {
        'X-Hive-Partner-Token': 'a758gehgj2hgdw78yd87g321jaa', //insert your partner token
        'Content-Type': 'application/json'
    }
});

// client.get(`/publickey/9001?includeDeleted=false`).then(data => console.log(data)); //list all keys   
client.get(`/publickey/9001/key-616`).then(data2=>console.log(data2)).catch(err=>console.log('error')); // get one specific key


let info = {
    /** Partner Id */
    partnerId: '9001',
    /** Key Id */
    keyId: 'key-100',
    /** Public key exponent */
    exponent: string,
    /** Public key odulus */
    modulus: string,
    /** Expiration as a timestamp representing seconds since 1 January 1970
     * 00:00:00 UTC */
    expiration: Date.now() + 1000*60*2, //Two seconds from now
}
this.client.post('/publickey', info)

//this get should return null in https://github.com/hivestreaming/hive-jwt-auth/blob/master/nodejs/src/lib/HivePublicKeyServiceClient.ts