var fs = require('fs');
const path = require('path');


const samplefollows = [
   {
    "<user_id>": 1,
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  },
  {
    "<user_id>": 2,
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  }
];

const samplefollowers = [
  {
    "<user_id>": 3,
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  },
  {
    "<user_id>": 4,
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  },
];

const sampleUser_id = "00033332d22";

//引数；オブジェクトの配列、オブジェクトの配列、String
ffs(samplefollows, samplefollowers, sampleUser_id);

function ffs(followsObject, followersObject, user_id) {
  //実行日付を取得
  let today = new Date();
  today = today.getFullYear() + "-" + ("0" + (today.getMonth()+1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
  //console.log(createdDate);
  //console.log(followsObject);

  let filename = user_id + ".json";
  filename = path.join( __dirname, '../data/ffs/', filename);
  let jsonObject = {};
  //すでにファイルがあって、今日の日付のオブジェクトがあるとき
  if(fs.existsSync(filename)){
    console.log("json file exist")
    //jsonから日付取得
    obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
    let k = Object.keys(obj);
    console.log(k.indexOf(today));


    if(k.indexOf(today) === -1){
      //ここは、追加するように書き換えるところ
    }else{//そのまま
      console.log("もうその日付あるよ")
      jsonObject = obj;
    }

  }else{//jsonなし
    jsonObject["created_date"] = today;
    jsonObject[today] = {
      "follows": samplefollows,
      "followers": samplefollowers
    };
  }
  saveToJson(filename, jsonObject);

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
}
