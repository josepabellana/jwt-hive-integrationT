const HiveKeyPair = require('@hivestreaming/hive-jwt-auth');

(async function a(){
    const file = 'path/private-key.pem'; // File to save PEM-encoded private key
    const keyPair = await HiveKeyPair.create();
    await keyPair.writePrivateKey(file);



    const partnerId = '9001'; // Partner Id
    const keyId = 'key-id'; // Key Id
    const customerId = 'customer-id'; // Customer Id
    const videoId = 'video-id'; // Event/Video Id
    const manifests = [ 'https://example.com/manifest.m3u8', 'https://www.example.com/manifest.mpd' ] // Manifests
    const expiresIn = '15 minutes'; // Expires in. See documentation of `HiveJwtCreator#sign` for format details.
    const eventName = 'event test name' // Event name
    const jwtCreator = await HiveJwtCreator.create(partnerId, file);
    const jwt = jwtCreator.sign(keyId, customerId, videoId, manifests, expiresIn, eventName)

    console.log(jwt);

})()
