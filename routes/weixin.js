var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var xmlparser = require('express-xml-bodyparser');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  // 自定义的token
  let token="wojiushidiyiciwanzhegela123";
  // 获取到微信传来的参数
  let signature=req.query.signature;  // 微信加密签名
  let timestamp=req.query.timestamp;  // 时间戳
  let nonce=req.query.nonce;          // 随机数
  let echostr=req.query.echostr;      // 随机字符串

  // 对三个参数进行字典排序排序
  let accessCheckArr=[token,timestamp,nonce].sort();
  // 拼接成一个字符串
  let accessCheckStr=accessCheckArr.join('');
  // sha1加密字符串
  let sha1AccessCheckStr= crypto.createHash("sha1");
  let code=sha1AccessCheckStr.update(accessCheckStr,'utf-8').digest("hex");

  if(code === signature){
    res.send(echostr);
  }else{
    res.send('error');
    console.log('校验错误');
    console.log('signature:',signature);
    console.log('code:',code);
  }
});

router.post('/',xmlparser({trim: false, explicitArray: false}),function(req,res,next){
  console.log(req.body);
  console.log(req)
  let msgData=req.body;
  data = `<xml><ToUserName>我收到了,你说的是：【${msgData.xml.content}】</ToUserName></xml>`;
  // let backMsg=`
  //     <xml>
  //       <ToUserName>${msgData.xml.tousername}</ToUserName>
  //       <FromUserName>${msgData.xml.tousername}</FromUserName>
  //       <CreateTime>${(new Date().getTime()) / 1000}</CreateTime>
  //       <MsgType>${msgData.xml.msgtype}</MsgType>
  //       <Content>我收到了,你说的是：【${msgData.xml.content}】</Content>
  //     </xml>
  // `;
  
  res.writeHead(200, {'Content-Type': 'application/xml'});
  res.end(data);
});

module.exports = router;
