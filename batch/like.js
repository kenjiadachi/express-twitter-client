var fs = require('fs');
const path = require('path');

function like(){
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
            // 	"tweetID": "12345678"
            // }
            // forAPIlist.push()

            // https://api.twitter.com/1.1/users/search.jsonを実行
            // 結果
            // {
            // 	"keyword": "aaaa",
            // 	"tweetID": "12345678"
            // }
            // forAPIlist.push()
          }
        }
        if(Object.keys(item).indexOf('accounts') !== -1){
          const accounts = item.accounts.split(',');
          for (var account of accounts){
            let jsonfile = path.join( __dirname, '../data/ffs/', account + '.json');
            if(fs.existsSync(jsonfile)){
                // ffsにid.jsonがあれば最新のfollowerを取得してforAPIListに追加
                console.log(jsonfile);
                let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
                let latest_followers = (Object.values(ffsObject)).slice(-1)[0].followers;
                for (let i of latest_followers){
                  let tmpObj = {
                    "accountID": account,
                    "tweetID": i.status.id_str
                  };
                  forAPIlist.push(tmpObj);
                }

            }
            else{
            //  fileがなければAPIを叩く
            // https://api.twitter.com/1.1/followers/list.jsonをたたいて、ユーザーリストを取得してその最新の投稿のIDを抽出し以下のオブジェクトを配列に入れる
              // forAPIlist.push();
            }
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
  like: like,
};