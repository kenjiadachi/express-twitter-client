var fs = require('fs');
const path = require('path');
const format = require('./format');
const now = new Date();
const date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
const datetime = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
const log4js = require('log4js');
log4js.configure('./log4js.config.json');
const systemLogger = log4js.getLogger('system');

function follow (userID, keyword, accountID, user) {
  let jsonfile = path.join( __dirname, '../logs/follow-logs/', userID + '.json');
  let jsonObject = [];
  if(fs.existsSync(jsonfile)){
    //jsonFileがあれば新しいオブジェクト をpush
    jsonObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
  }
  let tmpObj = {
    created_at: datetime,
    keyword: keyword,
    account_id: accountID,
    user: format.user(user)
  };
  jsonObject.push(tmpObj);
  saveToLogs(jsonfile, jsonObject);
}

function like (userID, keyword, accountID, tweet) {
  let jsonfile = path.join( __dirname, '../logs/like-logs/', userID + '.json');
  let jsonObject = [];
  if(fs.existsSync(jsonfile)){
    //jsonFileがあれば新しいオブジェクト をpush
    jsonObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
  }

  let tmpObj = {
    created_at: datetime,
    keyword: keyword,
    account_id: accountID,
    tweet: format.tweet(tweet)
  };
  jsonObject.push(tmpObj);
  saveToLogs(jsonfile, jsonObject);
}

function dm (userID, keyword, message, user) {
  let jsonfile = path.join( __dirname, '../logs/dm-logs/', userID + '.json');
  let jsonObject = [];
  if(fs.existsSync(jsonfile)){
    //jsonFileがあれば新しいオブジェクト をpush
    jsonObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
  }

  let tmpObj = {
    created_at: datetime,
    keyword: keyword,
    message: message,
    user: format.user(user)
  };
  jsonObject.push(tmpObj);
  saveToLogs(jsonfile, jsonObject);
}

function unfollow (userID, user, reason) {
  let jsonfile = path.join( __dirname, '../logs/unfollow-logs/', userID + '.json');
  let jsonObject = [];
  if(fs.existsSync(jsonfile)){
    //jsonFileがあれば新しいオブジェクト をpush
    jsonObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
  }
  let tmpObj = {
    created_at: datetime,
    reason: reason,
    user: format.user(user)
  };
  jsonObject.push(tmpObj);
  saveToLogs(jsonfile, jsonObject);
}


function followerLikes(userID, tweetObj) {
  let jsonfile = path.join( __dirname, '../logs/follower-likes/', userID + '.json');
  let jsonObject = {};
  if(fs.existsSync(jsonfile)){
    //jsonFileがあれば新しいオブジェクト をpush
    jsonObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
  }
  jsonObject[date] = tweetObj;
  saveToLogs(jsonfile,jsonObject);
}


// 書き出し用の関数
function saveToLogs(filename, object) {
  fs.writeFile(filename, JSON.stringify(object) , (err) => {
    // 書き出しに失敗した場合
    if(err){
      systemLogger.error(err);
      throw err;
    }
    // 書き出しに成功した場合
    else{
      systemLogger.info(filename + ' is updated');
    }
  });
}


module.exports = {
  follow: follow,
  like: like,
  dm: dm,
  unfollow: unfollow,
  followerLikes: followerLikes
};
