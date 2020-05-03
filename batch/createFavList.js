
var fs = require('fs');
const path = require('path');

createFavList();
function createFavList(){
  const filename = path.join( __dirname, '../data/', 'settings.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){

      // アイテムの中に、tokenとtokenSecretが含まれるか
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1){

          let ids = Object.values(item.id);
          console.log(item.id);

            let jsonfile = path.join( __dirname, '../data/ffs/', item.id + '.json');

            if(fs.existsSync(jsonfile)){
                // ffsにid.jsonがあれば最新のfollowerを取得してforAPIListに追加
                let ffsObject = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
                let latest_followers = (Object.values(ffsObject)).slice(-1)[0].followers;
                console.log(latest_followers);
            }


      }
    }
  } else {
    console.log("json file does not exist");
  }
}
