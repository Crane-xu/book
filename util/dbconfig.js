const mysql = require('mysql');
module.exports = {
    // 数据库配置
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'db_visitor'
    },
    // 连接数据库 使用mysql的连接池连接方式
    // 连接池对象
    sqlConnect:function(sql,sqlData,callBack){
        var pool = mysql.createPool(this.config);
        pool.getConnection((err,conn)=>{
            if(err){
                console.log('数据库连接失败');
                conn.release();
                return err;
            }
            console.log('数据库连接成功');
            // 事件驱动回调
            conn.query(sql,sqlData,callBack);
            // 释放连接
            conn.release();
        })
    }
}