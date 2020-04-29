var parser = require('xml2json');
var fs = require('fs');
const path = require('path');

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
    // console.log(rssObject);
    for(xmlfile of rssObject) {
      let json = {}
      // console.log(xmlfile.url);
      await axios.get(xmlfile.url)
      .then(response => {
        // console.log(response.data);
        let options = {};
        options.object = true
        json = parser.toJson(response.data, options);
        console.log(json);

        let resultObj = {
          "url" : xmlfile.url,
          "created_at" : date,
          "content" : json
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
    saveToJson(path.join( __dirname, '../logs/rss-logs/', jsonFile), result);
  }

}

function readXML(url){

}

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
