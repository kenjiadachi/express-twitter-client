const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const saveToJson = require('../../func/saveToJson');
const ffs = require('../../func/ffs');
const settings = path.join( __dirname, '../../data/settings.json');
const url = require('url');
let urlInfo;


/* GET message listing. */
router.get('/', function(req, res) {
  const userID = req.user.id
  // クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
  urlInfo = url.parse(req.url, true);
  // if(!urlInfo.query){ res.error}
  let startDate;
  let endDate;
  if( urlInfo.query.startDate ) {
    startDate = new Date(urlInfo.query.startDate);
  }
  if( urlInfo.query.endDate ) {
    endDate = new Date(urlInfo.query.endDate);
  }
  const result = ffs.get(userID, startDate, endDate)
  res.json(result)
});

/* PUT message */
router.put('/', function(req, res) {
  saveToJson.message(req.user.id, req.body.message, req.body.minFollower)
  res.json(req.body);
});

module.exports = router;
