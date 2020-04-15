const express = require('express');
const router = express.Router();
const twitter = require('../../func/twitter');
const sort = require('../../func/sort');
const url = require('url');
let urlInfo;


router.get('/sum', function(req, res) {
  const userID = req.user.id
  client = twitter.init(userID)
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  if(!urlInfo.query){ res.error }
  let options = {};
  let startDate;
  let endDate;
  if( urlInfo.query.startDate ) {
    startDate = new Date(urlInfo.query.startDate);
  }
  if( urlInfo.query.endDate ) {
    endDate = new Date(urlInfo.query.endDate);
  }

  options.user_id = userID
  options.include_rts = false
  options.count = 200
  client.get('statuses/user_timeline', options)
    .then(function (tweets) {
      const filteredTweets = tweets.filter(function(item, index){
        if (new Date(item.created_at).getTime() > startDate.getTime() && new Date(item.created_at).getTime() < endDate.getTime()) return true;
      });
      const sortedFilteredTweets = sort.bySum(filteredTweets)

      res.json(sortedFilteredTweets);

    })
    .catch(function (error) {
      console.log(error)
    })
  
});

router.get('/rt', function(req, res) {
  const userID = req.user.id
  client = twitter.init(userID)
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  // if(!urlInfo.query){ res.error}
  let options = {};
  let startDate;
  let endDate;
  if( urlInfo.query.startDate ) {
    startDate = new Date(urlInfo.query.startDate);
  }
  if( urlInfo.query.endDate ) {
    endDate = new Date(urlInfo.query.endDate);
  }

  options.user_id = userID
  options.include_rts = false
  options.count = 200
  client.get('statuses/user_timeline', options)
    .then(function (tweets) {
      const filteredTweets = tweets.filter(function(item, index){
        if (new Date(item.created_at).getTime() > startDate.getTime() && new Date(item.created_at).getTime() < endDate.getTime()) return true;
      });
      const sortedFilteredTweets = sort.byRet(filteredTweets)

      res.json(sortedFilteredTweets);

    })
    .catch(function (error) {
      console.log(error)
    })
  
});

router.get('/like', function(req, res) {
  const userID = req.user.id
  client = twitter.init(userID)
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  // if(!urlInfo.query){ res.error}
  let options = {};
  let startDate;
  let endDate;
  if( urlInfo.query.startDate ) {
    startDate = new Date(urlInfo.query.startDate);
  }
  if( urlInfo.query.endDate ) {
    endDate = new Date(urlInfo.query.endDate);
  }

  options.user_id = userID
  options.include_rts = false
  options.count = 200
  client.get('statuses/user_timeline', options)
    .then(function (tweets) {
      const filteredTweets = tweets.filter(function(item, index){
        if (new Date(item.created_at).getTime() > startDate.getTime() && new Date(item.created_at).getTime() < endDate.getTime()) return true;
      });
      const sortedFilteredTweets = sort.byFav(filteredTweets)

      res.json(sortedFilteredTweets);

    })
    .catch(function (error) {
      console.log(error)
    })
  
});

module.exports = router;
