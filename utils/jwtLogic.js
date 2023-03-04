import {
  HiveKeyPair,
  HiveJwtCreator,
  HivePublicKeyServiceClient,
} from "@hivestreaming/hive-jwt-auth";

export async function computePublicKey(data) {
  const file = "path/private-key.pem"; // File to save PEM-encoded private key
  const keyPair = await HiveKeyPair.create();
  await keyPair.writePrivateKey(file);

  const partnerId = "9001"; // Partner Id
  const keyId = "key-id"; // Key Id
  const customerId = "customer-id"; // Customer Id
  const videoId = "video-id"; // Event/Video Id
  const manifests = [
    "https://example.com/manifest.m3u8",
    "https://www.example.com/manifest.mpd",
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

  const partnerToken = "foobar"; // Partner Token
  const endpoint = "prod"; // Endpoint: 'test' or 'prod'. Default if none provided: 'prod'
  const expiration = 30; // Expiration. See documentation of `HivePublicKeyServiceClient#create` for format details.

  const publicKey = keyPair.exportPublicKey();

  const client = new HivePublicKeyServiceClient(
    partnerId,
    partnerToken,
    endpoint
  );

  await client.create({
    partnerId,
    expiration,
    keyId,
    ...publicKey,
  });

  // const hivePluginOptions = {
  //   debugLevel: "debug",
  //   hiveTechOrder: ["HiveJava", "HiveJS", "StatsJS"],
  //   playerName: "",
  //   playerVersion: "",
  // };
  const plugin = new HiveHtml5(player, options);

  plugin
    .initSession({
      jwt: jwt,
      videoId: videoId,
      manifest: manifests[0],
    })
    .then((session) => {
      enableHiveXhr(plugin, player);
      // load player source according to player API
      player.load(session.manifest);
    });
}
