var fs = require('fs');
const path = require('path');

unfollow("2",{"fsef":"ese"});


function follow (userID, keyword, accountID, user) {
  let jsonfile = path.join( __dirname, '../logs/follow-logs/', userID + '.json');
  let jsonObject = [];
  if(fs.existsSync(jsonfile)){
    //jsonFileがあれば新しいオブジェクト をpush
    jsonObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
  }
  else{
    // fileがなければ新しく作る
  }
  now = new Date();
  date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " "
        + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
  let tmpObj = {
      "created_at": date,
      "keyword": keyword,
      "account_id": accountID,
      "user": user
  }
  jsonObject.push(tmpObj);
  saveToLogs(jsonfile,jsonObject);
}

function like (userID, keyword, accountID, tweet) {
  let jsonfile = path.join( __dirname, '../logs/like-logs/', userID + '.json');
  let jsonObject = [];
  if(fs.existsSync(jsonfile)){
    //jsonFileがあれば新しいオブジェクト をpush
    jsonObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
  }
  else{
    // fileがなければ新しく作る
  }
  now = new Date();
  date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " "
        + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
  let tmpObj = {
      "created_at": date,
      "keyword": keyword,
      "account_id": accountID,
      "tweet": tweet
  }
  jsonObject.push(tmpObj);
  saveToLogs(jsonfile,jsonObject);
}

function dm (userID, keyword, message, user) {
  let jsonfile = path.join( __dirname, '../logs/dm-logs/', userID + '.json');
  let jsonObject = [];
  if(fs.existsSync(jsonfile)){
    //jsonFileがあれば新しいオブジェクト をpush
    jsonObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
  }
  else{
    // fileがなければ新しく作る
  }
  now = new Date();
  date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " "
        + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
  let tmpObj = {
      "created_at": date,
      "keyword": keyword,
      "message": message,
      "user": user
  }
  jsonObject.push(tmpObj);
  saveToLogs(jsonfile,jsonObject);
}

function unfollow (userID, user) {
  let jsonfile = path.join( __dirname, '../logs/unfollow-logs/', userID + '.json');
  let jsonObject = [];
  if(fs.existsSync(jsonfile)){
    //jsonFileがあれば新しいオブジェクト をpush
    jsonObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
  }
  else{
    // fileがなければ新しく作る
  }
  now = new Date();
  date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " "
        + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
  let tmpObj = {
      "created_at": date,
      "user": user
  }
  jsonObject.push(tmpObj);
  saveToLogs(jsonfile,jsonObject);
}


// 書き出し用の関数
function saveToLogs(filename, object) {
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