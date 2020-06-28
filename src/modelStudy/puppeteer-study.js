/**
 * puppeteer 是谷歌官方维护的一个无界面模式模块，用来做自动化测试或者爬虫。
 * 通过这个模块可以模拟用户对谷歌浏览器的各种操作，具体api使用查看文档。
 */
const puppeteer = require('puppeteer');
const url = require('url');
const fs = require('fs');

// https://sobooks.cc/电子书爬取
//进入网站获取所有页数，获取对应的链接，进入电子书详情页获取下载链接，将下载链接保存到book.txt文件中

const httpUrl = 'https://sobooks.cc/';
(async function (){
  // debugoptions
  const debugOptions = {
    // 设置窗口的宽高
    defaultViewport:{
      width:1000,
      height:800
    },
    // 设置为有界面
    headless:false,
    // 放慢每一个步骤的毫秒数
    slowMo:250,
    timeout: 0
  }
  // 正常options
  const options = {
    // 设置为有界面
    headless:true,
    timeout: 0
  }
  // 延时函数封装成promise
  function wait(m){
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve("成功执行延时函数，延迟：",m)
      },m)
    })
  }
  const browser = await puppeteer.launch(debugOptions)
  try {
      // 获取页面总数
    async function getAllPage(){
      // 创建要给page对象
      let page = await browser.newPage()
      // 截取谷歌请求
      await page.setRequestInterception(true)
      // 监听并拦截
      page.on('request',interceptedRequest => {
        let urlObj = url.parse(interceptedRequest.url())
        if(urlObj.hostname == 'googleads.g.doubleclick.net'){
          //谷歌广告请求就放弃
          interceptedRequest.abort()
        }else{
          interceptedRequest.continue()
        }
      })
      // 进入url对应的页面
      await page.goto(httpUrl)
      //设置选择器,获取总页数
      let totalPage = await page.$eval(".pagination li:last-child span",(element) => {
        let text = element.innerHTML;
        text.substring(1,text.length-2).trim()
        return text
      })
      page.close()
      return totalPage
    }
    // let totalPage = await getAllPage()
    // console.log('totalPage is',totalPage)
    // console.log('totalPage is',typeof totalPage)
  
    async function getList(num){
      let pageListUrl = `https://sobooks.cc/page/${num}`
      // 打开一个新页面
      let page = await browser.newPage()
      // 截取谷歌请求
      await page.setRequestInterception(true)
      // 监听并拦截
      page.on('request',interceptedRequest => {
        let urlObj = url.parse(interceptedRequest.url())
        if(urlObj.hostname == 'googleads.g.doubleclick.net'){
          //谷歌广告请求就放弃
          interceptedRequest.abort()
        }else{
          interceptedRequest.continue()
        }
      })
      // 
      await page.goto(pageListUrl)
      let arrPage  = await page.$$eval('.card .card-item .thumb-img>a',element => {
        let arr = []
        element.forEach((element,i) => {
          let obj = {
            href:element.getAttribute('href'),
            title:element.getAttribute('title'),
          }
          arr.push(obj)  
        })
        // console.log(arr)
        return arr
      })
      page.close()
      // 获取书籍详情页
      arrPage.forEach(async (pageObj,i) => {
        await wait(4000*i)
        getPageIofo(pageObj)
      })
    }

    async function getPageIofo(pageObj){
      console.log('getpageinfo run')
      console.log('pageObj is:',pageObj)
      let page = await browser.newPage()
      // 截取谷歌请求
      await page.setRequestInterception(true)
      // 监听并拦截
      page.on('request',interceptedRequest => {
        let urlObj = url.parse(interceptedRequest.url())
        if(urlObj.hostname == 'googleads.g.doubleclick.net'){
          //谷歌广告请求就放弃
          interceptedRequest.abort()
        }else{
          interceptedRequest.continue()
        }
      })
      await page.goto(pageObj.href)
      // 获取具体下载地址
      // let res = await page.$('.dltable tr:nth-child(3) a:last-child')
      let res = await page.$('.content .article-content .e-secret a:first-child')
      console.log('res is',res)
      let aHref = await res.getProperty('href')
      aHref = aHref._remoteObject.value
      // 真正的下载地址
      aHref = aHref.split('?url=')[1]
      // 写入
      let content = `{"title":"${pageObj.title}","href":"${aHref}"}--\n`
      console.log('content is:',content)
      fs.writeFile('book.txt',content,{flag:"a"},() => {
        console.log('已经将书下载路径写入完成：',pageObj.title)
        page.close()
      })
      // console.log(aHref)
    }
    getPageIofo({href:'https://sobooks.cc/books/16282.html',title:'文学履途'})

    // getList(1)
    
  } catch (error) {
    console.log('error is',error)
  }
 
})()


