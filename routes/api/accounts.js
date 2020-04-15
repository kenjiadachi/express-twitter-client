const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const saveToJson = require('../../func/saveToJson');
const settings = path.join( __dirname, '../../data/settings.json');

/* GET accounts listing. */
router.get('/', function(req, res) {
  const userID = req.user.id
  jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
  let index = jsonObject.findIndex((v) => v.id === userID);
  res.json(jsonObject[index].accounts);
});

/* PUT accounts */
router.put('/', function(req, res, next) {
  saveToJson.accounts(req.user.id, req.body.accounts)
  res.json(req.body.accounts);
});

module.exports = router;
