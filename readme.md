# 一.node学习开始前
## 1.1cmd常用命令的学习：
window+r ：快速打开命令运行窗口。
常用命令：
cmd：命令行窗口。
notepad：打开记事本。
calc；计算器。
mspaint：画图工具。
write：写字板。
sysdm.cpl；打开环境变量的设置窗口。

切换盘符：盘符号: 点击回车即可。
md 要创建的目录名。
cd 要进入的目录名。
cls clear 清屏

# 二.node主要知识点
2.1 nodejs基本介绍和使用
2.2 node模块系统与NPM
2.3 node常用模块学习
2.4 node操作数据库

## 2.1 nodejs基本介绍和使用：
### 2.1.1 前端和后端的概念 
前端：主要和页面打交道，主要工作写页面（HTML），美化页面（css），调用后端提供的 api接口去请求或提交数据（js）vue等。
后端：主要进行业务逻辑的操作，如数据的增删改查，数据库的操作，对外暴露api接口等。
后端开发思维是和前端不一样的，要考虑以下多个方面的问题：一句话，server端和前端开发主要是思路要转变。
服务的稳定性：即单个客户端挂掉不能影响服务端，用PM2做进程守候在服务挂掉后能自动重启。
考虑cpu和内存：对于服务端来说cpu和内存都是稀缺资源，可以使用stream流写日志，使用redis存储session
日志纪录：服务器端要记录，存储，分析日志
安全：要时刻注意网络恶意攻击，如sql注入，xss攻击等
集群和拆分：当项目很大时就需要考虑集群和拆分了。

### 2.1.2 node介绍
Node.js 是一个基于Google的V8引擎JavaScript 运行时建立的一个平台，不是新的语言，框架。
Node.js是一个由事件驱动，异步非阻塞I/O组成的轻量级高效的服务端JavaScript环境，
简单的说 Node.js 就是运行在服务端的 JavaScript。
一般有两种用处：
    一种是运行在服务器端做web server服务(做BFF层：向前端提供HTTP服务，跟后端进行RPC通信。)
    另一种是运行在本地做打包构建工具使用。

### 2.1.3 node组成和使用
Node.js是由ecmascript语法规范 + nodeAPI 组成的，es定义了语法，js和node都必须遵循。
要想使用先安装node运行所需要的环境，然后使用命令：node index.js ，就可以在服务器端运行一个js文件。
当然一般会在包管理文件：package.json中的 "scripts"选项配置成其它命令启动。
在作为web服务提供api时，使用http模块创建服务器，然后根据需求使用不同的模块提供方法解决。

## 2.2 node模块系统与NPM：
### 2.2.1 node包管理工具npm：
nodejs的使用需要依赖nodejs环境，安装即可，也可以安装nvm同时管理多个版本的nodejs，
nvm list 查看安装了多少个nodejs版本
node -v /node --version 查看node版本信息(-v是--version的简写)
在安装node同时也会自动把npm也安装上，npm(node package manager)node包管理工具的简称，它是一个命令行工具，用于下载和管理node开发所需要的各种模块/包/插件。
npm -v /npm --version 查看npm的版本信息
npm list 查看安装了什么模块。
npm config list 查看安装了什么全局模块。
node项目开发流程: 
1.先初始化为node项目
方法：使用 npm init 初始化为node项目(npm init -y 快速初始化包管理文件(描述文件)package.json)。
将来安装的模块(包)的信息都会纪录在这个package.json文件中且包含有描述当前项目的各种信息。
注意：package.json是一个json格式的文件。

package.json文件中的常见属性如下:
{
&emsp;&emsp;"name" : "包名/当前项目名称",
&emsp;&emsp;"version" : "包的版本号/项目的版本号",
&emsp;&emsp;"description" : "包的描述/项目的描述",
&emsp;&emsp;"keywords" : "描述当前项目的关键字",
&emsp;&emsp;"main" :"index.js", main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。
这个字段的默认值是模块根目录下面的 index.js，即使用node命令启动项目时的入口文件。
&emsp;&emsp;"scripts" :{
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "nodemon index.js"
}, 指定了运行脚本命令的npm命令行缩写即启动项目的自定义命令，用来代替 node 运行文件名 这样启动js文件的方式。
语法：npm run 自定义的命令。(自定义的命令是scripts中的键，如果定义为start时则run可以省略)
&emsp;&emsp;"author" : "包的作者/项目的作者",
&emsp;&emsp;"license": "ISC",开源协议
&emsp;&emsp;"contributors" : "包的其他贡献者",
&emsp;&emsp;"repository": {
    "type": "git",
    "url": "git+https://github.com/zangqingan/nodeStudy.git"
},包代码的远程仓库信息，包括type和URL，type可以是git或svn，URL则是包的远程仓库地址。
&emsp;&emsp;"homepage": "https://github.com/zangqingan/nodeStudy#readme",当前项目远程仓库的readme.md文件地址

&emsp;&emsp;"dependencies": {
    "mongoose": "^5.8.3"
},生产环境依赖，指定了项目运行（即生产环境所依赖的模块列表）所依赖的模块。
它们将会被安装在当前目录的 node_modules 目录下。

&emsp;&emsp; "devDependencies": {
    "mongoose": "^5.8.3"
}: 开发环境依赖 指定了项目开发时所依赖的模块，发布时用不到它。

}
2，安装开发中实际用到的各种模块
方法：npm install/uninstall 包名/模块名 --sava/--save-dev/-g。
安装/卸载 需要的包/模块，后面没有参数时会把模块直接安装到当前目录的node_modules目录中，默认模块信息放到生产依赖dependencies中。
&emsp;&emsp;--save = -S 模块安装到生产依赖dependencies中，即：模块信息自动写入package.json中的 "dependencies" 节点选项中。项目发布上线之后还会依赖用到的模块，没有这些模块，项目不能运行。
&emsp;&emsp;--save-dev = -D 模块安装到开发依赖中，即：模块信息自动写入package.json中的 "devDependencies" 节点选项。项目上线之后不会用到的模块，例如'babel-loader'。
&emsp;&emsp;-g,表示全局安装，就可以在任何目录下使用。一般如 nodemon pm2等

注意：模块信息由模块名，模块版本信息组成。
补充:版本号知识 ,
版本格式：主版本号.次版本号.修改版本号。
主版本号：功能模块有大的变动，比如增加多个模块或者整体架构发生变化。
次版本：模块局部的变动。
修改版本：bug修复或者增加一些小功能。

~，用户使用当前版本后，最多升级到修改版的最新版本
^,用户使用当前版本后，最多升级到次版本的最新版本
*,用户使用当前版本后，可以升级到最新版本即最新主版本

3.正式使用各种模块
根据实际需求在 .js文件中编写具体的代码即可，查看文档提供的api接口。

### 2.2.2 node 模块系统：
&emsp;&emsp;使用模块化开发比较符合设计原则即单一置换原则，开放封闭原则。 在node.js中是以模块(.js文件)为基本单位来划分功能的，而为了让Node.js的模块(.js文件)之间可以相互调用，Node.js提供了一个完整的模块加载系统即CommonJS规范。注：这里 .js文件 和模块是一一对应的，即：一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。所以创建一个模块是很简单的就是新建一个.js文件。

### 2.2.3 模块的分类：
&emsp;&emsp;原生(核心)模块:nodejs自己提供的原生模块，调用时只写模块名称即可。
&emsp;&emsp;文件模块：使用npm下载第三方提供的模块，调用时只写模块名称即可。
&emsp;&emsp;自定义模块：自己定义的 .js 文件也叫模块，调用时要写清楚路径地址。

### 2.2.4 node模块具体使用：
#### 1 模块导入引用
&emsp;&emsp;nodejs模块系统是基于commonjs规范的，特点是所有代码都运行在模块作用域，不会污染全局作用域，node会对模块进行缓存所以在第二次引入相同的模块时不会重新加载。
node对原生模块和文件模块的加载方法基本是一样的，通过调用require()函数传入模块名来引入其它模块暴露的所有属性。
方法：const 变量名 =  require('原生/文件模块名');
注意：原生模块定义在 Node.js 源代码的 lib/ 目录下，require('原生模块名')返回的是一个node模块对象 module ，这个对象拥有这个加载模块向外暴露的的所有属性和方法(即exports和module.exports向外暴露的属性和方法)。可以定义一个变量接收这个对象返回值，这样定义的变量就可以调用模块的所有属性和方法。

自定义模块调用也是使用require()函数，不过要注意函数参数的路径问题。 
&emsp;&emsp;以 '/' 为前缀的模块是文件的绝对路径。
&emsp;&emsp;以 './' 为前缀的模块是相对于当前调用 require() 文件的同级目录。
&emsp;&emsp;以 '../' 为前缀的模块是相对于当前调用 require() 文件的上一级目录。
&emsp;&emsp;当没有以 '/'、 './' 或 '../' 开头来表示文件时，这个模块必须是一个核心模块或加载自 node_modules 目录的文件模块。

注意：如果查找的模块不存在，则 require() 会抛出一个 code 属性为 'MODULE_NOT_FOUND' 的 Error。
即找不到要加载的模块。

#### 2 模块属性和方法的导出
&emsp;&emsp;在node模块中定义了一些变量，函数和对象只在该模块内有效，别人使用require方法来调用这个模块本意就是使用这些变量，函数，对象。使用require方法会返回一个module对象，这个对象拥有的就是模块使用exports或者module.exports导出的所有属性和方法。

&emsp;&emsp;exports对象：在模块中使用这个对象就可以向外暴露东西，它是module对象的一个属性，本身又是一个对象。
语法：exports.导出变量名/导出方法名=模块内定义的变量名/方法名。

&emsp;&emsp;module.exports：真正的向外暴露方法。
语法1：module.exports.导出变量名/导出方法名=模块内定义的变量名/方法名
语法2：module.exports= {//对象} 对象里放要导出的变量，函数，对象。

注意：module.exports和exports的区别：
module.exports才是node模块的真正导出接口即在使用require()方法引入时返回的就是这个module.exports，一个模块文件中可以有多个exports输出，但只能有一个module.exports输出。

module.exports返回的是require方法返回的对象即模块对象本身，返回的是一个类。
而exports是模块对象module的一个属性，它本身又是一个对象且node将一个指向module.exports的引用赋值给了exports，即exports指向的就是module.exports对象，可以理解为它的一个副本(简写形式)。

如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，数组等就用 module.exports。当然建议都使用module.exports就行避免矛盾。

## 2.3 node常用模块学习：
### 2.3.1 node原生核心模块学习
Node.js是一个由事件驱动，异步非阻塞I/O组成的轻量级高效的服务端JavaScript环境。

事件驱动：通过监听事件是否发生触发对应的异步回调函数。

异步：事件触发时回调函数执行，node中回调函数格式：第一个参数是error错误对象，第二个参数开始才是返回结果对象，使用异步编程会造成回调地狱的问题。解决方法如下：
异步编程解决方案1：promise承诺
异步编程解决方案2：async异步函数以同步的方式写异步代码，await会等待后面的异步操作执行，它是promise语法的语法糖。

非阻塞i/o，io一个系统的输入和输出，非阻塞表示系统在接收输入再到输出这段时间里可以接收其它的输入。

#### 1.http模块
作为web server提供api接口返回数据时最重要的是http模块，使用它就可以创建web服务器了。
拓展：HTTP协议。
它是应用层的网络协议(hyper transfer protocol)超文本传输协议的缩写，用来从万维网服务器传输超文本到本地浏览器的传输协议。
它是基于TCP/IP通信协议来传递数据(HTML文件，图片等)。
它工作于客户端-服务器架构上，浏览器作为客户端通过url向服务器发送HTTP请求，服务器接收到请求经过处理后将结果返回给客户端。
特点：简单快速，灵活，无状态。
HTTP协议和url的关系：
http就是通过使用统一资源表示符(uri)来传输数据和建立连接的，而网络地址url(统一资源定位符)是一种特殊的uri对应了唯一的请求资源，url的组成和js中一样。

HTTP请求信息：request即客户端发送一个HTTP请求时传递给服务器的信息。
包括请求行，
请求头：放置本次请求的相关信息，是键值对的格式。
请求体：post请求时向后端传递的数据，
空行四部分组成

HTTP响应信息：response即服务器端返回给客户端的信息。
包括状态行，
响应头：放置本次响应的相关信息，是键值对的格式。
响应正文：服务器端返回给客户端的数据
空行四部分组成

HTTP状态码：即服务器端返回给客户端用来描述http请求状态的提示信息
由三位数字组成，第一位数字定义了响应的类型
1xx:表示服务器端已经接收到请求，正在处理
2xx:表示服务器端已经成功的正确的理解和接收请求
3xx:表示要完成对请求的响应必须进行进一步的的操作
4xx:客户端错误，即客户端发送的请求语法有问题或者无法实现
5xx:服务器端错误，即服务器端不能实现，
常见有：
200 OK 请求成功
400 bad request 客户端请求有语法错误，不能被服务器理解
401 unauthorized 请求未经过授权
403 forbidden 服务器收到了请求，但是拒绝提供服务
500 internal server error 服务器发生了不可预测的错误
503 server unavailable 服务器当前不能处理客户端的请求，过会儿可能恢复。

HTTP请求的方法类型：
get post put patch update delete

#### 2.fs模块
文件操作，通过fs模块和stream流模块path路径模块一起使用。
#### 3.path模块
#### 4.url模块
可以通过url模块实现nodejs原生的路由，一种是通过url.parse()方法，一种是
#### 5.querystring模块
#### 6.stream模块
#### 7.os模块
#### 8.events模块
node事件模块events，node是事件驱动的模型(事件轮询机制)本质都是设计模式中的观察者模式实现的。
即nodejs会将每一个异步事件生成一个事件观察者，并统一存放到事件队列里，当有事件触发了就会执行对应的回调函数，不断轮流询问事件队列直到没有了事件才停止这就是事件轮询机制。
通过events的EventEmitter类实现对事件的绑定监听和触发
// 创建eventEmitter对象
const eventEmitter = new events.EventEmitter()

// 绑定事件和对应的回调函数
eventEmitter.on('eventname',eventHandler)

// 触发定义的事件
eventEmitter.emit('eventname')
http模块的req参数实现了这个接口，通过req.on('eventname',eventHandler)可以监听node定义的事件。


### 2.3.2 node第三方模块学习
#### 1.cheerio模块
cheerio是jquery核心功能的一个快速灵活而又简洁的实现，主要是为了用在服务器端需要对DOM进行操作的地方


处理字符串，数组(里面是对象的)可以考虑使用 lodash这个库
安装：npm install lodash
转化英文单复数，转化为驼峰格式的类名等可以考虑使用inflection库
安装：npm install inflection
处理js日期相关的可以使用dayjs这个库
安装：npm install dayjs --save

## 2.4 node操作数据库：
主要学习操作MySQL，mongodb，redis这三种数据库即可。在学习node-blog那里有笔记和实例。
### 2.4.1 node操作MySQL数据库
通过第三方模块 mysql模块操作MySQL数据库实现数据的增删改查(CRUD)。
实际上学习的主要是sql语句，因为node连接MySQL数据是很简单的。
### 2.4.2 node操作Mongodb数据库
mongoose模块
### 2.4.3 node操作Redis数据库
redis模块

