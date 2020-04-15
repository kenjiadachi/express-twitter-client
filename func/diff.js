//差分をとる
exports.ObjectArrays = function (objArr1, objArr2) {
  let result = {};
  result.common = [];

  result.onlyObjArr1 = [];
  result.onlyObjArr2 = [];

  objArr1.filter(item1 => {
    const same = objArr2.filter(
      item2 =>
        item1.id_str === item2.id_str
    );

    for(key in same){
      let varkey = same[key];
      result.common.push(varkey);
    }
  });


  result.onlyObjArr1 = difference(objArr1, result.common);
  result.onlyObjArr2 = difference(objArr2, result.common);

  // return [common,only_json1,only_json2];
  return result
}



function difference(array, common) {
  let itemIds = common.map(function(item) {
    return item.id_str;
  });
  return array.filter(function(item){
    return itemIds.indexOf(item.id_str) === -1;
  });
}
