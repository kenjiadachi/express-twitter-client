const fs = require('fs');
const path = require('path');
const diff = require('./diff');

exports.fromWhich = function (userID) {
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
    for (item in only_latest) {
      only_latest_user.push(only_latest[item].id_str);
    }

    result.equal = [];
    result.after_follow = [];
    result.before_follow = [];

    // いつフォローしたか、いつフォローされたかを探す
    for (olUser of only_latest_user) {
      for (i in obj) {
        if (obj[i].hasOwnProperty('follows')) {
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
};

exports.follower_follower = function (user_id) {
  let filename = `${user_id}.json`;
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
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    obj = Object.values(jsonObject);
    latest_followers = obj.slice(-1)[0].followers;

    // followers_countにより分類してPush
    for (item in latest_followers) {
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
};

exports.follower_tweet = function (user_id) {
  let filename = `${user_id}.json`;
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
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    obj = Object.values(jsonObject);
    latest_followers = obj.slice(-1)[0].followers;

    // followers_countにより分類してPush
    for (item in latest_followers) {
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
};

exports.isProtected = function (user_id) {
  let filename = `${user_id}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  const result = {};
  result.protected = [];
  result.not_protected = [];

  if (fs.existsSync(filename)) {
    console.log('json file exist');
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    obj = Object.values(jsonObject);
    latest_followers = obj.slice(-1)[0].followers;

    // followers_countにより分類してPush
    for (item in latest_followers) {
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
};


exports.follower_continue = function (user_id, start_date, end_date) {
  let filename = `${user_id}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  const result = {};

  if (fs.existsSync(filename)) {
    console.log('json file exist');
    start_date = new Date(start_date);
    end_date = new Date(end_date);
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    key = Object.keys(jsonObject);

    for (item of key) {
      if (typeof jsonObject[item] === 'object') {
        date = new Date(item);
        if (start_date <= date && date <= end_date) {
          if (jsonObject[item].hasOwnProperty('new_followers')) {
            result[item] = {};
            result[item].new_followers = jsonObject[item].new_followers_count;
            // new_followersのゆーざーがいつdeleted_followersに入っているか

            for (item2 of key) {
              if (typeof jsonObject[item2] === 'object') {
                searched_date = new Date(item2);
                if (date < searched_date) {
                  if (jsonObject[item].hasOwnProperty('deleted_followers')) {
                    // console.log(Object.(jsonObject[item2]).deleted_followers);
                    // new_followerとdeleted_followerに重複があるかの確認
                    const same_id = [];
                    jsonObject[item2].deleted_followers.filter((x) => {
                      const same = jsonObject[item].new_followers.filter(
                        (y) => x.id_str === y.id_str,
                      );
                      for (l in same) {
                        const varkey = same[key];
                        same_id.push(varkey);
                      }
                      deleted_count = same_id.length;
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
};

exports.deactives = function (userID) {
  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  const result = {};
  result.active = [];
  result.deactive = [];
  if (fs.existsSync(filename)) {
    console.log('json file exist');

    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const latest_follows = (Object.values(jsonObject)).slice(-1)[0].follows;
    activate_day = new Date();
    activate_day.setDate(activate_day.getDate() - 30);

    for (obj of latest_follows) {
      if (obj.hasOwnProperty('status')) {
        date = new Date(obj.status.created_at);
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
};
