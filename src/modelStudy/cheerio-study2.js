/**
 * 爬去echo：http://www.app-echo.com/#/的音乐
 * 获取音乐的相关信息找到下载地址，通过观察网络中的xhr请求可以直到请求地址
 */
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

//下载
async function downloadAudio(url,id){
  // 下载audio,也是二进制数据所以也使用流
  // 创建写入流
  const fullFileName = path.join(__dirname,'../','../','public','audio')
  const fullAudioName = `${fullFileName}/${id}.mp3`
  let ws = fs.createWriteStream(fullAudioName)
  axios.get(url,{responseType:'stream'}).then(res => {
     // 管道写入
    res.data.pipe(ws)
    // 监听写入情况
    res.data.on('end',() => {
      ws.close()
      console.log('音乐写入完成',fullAudioName)
    })
  })
}
// 获取不同的分页
async function getPage(num=1){
  let url = `http://www.app-echo.com/api/recommend/sound-day?page=${num}`
  const res = await axios.get(url)
  // console.log(res.data)
  res.data.list.map((val,i)=>{return val.sound}).forEach(element => {
    // console.log(element.name)
    let id = element.id
    let mp3Url = element.source
    downloadAudio(mp3Url,id)
  });

}
getPage()



// 创建文件目录
// const fullFileName = path.join(__dirname,'../','../','public','img',title)
// function mkdir(path){
//   const promise = new Promise((resolve,reject) => {
//     fs.mkdir(path,err => {
//         if (err) reject(err);
//         resolve("创建文件目录成功")
//       })
//   })
//   return promise
// }


