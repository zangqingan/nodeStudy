//1, 引入http模块 为浏览器web浏览服务功能
const http = require('http')

//引入其它模块
const handleBlogRouter = require('./src/routers/blog')
// 操作数据库





// 2，3两步可以串联写创建服务器
http.createServer((req,res)=>{
    // 设置返回格式为json
    res.setHeader('Content-type','application/json')
    const url = req.url
    req.path = url.split('?')[0]

    // 路由处理
    const data = handleBlogRouter(req,res)
    if(data){
        res.end(
            JSON.stringify(data)
        )
        return
    }
   

}).listen(5000,'127.0.0.1',(err)=>{
    // 控制台会输出以下信息
    if(err){console.log('出错了',err);}
    console.log('Server running at http://127.0.0.1:5000/')
})
