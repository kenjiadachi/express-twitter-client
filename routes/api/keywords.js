const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const settings = path.join( __dirname, '../../data/settings.json')

/* GET keywords listing. */
router.get('/:id', function(req, res, next) {
  const userID = req.params.id
  jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
  let index = jsonObject.findIndex((v) => v.id === userID);
  res.json(jsonObject[index].keywords);
});

module.exports = router;
