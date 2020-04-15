const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const saveToJson = require('../../func/saveToJson');
const analytics = require('../../func/analytics');
const settings = path.join( __dirname, '../../data/settings.json');

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

module.exports = router;
