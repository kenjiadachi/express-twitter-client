
var fs = require('fs');
const path = require('path');
const diff = require('../func/diff');
const twitter = require('../func/twitter');
const saveToLogs = require('../func/saveToLogs');
const filename = path.join( __dirname, '../data/', 'settings.json');

unfollow();

async function unfollow(){
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){
      var forAPIlist = [];
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1){
        let jsonfile = path.join( __dirname, '../data/ffs/', item.id + '.json');
        let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
        const client = twitter.initWithToken(item.token, item.tokenSecret);

        // フォローしてくれてない人をアンフォロー
        let unfollowedUsers = diff.ObjectArrays((Object.values(ffsObject)).slice(-1)[0].follows, (Object.values(ffsObject)).slice(-1)[0].followers).onlyObjArr1;
        for(var userObj of unfollowedUsers){
          var tmpObj = {
            userID: userObj.id_str,
            reason: "notFollowed"
          };
          forAPIlist.push(tmpObj);
        }

        // いいねしてくれてない人をアンフォロー
        // いいねリストが7日分溜まっているかを確認
        // 溜まっているユーザーの7日間分のいいねリストに、自分が含まれているかを確認
        //
        // 含まれていなければ、UserIDをリストに追加




        for(var obj of forAPIlist){
          let options = {};
          options.user_id = obj.id_str;
          // APIを叩く
          try {
            await client.post('friendships/destroy', options)
            .then((res) => {
              saveToLogs.unfollow(item.id, res, obj.reason);
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }
  else{
    console.log("json file does not exist");
  }
}

module.exports = {
  unfollow: unfollow,
};