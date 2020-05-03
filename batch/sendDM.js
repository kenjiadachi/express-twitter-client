
var fs = require('fs');
const path = require('path');
const twitter = require('../func/twitter');
const diff = require('../func/diff');
const saveToLogs = require('../func/saveToLogs');
const COUNT = 3;

sendDM();

async function sendDM(){
  const filename = path.join( __dirname, '../data/', 'settings.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){

      var forAPIlist = [];

      // アイテムの中に、tokenとtokenSecret、messageが含まれるか
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1 && Object.keys(item).indexOf('message') !== -1){
        // tokenとtokenSecretが含まれれば、twitter APIを叩く準備をする
        const client = twitter.initWithToken(item.token, item.tokenSecret);

        // keywordsがitemの中に存在すれば
        if(Object.keys(item).indexOf('keywords') !== -1){
          // 分割
          const keywords = item.keywords.split(',');

          // それぞれのkeywordに対して
          for (var keyword of keywords){
            let options = {};
            options.q = keyword + " -RT";
            options.count = COUNT;

             // APIを叩く
             try {
              await client.get('search/tweets', options)
              .then((res) => {
                for (var tweet of res.statuses) {
                  if(tweet.length != 0) {
                    var tmpObj = {
                      userID: tweet.user.id_str,
                      followersCount: tweet.user.followers_count,
                      keyword: options.q
                    };
                    forAPIlist.push(tmpObj);
                  }
                }
              });

              await client.get('users/search', options)
              .then((res) => {
                for (var user of res) {
                  if(user.length != 0) {
                    var tmpObj = {
                      userID: user.id_str,
                      followersCount: user.followers_count,
                      keyword: options.q
                    };
                    forAPIlist.push(tmpObj);
                  }
                }
              });
            } catch (err) {
              console.log(err);
            }
          }
        }

        // ここでListに対してAPI叩く
        const uniqueList = filterUniqueItemsByUserID(forAPIlist);
        let jsonfile = path.join( __dirname, '../data/ffs/', item.id + '.json');
        if(fs.existsSync(jsonfile)){
          // 最新のフォロワーに含まれていないようにする
          let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
          let latest_follows = (Object.values(ffsObject)).slice(-1)[0].follows;
          let unfollowingUsers = diff.OnlyObject1(uniqueList, "userID", latest_follows, "id_str");

          // minFollowerが設定されていれば、それに満たないfollowersCountの人を除く
          if (Object.keys(item).indexOf('minFollower') !== -1) {
            unfollowingUsers = unfollowingUsers.filter(it => it.followersCount >= item.minFollower);
          }

          let client2 = twitter.initByTwitWithToken(item.token, item.tokenSecret);

          // APIを叩く
          for (var obj of unfollowingUsers) {
            let options = {
              event: {
                type: "message_create",
                message_create: {
                  target: {
                    recipient_id: obj.userID
                  },
                  message_data: {
                    text: item.message
                  }
                }
              }
            };
            try {
              await client2.post('direct_messages/events/new', options)
              .then((res) => {
                console.log("DMしました！");
                saveToLogs.dm (item.id, obj.keyword, item.message, res);
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    }
  } else{
    console.log("json file does not exist");
  }
}

// IE11でも使える（Babel + polyfill 未使用）
function filterUniqueItemsByUserID (array) {
  // idを集約した配列を作成
  const itemIds = array.map(function(item) {
    return item.userID;
  });
  // 
  return array.filter(function(item, index) {
    return itemIds.indexOf(item.userID) === index;
  });
}

module.exports = {
  sendDM: sendDM,
};