/**
 * fs 模块提供了一个 API，用于以模仿标准 POSIX 函数的方式与文件系统进行交互。所有文件系统操作都具有同步和异步的形式。
 * 
 *  */ 
// 文件系统是 fs ，从一个模块引用另一个模块使用require(id)加载,其中id是 <string> 类型表示模块的名称或路径。
// var fs = require('fs')
// 不过一般使用es6 中的const关键字
// 1，先引入内置的核心模块
const fs = require('fs')

// 2,引入之后就可以直接使用这个模块提供的api
// 如：读取文件 fs.readFile() 函数会缓冲整个文件。
// fs.readFile(path, [options], callback)
// path:要读取的文件名或者文件描述
// [options]：可选，指定读取内容的编码格式，默认null。没有指定则返回原始的 buffer。
// callback：异步读取文件内容要执行的回调函数，传入两个参数，err读取出错的一个 错误对象，data则是读取文件成功的数据。
// fs.readFile('./readfiletest.txt','utf-8',(err,data)=>{
//     if(err)throw err
//     console.log(data)
//     console.log(data.toString())
// })

// 写文件
// fs.writeFile(file, data[, options], callback)
// file:要写入文件的路径
//  data：要写入的数据
// [options] ：可选，写入数据的编码格式
// callback：写入文件后的回调函数，传入一个err参数
// 如果写入文件不存在，先创建再写入，文件存在写入内容覆盖原内容，想添加内容使用appendFile方法。
const data = new Uint8Array(Buffer.from('这是我要写入的内容'));
fs.writeFile('./readfiletest.txt',data,'utf8',(err)=>{
    if (err) throw err;
  
    console.log('文件已被保存');
})