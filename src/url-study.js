/**
 * url 模块用于处理与解析 URL。常与 querystring path等模块一起使用。
 * 
 * 
 */
// 1 引入
const url = require('url')

// 2 使用
var urlTest = 'http://www.zangqingan.com:3000/foo?name=王耿&age=24'
console.log(urlTest)//http://www.zangqingan.com:3000/foo?name=王耿&age=24
console.log(url.parse(urlTest))
// Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'www.zangqingan.com:3000',
//   port: '3000',
//   hostname: 'www.zangqingan.com',
//   hash: null,
//   search: '?name=王耿&age=24',
//   query: 'name=王耿&age=24',
//   pathname: '/foo',
//   path: '/foo?name=王耿&age=24',
//   href: 'http://www.zangqingan.com:3000/foo?name=王耿&age=24'
// }