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
    this.videoId = "video-id";
    this.manifests = JSON.parse(process.env.MANIFESTS);
    this.expiresIn = 1000 * 60 * 30;  // 30 m
    this.eventName = "event test name";
    this.client = new HivePublicKeyServiceClient(
        this.partnerId,
        this.partnerToken,
        this.endpoint
      );
  }
  async init(){
        await this.createPrivateKey();
  }
  async createPrivateKey() {
    const keyPair = await HiveKeyPair.create();
    await keyPair.writePrivateKey(this.file);
  }
  updateInfo(manifest, videoId){
    this.manifests = [manifest];
    this.videoId = videoId;
  }
  async publishPublicKey() {
    try{
        //Three possibilities: 1- Key exists and its uptoDate 2- Key exists and not up to date 3-Key does not exist
        try{
            let a = await this.client.get(this.keyId);
            if(Date.now() < a.expiration){
                return true;
            }
        }catch(err){
            this.keyId = "key-" + Math.floor(Math.random() * 1000);
            
            const keyPair = await HiveKeyPair.readFromFile(this.file);
            const publicKey = keyPair.exportPublicKey();

            await this.client.create({
            partnerId: this.partnerId,
            expiration: Date.now() + this.expiration,
            keyId: this.keyId,
            ...publicKey,
            });
            return true;
        }
    }catch(err){
        console.log(err);
    }
  }

  async createJWT() {
    //CREATE JWT
    const jwt = HiveJwtCreator.create(this.partnerId, this.file).then(prom => prom.sign(
        this.keyId,
        this.customerId,
        this.videoId,
        this.manifests,
        this.expiresIn,
        this.eventName
    ));
    this.currentJWT = jwt;
    this.expirationJWT = Date.now() + this.expiresIn;
    return jwt;
  }
}
