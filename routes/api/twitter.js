const express = require('express');

const router = express.Router();
const url = require('url');
const twitter = require('../../func/twitter');

let urlInfo;


router.get('/search', (req, res) => {
  const userID = req.user.id;
  client = twitter.init(userID);
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  const options = {};
  if (urlInfo.query.q) {
    options.q = urlInfo.query.q;
  }
  if (urlInfo.query.count) {
    options.count = urlInfo.query.count;
  }
  client.get('search/tweets', options, (error, tweets, response) => {
    res.json(tweets);
  });
});

module.exports = router;
