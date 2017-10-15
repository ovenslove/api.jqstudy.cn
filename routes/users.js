var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  let data={
    status:1,
    msg:'api test ok',
    time:new Date().getTime()
  }
  res.json(data);
});

module.exports = router;
