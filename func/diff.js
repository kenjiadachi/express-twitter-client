
// 差分をとる
function ObjectArrays (objArr1, objArr2, keyType="id_str") {
  const result = {};
  result.common = [];

  result.onlyObjArr1 = [];
  result.onlyObjArr2 = [];

  objArr1.filter((item1) => {
    const same = objArr2.filter(
      (item2) => item1[keyType] === item2[keyType],
    );

    for (var key in same) {
      const varkey = same[key];
      result.common.push(varkey);
    }
  });
  result.onlyObjArr1 = difference(objArr1, result.common, keyType);
  result.onlyObjArr2 = difference(objArr2, result.common, keyType);

  // return [common,only_json1,only_json2];
  return result;
}


function difference(array, common, keyType) {
  const itemIds = common.map((item) => item[keyType]);
  return array.filter((item) => itemIds.indexOf(item[keyType]) === -1);
}


//それぞれのキーが違う状態でOnlyObjectをだす
function OnlyObject1 (objArr1, keyType1, objArr2, keyType2) {
  let common = [];
  objArr2.filter((item2) => {
    const same = objArr1.filter(
      (item1) => item1[keyType1] === item2[keyType2],
    );

    for (var key in same) {
      const varkey = same[key];
      common.push(varkey);
    }
  });
  result = difference(objArr1, common, keyType1);
  return result;
}


module.exports = {
  ObjectArrays: ObjectArrays,
  OnlyObject1: OnlyObject1
};
