var fs = require('fs');
const path = require('path');
const diff = require('./diff')

const sample_userid = "for_test";
//console.log(analytics(sample_userid));
//console.log(div_by_followers_count(sample_userid));
//console.log(div_by_statuses_count(sample_userid));
//console.log(isProtected(sample_userid));
//console.log(arrange_by_date(sample_userid,"2020-04-01", "2020-04-04"));
console.log(ration_ff(sample_userid,"2020-04-12", "2020-04-14"));


exports.analytics = function(userID) {
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


function div_by_followers_count(user_id) {
  let filename = user_id + ".json";
  filename = path.join( __dirname, '../data/ffs/', filename);

  let result = {
    "0-99":[],
    "100-499":[],
    "500-999":[],
    "1000-4999":[],
    "5000-9999":[],
    "10000-49999":[],
    "50000-":[],
  };

  if(fs.existsSync(filename)){
    console.log("json file exist");
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    obj = Object.values(jsonObject);
    latest_followers = obj.slice(-1)[0].followers;

    //followers_countにより分類してPush
    for (item in latest_followers) {
      let sc = Number(latest_followers[item].followers_count);

      if (0 <= sc && sc <100){
        result["0-99"].push(latest_followers[item]);
      }
      else if (100 <= sc && sc <500) {
        result["100-499"].push(latest_followers[item]);
      }
      else if (500 <= sc && sc <1000){
        result["500-999"].push(latest_followers[item]);
      }
      else if (1000 <= sc && sc <5000) {
        result["1000-4999"].push(latest_followers[item]);
      }
      else if (5000 <= sc && sc <10000) {
        result["5000-9999"].push(latest_followers[item]);
      }
      else if (10000 <= sc && sc <50000){
        result["10000-50000"].push(latest_followers[item]);
      }
      else {
        result["50000-"].push(latest_followers[item]);
      }

    }

  }
  else {
    console.log("json file does not exist");
  }
  return result;
}

function div_by_statuses_count(user_id) {
  let filename = user_id + ".json";
  filename = path.join( __dirname, '../data/ffs/', filename);

  let result = {
    "0-99":[],
    "100-499":[],
    "500-999":[],
    "1000-4999":[],
    "5000-9999":[],
    "10000-49999":[],
    "50000-":[],
  };

  if(fs.existsSync(filename)){
    console.log("json file exist");
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    obj = Object.values(jsonObject);
    latest_followers = obj.slice(-1)[0].followers;

    //followers_countにより分類してPush
    for (item in latest_followers) {
      let sc = Number(latest_followers[item].statuses_count);

      if (0 <= sc && sc <100){
        result["0-99"].push(latest_followers[item]);
      }
      else if (100 <= sc && sc <500) {
        result["100-499"].push(latest_followers[item]);
      }
      else if (500 <= sc && sc <1000){
        result["500-999"].push(latest_followers[item]);
      }
      else if (1000 <= sc && sc <5000) {
        result["1000-4999"].push(latest_followers[item]);
      }
      else if (5000 <= sc && sc <10000) {
        result["5000-9999"].push(latest_followers[item]);
      }
      else if (10000 <= sc && sc <50000){
        result["10000-50000"].push(latest_followers[item]);
      }
      else {
        result["50000-"].push(latest_followers[item]);
      }

    }
  }
  else {
    console.log("json file does not exist");
  }
  return result;
}


function isProtected(user_id) {
  let filename = user_id + ".json";
  filename = path.join( __dirname, '../data/ffs/', filename);

  let result = {
    "protected":[],
    "not_protected":[],
  };

  if(fs.existsSync(filename)){
    console.log("json file exist");
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    obj = Object.values(jsonObject);
    latest_followers = obj.slice(-1)[0].followers;

    //followers_countにより分類してPush
    for (item in latest_followers) {

      if (latest_followers[item].protected){
        result["protected"].push(latest_followers[item]);
      }
      else {
        result["not_protected"].push(latest_followers[item]);
      }
    }
  }
  else {
    console.log("json file does not exist");
  }
  return result;
}

function ration_ff(user_id, start_date, end_date) {
  let filename = user_id + ".json";
  filename = path.join( __dirname, '../data/ffs/', filename);
  let result = {
  };
  if(fs.existsSync(filename)){
    console.log("json file exist");
    start_date = new Date(start_date);
    end_date = new Date(end_date);
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    key = Object.keys(jsonObject);

    for(item of key){
      if(typeof jsonObject[item] == "object") {
        date = new Date(item);
        if(start_date <= date && date <= end_date){
          if(jsonObject[item].hasOwnProperty("new_followers")){
            result[item] = {};
            result[item]["new_followers"] = jsonObject[item].new_followers_count;
            //new_followersのゆーざーがいつdeleted_followersに入っているか

            for (item2 of key) {
              if(typeof jsonObject[item2] == "object") {
                searched_date = new Date(item2);
                if(date < searched_date){
                  console.log(item2);
                  if(jsonObject[item].hasOwnProperty("deleted_followers")){
                    // console.log(Object.(jsonObject[item2]).deleted_followers);
                    // new_followerとdeleted_followerに重複があるかの確認
                    let same_id =[];
                    jsonObject[item2].deleted_followers.filter(x => {
                      const same = jsonObject[item].new_followers.filter(
                        y =>
                          x.id_str === y.id_str
                      );
                      for(l in same){
                        let varkey = same[key];
                        same_id.push(varkey);
                      }
                      deleted_count = same_id.length;
                      if(deleted_count != 0){
                        result[item][item2] = deleted_count;
                      }
                    });
                  }
                }
              }
            }
          }

        }
      }

      }

  }
  else{
    console.log("json file does not exist");
  }
  return result;
}
