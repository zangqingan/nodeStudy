/**
 * http模块用来创建 HTTP服务器和客户端,是node作为web server最重要的一个模块。
 */
//1, 引入http模块 为浏览器web浏览服务功能
const http = require('http')
//2, 调用内置api创建一个web服务器对象 server
// const server = http.createServer((req,res) => {
        // 本质上是当服务器被请求时就会触发request事件，同时执行回调。
      //客户端发送请求时这个回调函数就会被执行，且每次执行都能获得当次请求的相关信息，
      //request客户端请求的信息，response服务器返回给客户端的信息
// })
//3, 开启http服务，并监听指定端口
// listen方法有三个参数，第一个为端口号，第二个为ip地址，第三个为回调函数。
// server.listen(3000,'127.0.0.1',()=>{
//     console.log('server is run at port 3000')
// })

// 2，3两步可以串联写创建服务器
http.createServer((req,res)=>{
    console.log(req)
    console.log(res)
    res.write('hello world')
    res.end()


}).listen(5000,'127.0.0.1',(err)=>{
    // 控制台会输出以下信息
    if(err){console.log('出错了',err);}
    console.log('Server running at http://127.0.0.1:5000/');
});

// 在浏览器输入网址到显示页面的过程是什么？
// 1.客户端进行dns解析(查找网址对应的ip地址)，建立tcp连接(三次握手)，发送http请求。
// 2.server端接收到http请求，处理并将结果返回。server端怎么接收http请求在node中就是使用http模块操作的。
// 3.客户端接收到返回的数据并进行处理，渲染页面，执行js等

// 处理get请求，即客户端向服务端获取数据，
//     要使用req.url模块获取整个url然后截取?前面部分，和req.method结合以此来做路由接口，
//     使用querystring模块解析查询字符串。
// 处理post请求，客户端向服务器端传递数据，
//     在node中通过 req.on('data',callback) 监听data事件，数据是像水流一样一点点传递，传递过程中会一直触发data事件并执行对应的回调函数。
//     在所有数据传递完成会触发end事件 req.on('end',callback) ，并执行回调函数。

//每次客户端发送请求时就会触发回调函数中的两个对象request，response。
// req:request的缩写，表示请求对象，可以用来获取一些客户端请求发送给服务器的信息。即客户端传过来的东西。
// 常用请求对象：
// req.headers 获取请求头信息(是一个对象)
// req.rawHeaders 获取请求头信息(是一个数组)
// req.httpVersion 获取http协议的版本
// req.method 获取http请求的方法类型名，大写
// req.url 获取整个请求路径path,包括查询字符串。所以可以通过 '?' 进行拆分，前面为路由，后面为查询字符串
// 或者通过url模块的parse()方法解析
// 注意这里的path和query都是我们自己加给req对象的属性，本身是没有的。
// req.path = req.url.split('?')[0]
// req.query = req.url.split('?')[1]

// req.on() 监听事件


// res:response的缩写，表示响应对象，是服务器端响应给浏览器的一些是数据。
//需要程序猿编写指明返回的是什么。即：我们设置返回给浏览器的信息。
// 常用响应对象：
// res.statusCode = 404 设置响应的状态码
// res.statusMessage = 'Not Found' 设置响应信息
// res.setHeader('Content-Type','text/html;charset=utf-8') 设置响应头的数据编码格式
// res.write(写数据) 设置响应返回的数据，直接写到HTML页面上
// res.end({JSON.stringify(data)}) 结束响应并将json格式的字符串数据返回
