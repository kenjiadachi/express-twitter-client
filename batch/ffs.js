
var fs = require('fs');
const path = require('path');
const ffs = require('../func/ffs');

// main();

async function main(){
  const filename = path.join( __dirname, '../data/', 'settings.json');
  if(fs.existsSync(filename)){
    const jsonObject = JSON.parse(fs.readFileSync(filename, 'utf8'));
    for(var item of jsonObject){
      
      // アイテムの中に、tokenとtokenSecret、messageが含まれるか
      if(Object.keys(item).indexOf('token') !== -1 && Object.keys(item).indexOf('tokenSecret') !== -1 && Object.keys(item).indexOf('message') !== -1){
        // 存在すれば、ffsを更新
        ffs.update(item.id, item.token, item.tokenSecret);
      }
    }
  } 
}

module.exports = {
  main: main,
};