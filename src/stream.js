//标准输入输出 pipe管道,process.stdin输入，process.stdout输出。
// process.stdin.pipe(process.stdout)

// 复制文件
const fs = require('fs')
const path = require('path')

//获取文件路径
const fileName1 = path.resolve(__dirname,'data.txt')
const fileName2 = path.resolve(__dirname,'data-back.txt')

// 定义输入流对象
const readStream = fs.createReadStream(fileName1)
// 定义接收流对象
const writeStream = fs.createWriteStream(fileName2)
// 拷贝复制，一点一点读取的。
readStream.pipe(writeStream)
// 监听是否完成
readStream.on('end',()=>{
    console.log('copy done')
})