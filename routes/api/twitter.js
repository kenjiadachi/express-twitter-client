const express = require('express');
const router = express.Router();
const twitter = require('../../func/twitter');
const url = require('url');
let urlInfo;


router.get('/search', function(req, res) {
  const userID = req.user.id
  client = twitter.init(userID)
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  var options = {};
  if( urlInfo.query.q ) {
    options.q = urlInfo.query.q
  }
  if( urlInfo.query.count ) {
    options.count = urlInfo.query.count
  }
  client.get('search/tweets', options, function(error, tweets, response){
    res.json(tweets)
  });
});

module.exports = router;
