var fs = require('fs');
const path = require('path');
const filepath1 = '/data/tweet-list-sample.json'
const filepath2 = '/data/tweet-list-sample-neo.json'




result = diff_Object();
console.log(result);

//差分をとる
function diff_Object() {
  let jsonObject1 = [];
  let jsonObject2 = [];

  //一旦ファイル読みます

  jsonObject1 = readfile(filepath1);
  console.log(jsonObject1)


  if(fs.statSync(__dirname + filepath2)) {
    console.log("json file exists.");
    jsonObject2 = JSON.parse(fs.readFileSync(__dirname + filepath2, 'utf8'));
  }else {
    console.log('jsonfile2 file does not exit');
    return null;
  }

  for(key in jsonObject1){
    let varkey = jsonObject1[key];
    console.log(varkey.id_str);
  }
/*
  const diff = jsonObject1.filter(item1 => {
    const notMatch = jsonObject2.filter(
      item2 =>
        item1.id_str === item2.id_str &&
    });
      return notMatch.length !== 0;
  });

  if (diff.length !== 0) {
    console.info('Different!!!');
  }
  */

  func readfile(filePath){
    filePath = path.join( __dirname, '../', filePath);
    if(fs.existsSync(filePath)) {
      json = JSON.parse(fs.readFileSync(path.join( filePath , 'utf8'));
      return json;
    }else{
      console.log('jsonfile file does not exit');
      return null;
    }
  };
}
