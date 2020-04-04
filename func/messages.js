
var fs = require('fs');
const path = require('path');
const filepath = '/data/settings.json'

result = save_message('me', 'idn4', 22);

//messageを保存する
function save_message(message,user_id,min_Follower) {
  let jsonObject = [];
  let filePath = path.join( __dirname, '../', filepath);
  if(fs.existsSync(filePath)) {
    console.log("settings.json file exists.");
    jsonObject = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    //jsonObject[user_id] = message;
    let search = jsonObject.findIndex((v) => v.id === user_id);

    if(search!=-1){
      console.log(jsonObject[search].message);
      jsonObject[search].message = message;
      jsonObject[search].min_Follower = min_Follower;
    }else{
      jsonObject.push({
        id: user_id,
        message: message,
        min_Follower: min_Follower
      });
    }

  }else {
    console.log('message file does not exit');
    //messages.jsonがないときの処理, new Objectをファイルに書き出し
    jsonObject.push({
      id: user_id,
      message: message,
      min_Follower: min_Follower
    });
  }
  // ファイルを書き込む
  fs.writeFile( filePath, JSON.stringify(jsonObject) , (err) => {
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

};
