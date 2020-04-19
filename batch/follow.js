var fs = require('fs');
const path = require('path');

keywords_toarray();

function keywords_toarray(){
  const filename = path.join( __dirname, '../data/', 'settings.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){

      var forAPIlist = [];
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1){
        if(Object.keys(item).indexOf('keywords') !== -1){
          var keywords = item.keywords.slice(1,-1);
          keywords = keywords.replace(/'/g, '');
          keywords = keywords.replace(/ /g, '');
          keywords = keywords.split(',');
          for (var keyword of keywords){
            // APIを叩く
            console.lof(keyword);
            // 結果

            // forAPIlist.push()
          }
        }
        if(Object.keys(item).indexOf('accounts') !== -1){
          var accounts = item.accounts.slice(1,-1);
          accounts = accounts.replace(/'/g, '');
          accounts = accounts.replace(/ /g, '');
          accounts = accounts.split(',');
          for (var account of accounts){
            let jsonfile = path.join( __dirname, '../data/ffs/', account + '.json');

            if(fs.existsSync(jsonfile)){
                // ffsにid.jsonがあれば最新のfollowerを取得してforAPIListに追加
                console.log(jsonfile);
                let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
                let latest_followers = (Object.values(ffsObject)).slice(-1)[0].followers;
                for (var i of latest_followers){
                  let tmpObj = {
                    "accountID": account,
                    "userID": i.id_str
                  };
                  forAPIlist.push(tmpObj);
                }

            }
            else{
            //  fileがなければAPIを叩く
              // forAPIlist.push();
            }


          }
        }

        // ここでListに対してAPI叩く
        console.log(forAPIlist);
      }
    }

  }
  else{
    console.log("json file does not exist");
  }
}
