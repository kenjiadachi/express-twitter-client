const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const saveToJson = require('../../func/saveToJson');
const settings = path.join( __dirname, '../../data/settings.json');

/* GET keywords listing. */
router.get('/', function(req, res) {
  const userID = req.user.id
  jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
  let index = jsonObject.findIndex((v) => v.id === userID);
  res.json(jsonObject[index].keywords);
});

/* PUT keywords */
router.put('/', function(req, res, next) {
  saveToJson.keywords(req.user.id, req.body.keywords)
  res.json(req.body.keywords);
});

module.exports = router;
