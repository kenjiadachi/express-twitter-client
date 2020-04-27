const fs = require('fs');
const path = require('path');
const diff = require('./diff');
const twitter = require('./twitter');
const format = require('./format');

// 引数: オブジェクトの配列、オブジェクトの配列、String
async function update (userID, token, tokenSecret) {
  // ここにffsの関数入れる
  const client = twitter.initWithToken(token, tokenSecret);
  let followerList = [];
  let followList = [];
  const options = {};
  options.userID = userID;
  options.count = 200;
  options.cursor = -1;
  try {
    do {
      await client.get('followers/list', options)
        .then((response) => {
          followerList = followerList.concat(response.users);
          options.cursor = response.next_cursor_str;
        });
    } while (options.cursor != 0);

    // カーソルをリセット
    options.cursor = -1;

    do {
      await client.get('friends/list', options)
        .then((response) => {
          followList = followList.concat(response.users);
          options.cursor = response.next_cursor_str;
        });
    } while (options.cursor != 0);

    saveToFfs(userID, followList, followerList);
  } catch (err) {
    console.log(err);
  }
}

function get (userID, start_date, end_date) {
  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);
  start_date = new Date(start_date);
  end_date = new Date(end_date);

  const result = {
    follows_count: {},
    new_follows_count: {},
    deleted_follows_count: {},
    followers_count: {},
    new_followers_count: {},
    deleted_followers_count: {},
    ff_ratio: {},
  };
  if (fs.existsSync(filename)) {
    console.log('json file exist');
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const key = Object.keys(jsonObject);
    // １日ずつ処理
    for (var item of key) {
      if (typeof jsonObject[item] === 'object') {
         var date = new Date(item);
        if (start_date <= date && date <= end_date) {
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'follows_count')) {
            result.follows_count[item] = jsonObject[item].follows_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'new_follows_count')) {
            result.new_follows_count[item] = jsonObject[item].new_follows_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'deleted_follows_count')) {
            result.deleted_follows_count[item] = jsonObject[item].deleted_follows_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'followers_count')) {
            result.followers_count[item] = jsonObject[item].followers_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'new_followers_count')) {
            result.new_followers_count[item] = jsonObject[item].new_followers_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'deleted_followers_count')) {
            result.deleted_followers_count[item] = jsonObject[item].deleted_followers_count;
          }
          if (Object.prototype.hasOwnProperty.call(jsonObject[item], 'ff_ratio')) {
            result.ff_ratio[item] = jsonObject[item].ff_ratio;
          }
        }
      }
    }
  } else {
    console.log('json file does not exist');
  }
  return result;
}


// ffsに保存するようの関数
function saveToFfs(userID, followsObject, followersObject) {
  const followsCount = followsObject.length;
  const followersCount = followersObject.length;

  // 実行日付を取得
  const date = new Date();
  const today = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;

  let filename = `${userID}.json`;
  filename = path.join(__dirname, '../data/ffs/', filename);

  let jsonObject = {};
  let formattedFollows = [];
  let formattedFollowers = [];

  // followsObjectとfollowersObjectを削る
  for(var item1 of followsObject){
    formattedFollows.push(format.user(item1));
  }
  for(var item2 of followersObject){
    formattedFollowers.push(format.user(item2));
  }

  // そのユーザーのJsonファイルがあるかの確認
  if (fs.existsSync(filename)) {
    console.log('json file exist');
    // jsonから日付取得,今日の日付のデータがあるかの確認
    var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const k = Object.keys(obj);

    if (k.indexOf(today) === -1) {
      // 今日のデータがない場合には、今日のデータ＆前日との比較データを追記
      console.log("this is today's first data");
      const o = (Object.values(obj)).slice(-1)[0].follows;
      var diff_follow = diff.ObjectArrays(o, formattedFollows);
      const o2 = (Object.values(obj)).slice(-1)[0].followers;
      var diff_follower = diff.ObjectArrays(o2, formattedFollowers);

      const ratio = (Math.round((followersCount / followsCount) * 100)) / 100;
      jsonObject = obj;

      jsonObject[today] = {
        follows: formattedFollows,
        new_follows: diff_follow.onlyObjArr2,
        deleted_follows: diff_follow.onlyObjArr1,
        followers: formattedFollowers,
        new_followers: diff_follower.onlyObjArr2,
        deleted_followers: diff_follower.onlyObjArr1,
        follows_count: followsCount,
        new_follows_count: diff_follow.onlyObjArr2.length,
        deleted_follows_count: diff_follow.onlyObjArr1.length,
        followers_count: followersCount,
        new_followers_count: diff_follower.onlyObjArr2.length,
        deleted_followers_count: diff_follower.onlyObjArr1.length,
        ff_ratio: ratio.toFixed(2),
      };
    } else { // 今日のデータがあるときは何もしない
      console.log("today's data is already existing.");
      jsonObject = obj;
    }
  } else { // ユーザーのJsonファイルがないときは新しく作成してデータ追加
    const ratio = (Math.round((followersCount / followsCount) * 100)) / 100;

    jsonObject.created_date = today;
    jsonObject[today] = {
      follows: formattedFollows,
      followers: formattedFollowers,
      follows_count: followsCount,
      followers_count: followersCount,
      ff_ratio: ratio.toFixed(2),
    };
  }

  saveToJson(filename, jsonObject);
}

// 書き出し用の関数
function saveToJson(filename, object) {
  fs.writeFile(filename, JSON.stringify(object), (err) => {
    // 書き出しに失敗した場合
    if (err) {
      console.log(`エラーが発生しました。${err}`);
      throw err;
    }
    // 書き出しに成功した場合
    else {
      console.log('ファイルが正常に書き出しされました');
    }
  });
}



module.exports = {
  get: get,
  update: update,
};
