const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { name: req.user.displayName });
});

module.exports = router;
