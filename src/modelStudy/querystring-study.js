/**
 * querystring 模块提供用于解析和格式化 URL查询字符串的实用工具。
 * 常与url,path等模块一起使用。
 * 查询字符串，?后面的内容
 */

const querystring = require('querystring')
const url = require('url')
var urlTest = 'http://www.zangqingan.com:3000/foo?name=wanggeng&age=24#student'

let result = url.parse(urlTest).query
console.log('result:',result)
//querystring.parse() 方法将 URL 查询字符串 str 解析为一个对象(键值对的集合)。
console.log('querystring.parse result:',querystring.parse(result))
// querystring.stringify() 方法通过迭代对象的自身属性从给定的 obj 生成 URL 查询字符串。
console.log('querystring.stringify result:', querystring.stringify(querystring.parse(result)))