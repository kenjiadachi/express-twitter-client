const fs = require('fs');
const path = require('path');
const s3 = require('./s3');
const schedule = require('node-schedule');
const reservedTweet = require('../batch/reservedTweet');

function get(userID) {
  const filename = path.join( __dirname, '../data/reserved-tweets/', userID + '.json');
  let result = [];
  if(fs.existsSync(filename)){
    result = JSON.parse(fs.readFileSync(filename, 'utf8'));
  }
  else{
    result = null;
  }
  return result;
}

function create(userID, tweetObj){
  const filename = path.join( __dirname, '../data/reserved-tweets/', userID + '.json');
  let jsonObject= [];
  if(fs.existsSync(filename)){
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    if(jsonObject.length === 0){
      // 新しく作成
      tweetObj["id"] = 1;
    }
    else{
      let latest_id = (Object.values(jsonObject)).slice(-1)[0].id;
      tweetObj["id"] = Number(latest_id) + 1;
    }
  }
  else{
    // 新しく作成
    tweetObj["id"] = 1;
  }

  // s3から落としてくる処理
  if(Object.keys(tweetObj).indexOf('media') !== -1) {
    const mediaArr = tweetObj.media.split(',');
    for (let media of mediaArr) {
      s3.download(media);
    }
  }

  // scheduleJobに登録
  if(Object.keys(tweetObj).indexOf('tweeted_at') !== -1) {
    const tweetDate = new Date(tweetObj.tweeted_at);
    // 毎週日曜日の2時にフォロー
    console.log(tweetDate);
    schedule.scheduleJob(tweetDate, () => {
      reservedTweet.main(tweetObj, userID);
    });
  }


  jsonObject.push(tweetObj);
  saveToFile(filename, jsonObject);
  return jsonObject;
}

function deleteObj (userID, objID){
  const filename = path.join( __dirname, '../data/reserved-tweets/', userID + '.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    let result = jsonObject.filter(function(item) {
      return item.id != objID;
    });
    saveToFile(filename, result);
    return result;
  }
  else {
    console.log('json file does not exist');
  }
}

// 書き出し用の関数
function saveToFile(filename, object) {
  fs.writeFile(filename, JSON.stringify(object) , (err) => {
    // 書き出しに失敗した場合
    if(err){
      console.log("エラーが発生しました。" + err);
      throw err;
    }
    // 書き出しに成功した場合
    else{
      console.log("ファイルが正常に書き出しされました");
    }
  });
}

module.exports = {
  get: get,
  create: create,
  deleteObj: deleteObj
};
