const fs = require('fs');
const path = require('path');
const s3 = require('./s3');
const schedule = require('node-schedule');
const reservedTweet = require('../batch/reservedTweet');
const log4js = require('log4js');
log4js.configure('./log4js.config.json');
const systemLogger = log4js.getLogger('system');

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
    const uniqueName = userID + tweetObj.tweeted_at + Math.random().toString(32).substring(2);
    tweetObj.jobName = uniqueName;
    schedule.scheduleJob(uniqueName, tweetDate, () => {
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

    // scheduleJobのキャンセル
    if (jsonObject.findIndex((v) => v.id === objID) != -1) {
      let tmpObj = jsonObject.find((v) => v.id === objID);
      if(Object.keys(tmpObj).indexOf('jobName') !== -1) {
        schedule.scheduledJobs[tmpObj.jobName].cancel();
      }
    }
    
    let result = jsonObject.filter(function(item) {
      return item.id != objID;
    });
    saveToFile(filename, result);
    return result;
  }
  else {
    systemLogger.warn("settings.json does not exist");
  }
}

// 書き出し用の関数
function saveToFile(filename, object) {
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
  get: get,
  create: create,
  deleteObj: deleteObj
};
