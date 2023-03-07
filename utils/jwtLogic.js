
async function computePublicKey(jwtInstance) {
  

    //publish Public Key
    
    let res = await jwtInstance.publishPublicKey();
    console.log(res);
    let jwt = await jwtInstance.createJWT();
    console.log('jwt:', jwt)
    return jwt;
}

exports.computePublicKey = computePublicKey;
