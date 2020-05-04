
var fs = require('fs');
const path = require('path');
// const diff = require('../func/diff');
const twitter = require('../func/twitter');
// const saveToLogs = require('../func/saveToLogs');
const filename = path.join( __dirname, '../data/', 'settings.json');

// let reservedTweet = {};
// reservedTweet.media = [path.join( __dirname, '../uploads/', '1.png'), path.join( __dirname, '../uploads/', '2.png')];
// reservedTweet.text = "やっぱり三浦大知はよき。何回でも見てまう。\nhttps://youtu.be/Q1VkAyhqgMM ";
// // reservedTweet.text = "やっぱり三浦大知はよき。何回でも見てまう。";
// reservedTweet.isPublished = false;

// const userID = "749128445167214593";


// main(reservedTweet, userID);



async function main(reservedTweet, userID){
  if (reservedTweet.isPublished == false) {
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    // もし、settings.jsonのなかに、jsonFileの名前がIDとして存在すれば
    if(jsonObject.findIndex((v) => v.id === userID) != -1) {
      const settingData = jsonObject.find((v) => v.id === userID);
      // そのオブジェクトの中に、token, tokenSecertが存在すれば
      if (Object.keys(settingData).indexOf('token') !== -1 && Object.keys(settingData).indexOf('tokenSecret') !== -1) {

        const client = twitter.initWithToken(settingData.token, settingData.tokenSecret);
        let mediaIdArray = [];

        if (Object.keys(reservedTweet).indexOf('media') !== -1) {
          for (let url of reservedTweet.media) {
            let options = {};
            options.media = fs.readFileSync(url);
            try {
              await client.post('media/upload', options)
              .then((res) => {
                console.log(res);
                mediaIdArray.push(res.media_id_string);
              });
            } catch (err) {
              console.log(err);
            }
          }
        }

        let options = {};
        options.media_ids = mediaIdArray.join(',');
        options.status = reservedTweet.text;
        try {
          await client.post('statuses/update', options)
          .then((res) => {
            console.log(res);
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}


module.exports = {
  main: main,
};
