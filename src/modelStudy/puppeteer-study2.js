/**
 * 对https://sobooks.cc/电子书的爬取
 */

const puppeteer = require('puppeteer');
const axios = require('axios')
const url = require('url')
const fs = require('fs')
const path = require('path')

function fsRead(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,{flag:'r',encoding:"utf-8"},function(err,data){
            if(err){
                //console.log(err)
                //失败执行的内容
                reject(err)

            }else{
                //console.log(data)
                //成功执行的内容
                resolve(data)
            }
            //console.log(456)
        })
    })
}

(async function(){
    const debugOptions = {
        //设置视窗的宽高
        defaultViewport:{
            width:1400,
            height:800
        },
        //设置为有界面，如果为true，即为无界面
        headless:false,
        //设置放慢每个步骤的毫秒数
        slowMo:250,
        timeout:0
    }
    const options={headless:true}
    const browser = await puppeteer.launch(options)

    //将延迟函数封装成promise对象
    function lcWait(milliSecondes){
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve("成功执行延迟函数，延迟："+milliSecondes)
            },milliSecondes)
        })
    }
    
    async function parseTxt(){
        //读取文本内容
        let  textContent =  await fsRead("./booklist/book2.txt")
        //正则匹配json字符串对象
        let reg = /(\{.*?\})---/igs;
        var tempRes;
        let bookArr = []
        while (tempRes = reg.exec(textContent)){
            //获取匹配结果
            let jsonStr = tempRes[1];
            //将字符串解析成对象
            let jsonObj = JSON.parse(jsonStr)
            //获取链接属性
            //let bookHref = jsonObj.href; 
            bookArr.push(jsonObj)
        }

        return bookArr
    }
    let bookArr = await parseTxt()
    let index = 0;

    async function downloadBook(){
        //根据索引值下载书
        //如果索引值大于书数量的总长度
        if(index==bookArr.length){
            return "完成";
        }
        let bookObj = bookArr[index]
        index++;
        //打开新页面下载书籍
        let page = await browser.newPage()
        await page.goto(bookObj.href)
        //console.log(bookArr)
        //因为a链接是js渲染出来的内容，并不是页面请求回来就有的内容，而是js通过ajax访问后台之后获取链接地址才有的内容
        await page.waitForSelector("#table_files tbody .even a",{visible:true});
        //获取a链接对象
        let elementAherf =await page.$eval('#table_files tbody .even a',(element)=>{
            console.log(element)
            console.log(element.getAttribute("href"))
            return element.getAttribute("href");
        });
        bookLinkPage(elementAherf,bookObj.title)
        page.close()
    }

    async function bookLinkPage(linkUrl,title){
        let page = await browser.newPage();
        //截取谷歌请求
        await page.setRequestInterception(true);
        //监听请求事件，并对请求进行拦截
        page.on('request', interceptedRequest => {
            //通过URL模块对请求的地址进行解析
            let urlObj = url.parse(interceptedRequest.url())
            
            if (urlObj.hostname=="u066.199-cmcc-dd.tv002.com"){
                //如果是谷歌的广告请求，那么就放弃当次请求，因为谷歌广告响应太慢
                // console.log("截获地址：")
                // console.log(urlObj.href)
                interceptedRequest.abort();
                //下载
                //将title作为文件名新建文件夹
                const fullFileName = path.join(__dirname,'../','../','public','book',title)
                let ws = fs.createWriteStream(`${fullFileName}.epub`)
                axios.get(urlObj.href,{responseType:"stream"}).then(function(res){
                    res.data.pipe(ws)
                    ws.on('close',function(){
                        console.log("下载已完成：",title) 
                        //下完一本在下另外一本
                        downloadBook()
                        page.close()
                    })
                })
            }else{
                interceptedRequest.continue();
            }
        });
        await page.goto("https://306t.com"+linkUrl)
        await page.waitForSelector(".btn.btn-outline-secondary.fs--1")
        let btn = await page.$(".btn.btn-outline-secondary.fs--1")
        await btn.click()
        //判断请求完成
        // page.on('requestfinished',(req)=>{
        //     console.log("下载已完成：",req.url()) 
        // })  
    }

    downloadBook()

})()


