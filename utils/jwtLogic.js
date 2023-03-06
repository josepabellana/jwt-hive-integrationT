const {
  HiveKeyPair,
  HiveJwtCreator,
  HivePublicKeyServiceClient,
} = require("@hivestreaming/hive-jwt-auth");

async function computePublicKey(data) {
    //CREATE PRIVATE KEY
  const file = "path/private-key.pem"; // File to save PEM-encoded private key
  const keyPair = await HiveKeyPair.create();
  await keyPair.writePrivateKey(file);

  //CREATE JWT
  const partnerId = "9001"; // Partner Id
  const keyId = "key-id"; // Key Id
  const customerId = "15"; // Customer Id
  const videoId = "video-id"; // Event/Video Id
  const manifests = [
    'https://streaming-simulator-prod.hivestreaming.com/generic/live/beta-big-bunny-multi/manifest.m3u8'
  ]; // Manifests
  const expiresIn = "15 minutes"; // Expires in. See documentation of `HiveJwtCreator#sign` for format details.
  const eventName = "event test name"; // Event name
  const jwtCreator = await HiveJwtCreator.create(partnerId, file);
  const jwt = jwtCreator.sign(
    keyId,
    customerId,
    videoId,
    manifests,
    expiresIn,
    eventName
  );

  console.log(jwt);

  //PUBLISH PUBLIC KEY
  const partnerToken = "a758gehgj2hgdw78yd87g321jaa"; // Partner Token
  const endpoint = "test"; // Endpoint: 'test' or 'prod'. Default if none provided: 'prod'
  const expiration = '99999999999999999999'; // Expiration. See documentation of `HivePublicKeyServiceClient#create` for format details.

  const publicKey = keyPair.exportPublicKey();

  const client = new HivePublicKeyServiceClient(
    partnerId,
    partnerToken,
    endpoint
  );

  console.log(client);
  try{
    //   await client.create({
    //       partnerId,
    //       expiration,
    //       keyId,
    //       ...publicKey,
    //   });
    let a = await client.get(keyId);
    console.log(a);
    return jwt;
  }catch(err){
    console.log(err);
    return err;
  }
  
}


exports.computePublicKey = computePublicKey;