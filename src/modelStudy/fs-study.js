/**
 * fs(文件系统)模块提供了一个 API，用于以模仿标准 POSIX 函数的方式与文件系统进行交互。
 * 所有文件系统中的操作都具有同步和异步的形式,同步方法名后面多了Sync，
 * 异步的形式将完成回调作为其最后一个参数,且回调函数的第一个参数始终预留用于异常error。
 * 如果读取文件操作成功完成，则第一个参数(异常error)将为 null 或 undefined。
 * */ 
// 1，先引入内置的核心模块
const fs = require('fs')
const path = require('path')
// 2,引入之后就可以直接使用这个模块提供的api了。

// 2.1 读取某个目录下包含的文件的文件名
//同步方法
// let result =fs.readdirSync('./') // 返回的是一个数组
// console.log(result)
//异步方法
// fs.readdir('./',(err,data) =>{
//     //判断是否成功,返回结果在回调函数的第二个参数里
//     if(err == null&& err ==undefined){
//         console.log(err,'读取成功', data)
//     }else{
//         console.log('read fail!')
//     }
// })
// 再封装成一个promise
// function readdir(path){
//     const promise = new Promise((resolve,reject) => {
//         fs.readdir(path,(err,data) =>{
//             //判断是否成功,返回结果在回调函数的第二个参数里
//             if(err == null&& err ==undefined){
//                 resolve(data)
//             }else{
//                 reject(err)
//             }
//         })
//     })
//     return promise
// }
// readdir('.q/').then(data => {
//     console.log('promise返回的值',data)
// }).catch(err => {
//     console.log('read fail',err)
// })

// 2.2读取文件里的内容，node会缓存整个文件
//同步方法
// const result = fs.readFileSync('../../public/readfiletest.txt',{encoding:"utf-8"})
// console.log(result)//这是我要写入的内容,不指定编码格式时返回的是buffer
// console.log(typeof result)//string,因为后面指定了字符输出的编码格式。不指定返回的是object
//异步方法
//fs.readFile(path, [options], callback)
// path:要读取的文件名或者文件描述
// [options]：可选配置对象，{encoding:"utf-8",flag:"a"}
// encoding指定读取内容的编码格式字符串格式值，没有指定时默认为null即返回原始的 buffer。
// flag指定读取文件的行为，默认'r'即读取文件内容。
// 'a': 追加内容而不是覆盖， 如果文件不存在，则创建该文件并写入内容。
// callback：异步读取文件内容要执行的回调函数，传入两个参数，err读取出错的一个 错误对象，data则是读取文件成功的数据。

//和path模块一起使用
// const fullFileName = path.resolve(__dirname,'../','../','public','files','a.json')
// const fullFileName = path.join(__dirname,'../','../','public','files','a.json')
// console.log(fullFileName)
// fs.readFile(fullFileName,{encoding:'utf-8'},(err,data) => {
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log(data.toString())
// })
// 上面的封装到一个函数中（callback方式）获取一个文件的内容
// function getFileContent(fileName,callback){
//     const fullFileName = path.resolve(__dirname,'../','../','public','files',fileName)
//     fs.readFile(fullFileName,{encoding:'utf-8'},(err,data) => {
//         if(err){
//             console.error(err)
//             return
//         }
//         // 使用callback调用
//         callback(JSON.parse(data.toString()))
//     })
// }
// // 对调地狱-callback-hell
// getFileContent('a.json',aData =>{
//     console.log('callback:a data',aData)
//     getFileContent(aData.next,bData =>{
//         console.log('callback:b data',bData)
//         getFileContent(bData.next,cData =>{
//             console.log('callback:c data',cData)
//         })
//     })
// })

// 封装promise获取文件内容
// function getFileContent(fileName){
//     const promise = new Promise( (resolve,reject) => {
//         const fullFileName = path.resolve(__dirname,'../','../','public','files',fileName)
//         fs.readFile(fullFileName,{encoding:'utf-8'},(err,data) => {
//             if(err){
//                 // 失败执行reject函数
//                 reject(err)
//                 return
//             }
//             // 成功执行resolve
//             resolve(
//                 JSON.parse(data.toString())
//             )           
//         })
//     })
//     // 返回promise
//     return promise
// }
// promise
// getFileContent('a.json').then( aData => {
//     console.log('promise:a data',aData)
//     return getFileContent(aData.next)
// }).then(bData => {
//     console.log('promise:b.json',bData)
//     return getFileContent(bData.next)
// }).then(cData => {
//     console.log('promise:c.json',cData)
// })

// 使用异步函数
// async function readFileData(){
//     //同步的写法
//     const aData = await getFileContent('a.json')
//     console.log('异步函数: a data',aData)
//     const bData = await getFileContent(aData.next)
//     console.log('异步函数: b.json',bData)
//     const cData = await getFileContent(bData.next)
//     console.log('异步函数: c.json',cData)
// }
// readFileData()

// 2.3写文件,把内容写入文件中没有返回值或者说返回值是undefined。
//同步方法没有返回值，返回值是undefined。
// const fullFileName = path.join(__dirname,'../','../','public','readfiletest.txt')
// const result = fs.writeFileSync(fullFileName,'我是新写入的内容它会覆盖之前文件所有的内容\n覆盖',{encoding:'utf-8',flag:'w'})
// console.log(result)//undefined
//异步方法，也是没有返回值，返回值是undefined。
//fs.writeFile(file,data,[options],callback)
// file:要写入文件的路径
// data:要写入的数据,如果写入文件不存在，先创建再写入数据。
// [options] ：可选和读取文件的函数一样，默认'w'即写入内容会覆盖原内容。
// callback：和读取文件的函数一样
// const fullFileName = path.join(__dirname,'../','../','public','readfiletest.txt')
// fs.writeFile(fullFileName,'我是用异步方法新写入的内容它会追加到之前文件内容的后面',{encoding:'utf-8',flag:'a'},(err,data)=>{
//     if(err)throw err
//     console.log('异步方法data写入成功：',data)//undefined
// })

// 异步方法appendFile()将数据追加到文件，如果文件尚不存在则创建该文件。
// const fullFileName = path.join(__dirname,'../','../','public','readfiletest.txt')
// fs.appendFile(fullFileName,'/n 我是用appendFile方法新写入的内容它不会覆盖之前文件所有的内容',{encoding:'utf-8'}, (err) => {
//     if (err) throw err;
//     console.log('数据已追加到文件');
//   });

// 创建文件目录,已经存在报错
// 同步方法,返回值为undefined
const fullFileName = path.join(__dirname,'../','../','hello',)
// // const result = fs.mkdirSync(fullFileName)
// // console.log(result)
// // 异步方法
// const result = fs.mkdir(fullFileName,err => {
//   if (err) console.log(err)
// })
// console.log(result)
// 封装成promise
function mkdir(path){
  const promise = new Promise((resolve,reject) => {
    fs.mkdir(path,err => {
        if (err) reject(err);
        resolve("创建文件目录成功")
      })
  })
  return promise
}
mkdir(fullFileName).catch(err => {console.log('创建文件目录失败',err)})