var fs = require('fs');
const path = require('path');
const diff = require('./diff')

const sample_userid = "necwecwe";
console.log(analytics(sample_userid));

export.analytics = function(userID) {
  let filename = userID + ".json";
  filename = path.join( __dirname, '../data/ffs/', filename);

  if(fs.existsSync(filename)){
    console.log("json file exist");
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    obj = Object.values(jsonObject);
    latest_follows = obj.slice(-1)[0].follows;
    latest_followers = obj.slice(-1)[0].followers;
    created_date = jsonObject.created_date;
    first_follows = jsonObject[created_date].follows;
    first_followers = jsonObject[created_date].followers;


    //`相互フォロー配列`
    let mutual_latest = both_object(latest_follows, latest_followers);

    //最初から相互フォロー
    let mutual_first = both_object(first_follows,first_followers);


    let temp = diff.diff_Object(mutual_latest, mutual_first);
    let unknown = temp[0];
    let only_latest = temp[1];
    //最初は相互ではないが最新では相互フォローのユーザー
    let only_latest_user = [];
    for (item in only_latest) {
      only_latest_user.push(only_latest[item].id_str);
    }
    console.log(only_latest_user);

    let same_follow = [];
    let from_follow = [];
    let from_follower = [];
    //いつフォローしたか、いつフォローされたかを探す
    for(olUser of only_latest_user) {
      console.log(olUser);
      for (i in obj) {
      if(obj[i].hasOwnProperty("follows")) {
        //console.log(obj[i].followers);
        let result_follow = obj[i].follows.find((u) => u.id_str === olUser);
        let result_follower = obj[i].followers.find((u) => u.id_str === olUser);
        console.log(result_follow);
        console.log(result_follower);
        if (result_follow && result_follower) {
            console.log("same");
            same_follow.push(result_follow);
            break;
        } else if(result_follow && !result_follower) {
            console.log("followがさき");
            from_follow.push(result_follow);
            break;
        } else if(!result_follow && result_follower) {
            console.log("follwerがさき");
            from_follower.push(result_follower);
            break;
        }else {
            //次へ進む（何もしない）
        }
      }
    }
  }
  return [unknown,same_follow,from_follow,from_follower];
  }
  else {
    console.log("json file does not exist");
  }


}

function both_object(obj1,obj2){
  let tmp = [];
  obj1.filter(item1 => {
    const same = obj2.filter(
      item2 =>
        item1.id_str === item2.id_str
    );

    for(key in same){
      let varkey = same[key];
      tmp.push(varkey);
    }
  });
  return tmp;
}
