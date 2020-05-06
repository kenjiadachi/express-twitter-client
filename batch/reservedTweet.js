
var fs = require('fs');
const path = require('path');
const twitter = require('../func/twitter');
const filename = path.join( __dirname, '../data/', 'settings.json');
const log4js = require('log4js');
log4js.configure('./log4js.config.json');
const systemLogger = log4js.getLogger('system');

// main(reservedTweet, userID);

async function main(reservedTweet, userID){
  systemLogger.info("reservedTweet start!");
  const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
  // もし、settings.jsonのなかに、jsonFileの名前がIDとして存在すれば
  if(jsonObject.findIndex((v) => v.id === userID) != -1) {
    const settingData = jsonObject.find((v) => v.id === userID);
    // そのオブジェクトの中に、token, tokenSecertが存在すれば
    if (Object.keys(settingData).indexOf('token') !== -1 && Object.keys(settingData).indexOf('tokenSecret') !== -1) {

      const client = twitter.initWithToken(settingData.token, settingData.tokenSecret);
      let mediaIdArray = [];

      if (Object.keys(reservedTweet).indexOf('media') !== -1) {
        for (let url of reservedTweet.media.split(',')) {
          let options = {};
          options.media = fs.readFileSync(path.join( __dirname, '../uploads/', url));
          try {
            await client.post('media/upload', options)
            .then((res) => {
              systemLogger.info(userID + " uploads media " + url);
              mediaIdArray.push(res.media_id_string);
            });
          } catch (err) {
            systemLogger.error(err);
          }
        }
      }

      let options = {};
      options.media_ids = mediaIdArray.join(',');
      options.status = reservedTweet.text;
      try {
        await client.post('statuses/update', options)
        .then(() => {
          systemLogger.info(userID + " tweets " + reservedTweet.text);
        });
      } catch (err) {
        systemLogger.error(err);
      }
    }
  }
}


module.exports = {
  main: main,
};
