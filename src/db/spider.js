let mysql = require('mysql')
let axios = require('axios')
let cheerio = require('cheerio')

let page = 70;
let count = 1;
let options = {
    host:"localhost",
    port:"3306",//可选，默认式3306
    user:"root",
    password:"123456",
    database:"sobook"
}
let con = mysql.createConnection(options)
con.connect()
//获取第N个页面所有书籍的链接
async function getPageUrl(num){
    let httpUrl = "https://sobooks.cc/page/"+num;
    let res = await axios.get(httpUrl)
    //console.log(res.data)
    let $ = cheerio.load(res.data)
    let hrefList = []
    $("#cardslist .card-item .thumb-img>a").each((i,ele)=>{
        let href = $(ele).attr("href")
        //console.log(i)
        //console.log(href)
        //根据地址访问书籍详情页面
        hrefList.push(href)
    })
    return hrefList.reduce((p,href,i)=>{
        return new Promise(async function(resolve,reject){
            await p;
            await getBookInfo(href)
            console.log(`--第${page}页，第${i}本书--`)
            if(i==27){
                page ++;
                getPageUrl(page)
            }
            resolve()
        })
    },Promise.resolve())
    
}

async function getBookInfo(href){
    let res = await axios.get(href);
    let $ = cheerio.load(res.data);
    //书籍图片
    let bookimg = $('.article-content .bookpic img').attr('src');
    //书籍名称
    let bookname = $(".article-content .bookinfo li:nth-child(1)").text()
    bookname = bookname.substring(3,bookname.length)
    //书籍作者
    let author = $(".article-content .bookinfo li:nth-child(2)").text()
    author = author.substring(3,author.length)
    // 浏览次数
    let viewcount = $(".article-content .bookinfo li:nth-child(3)").text()
    viewcount = viewcount.substring(3,viewcount.length-1)
    // 标签
    let tag = $(".article-content .bookinfo li:nth-child(4)").text()
    tag = tag.substring(3,tag.length)
    // 时间
    let pubtime = $(".article-content .bookinfo li:nth-child(5)").text()
    pubtime = pubtime.substring(3,pubtime.length)
    //评分
    let score = $(".article-content .bookinfo li:nth-child(6) b").attr("class")
    score = score[score.length-1];
    //出版社
    let pubcompany = $(".article-content .bookinfo li:nth-child(8)").text();
    pubcompany = pubcompany.substring(4,pubcompany.length);
    //分类
    let category = $("#mute-category > a").text().trim()
    // console.log(bookimg,bookname)
    let brief = $(".article-content").html();
    let bookUrl = href;
    let download;
    try {
        download = $("body > section > div.content-wrap > div > article > table > tbody > tr:nth-child(3) > td > a:nth-child(3)").attr('href').split("?url=")[1];
    } catch (error) {
        download = $("body > section > div.content-wrap > div > article > table > tbody > tr:nth-child(3) > td > a:nth-child(3)").attr('href')
    }
    
    let arr = [bookname,author,viewcount,tag,pubtime,score,pubcompany,bookimg,category,brief,bookUrl,download]
    //console.log(arr)
    //插入数据库
    let strSql = "insert into book (bookname,author,viewcount,tag,pubtime,score,pubcompany,bookimg,category,brief,bookUrl,download) values (?,?,?,?,?,?,?,?,?,?,?,?)"
    try {
        await sqlQuery(strSql,arr)
        console.log("书籍写入数据库：",bookname)
    } catch (error) {
        console.log("Info_书籍有重复,不写入！",bookname)
    }
    
    
}

getPageUrl(page)
//let tempBook = "https://sobooks.cc/books/14692.html";
//getBookInfo(tempBook);

function sqlQuery(strSql,arr){
    return new Promise(function(resolve,reject){
        con.query(strSql,arr,(err,results)=>{
            //console.log(err)
            //console.log(results)
            if(err){
                reject(err)
                //console.log(err)
            }else{
                //let data = "书籍写入数据库："+bookname;
                resolve(results)
                //console.log("书籍写入数据库：",bookname)
            }
           
        })
    })
}