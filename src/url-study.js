/**
 * url 模块用于处理与解析URL。常与querystring,path等模块一起使用。
 * 
 * 
 */
// 1 引入
const url = require('url')

// 2 使用
var urlTest = 'http://www.zangqingan.com:3000/foo?name=王耿&age=24#student'
console.log(urlTest)//http://www.zangqingan.com:3000/foo?name=王耿&age=24#student
// url.parse(url,true)方法,用来解析网址的。
//url 网址，true查询字符串存储在query对象内以对象的形式返回
console.log(url.parse(urlTest,true))
// Url {
//     protocol: 'http:',//协议
//     slashes: true,//是否有 //
//     auth: null,//作者
//     host: 'www.zangqingan.com:3000',//域名+端口
//     port: '3000',//端口
//     hostname: 'www.zangqingan.com',//主机名
//     hash: '#student',//哈希
//     search: '?name=王耿&age=24',//包含？的查询参数字符串
//     query: 'name=王耿&age=24',//不包含？的查询参数字符串
//     query: [Object: null prototype] { name: '王耿', age: '24' },//第二个参数为true时
//     pathname: '/foo',//路径地址名
//     path: '/foo?name=王耿&age=24',//包含查询字符串的路径
//     href: 'http://www.zangqingan.com:3000/foo?name=王耿&age=24#student'//完整网址
//   }
