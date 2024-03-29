var fs = require('fs');
const path = require('path');
const twitter = require('../func/twitter');
const saveToLogs = require('../func/saveToLogs');
const diff = require('../func/diff');
const COUNT = 3;
const log4js = require('log4js');
log4js.configure('./log4js.config.json');
const systemLogger = log4js.getLogger('system');

// main();

async function main(){
  systemLogger.info("auto follow start!");
  const filename = path.join( __dirname, '../data/', 'settings.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){

      var forAPIlist = [];

      // アイテムの中に、tokenとtokenSecretが含まれるか
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1){
        // tokenとtokenSecretが含まれれば、twitter APIを叩く準備をする
        const client = twitter.initWithToken(item.token, item.tokenSecret);

        // keywordsがitemの中に存在すれば
        if(Object.keys(item).indexOf('keywords') !== -1){
          // 分割
          var keywords = item.keywords.split(',');

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
                      keyword: options.q
                    };
                    forAPIlist.push(tmpObj);
                  }
                }
              });
            } catch (err) {
              systemLogger.error(err);
            }
          }
        }
        if(Object.keys(item).indexOf('accounts') !== -1){
          var accounts = item.accounts.split(',');
          for (var account of accounts){
            let jsonfile = path.join( __dirname, '../data/ffs/', account + '.json');

            if(fs.existsSync(jsonfile)){
                // ffsにid.jsonがあれば最新のfollowerを取得してforAPIListに追加
                let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
                let latest_followers = (Object.values(ffsObject)).slice(-1)[0].followers;
                for (var i of latest_followers){
                  let tmpObj = {
                    accountID: account,
                    userID: i.id_str
                  };
                  forAPIlist.push(tmpObj);
                }

            } else {
              //  fileがなければAPIを叩く
              let options = {};
              options.user_id = account;
              options.count = COUNT;

              // APIを叩く
              try {
                await client.get('followers/list', options)
                .then((res) => {
                  for (var user of res.users) {
                    if(user.length != 0) {
                      var tmpObj = {
                        userID: user.id_str,
                        account: account
                      };
                      forAPIlist.push(tmpObj);
                    }
                  }
                });
              } catch (err) {
                systemLogger.error(err);
              }
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
          // APIを叩く
          for (var obj of unfollowingUsers) {
            let options = {};
            options.user_id = obj.userID;
            try {
              await client.post('friendships/create', options)
              .then((res) => {
                systemLogger.info(item.id + " follows " + obj.userID);
                saveToLogs.follow (item.id, obj.keyword || null, obj.account || null, res);
              });
            } catch (err) {
              systemLogger.error(err);
            }
          }
        }
      }
    }
  } else {
    systemLogger.warn("settings.json does not exist");
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
  main: main,
};