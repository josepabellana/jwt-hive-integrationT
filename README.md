# jwt-hive-integrationT

This test is used to provide a succinct example of the integration to the Hive plug-in using HTML5 and Video.js Player


First, install dependencies and ask for the necessary env variables(for testing reasons, the only variable that does not have a fallback value is the partnerToken)
'''
npm install
'''

To run the server:
'''
npm start
'''

Now you just need to open the html file with a live server


Via command 

> hive-jwt-util create-jwt --file path/private-key.pem --partnerId 9001 --customerId 15 --videoId video-id --keyId key-id --regexes "movingimage.*(\\/.*\\.ts|\\/.*\\.m3u8|.*\\.mp4)" --expiresIn "15 minutes" -n "MovingImageTest"