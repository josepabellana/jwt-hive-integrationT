
async function computePublicKey(jwtInstance) {
  
    //publish Public Key
    await jwtInstance.publishPublicKey();
    let jwt =  await jwtInstance.createJWT();
    return jwt;
}

exports.computePublicKey = computePublicKey;
