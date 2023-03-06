const {
  HiveKeyPair,
  HiveJwtCreator,
  HivePublicKeyServiceClient,
} = require("@hivestreaming/hive-jwt-auth");

module.exports = class jwt {
  constructor(partnerId = "9001", partnerToken = "foobar", endpoint = "prod") {
    this.partnerId = partnerId;
    this.partnerToken = partnerToken;
    this.endpoint = endpoint;
    this.expiration = 1000 * 60 * 60 * 2; //2 hours
    this.privateKey = this.createPrivateKey();
    this.keyId = "key-" + Math.floor(Math.random() * 1000);
    this.customerId = "15";
    this.videoID = "video-id";
    (this.manifests = [
      "https://streaming-simulator-prod.hivestreaming.com/generic/live/beta-big-bunny-multi/manifest.m3u8",
    ]),
      (this.expiresIn = "15 minutes");
    this.eventName = "event test name";
  }

  async createPrivateKey() {
    const file = "path/private-key.pem"; // File to save PEM-encoded private key

    const keyPair = await HiveKeyPair.create();
    await keyPair.writePrivateKey(file);

    return keyPair;
  }

  async publishPublicKey() {
    
    const keyPair = await HiveKeyPair.readFromFile(file);
    const publicKey = keyPair.exportPublicKey();

    const client = new HivePublicKeyServiceClient(
      this.partnerId,
      this.partnerToken,
      this.endpoint
    );

    await client.create({
      partnerId: this.partnerId,
      expiration: this.expiration,
      keyId,
      ...publicKey,
    });
    return true;
  }

  async createJWT() {
    //CREATE JWT

    const jwtCreator = await HiveJwtCreator.create(partnerId, file);
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
