var parser = require('xml2json');
var fs = require('fs');
const path = require('path');
const diff = require('../func/diff');
const axios = require('axios');
const twitter = require('../func/twitter');
const format = require('../func/format');
const filename = path.join( __dirname, '../data/', 'settings.json');

const now = new Date();
const date = now.getFullYear() + "-" + ("0" + (now.getMonth()+1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);

rss();

async function rss(){
  let filepath = path.join( __dirname, '../data/rss');
  let fileList = [];
  fileList = fs.readdirSync(filepath);
  const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
  for (var jsonFile of fileList){
    // もし、settings.jsonのなかに、jsonFileの名前がIDとして存在すれば
    if (jsonObject.findIndex((v) => v.id === jsonFile.split('.')[0]) != -1) {
      const settingData = jsonObject.find((v) => v.id === jsonFile.split('.')[0]);
      // そのオブジェクトの中に、token, tokenSecertが存在すれば
      if (Object.keys(settingData).indexOf('token') !== -1 && Object.keys(settingData).indexOf('tokenSecret') !== -1) {

        const client = twitter.initWithToken(settingData.token, settingData.tokenSecret);

        let result = [];
        let newObj = [];
        
        let rssObject = JSON.parse(fs.readFileSync(path.join( __dirname, '../data/rss', jsonFile), 'utf8'));
        let logsFileName = path.join( __dirname, '../logs/rss-logs/', jsonFile);
        for(var xmlfile of rssObject) {
          let json = {};
          let existing_items = [];

          // rss-logs内に自分のファイルが存在すれば
          if(fs.existsSync(logsFileName)){
            var logsObject = JSON.parse(fs.readFileSync(logsFileName), 'utf8');
            result = logsObject;
            

            for(let item of logsObject){
              if(item.url === xmlfile.url){
                existing_items = existing_items.concat(item.content.rss.channel.item);
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
            var newItems = diff.ObjectArrays(thisItems, existing_items, "link").onlyObjArr1;

            let resultObj = {
              url: xmlfile.url,
              created_at: date,
              content: json,
              newItems: newItems
            };
            newObj.push(resultObj);
          }).catch(err => {
            console.log('err:', err);
          });
        }

        // newItemそれぞれに対してAPIを叩く
        for(let obj of newObj){
          for(let item of obj.newItems){
          
            // もし、投稿すべき内容であれば
            if (true) {
              let options = {};
              options.status = item.title + "\n" +item.link;
              // APIを叩く
              try {
                await client.post('statuses/update', options)
                .then((res) => {
                  console.log(res);
                  item.tweet = format.tweet(res);
                });
              } catch (err) {
                console.log(err);
              }
            }
          }
        }

        saveToJson(logsFileName, result.concat(newObj));
      }
    }
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
