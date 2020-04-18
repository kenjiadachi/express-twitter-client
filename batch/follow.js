var fs = require('fs');
const path = require('path');

keywords_toarray();

function keywords_toarray(){
  const filename = path.join( __dirname, '../data/', 'settings.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(item of jsonObject){

      var forAPIlist = []
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1){
        if(Object.keys(item).indexOf('keywords') !== -1){
          keywords = item.keywords.split(',');
          for (keyword of keywords){
            // APIを叩く

            // 結果

            // forAPIlist.push()
          }
        }
        if(Object.keys(item).indexOf('accounts') !== -1){
          accounts = item.accounts.split(',');
          for (account of accounts){
            let jsonfile = path.join( __dirname, '../data/ffs/', account + '.json');

            if(fs.existsSync(jsonfile)){
                // ffsにid.jsonがあれば最新のfollowerを取得してforAPIListに追加
                console.log(jsonfile);
                let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
                let latest_followers = (Object.values(ffsObject)).slice(-1)[0].followers;
                for (i of latest_followers){
                  let tmpObj = {
                    "accountID": account,
                    "userID": i.id_str
                  }
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
