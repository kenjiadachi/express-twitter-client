var parser = require('xml2json');
var fs = require('fs');
const path = require('path');
const diff = require('../func/diff');
const axios = require('axios');

const now = new Date();
const date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);

// rss();

async function rss(){
  let filepath = path.join( __dirname, '../data/rss');
  let fileList = [];
  fileList = fs.readdirSync(filepath);

  for (var jsonFile of fileList){
    let result = [];
    let rssObject = JSON.parse(fs.readFileSync(path.join( __dirname, '../data/rss',jsonFile), 'utf8'));
    let logsFileName = path.join( __dirname, '../logs/rss-logs/',jsonFile);
    // console.log(rssObject);
    for(var xmlfile of rssObject) {
      let json = {};
      let existing_items = [];
      if(fs.existsSync(logsFileName)){
        var logsObject = JSON.parse(fs.readFileSync(logsFileName), 'utf8');
        result = logsObject;
        for(var item of logsObject){
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
        options.object = true;
        json = parser.toJson(response.data, options);
        var thisItems = json.rss.channel.item;
        var newItems = diff.ObjectArrays(thisItems, existing_items,"link").onlyObjArr1;
        let resultObj = {
          url: xmlfile.url,
          created_at: date,
          content: json,
          newItems: newItems
        };
        result.push(resultObj);
      }).catch(err => {
        console.log('err:', err);
      });
    }
    saveToJson(logsFileName, result);
  }

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

module.exports = {
  rss: rss,
};
