
var fs = require('fs');
const path = require('path');

function sendDM(){
  const filename = path.join( __dirname, '../data/', 'settings.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){
      var forAPIlist = [];
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1){
        if(Object.keys(item).indexOf('keywords') !== -1){
          const keywords = item.keywords.split(',');
          for (var keyword of keywords){
            // keywordそれぞれに対して
            // https://api.twitter.com/1.1/search/tweets.jsonを実行
            // 結果
            // {
            // 	"keyword": "aaaa",
            // 	"userID": "12345678",
            // 	"followers_count": "200"
            // }
            // forAPIlist.push()

            // https://api.twitter.com/1.1/users/search.jsonを実行
            // 結果
            // {
            // 	"keyword": "aaaa",
            // 	"userID": "12345678",
            // 	"followers_count": "200"
            // }
            // forAPIlist.push()
          }
        }
      }
    }
  }
  else{
    console.log("json file does not exist");
  }
}

module.exports = {
  sendDM: sendDM,
};