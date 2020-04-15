//favo数で多い順にソート
exports.byFav = function (object) {
  object.sort(function(a,b){
      if( a.favorite_count > b.favorite_count ) return -1;
      if( a.favorite_count < b.favorite_count ) return 1;
  });
  return object;
};

//リツイートの多い順にソート
exports.byRet = function (object) {
  object.sort(function(a,b){
      if( a.retweet_count > b.retweet_count ) return -1;
      if( a.retweet_count < b.retweet_count ) return 1;
  });
  return object;
};

//favoとリツイートの合計値で多い順にソート
exports.bySum = function (object) {
    object.sort(function(a,b){
        if( a.favorite_count + a.retweet_count > b.favorite_count + b.retweet_count ) return -1;
        if( a.favorite_count + a.retweet_count < b.favorite_count + b.retweet_count ) return 1;
    });
    return object;
};
