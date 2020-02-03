/**
 * fs(文件系统)模块提供了一个 API，用于以模仿标准 POSIX 函数的方式与文件系统进行交互。
 * 所有文件系统中的操作都具有同步和异步的形式,异步的形式总是将完成回调作为其最后一个参数。
 * 但第一个参数始终预留用于异常。如果操作成功完成，则第一个参数(异常err)将为 null 或 undefined。
 * 
 * */ 
// 1，先引入内置的核心模块
const fs = require('fs')

// 2,引入之后就可以直接使用这个模块提供的api了。
// 读取文件目录下包含的文件名
//同步方法
// let result =fs.readdirSync('./') // 返回的是一个数组：['fs-study.js','http-study.js','os-study.js','path-study.js','querystring-study.js','stream.js','url-study.js' ]
// console.log(result)
//异步方法
// fs.readdir('./',(err,data) =>{
//     //判断是否成功
//     if(err == null&& err ==undefined){
//         console.log(err,'读取成功', data)
//     }else{
//         console.log('read fail!')
//     }
// })

// 读文件:里的内容:fs.readFile() 函数会缓冲整个文件:fs.readFile(path, [options], callback)
// path:要读取的文件名或者文件描述
// [options]：可选，指定读取内容的编码格式，默认null。没有指定则返回原始的 buffer。
// callback：异步读取文件内容要执行的回调函数，传入两个参数，err读取出错的一个 错误对象，data则是读取文件成功的数据。
//同步
// const result = fs.readFileSync('../public/readfiletest.txt','utf8')
// // console.log(result)//这是我要写入的内容
// console.log(typeof result)//string,因为后面指定了字符输出的编码格式。
//异步
// fs.readFile('../public/readfiletest.txt','utf-8',(err,data)=>{
//     if(err)throw err
//     console.log(data)//这是我要写入的内容
// })
//异步使用promise封装读取文件
function readFile(pathname){
    return new Promise((resolve,reject) => {
        fs.readFile(pathname,'utf-8',(err,data)=>{
            if(err){
                reject(err)
            }
            resolve(data)//resolve把读取到的内容返回到.then()方法的res中
        })
    })
}
readFile('../public/readfiletest.txt').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

// 写文件:fs.writeFile(file,data,[options],callback)
// file:要写入文件的路径
// data:要写入的数据
// [options] ：可选，写入数据的编码格式
// callback：写入文件后的回调函数
// 如果写入文件不存在，先创建再写入，文件存在写入内容覆盖原内容，想添加内容使用appendFile()方法。
//同步，没有返回值，返回值是undefined。
// const result = fs.writeFileSync('../public/readfiletest.txt','我是新写入的内容它会覆盖之前文件所有的内容','utf8')
// console.log(result)//undefined
//异步，也是没有返回值，返回值是undefined。
// fs.writeFile('../public/readfiletest.txt','我是用异步方法新写入的内容它会覆盖之前文件所有的内容','utf8',(err,data)=>{
//     if(err)throw err
//     console.log(data)//undefined
// })
// 异步方法appendFile()将数据追加到文件，如果文件尚不存在则创建该文件。 data 可以是字符串或 Buffer。
// fs.appendFile('../public/readfiletest.txt','/n 我是用appendFile方法新写入的内容它不会覆盖之前文件所有的内容','utf8', (err) => {
//     if (err) throw err;
//     console.log('数据已追加到文件');
//   });

