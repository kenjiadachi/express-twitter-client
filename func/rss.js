var fs = require('fs');
const path = require('path');
const log4js = require('log4js');
log4js.configure('./log4js.config.json');
const systemLogger = log4js.getLogger('system');

function get(userID) {
  const filename = path.join( __dirname, '../data/rss/', userID + '.json');
  let result = [];
  if(fs.existsSync(filename)){
    result = JSON.parse(fs.readFileSync(filename, 'utf8'));
  }
  else{
    result = null;
  }
  return result;
}

function create(userID, rssObj){
  const filename = path.join( __dirname, '../data/rss/', userID + '.json');
  let jsonObject= [];
  if(fs.existsSync(filename)){
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    if(jsonObject.length === 0){
      // 新しく作成
      rssObj["id"] = 1;
    }
    else{
      let latest_id = (Object.values(jsonObject)).slice(-1)[0].id;
      rssObj["id"] = Number(latest_id) + 1;
    }
  }
  else{
    // 新しく作成
    rssObj["id"] = 1;
  }
  jsonObject.push(rssObj);
  saveToFile(filename, jsonObject);
  return jsonObject;
}

function deleteObj(userID, objID){
  const filename = path.join( __dirname, '../data/rss/', userID + '.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
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