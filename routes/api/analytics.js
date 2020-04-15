const express = require('express');
const router = express.Router();
const analytics = require('../../func/analytics');
const url = require('url');
let urlInfo;

router.get('/from_which', function(req, res) {
  const userID = req.user.id
  let returnObj = analytics.fromWhich(userID)
  res.json(returnObj);
});

router.get('/follower_follower', function(req, res) {
  const userID = req.user.id
  let returnObj = analytics.follower_follower(userID)
  res.json(returnObj);
});

router.get('/follower_tweet', function(req, res) {
  const userID = req.user.id
  let returnObj = analytics.follower_tweet(userID)
  res.json(returnObj);
});

router.get('/follower_protected', function(req, res) {
  const userID = req.user.id
  let returnObj = analytics.isProtected(userID)
  res.json(returnObj);
});

router.get('/follower_continue', function(req, res) {
  const userID = req.user.id

  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  if(!urlInfo.query){ res.error }
  let startDate;
  let endDate;
  if( urlInfo.query.startDate ) {
    startDate = new Date(urlInfo.query.startDate);
  }
  if( urlInfo.query.endDate ) {
    endDate = new Date(urlInfo.query.endDate);
  }

  let returnObj = analytics.follower_continue(userID, startDate, endDate)
  res.json(returnObj);
});

module.exports = router;
