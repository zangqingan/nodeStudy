/**
 * cheerio 是一个基于jQuery的爬页面模块，操作Dom和jQuery是一样的
 * 通过分析页面结构获取数据，前提是数据在html文档中。
 * 爬虫的本质：通过模拟浏览器的请求，将数据提取出来。
 * 一般流程：1确定想要爬取的数据的地址，2分析页面结构，3分析数据是直接在html页面还是ajax请求返回的
 * 4如果是ajax就获取请求的地址，如果是HTML就用cheerio通过选择器选中需要爬取的内容。
 * 5 请求工具 axios，request，puppeteer
 */
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

// 斗图啦网址爬取
const baseUrl = 'https://www.doutula.com/article/list/?page=1'
// 改变page分页信息即可获取所有的图片
axios.get(baseUrl).then(res => {
  // 对返回的页面进行解析爬取内容，$是一个对象
  const $ = cheerio.load(res.data)
  // 获取所有标签包容器
  $('#home .col-sm-9 a.list-group-item').each((i,element) => {
    // 图片的包含快
    const pageUrl = $(element).attr('href')
    // 获取表情包的标题文本
    let title =  $(element).find('.random_title').text()
    // console.log('title is:',title)
    //过滤
    const reg = /(.*?)\d/igs
    title = reg.exec(title)[1]
    //将title作为文件名新建文件夹
    const fullFileName = path.join(__dirname,'../','../','public','img',title)
    mkdir(fullFileName)
    parseImg(pageUrl,title)
  })
})



// 封装一个函数获取图片的地址
async function parseImg(url,title){
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  $('.pic-content img').each((i,element) => {
      const imgUrl = $(element).attr('src')// console.log('imgUrl is:',imgUrl)
      //取图片的文件名
      const imgName =  path.basename(imgUrl)
      // console.log('imgName is',imgName)
      // console.log('title is',title)
      // 创建文件写入流
      // 创建写入流将图片写入本地
      const fullFileName = path.join(__dirname,'../','../','public','img',title)
      const fullImgName = `${fullFileName}/${title}-${i}-${imgName}`
      let ws = fs.createWriteStream(fullImgName)
      // 继续发送请求把图片请求过来
      axios.get(imgUrl,{responseType:'stream'}).then((res) => {
        //响应的是流内容直接使用管道
        res.data.pipe(ws)
        console.log('图片正在写入:',fullImgName)
        // 写入完成关闭写入流
        res.data.on('end',()=> {
          ws.close()
          console.log('图片写入完成!')
        })
      })

   })
}
// 创建文件目录
function mkdir(path){
  const promise = new Promise((resolve,reject) => {
    fs.mkdir(path,err => {
        if (err) reject(err);
        resolve("创建文件目录成功")
      })
  })
  return promise
}

// 上面的是返回的数据在HTML文档中，如果不是就需要使用正则表达式来匹配了。
// 反爬虫机制，短时间内访问量太多时就将请求的ip地址列入黑名单
// 通过代理解决反爬机制。
