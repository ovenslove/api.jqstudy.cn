const config = require('../config/db.config')
var mysql = require('mysql')

function mysqlDB(sql,data=[]){
    console.log(sql);
    return new Promise((resolve,reject)=>{
        // 创建数据库连接
        let connection = mysql.createConnection(config.mysql);        
        // 开始连接数据库
        connection.connect();
        // 执行sql
        connection.query(sql,data,function(error,results,fields){
            // 返回数据
            if(error){
                reject(error);
            }else{
                resolve(results);
            }
        })
        // 关闭数据库
        connection.end();
    });
}

module.exports={
    mysqlDB
}