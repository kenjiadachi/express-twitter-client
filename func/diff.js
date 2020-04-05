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
//  console.log(jsonObject1);
  jsonObject2 = readfile(filepath2);
  //console.log(jsonObject2);

  let same_id = [];
  let marged = [];
  let only_json1 = [];
  let only_json2 = [];

  jsonObject1.filter(item1 => {
    const same = jsonObject2.filter(
      item2 =>
        item1.id_str === item2.id_str
    );

    for(key in same){
      let varkey = same[key];
      same_id.push(varkey);
    }
  });

　marged = jsonObject1.concat(jsonObject2);

  // IE11でも使える（Babel + polyfill 未使用）
  function filterUniqueItemsById (array) {
    // idを集約した配列を作成
    let itemIds = array.map(function(item) {
      return item.id_str;
    });
    //
    return array.filter(function(item, index) {
      return itemIds.indexOf(item.id_str) === index;
    });
  }

  const uniqueItems = filterUniqueItemsById(marged);
  //console.log(uniqueItems);

  function differencen (array) {
    let itemIds = same_id.map(function(item) {
      return item.id_str;
    });

    return array.filter(function(item, index){
      return itemIds.indexOf(item.id_str) !== index;
    });
  }

  only_json1 = differencen(jsonObject1);
  //console.log(only_json1);
  only_json2 = differencen(jsonObject2);
  //console.log(only_json2);


  function readfile(filePath){
    filePath = path.join( __dirname, '../', filePath);
    if(fs.existsSync(filePath)) {
      json = JSON.parse(fs.readFileSync( filePath , 'utf8'));
      return json;
    }else{
      console.log('jsonfile file does not exit');
      return null;
    }
  };

  return [same_id,only_json1,only_json2];
}
