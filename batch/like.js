var fs = require('fs');
const path = require('path');
const twitter = require('../func/twitter');
const saveToLogs = require('../func/saveToLogs');
const COUNT = 3;

// like();

async function like(){
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
                      tweetID: tweet.id_str,
                      keyword: options.q
                    };
                    forAPIlist.push(tmpObj);
                  }
                }
              });

              await client.get('users/search', options)
              .then((res) => {
                for (var user of res) {
                  if(user.length != 0 && user.status) {
                    var tmpObj = {
                      tweetID: user.status.id_str,
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
        if(Object.keys(item).indexOf('accounts') !== -1){
          const accounts = item.accounts.split(',');
          for (var account of accounts){
            let jsonfile = path.join( __dirname, '../data/ffs/', account + '.json');
            if(fs.existsSync(jsonfile)){
                // ffsにid.jsonがあれば最新のfollowerを取得してforAPIListに追加
                console.log(jsonfile);
                let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
                let latest_followers = (Object.values(ffsObject)).slice(-1)[0].followers;
                for (let i of latest_followers){
                  let tmpObj = {
                    accountID: account,
                    tweetID: i.status.id_str
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
                    if(user.length != 0 && user.status) {
                      var tmpObj = {
                        tweetID: user.status.id_str,
                        account: account
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
        }
        // ここでListに対してAPI叩く
        const uniqueList = filterUniqueItemsByTweetID(forAPIlist);
        console.log(uniqueList);
        let jsonfile = path.join( __dirname, '../data/ffs/', item.id + '.json');
        if(fs.existsSync(jsonfile)){
          // APIを叩く
          for (var obj of uniqueList) {
            let options = {};
            options.id = obj.tweetID;
            try {
              await client.post('favorites/create', options)
              .then((res) => {
                console.log("いいねしました！");
                saveToLogs.like (item.id, obj.keyword || null, obj.account || null, res);
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    }
  }
  else{
    console.log("json file does not exist");
  }
}

// IE11でも使える（Babel + polyfill 未使用）
function filterUniqueItemsByTweetID (array) {
  // idを集約した配列を作成
  const itemIds = array.map(function(item) {
    return item.tweetID;
  });
  // 
  return array.filter(function(item, index) {
    return itemIds.indexOf(item.tweetID) === index;
  });
}

module.exports = {
  like: like,
};