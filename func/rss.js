var fs = require('fs');
const path = require('path');

sample_obj =  {
    "id": 1,
    "created_at": "Thu Apr 06 15:24:15 +0000 2017",
    "text": "1\\/ Today we\\u2019re sharing our vision for the future of the Twitter API platform!\\nhttps:\\/\\/t.co\\/XweGngmxlP",
    "media": {
      "media": "https://via.placeholder.com/150"
    },
    "created_by": 1,
    "tweeted_at": "Thu Apr 06 15:24:15 +0000 2017"
  };
create_reserved("1",sample_obj);
//console.log(get_reserved("2"));
//deleteObj("1",2);

function get_reserved(userID) {
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

function create_reserved(userID, tweetObj){
  const filename = path.join( __dirname, '../data/rss/', userID + '.json');
  let jsonObject= [];
  if(fs.existsSync(filename)){
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    console.log(jsonObject);
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
  jsonObject.push(tweetObj);
  saveToFile(filename, jsonObject);
}

function deleteObj(userID, objID){
  const filename = path.join( __dirname, '../data/rss/', userID + '.json');
  if(fs.existsSync(filename)){
    jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    let result = jsonObject.filter(function(item) {
      return item.id != objID;
    });
    console.log(result);
    saveToFile(filename, result);
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
