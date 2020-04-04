
const fs = require('fs');
const path = require('path');
const filepath = '/data/settings.json'

result = save_keywords(['new','dde'], 'idn4');

//キーワードを保存する
function save_keywords(keywords,user_id) {
  let jsonObject = [];
  if(fs.existsSync(path.join( __dirname, '../', filepath))) {
    console.log("settings.json file exists.");
    jsonObject = JSON.parse(fs.readFileSync(path.join( __dirname, '../', filepath), 'utf8'));

    let search = jsonObject.findIndex((v) => v.id === user_id);

    if(search!=-1){
      console.log(jsonObject[search].keywords);
      jsonObject[search].keywords = keywords;
    }else{
      jsonObject.push({
        id: user_id,
        keywords: keywords
      });
    }
  //  jsonObjectが配列やから、その配列内のオブジェクトから、オブジェクト内のuser＿idが同じものがあるかどうかを探索
  //  あれば、そのオブジェクト内の、keywordsを置き換える
  //  なければ
  //  jsonObject.push = {
  //    id: user_id,
  //    keywords: keywords
  //  }

  }else {
    console.log('keyword file does not exist');
    //keyword.jsonがないときの処理
    jsonObject.push({
      id: user_id,
      keywords: keywords
    });
    console.log(jsonObject);
  }
  //new Objectをファイルに書き出し
  fs.writeFile( path.join( __dirname, '../', filepath), JSON.stringify(jsonObject) , (err) => {
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
