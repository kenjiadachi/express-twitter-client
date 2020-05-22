const express = require('express');
const config = require('../../config');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const settings = path.join(__dirname, '../../data/settings.json');


router.get('/', (req, res) => {

  if (Object.prototype.hasOwnProperty.call(req.headers, 'admin-code') && req.headers['admin-code'] == config.adminCode) {
    const jsonObject = JSON.parse(fs.readFileSync(settings, 'utf8'));
    res.json(jsonObject);
  } else {
    res.json('admin auth is failed');
  }

});

module.exports = router;
