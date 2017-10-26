var express = require('express');
var md5 = require('md5');
var mysql = require('mysql')
var router = express.Router();
const {
  auth
} = require('../utils/auth');
const config = require('../config/config');
const dbUtils = require('../utils/db');


// 定义数据库查询语句SQL
var sqlList = {
  list: 'select * from user order by id desc limit 20',
  insert: 'INSERT INTO user(name) VALUES(?)'
};

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * 获取用户列表
 */ 
router.get('/list', function (req, res, next) {
  let data;
  dbUtils
    .mysqlDB(sqlList.list)
    .then(results => {
      data = {
        status: 1,
        msg: "success",
        obj: results
      }
      res.json(data);
    }).catch(err => {
      console.log(err);
    });
});
/**
 * 添加用户数据
 */
router.post('/add', function (req, res, next) {
  let data;
  let name = req.body.name;
  dbUtils
    .mysqlDB(sqlList.insert, [name])
    .then(results => {
      data = {
        status: 1,
        msg: "success"
      }
      res.json(data);
    })
    .catch(err => {})
});


module.exports = router;