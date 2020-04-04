const path = require('path');
const fs = require('fs');

const settings = path.join( __dirname, '../', '/settings.json')

// token, tokenSecretを保存する
exports.secrets = function (user_id, secret, tokenSecret) {
  let jsonObject = {}
  if(fs.existsSync(settings)) {
    jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
    console.log(jsonObject)
  } else {
    
    
  }
  console.log(jsonObject)
  jsonObject[profile.id] = {
    token: token,
    tokenSecret: tokenSecret
  }
  // ファイルを書き込む
  fs.writeFile( settings, JSON.stringify(jsonObject) , (err) => {
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

// keywordsを保存する

// messages, min_followerを保存する