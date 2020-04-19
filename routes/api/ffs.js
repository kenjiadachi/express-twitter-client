const express = require('express');
const router = express.Router();
const ffs = require('../../func/ffs');
const url = require('url');
let urlInfo;


/* GET message listing. */
router.get('/', (req, res) => {
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
  const result = ffs.get(userID, startDate, endDate);
  res.json(result);
});

module.exports = router;
