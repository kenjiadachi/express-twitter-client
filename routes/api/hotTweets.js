const express = require('express');

const router = express.Router();
const url = require('url');
const twitter = require('../../func/twitter');
const sort = require('../../func/sort');

let urlInfo;


router.get('/sum', (req, res) => {
  const userID = req.user.id;
  const client = twitter.init(userID);
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  if (!urlInfo.query) { res.error; }
  const options = {};
  let startDate;
  let endDate;
  if (urlInfo.query.startDate) {
    startDate = new Date(urlInfo.query.startDate);
  }
  if (urlInfo.query.endDate) {
    endDate = new Date(urlInfo.query.endDate);
  }

  options.user_id = userID;
  options.include_rts = false;
  options.count = 200;
  client.get('statuses/user_timeline', options)
    .then((tweets) => {
      const filteredTweets = tweets.filter((item) => {
        if (new Date(item.created_at).getTime() > startDate.getTime() && new Date(item.created_at).getTime() < endDate.getTime()) return true;
      });
      const sortedFilteredTweets = sort.bySum(filteredTweets);

      res.json(sortedFilteredTweets);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/rt', (req, res) => {
  const userID = req.user.id;
  const client = twitter.init(userID);
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  // if(!urlInfo.query){ res.error}
  const options = {};
  let startDate;
  let endDate;
  if (urlInfo.query.startDate) {
    startDate = new Date(urlInfo.query.startDate);
  }
  if (urlInfo.query.endDate) {
    endDate = new Date(urlInfo.query.endDate);
  }

  options.user_id = userID;
  options.include_rts = false;
  options.count = 200;
  client.get('statuses/user_timeline', options)
    .then((tweets) => {
      const filteredTweets = tweets.filter((item) => {
        if (new Date(item.created_at).getTime() > startDate.getTime() && new Date(item.created_at).getTime() < endDate.getTime()) return true;
      });
      const sortedFilteredTweets = sort.byRet(filteredTweets);

      res.json(sortedFilteredTweets);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/like', (req, res) => {
  const userID = req.user.id;
  const client = twitter.init(userID);
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  // if(!urlInfo.query){ res.error}
  const options = {};
  let startDate;
  let endDate;
  if (urlInfo.query.startDate) {
    startDate = new Date(urlInfo.query.startDate);
  }
  if (urlInfo.query.endDate) {
    endDate = new Date(urlInfo.query.endDate);
  }

  options.user_id = userID;
  options.include_rts = false;
  options.count = 200;
  client.get('statuses/user_timeline', options)
    .then((tweets) => {
      const filteredTweets = tweets.filter((item) => {
        if (new Date(item.created_at).getTime() > startDate.getTime() && new Date(item.created_at).getTime() < endDate.getTime()) return true;
      });
      const sortedFilteredTweets = sort.byFav(filteredTweets);

      res.json(sortedFilteredTweets);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
