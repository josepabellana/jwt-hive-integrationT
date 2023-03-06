const {
  HiveKeyPair,
  HiveJwtCreator,
  HivePublicKeyServiceClient,
} = require("@hivestreaming/hive-jwt-auth");

module.exports = class Jwt {
  constructor(partnerId = "9001", partnerToken = "foobar", endpoint = "prod") {
    this.partnerId = partnerId;
    this.partnerToken = partnerToken;
    this.endpoint = endpoint;
    this.expiration = 1000 * 60 * 60 * 2; //2 hours
    this.file = process.env.FILE_PATH;
    this.keyId = "key-" + Math.floor(Math.random() * 1000);
    this.customerId = process.env.CUSTOMER_ID;
    this.videoID = "video-id";
    this.manifests = JSON.parse(process.env.MANIFESTS);
    this.expiresIn = "15 minutes";
    this.eventName = "event test name";

    this.createPrivateKey();
  }

  async createPrivateKey() {
    const keyPair = await HiveKeyPair.create();
    await keyPair.writePrivateKey(this.file);
  }

  async publishPublicKey() {
    const client = new HivePublicKeyServiceClient(
        this.partnerId,
        this.partnerToken,
        this.endpoint
      );
    let a = await client.get(this.keyId);
    if(a !== undefined && Date.now() < a.expiration){
        return true
    }
    
    this.keyId = "key-" + Math.floor(Math.random() * 1000);
    const keyPair = await HiveKeyPair.readFromFile(this.file);
    const publicKey = keyPair.exportPublicKey();

    await client.create({
      partnerId: this.partnerId,
      expiration: this.expiration,
      keyId: this.keyId,
      ...publicKey,
    });
    return true;
  }

  async createJWT() {
    //CREATE JWT

    const jwtCreator = await HiveJwtCreator.create(partnerId, this.file);
    const jwt = jwtCreator.sign(
      keyId,
      customerId,
      videoId,
      manifests,
      expiresIn,
      eventName
    );
    return jwt;
  }
}
