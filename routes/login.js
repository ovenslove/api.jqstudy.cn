var express = require('express');
var md5 = require('md5');
var {
  login
} = require('../utils/auth');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
  // console.log(req.session);
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  let loginData = login(req);
  let backData = {};
  if (loginData) {
    backData = {
      status: 1,
      msg: 'success',
      data: {
        token: loginData.token,
        time: 7200
      }
    };
  } else {
    backData = {
      status: 0,
      msg: '登录失败'
    };
  }
  res.json(backData);
});

module.exports = router;