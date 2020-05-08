/**
 * http模块用来创建 HTTP服务器和客户端,node最重要的一个模块。
 */
//1, 引入http模块 为浏览器web浏览服务功能
const http = require('http')
//2, 调用内置api创建一个web服务器对象
// const server = http.createServer((req,res) => {})

//3, 开启服务，并监听指定端口
// listen方法有三个参数，第一个为端口号，第二个为ip地址，第三个为回调函数。
// server.listen(3000,'127.0.0.1',()=>{
//     console.log('server is run at port 3000')
// })


// 可以串联写创建服务器
http.createServer((req,res)=>{//客户端发送请求时这个回调就会执行，
    // 且每次都能获得当次请求的相关信息，request客户端请求的信息，response服务器返回给客户端的信息
    res.write('i am node http')
    res.end()
    // console.log(req.headers)
    // console.log(req.rawHeaders)
    // console.log(req.httpVersion)
    // console.log(req.method)
    console.log(req.url)
    console.log(module)
    console.log(module.exports)
    console.log(module === module.exports)
    console.log(exports)
    console.log(module.exports === exports)
   
    
}).listen(5000,'127.0.0.1',()=>{
     // 控制台会输出以下信息
    console.log('Server running at http://127.0.0.1:5000/');
});
  

//每次客户端发送请求时就会触发的回调函数中的两个对象request，response。
// req:request的缩写，表示请求对象，可以用来获取一些客户端请求发送给服务器的信息。
//即客户端传过来的东西。
/**
 * 常用请求对象：
 * req.headers 获取请求头信息(是一个对象)
 * req.rawHeaders 获取请求头信息(是一个数组)
 * req.httpVersion 获取http协议的版本
 * req.method 获取请求的方法
 * req.url 获取请求路径path
 * 
 * 
 */
// res:response的缩写，表示响应对象，是服务器端响应给浏览器的一些是数据。需要程序猿编写指明返回的是什么。
//即：我们设置返回给浏览器的信息。
/**
 * 常用响应对象：
 * res.statusCode = 404 设置响应的状态码
 * res.statusMessage = 'Not Found' 设置响应信息
 * res.setHeader('Content-Type','text/html;charset=utf-8') 设置响应数据的编码格式
 * res.write(写数据) 设置响应返回的数据
 * res.end() 结束响应 
 * 
 */

