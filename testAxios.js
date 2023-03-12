

const axios = request('axios');

let baseURL = `https://api-test.hivestreaming.com/v1`

let client = axios.create({
    baseURL,
    headers: {
        'X-Hive-Partner-Token': 'a758gehgj2hgdw78yd87g321jaa',
        'Content-Type': 'application/json'
    }
});





let data = client.get(`/publickey/9001?includeDeleted=false`).then(data => data.json());
    
