var fs = require('fs');
const path = require('path');
const diff = require('./diff')

const samplefollows = [
   {
    "id_str": "1",
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  },
  {
    "id_str": "2",
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  }
];

const samplefollowers = [
  {
    "id_str": "3",
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  },
  {
    "id_str": "4",
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  },
];

const samplefollows2 = [
   {
    "id_str": "1",
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  },
  {
    "id_str": "3",
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  }
];

const samplefollowers2 = [
  {
    "id_str": "2",
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  },
  {
    "id_str": "4",
    "screen_name": "Twitter Dev",
    "image": "https://~.png"
  },
];

const sampleUser_id = "necwecwe";
const follows_count = "200";
const followers_count = "300";

//引数；オブジェクトの配列、オブジェクトの配列、String
ffs(samplefollows, samplefollowers, sampleUser_id, follows_count, followers_count);
//ffs(samplefollows2, samplefollowers2, sampleUser_id, follows_count, followers_count);

function ffs(followsObject, followersObject, user_id, followsCount, followersCount) {
  //実行日付を取得
  let today = new Date();
  today = today.getFullYear() + "-" + ("0" + (today.getMonth()+1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
  //today = "2020-04-34";
  //console.log(createdDate);
  //console.log(followsObject);

  let filename = user_id + ".json";
  filename = path.join( __dirname, '../data/ffs/', filename);
  let jsonObject = {};
  //,そのユーザーのJsonファイルがあるかの確認
  if(fs.existsSync(filename)){
    console.log("json file exist");
    //jsonから日付取得,今日の日付のデータがあるかの確認
    obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
    let k = Object.keys(obj);
    //console.log(k.indexOf(today));

    if(k.indexOf(today) === -1){
      //今日のデータがない場合には、今日のデータ＆前日との比較データを追記
      console.log("this is today's first data");
      let o = (Object.values(obj)).slice(-1)[0].follows;
      diff_follow = diff.diff_Object(o,followsObject);
      let o2 = (Object.values(obj)).slice(-1)[0].followers;
      diff_follower = diff.diff_Object(o2,followersObject);
    //  console.log(o2,followersObject);
    //  console.log(diff_follower);

      let ratio = (Math.round((followersCount/followsCount)*100))/100;
      jsonObject = obj;

      jsonObject[today] = {
        "follows": followsObject,
        "new_follows": diff_follow[2],
        "deleted_follows": diff_follow[1],
        "followers": followersObject,
        "new_followers": diff_follower[2],
        "deleted_followers": diff_follower[1],
        "follows_count": followsCount,
        "new_follows_count": diff_follow[2].length,
        "deleted_follows_count": diff_follow[1].length,
        "followers_count": followersCount,
        "new_followers_count": diff_follower[2].length,
        "deleted_followers_count": diff_follower[1].length,
        "ff_ratio": ratio.toFixed(2)
      }

    }else{//今日のデータがあるときは何もしない
      console.log("today's data is already exsisting.");
      jsonObject = obj;
    }

  }else{//ユーザーのJsonファイルがないときは新しく作成してデータ追加ああ
    let ratio = (Math.round((followersCount/followsCount)*100))/100;

    jsonObject["created_date"] = today;
    jsonObject[today] = {
      "follows": followsObject,
      "followers": followersObject,
      "follows_count": followsCount,
      "followers_count": followersCount,
      "ff_ratio": ratio.toFixed(2)
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
