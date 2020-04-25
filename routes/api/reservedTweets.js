const express = require('express');
const router = express.Router();
const reservedTweets = require('../../func/reservedTweets');


/* GET rss listing. */
router.get('/', (req, res) => {
  const userID = req.user.id;
  const returnObj = reservedTweets.get(userID);
  res.json(returnObj);
});

router.post('/', (req, res) => {
  const userID = req.user.id;
  const rssObj = req.body;
  const returnObj = reservedTweets.create(userID, rssObj);
  res.json(returnObj);
});

router.delete('/:id', (req, res) => {
  const userID = req.user.id;
  const rssID = req.params.id;
  const returnObj = reservedTweets.deleteObj(userID, rssID);
  res.json(returnObj);
});


module.exports = router;
