
var fs = require('fs');
const path = require('path');
const twitter = require('../func/twitter');
const saveToLogs = require('../func/saveToLogs');
const COUNT = 3;

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
          let unfollowingUsers = getUnfollowingUsers(uniqueList, latest_follows);
          console.log(unfollowingUsers);

          // minFollowerが設定されていれば、それに満たないfollowersCountの人を除く
          if (Object.keys(item).indexOf('minFollower') !== -1) {
            filterByMinFollower(unfollowingUsers, item.minFollower);
          }

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
              await client.post('direct_messages/events/new', options)
              .then((res) => {
                console.log("DMしました！");
                saveToLogs.sendDM (item.id, obj.keyword || null, obj.account || null, res);
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

function filterByMinFollower (array, minFollower) {
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
  sendDM: sendDM,
};