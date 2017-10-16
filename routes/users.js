var express = require('express');
var md5 = require('md5');
var mysql = require('mysql')
var router = express.Router();
const {
  auth
} = require('../utils/auth');
const config = require('../config/config');


// 链接数据库

var connection = mysql.createConnection(config.mysql);
var sqlList = {
  list: 'select * from user order by id desc limit 4',
  list2: 'select * from user limit 4 order by id desc',
  insert:'INSERT INTO user(name) VALUES(?)'
}
connection.connect();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', auth, function (req, res, next) {
  let data = {
    status: 1,
    msg: 'api test ok',
    time: new Date().getTime()
  }
  res.json(data);
});

router.get('/list', function (req, res, next) {
  let data;
  connection.query(sqlList.list, function (error, results, fields) {
    if (error) {} else {
      data={
        status:1,
        msg:"success",
        obj:results
      }
      res.json(data);  
    }
  })
});
/**
 * 添加用户数据
 */
router.post('/add',auth, function (req, res, next) {
  let data;
  let name=req.body.name;
  connection.query(sqlList.insert, [name],function (error, results, fields) {
    if (error) {} else {
      data={
        status:1,
        msg:"success"
      }
      res.json(data);  
    }
  })
});


module.exports = router;