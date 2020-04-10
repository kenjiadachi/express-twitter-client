const path = require('path');
const fs = require('fs');

const settings = path.join( __dirname, '../data/settings.json')

// "2020-01-01"形式の文字列を日付に変更
exports.stringToDate = function (str) {
  const tmpArray = str.split( '-' );
  return new Date(tmpArray[0], tmpArray[1], tmpArray[2]);
}

// "Wed Oct 10 20:19:24 +0000 2018"形式の文字列を日付に変更
exports.tweetObjectValueToDate = function (str) {
  const tmpArray = str.split( ' ' );
  return new Date(tmpArray[5], tmpArray[1], tmpArray[2]);
}
