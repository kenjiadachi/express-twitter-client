
var fs = require('fs');
const path = require('path');
const diff = require('../func/diff');

function unfollow(){
  const filename = path.join( __dirname, '../data/', 'settings.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){
      var forAPIlist = [];
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1){
        let jsonfile = path.join( __dirname, '../data/ffs/', item.id + '.json');
        let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
        let latest_followers = (Object.values(ffsObject)).slice(-1)[0].followers;
        let latest_follows = (Object.values(ffsObject)).slice(-1)[0].follows;
        let unfollowedID = diff.ObjectArrays(latest_follows, latest_followers).onlyObjArr1;
        for(var userObj of unfollowedID){
          console.log(userObj.id_str);//これがFollowしてるユーザーのID
          // いいねリストが7日分溜まっているかを確認
          // 溜まっているユーザーの7日間分のいいねリストに、自分が含まれているかを確認
          //
          // 含まれていなければ、UserIDをリストに追加
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