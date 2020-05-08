// 引入MySQL模块
const mysql = require('mysql')
//调用createConnection方法创建一个数据库链接对象,传入的是一个配置对象
const con = mysql.createConnection({
    // 域，线上环境就是线上的数据库地址，本地是localhost
    host:'localhost',
    // 数据库的用户
    user:'root',
    password:'123456',
    port:'3306',
    database:'myblog'//指定要连接的数据库
})
// 开启连接
con.connect()
// 定义要执行的sql语句
//一般这个会抽离出来书写
const sql = 'select * from blogs;'
// 使用query()方法执行sql语句，结果传到第二个参数callback中。
con.query(sql,(err,result) => {
    // 查询出错
    if(err){
        console.log(err)
        return
    }
    //返回查询结果
    console.log(result)
})

// 关闭连接
con.end()



// // 引入MySQL模块
// const mysql = require('mysql')
// //调用createConnection方法创建一个数据库链接对象,传入的是一个配置对象
// //这个配置对象也是可以抽离的，区分开发和生产环境。
// const con = mysql.createConnection({
//     // 域，线上环境就是线上的数据库地址，本地是localhost
//     host:'localhost',
//     // 数据库的用户
//     user:'root',
//     password:'123456',
//     port:'3306',
//     database:'myblog'//指定要连接的数据库
// })
// // 开启连接
// con.connect()
// //封装基于一个promise的统一执行sql的函数
// //参数sql 调用时传入的sql查询语句
// function exec(sql){
//     const promise = new Promise((resolve,reject) => {
//         con.query(sql,(err,result) => {
//             if(err){
//                 reject(err)
//                 return
//             }
//             resolve(result)
//         })
//     })
//     return promise
// }
// // 暴露处理sql函数
// module.exports = {
//     exec
// }
