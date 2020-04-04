const path = require('path');
const fs = require('fs');

const settings = path.join( __dirname, '../data/settings.json')

// token, tokenSecretを保存する
exports.tokens = function (user_id, token, tokenSecret) {
  let jsonObject = [];
  if(fs.existsSync(settings)) {
    console.log("settings.json file exists.");
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    let search = jsonObject.findIndex((v) => v.id === user_id);

    if(search != -1) {
      jsonObject[search].token = token;
      jsonObject[search].tokenSecret = tokenSecret;

    } else {
      jsonObject.push({
        id: user_id,
        token: token,
        tokenSecret: tokenSecret
      });
    }

  } else {
    // settings.jsonがないときの処理
    console.log('settings.json file does not exist');
    jsonObject.push({
      id: user_id,
      token: token,
      tokenSecret: tokenSecret
    });
  }
  saveToJson(settings, jsonObject)
}


// keywordsを保存する
exports.keywords = function (keywords, user_id) {
  let jsonObject = [];
  if(fs.existsSync(settings)) {
    console.log("settings.json file exists.");
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));

    let search = jsonObject.findIndex((v) => v.id === user_id);

    if(search != -1) {
      console.log(jsonObject[search].keywords);
      jsonObject[search].keywords = keywords;
    } else {
      jsonObject.push({
        id: user_id,
        keywords: keywords
      });
    }

  } else {
    // settings.jsonがないときの処理
    console.log('settings.json file does not exist');
    jsonObject.push({
      id: user_id,
      keywords: keywords
    });
    console.log(jsonObject);
  }

  saveToJson(settings, jsonObject)
};

// messages, min_followerを保存する

// 書き出し用の関数
function saveToJson(filename, object) {
  fs.writeFile(filename, JSON.stringify(object) , (err) => {
    // 書き出しに失敗した場合
    if(err){
      console.log("エラーが発生しました。" + err)
      throw err
    }
    // 書き出しに成功した場合
    else{
      console.log("ファイルが正常に書き出しされました")
    }
  });
}
