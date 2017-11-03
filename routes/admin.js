var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var utils = require('../utils/utils');
const dbUtils = require('../utils/db');
var menuData = {
  userInfo: {
    userName: "马赛克的救赎",
    userLogoUrl: "https://static-oven.b0.upaiyun.com/static-image/mylogo.png",
    userType: "administrator",
    userTypeName: "管理员",
    userTypeWeight: 1000,
  },
  menuList: utils.getMenuData(),
  systemInfo: {
    adminLogo: "",
    adminName: "荔枝后台管理系统"
  }
};

/* GET home page. */
router.get('/', function (req, res, next) {
  menuData.pagesName = ['page1'];
  menuData.breadcrumbData = ['管理面板'];

  res.render('admin', {
    "title": '后台首页',
    menuData
  })
});

/**
 * 接口列表
 */
router.get('/interface/list', function (req, res, next) {
  menuData.pagesName = ['interface', 'interface-list'];
  menuData.breadcrumbData = ['接口管理', '接口列表'];
  let pageData = {};
  pageData.curPageNumber = 15;
  pageData.maxPageNumber = 20;

  let select_sql = 'select * from INTERFACE order by id desc limit 15 '
  dbUtils
    .mysqlDB(select_sql)
    .then(results => {
      // res.send(results);
      res.render('interface-list', {
        "title": '接口管理',
        menuData,
        pageData,
        interfaceData:results
      })

    }).catch(err => {
      console.log(err);
    });
});
/**
 * 新增接口
 */
router.get('/interface/add', function (req, res, next) {
  menuData.pagesName = ['interface', 'interface-add'];
  menuData.breadcrumbData = ['接口管理', '新增接口'];
  let pageData = {};
  res.render('interface-add', {
    "title": '新增接口',
    menuData,
    pageData
  })
});
/**
 * 新增接口handle
 */
router.post('/interface/add', function (req, res, next) {
  let data = req.body;
  let insert_sql = 'INSERT INTO interface(projectId,name,url,type,reqParams,resParams,resJson,addTime,counts,status) VALUES(?,?,?,?,?,?,?,?,?,?)';
  let insert_data = [1001,
    data.name,
    data.url,
    data.type,
    JSON.stringify(data.requestParameter),
    JSON.stringify(data.responseParameter),
    JSON.stringify(data.responseJsonData),
    new Date(),
    0,
    1
  ];
  dbUtils
    .mysqlDB(insert_sql, insert_data)
    .then(results => {
      data = {
        status: 1,
        msg: "success"
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.json({
        status: 999,
        msg: 'fail'
      });
    })
})

/**
 * 接口详情页面
 */ 
router.get('/interface/detail/:id',function(req,res,next){
  menuData.pagesName = ['interface','interface-list'];
  menuData.breadcrumbData = ['接口管理', '接口详情'];

  let _id=req.params.id;
  let select_sql='select * from interface where id='+_id;

  dbUtils.mysqlDB(select_sql).then(result=>{
    let data=result[0];
    data.reqParams=JSON.parse(data.reqParams);
    data.resParams=JSON.parse(data.resParams);
    res.render('interface-detail', {
      "title": '接口详情',
      menuData,
      interfaceData:data
    })
  }).catch(err=>{
    console.log(err);
  })
})

/**
 * 项目列表
 */ 
router.get('/project/list',function(req,res,next){
  menuData.pagesName = ['project','project-list'];
  menuData.breadcrumbData = ['项目管理', '项目列表'];
  res.render('project-list', {
    "title": '项目列表',
    menuData
  })
})

/**
 * 新增项目
 */ 
router.get('/project/add',function(req,res,next){
  menuData.pagesName = ['project','project-add'];
  menuData.breadcrumbData = ['项目管理', '新增项目'];
  res.render('project-add', {
    "title": '新增项目',
    menuData
  })
})
module.exports = router;