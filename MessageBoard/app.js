// 引入http模块
const http = require('http')
// 引入fs模块
const fs = require('fs')
// 引入url模块
const url = require('url')
const server =http.createServer()
// 启动服务
server.listen(3000,()=>{
    console.log('server is running at http://localhost:3000')

})
// 监听请求
server.on('request',(req,res)=>{
    // 检测静态资源判断路径 
    let currentUrl = req.url
    if(currentUrl == '/'){
        fs.readFile('./view/Message.html','utf8',(err,data)=>{
            if(err){
                res.end('404 not found')
            }
            res.setHeader('Content-Type','text/html;charset=utf-8')
            res.write(data)
            res.end()
        })
    }else if(currentUrl == '/add'){
        fs.readFile('./view/addMessage.html','utf8',(err,data)=>{
            if(err){
                res.end('404 not aaaaafound')
            }
            res.setHeader('Content-Type','text/html;charset=utf-8')
            res.write(data)
            res.end()
        })
    }else if(currentUrl.indexOf('/css') === 0){
        fs.readFile('./css/bootstrap.css','utf8',(err,data)=>{
            if(err){
                res.end('404 not aaaaafound')
            }
          
            res.write(data)
            res.end()
        })
    }


})