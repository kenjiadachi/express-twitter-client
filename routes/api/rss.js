const express = require('express');
const router = express.Router();
const rss = require('../../func/rss');


/* GET rss listing. */
router.get('/', (req, res) => {
  const userID = req.user.id;
  const returnObj = rss.get(userID);
  res.json(returnObj);
});

router.post('/', (req, res) => {
  const userID = req.user.id;
  const rssObj = req.body;
  const returnObj = rss.post(userID, rssObj);
  res.json(returnObj);
});

router.delete('/:id', (req, res) => {
  const userID = req.user.id;
  const rssID = req.params.id;
  const returnObj = rss.post(userID, rssID);
  res.json(returnObj);
});


module.exports = router;
