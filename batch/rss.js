var parser = require('xml2json');
var fs = require('fs');
const path = require('path');
const diff = require('../func/diff');

rss();

async function rss(){
  // xml to json
  // let filename = path.join( __dirname, '../data/', 'index.xml');
  let url = "https://www.lifehacker.jp/feed/index.xml"
  const axios = require('axios');
  let filepath = path.join( __dirname, '../data/rss')
  let fileList = [];
  fileList = fs.readdirSync(filepath);
  console.log(fileList);
  now = new Date();
  let date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " "
        + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
  for (jsonFile of fileList){
    let result = [];
    let rssObject = JSON.parse(fs.readFileSync(path.join( __dirname, '../data/rss',jsonFile), 'utf8'));
    let logsFileName = path.join( __dirname, '../logs/rss-logs/',jsonFile);
    // console.log(rssObject);
    for(xmlfile of rssObject) {
      let json = {}
      let existing_items = [];
      if(fs.existsSync(logsFileName)){
        logsObject = JSON.parse(fs.readFileSync(logsFileName), 'utf8');
        result = logsObject;
        for(item of logsObject){
          if(item.url === xmlfile.url){
            existing_items = item.content.rss.channel.item;
            // console.log(existing_items);
          }
        }
      }

      // console.log(xmlfile.url);
      await axios.get(xmlfile.url)
      .then(response => {
        // console.log(response.data);
        let options = {};
        options.object = true
        json = parser.toJson(response.data, options);
        thisItems = json.rss.channel.item;
        console.log(thisItems);
        newItems = diff.ObjectArrays(thisItems, existing_items,"link").onlyObjArr1;
        console.log(newItems);
        let resultObj = {
          "url" : xmlfile.url,
          "created_at" : date,
          "content" : json,
          "newItems" : newItems
        }
        result.push(resultObj);
      }).catch(err => {
        console.log('err:', err);
      });
       // console.log(json);
      // var xml = fs.readFileSync(filename, 'utf8')
      // json2 = parser.toJson(json, options);
      // console.log("to json -> %s", json);

    }
    saveToJson(logsFileName, result);
  }

}


// 差分をとる
// function ObjectArrays (objArr1, objArr2) {
//   const result = {};
//   result.common = [];
//
//   result.onlyObjArr1 = [];
//   result.onlyObjArr2 = [];
//
//   objArr1.filter((item1) => {
//     const same = objArr2.filter(
//       (item2) => item1.link === item2.link,
//     );
//
//     for (var key in same) {
//       const varkey = same[key];
//       result.common.push(varkey);
//     }
//   });
//
//
//   result.onlyObjArr1 = difference(objArr1, result.common);
//   result.onlyObjArr2 = difference(objArr2, result.common);
//
//   // return [common,only_json1,only_json2];
//   return result;
// }
//
//
// function difference(array, common) {
//   const itemIds = common.map((item) => item.link);
//   return array.filter((item) => itemIds.indexOf(item.link) === -1);
// }

// 書き出し用の関数
function saveToJson(filename, object) {
  fs.writeFile(filename, JSON.stringify(object), (err) => {
    // 書き出しに失敗した場合
    if (err) {
      console.log(`エラーが発生しました。${err}`);
      throw err;
    }
    // 書き出しに成功した場合
    else {
      console.log('ファイルが正常に書き出しされました');
    }
  });
}
