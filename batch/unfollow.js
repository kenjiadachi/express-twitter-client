
var fs = require('fs');
const path = require('path');
const diff = require('../func/diff');
const twitter = require('../func/twitter');
const saveToLogs = require('../func/saveToLogs');
const filename = path.join( __dirname, '../data/', 'settings.json');

// unfollow();

async function main(){
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){
      var forAPIlist = [];
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1){
        let jsonfile = path.join( __dirname, '../data/ffs/', item.id + '.json');
        const client = twitter.initWithToken(item.token, item.tokenSecret);
        if(fs.existsSync(jsonfile)){
          let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));

          // フォローしてくれてない人をアンフォロー
          let unfollowedUsers = diff.ObjectArrays((Object.values(ffsObject)).slice(-1)[0].follows, (Object.values(ffsObject)).slice(-1)[0].followers).onlyObjArr1;
          for(var userObj of unfollowedUsers){
            let tmpObj = {
              userID: userObj.id_str,
              reason: "notFollowed"
            };
            forAPIlist.push(tmpObj);
          }
        }

        // いいねしてくれてない人をアンフォロー
        const today = new Date();
        let followerListFile = path.join( __dirname, '../logs/follower-likes/', item.id + '.json');
        if(fs.existsSync(followerListFile)){
          let followed_list = JSON.parse(fs.readFileSync(followerListFile, 'utf8'));

          let followed = [];
          let marged_ids = [];
          for (var i=1; i<8; i++) {
            let date = today;
            date.setDate(date.getDate()-i);
            date = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
            if(Object.keys(followed_list).indexOf(date)!=-1){
              followed.push(followed_list[date]);
              let tmp = [];
              for(item of followed_list[date]){
                tmp.push(item.user_id);
              }
              marged_ids.push(tmp);

            } else {
              followed.push([]);
              marged_ids.push([]);
            }
          }
          // console.log(user_ids);
          console.log(marged_ids);

          var resultArr =  marged_ids.reduce(function(previousValue, currentValue) {
            //比較したい配列をreduceで結合して1つにまとめる
            return previousValue.concat(currentValue);
          }).filter(function (x, i, self) {
            //重複を削除
            return self.indexOf(x) === i;

          }).filter(function(val) {
            //比較したい配列(arr1,arr2,arr3)のすべてに含まれるもののみ抽出
            var flg = true;

            marged_ids.forEach(function(compArr) {
              flg = (compArr.indexOf(val) !== -1) && flg;
            });

            return flg;
          });
          console.log(resultArr);
          console.log(followed);

          if(resultArr != []){
            for (var items of resultArr){
              let likes_list = [];
              for (let dayItem of followed){
                for (let item2 of dayItem) {
                  if(item2.user_id == items){
                    for(var likeobj of item2.likes){
                      likes_list.push(likeobj.id);
                    }
                  }
                }
              }
              if(likes_list.indexOf(item.id) == -1){
                let tmpObj = {
                  userID: items,
                  reason: "notLiked"
                };
                forAPIlist.push(tmpObj);
              }
            }
          }
        }

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
  main: main,
};
