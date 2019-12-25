/**
 * http模块 用来创建 HTTP 服务器和客户端
 * 
 * 
 * 
 * 
 */

//1, 引入http模块 为浏览器web浏览服务功能
const http = require('http')

//2, 调用内置api创建一个web服务器对象
// const server = http.createServer()

//3, 开启服务，并监听指定端口
// listen方法有三个参数，第一个为端口号，第二个为本地ip地址，第三个为回调函数。
// server.listen(3000,'127.0.0.1',()=>{
//     console.log('server is run at port 3000')
// })

// 4,注册事件，监听浏览器端发送过来的请求
// req:request的缩写，表示请求对象，可以用来获取一些请求信息。
/**
 * 常用请求对象：
 * req.headers 获取请求头信息(是一个对象)
 * req.rawHeaders 获取请求头信息(是一个数组)
 * req.httpVersion 获取http协议的版本
 * req.method 获取请求的方法
 * req.url 获取请求路径(不包括网址)
 * 
 * 
 */
// res:response的缩写，表示响应对象，是服务器端响应给浏览器的一些是数据。
/**
 * 常用响应对象：
 * res.statusCode = 404 设置响应的状态码
 * res.statusMessage = 'Not Found' 设置响应信息
 * res.setHeader('Content-Type','text/html;charset=utf-8') 设置响应数据的编码格式
 * res.write(写数据) 设置响应返回的数据
 * res.end() 结束响应 
 * 
 */
// server.on('request',(req,res)=>{
//     res.write('i am node http')
//     res.end()

// })

// 可以串联写
// 创建服务器
http.createServer((req,res)=>{
    res.write('i am node http')
    res.end()
    
}).listen(3000);
  
 // 控制台会输出以下信息
 console.log('Server running at http://127.0.0.1:3000/');

