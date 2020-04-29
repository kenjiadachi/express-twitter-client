const express = require('express');

const router = express.Router();
const url = require('url');
const analytics = require('../../func/analytics');

let urlInfo;

router.get('/from-which', (req, res) => {
  const userID = req.user.id;
  const returnObj = analytics.fromWhich(userID);
  res.json(returnObj);
});

router.get('/followers/follower', (req, res) => {
  const userID = req.user.id;
  const returnObj = analytics.follower_follower(userID);
  res.json(returnObj);
});

router.get('/followers/tweet', (req, res) => {
  const userID = req.user.id;
  const returnObj = analytics.follower_tweet(userID);
  res.json(returnObj);
});

router.get('/followers/is-protected', (req, res) => {
  const userID = req.user.id;
  const returnObj = analytics.isProtected(userID);
  res.json(returnObj);
});

router.get('/followers/continue', (req, res) => {
  const userID = req.user.id;

  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  if (!urlInfo.query) { res.error; }
  let startDate;
  let endDate;
  if (urlInfo.query.startDate) {
    startDate = new Date(urlInfo.query.startDate);
  }
  if (urlInfo.query.endDate) {
    endDate = new Date(urlInfo.query.endDate);
  }

  const returnObj = analytics.follower_continue(userID, startDate, endDate);
  res.json(returnObj);
});

router.get('/follows/deactives', (req, res) => {
  const userID = req.user.id;
  const returnObj = analytics.deactives(userID);
  res.json(returnObj);
});

router.get('/keywords/followbacks', (req, res) => {
  const userID = req.user.id;
  const returnObj = analytics.keywords_followbacks(userID);
  res.json(returnObj);
});

module.exports = router;
