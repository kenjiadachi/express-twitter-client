const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const saveToJson = require('../../func/saveToJson');
const settings = path.join( __dirname, '../../data/settings.json');

/* GET message listing. */
router.get('/:id', function(req, res, next) {
  const userID = req.params.id
  jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
  let index = jsonObject.findIndex((v) => v.id === userID);
  returnObj = {
    message: jsonObject[index].message,
    minFollower: jsonObject[index].minFollower
  }
  res.json(returnObj);
});

/* PUT message */
router.put('/:id', function(req, res, next) {
  console.log(req)
  saveToJson.message(req.params.id, req.body.message, req.body.minFollower)
  res.json(req.body);
});

module.exports = router;
