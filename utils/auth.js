const md5 = require('md5');

function getReqData(req){
    let reqData={};
    reqData.ua=req.headers['user-agent'];
    reqData.token=req.headers.authorization || '';
    reqData.protocol=req.protocol;
    reqData.method=req.method;
    reqData.host=req.headers.host;
    reqData.baseUrl=req.baseUrl;
    reqData.path=req.path;
    reqData.url=req.url;
    reqData.originalUrl=req.originalUrl;    
    reqData.ip=req.ip;
    reqData.ips=req.ips;
    return reqData;
}

function auth(req,res,next){
    let reqData=getReqData(req);
    // 判断是否有token参数
    if(reqData.token){
        // 判断token是否相等
        let nowTime=new Date().getTime();        
        if(req.session.auth 
            && (req.session.auth.token == reqData.token) 
            && (req.session.auth.etime >= nowTime)){
            return next();
        }else{
            res.json({
                status:102,
                msg:'token已失效'
            })
        }
    }else{
        res.json({
            status:101,
            msg:'缺少token参数'
        })
    }
}
function login(req){
    // 获取用户传入的数据
    let postData=req.body;
    let maxTime=7200;
    // 获取请求头数据
    let reqData=getReqData(req);
    // 查找数据库，找到对应的用户信息 
    let userInfo={
        name:'admin',
        key:'15d8138785b9a020c5b30414a46b18bf',
        psd:'e10adc3949ba59abbe56e057f20f883e'
    }
    // 服务器端进行签名算法
    let sign=[reqData.method,reqData.protocol+'://'+reqData.host+reqData.originalUrl,userInfo.key,userInfo.psd].join('&');
    sign=md5(sign);
    // 对比签名结果
    if(sign === postData.s){
        // 匹配成功，返回token，过期时间
        let time=new Date().getTime();
        let t=[sign,time,Math.random()].join('#*');
        // 对token源数据加密
        t=md5(t);
        let data={
            token:t,
            time:maxTime,
            etime:time+maxTime*1000
        }
        // 写入session
        req.session.auth=data;
        req.session.user=userInfo;
        return data;    
    }else{
        // 匹配失败，返回false
        return false;
    }
}
module.exports={
    auth,
    login
}