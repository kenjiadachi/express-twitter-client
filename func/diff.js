// 差分をとる
function ObjectArrays (objArr1, objArr2) {
  const result = {};
  result.common = [];

  result.onlyObjArr1 = [];
  result.onlyObjArr2 = [];

  objArr1.filter((item1) => {
    const same = objArr2.filter(
      (item2) => item1.id_str === item2.id_str,
    );

    for (var key in same) {
      const varkey = same[key];
      result.common.push(varkey);
    }
  });


  result.onlyObjArr1 = difference(objArr1, result.common);
  result.onlyObjArr2 = difference(objArr2, result.common);

  // return [common,only_json1,only_json2];
  return result;
}


function difference(array, common) {
  const itemIds = common.map((item) => item.id_str);
  return array.filter((item) => itemIds.indexOf(item.id_str) === -1);
}


module.exports = {
  ObjectArrays: ObjectArrays,
};
