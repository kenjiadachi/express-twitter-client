var fs = require('fs');
const path = require('path');
const twitter = require('../func/twitter');
const saveToLogs = require('../func/saveToLogs');
const COUNT = 3;

follow();

async function follow(){
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
              console.log(err);
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
                console.log(err);
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
          let unfollowingUsers = getUnfollowingUsers(uniqueList, latest_follows);
          console.log(unfollowingUsers);
          // APIを叩く
          for (var obj of unfollowingUsers) {
            let options = {};
            options.user_id = obj.userID;
            try {
              await client.post('friendships/create', options)
              .then((res) => {
                console.log("フォローしました！");
                saveToLogs.follow (item.id, obj.keyword || null, obj.account || null, res);
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    }
  } else {
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


// 差分をとる
function getUnfollowingUsers (objArr1, objArr2) {
  const result = {};
  result.common = [];

  result.onlyObjArr1 = [];
  result.onlyObjArr2 = [];

  objArr1.filter((item1) => {
    const same = objArr2.filter(
      (item2) => item1.userID === item2.id_str,
    );

    for (var key in same) {
      const varkey = same[key];
      result.common.push(varkey);
    }
  });

  result.onlyObjArr1 = difference(objArr1, result.common);
  return result.onlyObjArr1;
}


function difference(array, common) {
  const itemIds = common.map((item) => item.id_str);
  return array.filter((item) => itemIds.indexOf(item.userID) === -1);
}


module.exports = {
  follow: follow,
};