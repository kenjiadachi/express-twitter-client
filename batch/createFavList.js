
var fs = require('fs');
const path = require('path');
const format = require('../func/format');
const twitter = require('../func/twitter');
const saveToLogs = require('../func/saveToLogs');
const sleep = require('../func/sleep');

const COUNT = 10;

// main();

async function main(){
  const filename = path.join( __dirname, '../data/', 'settings.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){
      // アイテムの中に、tokenとtokenSecretが含まれるか
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1){
        let jsonfile = path.join( __dirname, '../data/ffs/', item.id + '.json');
        if(fs.existsSync(jsonfile)){

          let forLogs = [];

          // ffsにid.jsonがあれば最新のfollowerを取得してforAPIListに追加
          let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
          let latest_followers = (Object.values(ffsObject)).slice(-1)[0].followers;
          
          // tokenとtokenSecretが含まれれば、twitter APIを叩く準備をする
          const client = twitter.initWithToken(item.token, item.tokenSecret);

          for(var follower of latest_followers){
            let logObj = {};
            logObj.user_id = follower.id_str;
            logObj.likes = [];

            let options = {};
            options.user_id = follower.id_str;
            options.count = COUNT;

            // APIを叩く
            try {
              await sleep.sleep(15000);
              await client.get('favorites/list', options)
              .then((res) => {
                for(var tweet of res){
                  logObj.likes.push(format.tweet(tweet));
                }
                forLogs.push(logObj);
              });
            } catch (err) {
              console.log(err);
            }
          }
          saveToLogs.followerLikes(item.id, forLogs);
        }
      }
    }
  } else {
    console.log("json file does not exist");
  }
}

module.exports = {
  main: main,
};
