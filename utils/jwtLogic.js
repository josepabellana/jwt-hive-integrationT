const {
  HiveKeyPair,
  HiveJwtCreator,
  HivePublicKeyServiceClient,
} = require("@hivestreaming/hive-jwt-auth");
const moment = require('moment');
var prevKey = 0;
async function computePublicKey(data) {
  

  //PUBLISH PUBLIC KEY+
  const partnerId = "9001"; // Partner Id
  
  const partnerToken = "a758gehgj2hgdw78yd87g321jaa"; // Partner Token
  const endpoint = "test"; // Endpoint: 'test' or 'prod'. Default if none provided: 'prod'
  console.log("here");
  const expiration = moment().add(2,'minutes').unix(); // Expiration. See documentation of `HivePublicKeyServiceClient#create` for format details.
  console.log(expiration);
 
  try {
  const client = new HivePublicKeyServiceClient(
    partnerId,
    partnerToken,
    endpoint
  );
  console.log("hey", { publicKey, client });
  let a = await client.get(prevKey);
  console.log(a);
  if(a !== undefined && Date.now() < a.expiration){
    const publicKey = a;
    const keyId = prevKey;
  }else{
    const keyId = "test" + Math.floor(Math.random()*1000); // Key Id
    const publicKey = keyPair.exportPublicKey();
    await client.create({
      partnerId,
      expiration,
      keyId,
      ...publicKey,
    });
  }
    //CREATE JWT
    const customerId = "15"; // Customer Id
    const videoId = "video-id"; // Event/Video Id
    const manifests = [
      "https://streaming-simulator-prod.hivestreaming.com/generic/live/beta-big-bunny-multi/manifest.m3u8",
    ]; // Manifests
    const expiresIn = "15 minutes"; // Expires in. See documentation of `HiveJwtCreator#sign` for format details.
    const eventName = "event test name"; // Event name
        //CREATE PRIVATE KEY
    
    const jwtCreator = await HiveJwtCreator.create(partnerId, file);
    const jwt = jwtCreator.sign(
      keyId,
      customerId,
      videoId,
      manifests,
      expiresIn,
      eventName
    );
    prevKey = keyId;

    return jwt;

  } catch (err) {

    console.log(err);
    return err;
  }
}

exports.computePublicKey = computePublicKey;
