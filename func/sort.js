
var fs = require('fs');
const path = require('path');
const filepath = '/data/tweet-list-sample.json';

json = JSON.parse(fs.readFileSync(path.join( __dirname, '../', filepath), 'utf8'));
//result = sort_by_favorite(json);
//result = sort_by_retweet(json);
result = sort_by_favorite_and_retweet(json);
console.log(result);

//favo数で多い順にソート
function sort_by_favorite(jsonObject) {

  jsonObject.sort(function(a,b){
      if( a.favorite_count > b.favorite_count ) return -1;
      if( a.favorite_count < b.favorite_count ) return 1;
  });

  return jsonObject;
};

//リツイートの多い順にソート
function sort_by_retweet(jsonObject) {

  jsonObject.sort(function(a,b){
      if( a.retweet_count > b.retweet_count ) return -1;
      if( a.retweet_count < b.retweet_count ) return 1;
  });

  return jsonObject;
};

//favoとリツイートの合計値で多い順にソート
function sort_by_favorite_and_retweet(jsonObject) {

    jsonObject.sort(function(a,b){
        if( a.favorite_count + a.retweet_count > b.favorite_count + b.retweet_count ) return -1;
        if( a.favorite_count + a.retweet_count < b.favorite_count + b.retweet_count ) return 1;
    });

    return jsonObject;
};
