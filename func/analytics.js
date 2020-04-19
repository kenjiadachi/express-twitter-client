const fs = require('fs');
const path = require('path');
const diff = require('./diff');

function fromWhich (userID) {
  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  const result = {};

  if (fs.existsSync(filename)) {
    console.log('json file exist');

    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));

    const obj = Object.values(jsonObject);

    // 最新の相互フォロー配列
    const mutual_latest = diff.ObjectArrays(obj.slice(-1)[0].follows, obj.slice(-1)[0].followers).common;
    // 最初から相互フォロー
    const mutual_first = diff.ObjectArrays(jsonObject[jsonObject.created_date].follows, jsonObject[jsonObject.created_date].followers).common;

    const temp = diff.ObjectArrays(mutual_latest, mutual_first);
    result.unknown = temp.common;

    const only_latest = temp.onlyObjArr1;
    // 最初は相互ではないが最新では相互フォローのユーザー
    const only_latest_user = [];
    for ( var item in only_latest) {
      only_latest_user.push(only_latest[item].id_str);
    }

    result.equal = [];
    result.after_follow = [];
    result.before_follow = [];

    // いつフォローしたか、いつフォローされたかを探す
    for (var olUser of only_latest_user) {
      for ( var i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj[i], 'follows')) {
          const result_follow = obj[i].follows.find((u) => u.id_str === olUser);
          const result_follower = obj[i].followers.find((u) => u.id_str === olUser);
          if (result_follow && result_follower) {
            result.equal.push(result_follow);
            break;
          } else if (result_follow && !result_follower) {
            result.after_follow.push(result_follow);
            break;
          } else if (!result_follow && result_follower) {
            result.before_follow.push(result_follower);
            break;
          } else {
            // 次へ進む（何もしない）
          }
        }
      }
    }
    return result;
  }

  console.log('json file does not exist');
}

function follower_follower (userID) {
  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  const result = {};
  result._0to99 = [];
  result._100to499 = [];
  result._500to999 = [];
  result._1000to4999 = [];
  result._5000to9999 = [];
  result._10000to49999 = [];
  result._50000 = [];

  if (fs.existsSync(filename)) {
    console.log('json file exist');
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const obj = Object.values(jsonObject);
    const latest_followers = obj.slice(-1)[0].followers;

    // followers_countにより分類してPush
    for (var item in latest_followers) {
      const sc = Number(latest_followers[item].followers_count);

      if (sc >= 0 && sc < 100) {
        result._0to99.push(latest_followers[item]);
      } else if (sc >= 100 && sc < 500) {
        result._100to499.push(latest_followers[item]);
      } else if (sc >= 500 && sc < 1000) {
        result._500to999.push(latest_followers[item]);
      } else if (sc >= 1000 && sc < 5000) {
        result._1000to4999.push(latest_followers[item]);
      } else if (sc >= 5000 && sc < 10000) {
        result._5000to9999.push(latest_followers[item]);
      } else if (sc >= 10000 && sc < 50000) {
        result._10000to49999.push(latest_followers[item]);
      } else {
        result._50000.push(latest_followers[item]);
      }
    }
  } else {
    console.log('json file does not exist');
  }
  return result;
}

function follower_tweet (userID) {
  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  const result = {};
  result._0to99 = [];
  result._100to499 = [];
  result._500to999 = [];
  result._1000to4999 = [];
  result._5000to9999 = [];
  result._10000to49999 = [];
  result._50000 = [];

  if (fs.existsSync(filename)) {
    console.log('json file exist');
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const obj = Object.values(jsonObject);
    const latest_followers = obj.slice(-1)[0].followers;

    // followers_countにより分類してPush
    for (var item in latest_followers) {
      const sc = Number(latest_followers[item].statuses_count);

      if (sc >= 0 && sc < 100) {
        result._0to99.push(latest_followers[item]);
      } else if (sc >= 100 && sc < 500) {
        result._100to499.push(latest_followers[item]);
      } else if (sc >= 500 && sc < 1000) {
        result._500to999.push(latest_followers[item]);
      } else if (sc >= 1000 && sc < 5000) {
        result._1000to4999.push(latest_followers[item]);
      } else if (sc >= 5000 && sc < 10000) {
        result._5000to9999.push(latest_followers[item]);
      } else if (sc >= 10000 && sc < 50000) {
        result._10000to49999.push(latest_followers[item]);
      } else {
        result._50000.push(latest_followers[item]);
      }
    }
  } else {
    console.log('json file does not exist');
  }
  return result;
}

function isProtected (userID) {
  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  const result = {};
  result.protected = [];
  result.not_protected = [];

  if (fs.existsSync(filename)) {
    console.log('json file exist');
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const obj = Object.values(jsonObject);
    const latest_followers = obj.slice(-1)[0].followers;

    // followers_countにより分類してPush
    for (var item in latest_followers) {
      if (latest_followers[item].protected) {
        result.protected.push(latest_followers[item]);
      } else {
        result.not_protected.push(latest_followers[item]);
      }
    }
  } else {
    console.log('json file does not exist');
  }
  return result;
}


 function follower_continue (userID, start_date, end_date) {
  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  const result = {};

  if (fs.existsSync(filename)) {
    console.log('json file exist');
    start_date = new Date(start_date);
    end_date = new Date(end_date);
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const key = Object.keys(jsonObject);

    for (var item of key) {
      if (typeof jsonObject[item] === 'object') {
        var date = new Date(item);
        if (start_date <= date && date <= end_date) {
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'new_followers')) {
            result[item] = {};
            result[item].new_followers = jsonObject[item].new_followers_count;
            // new_followersのゆーざーがいつdeleted_followersに入っているか

            for (var item2 of key) {
              if (typeof jsonObject[item2] === 'object') {
                var searched_date = new Date(item2);
                if (date < searched_date) {
                  if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'deleted_followers')) {
                    // console.log(Object.(jsonObject[item2]).deleted_followers);
                    // new_followerとdeleted_followerに重複があるかの確認
                    const same_id = [];
                    jsonObject[item2].deleted_followers.filter((x) => {
                      const same = jsonObject[item].new_followers.filter(
                        (y) => x.id_str === y.id_str,
                      );
                      same.forEach(function(){
                        const varkey = same[key];
                        same_id.push(varkey);
                      });
                      var deleted_count = same_id.length;
                      if (deleted_count != 0) {
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
  } else {
    console.log('json file does not exist');
  }
  return result;
}

 function deactives (userID) {
  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  const result = {};
  result.active = [];
  result.deactive = [];
  if (fs.existsSync(filename)) {
    console.log('json file exist');

    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const latest_follows = (Object.values(jsonObject)).slice(-1)[0].follows;
    let activate_day = new Date();
    activate_day.setDate(activate_day.getDate() - 30);

    for (var obj of latest_follows) {
      if (Object.prototype.hasOwnProperty.call(obj, 'status')) {
        const date = new Date(obj.status.created_at);
        if (activate_day < date) {
          result.active.push(obj);
        } else {
          result.deactive.push(obj);
        }
      }
    }
  } else {
    console.log('json file does not exist');
  }

  return result;
}

function keywords_followbacks(userID) {
  const filename = `${userID}.json`;
  const file_logs = path.join(__dirname, '../logs/follow-logs/', filename);
  const file_ffs = path.join(__dirname, '../data/ffs/', filename);
  const result = [];
  const key_id = {};
  if (fs.existsSync(file_logs) && fs.existsSync(file_ffs)) {
    const logsObject = JSON.parse(fs.readFileSync(file_logs, 'utf8'));
    const ffsObject = JSON.parse(fs.readFileSync(file_ffs, 'utf8'));
    const latest_followers = (Object.values(ffsObject)).slice(-1)[0].followers;

    for (var item in logsObject) {
      var keyword = logsObject[item].keyword;
      console.log(typeof (keyword));
      if (keyword != null && Object.keys(key_id).indexOf(keyword) === -1) {
        key_id[keyword] = [logsObject[item].user];
      } else if (keyword != null && Object.keys(key_id).indexOf(keyword) !== -1) {
        key_id[keyword].push(logsObject[item].user);
      }
    }
    console.log(key_id);
    for ( var keys in key_id) {
      // console.log(key);
      // console.log(key_id[key]);
      // console.log(latest_followers);
      const followedID = diff.ObjectArrays(key_id[keys], latest_followers).common;
      // console.log(followedID);
      const unfollowedID = diff.ObjectArrays(key_id[keys], latest_followers).onlyObjArr1;
      // console.log(unfollowedID);
      const resultObj = {
        keyword: keys,
        follower: followedID,
        notFollower: unfollowedID,
      };
      // console.log(resultObj);
      //  resultObj["unfollower"] = unfollowedID;
      result.push(resultObj);
    }
  } else {
    console.log('json file does not exist');
  }
  return result;
}


module.exports = {
  fromWhich: fromWhich,
  follower_follower: follower_follower,
  follower_tweet: follower_tweet,
  isProtected: isProtected,
  follower_continue: follower_continue,
  deactives: deactives,
  keywords_followbacks: keywords_followbacks
};
