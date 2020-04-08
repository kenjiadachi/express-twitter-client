const express = require('express');
const router = express.Router();
const twitter = require('../../func/twitter');
const url = require('url');
let urlInfo;


router.get('/sum', function(req, res) {
  const userID = req.user.id
  client = twitter.init(userID)
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  var options = {};
  if( urlInfo.query.startDate ) {
    options.startDate = urlInfo.query.q
  }
  if( urlInfo.query.endDate ) {
    options.count = urlInfo.query.count
  }
  client.get('search/tweets', options, function(error, tweets, response){
    res.json(tweets)
  });
});

module.exports = router;
