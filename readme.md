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
cls 清屏
shell深入，，，

# 二.node主要知识点
2.1 nodejs基本介绍和使用
2.2 node模块系统与NPM
2.3 node核心模块学习
2.4 node操作数据库
2.5 node-express框架
2.6 各种中间件学习
2.7 node-koa框架

BFF层：向前端提供HTTP服务，向后端进行RPC通信。
## 2.1 nodejs基本介绍和使用
### 2.1.1 前端和后端的概念 
前端：主要和页面打交道，主要工作写页面（HTML），美化页面（css），调用后端提供的 api接口去请求或提交数据（js）vue等。
后端：主要进行业务逻辑的操作，如数据的增删改查，数据库的操作，对外暴露api接口等。
后端开发思维是和前端不一样的，要考虑
服务的稳定性：即单个客户端挂掉不能影响服务端，用PM2做进程守候
考虑cpu和内存：对于服务端来说cpu和内存都是稀缺资源，可以使用stream流写日志，使用redis存储session
日志纪录：服务器端要记录，存储，分析日志
安全：要时刻注意网络恶意攻击，如sql注入，xss攻击等
集群和拆分：当项目很大时就需要了。

### 2.1.2 node历史介绍
Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台，不是新的语言，框架。
Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。
简单的说 Node.js 就是运行在服务端的 JavaScript。
一般有两种用处，运行在服务器端做web server服务，另一种是运行在本地做打包构建工具使用。

### 2.1.3 node组成和使用
Node.js是由ecmascript语法规范 + nodeAPI 组成的，要想使用要先安装node运行所需要的环境，然后使用命令：node index.js ，就可以在服务器端运行一个js文件。当然一般会在包管理文件：package.json中的 "scripts"选项配置成其它命令启动。
在作为web服务提供api时，使用http模块创建服务器，然后根据需求使用不同的模块提供方法解决。


## 2.2 node模块系统与NPM
### 2.2.1 npm(node package manager node包管理)工具：
可以安装nvm管理多个版本的nodejs，
nvm list 查看安装了多少个nodejs版本
nodejs的使用需要依赖nodejs环境，安装即可。同时在安装时会自动把npm也安装上。
npm是一个命令行工具，用于下载和管理node开发所需要的各种模块/包/插件(一个意思)。
npm list 查看安装了什么模块。
npm config list 查看安装了什么全局模块。
使用流程: 
1.初始化为node项目
方法：使用 npm init 初始化项目（ npm init -y 快速初始化包管理文件（描述文件）package.json），将来安装的模块(包)都会纪录在这个package.json文件中且包含有描述当前项目的各种信息。注意：它是一个json格式的文件。

package.json文件中的常见属性如下:
{
&emsp;&emsp;"name" : "包名/当前项目名称",
&emsp;&emsp;"version" : "包的版本号/项目的版本号",
&emsp;&emsp;"description" : "包的描述/项目的描述",
&emsp;&emsp;"keywords" : "描述当前项目的关键字",
&emsp;&emsp;"main" :"index.js", main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。
这个字段的默认值是模块根目录下面的 index.js。即使用node命令启动项目时的入口文件。
&emsp;&emsp;"scripts" :{
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "nodemon index.js"
}, 指定了运行脚本命令的npm命令行缩写。修改实现启动项目的自定义命令,代替 node 运行文件名 这样启动js文件。
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
方法：使用 npm install/uninstall 包名/模块名 --sava/--save-dev/-g。
安装/卸载需要的包/模块，后面没有参数时会把模块直接安装到当前目录的node_modules目录中，不会修改package.json。
&emsp;&emsp;--save = -S 模块安装到生产依赖dependencies中，即：模块信息自动写入package.json中的 "dependencies" 节点选项中。项目发布上线之后还会依赖用到的模块，没有这些模块，项目不能运行。
&emsp;&emsp;--save-dev = -D 模块安装到开发依赖中，即：模块信息自动写入package.json中的 "devDependencies" 节点选项。项目上线之后不会用到的模块，例如'babel-loader'。
&emsp;&emsp;-g,表示全局安装，就可以在任何目录下使用。一般如 nodemon 
注意：模块信息有模块名，模块版本信息组成。
补充:版本号知识 ,
版本格式：主版本号.次版本号.修改版本号。
主版本号：功能模块有大的变动，比如增加多个模块或者整体架构发生变化。
次版本：模块局部的变动。
修改版本：bug修复或者增加一些小功能。

~，用户使用当前版本后，最多升级到修改版的最新版本
^,用户使用当前版本后，最多升级到次版本的最新版本
*,用户使用当前版本后，可以升级到最新版本即最新主版本

3.正式使用各种模块
根据实际需求在 .js文件中编写具体的代码即可，主要是查看文档提供的api接口。

### 2.2.2 node 模块系统：
使用模块化比较符合设计原则，单一置换原则，开放封闭原则。
&emsp;&emsp;在node.js中是以模块(.js文件)为基本单位来划分功能的，为了让Node.js的模块(.js文件)可以相互调用，Node.js提供了一个完整的模块加载系统即CommonJS规范。注：这里 .js文件和模块是一一对应的。即：一个 Node.js 文件(主要是js文件)就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。所以创建一个模块是很简单的就是新建一个.js文件。

### 2.2.3 模块的分类：
&emsp;&emsp;原生(核心)模块:nodejs自己提供的原生api,调用时只写模块名称即可。
&emsp;&emsp;文件模块：第三方提供的api，调用时要写清楚路径。
nodejs模块在使用前都需要使用 require('模块名/模块路径') 方法先加载引入模块。
注：node会对模块进行缓存，所以在第二次require相同的模块时不会重新加载。

### 2.2.4 node模块具体使用：
#### 1 模块导入引用
前端中是基于script标签的，有src属性就下载src属性的地址，没有就执行一边script标签里的代码。
&emsp;&emsp;nodejs是基于commonjs规范的，特点是所有代码都运行在模块作用域，不会污染全局作用域，会缓存。
node对原生模块和文件模块的加载方法基本是一样的。
原生模块调用：使用nodejs提供的 require('原生模块名')函数加载，注意：原生模块名定义在 Node.js 源代码的 lib/ 目录下，如果加载成功该方法返回的是一个node模块对象 module ，这个对象拥有这个加载模块向外暴露的的所有属性和方法(即exports和module.exports向外暴露的属性和方法)。可以定义一个变量接收这个对象返回值，这样定义的变量就可以调用模块的所有属性和方法。

文件模块调用：也是使用 require('文件模块路径')，不过要注意路径问题。
require()引入文件模块的路径问题：  
&emsp;&emsp;以 '/' 为前缀的模块是文件的绝对路径。
&emsp;&emsp;以 './' 为前缀的模块是相对于当前调用 require() 的文件的。也就是说， circle.js 必须和 foo.js 在同一目录下以便于 require('./circle') 找到它。
&emsp;&emsp;以 '../' 为前缀的模块是相对当前文件的上一级目录。
&emsp;&emsp;当没有以 '/'、 './' 或 '../' 开头来表示文件时，这个模块必须是一个核心模块或加载自 node_modules 目录。
注意：如果给定的路径不存在，则 require() 会抛出一个 code 属性为 'MODULE_NOT_FOUND' 的 Error。即找不到要加载的模块。

#### 2 模块属性和方法的导出
&emsp;&emsp;在node模块中定义了一些变量，函数和对象只在该模块内有效，别人使用require方法来调用这个模块本意就是使用这些变量，函数，对象。使用require方法会返回一个对象，这个对象拥有的就是模块使用exports或者module.exports导出的所有属性和方法。
&emsp;&emsp;exports对象：在模块中使用这个对象就可以向外暴露东西，它是module对象的一个属性，本身又是一个对象。语法：exports.导出变量名/导出方法名=模块内定义的变量名/方法名。
&emsp;&emsp;module.exports：向外暴露东西。
语法1：module.exports.导出变量名/导出方法名=模块内定义的变量名/方法名
语法2：module.exports= {//对象} 对象里放要导出的内容。
注意：
** exports ** 返回的是模块函数,本质上exports是module.exports的一个引用，exports指向的是module.exports对象。可以理解为它的一个副本(简写形式)。
** module.exports **返回的是require方法返回的对象即模块对象本身，返回的是一个类。

module.exports才是module模块的真正导出接口，一个模块文件中可以有多个exports输出，但只能有一个module.exports输出
如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，数组等就用 module.exports。建议都使用module.exports。

## 2.3 node核心模块学习
非阻塞i/o，io一个系统的输入和输出，非阻塞表示系统在接收输入再到输出这段时间里可以接收其它的输入。
异步编程：通过回调函数实现，回调函数格式：第一个参数是error，后面的才是返回结果。但是会造成回调地狱的问题。
event-loop：事件轮询机制。
异步编程解决方案1：promise承诺
异步编程解决方案2：async异步函数，await会等待后面的异步操作执行。它是promise语法的语法糖，以同步的方式写异步代码。
debugger，使用vscode或者Google的开发者工具。
&emsp;&emsp;作为后台提供api接口返回数据，当然最重要的是http模块，使用它就可以创建node服务器了。
处理get请求要使用url模块获取url，以此来做路由判断，使用querystring模块解析查询字符串。
处理post请求，监听data事件，数据是像水流一样一点点传递的会一直触发data事件并执行对应的回调函数。传递完成触发 end事件，并执行回调函数。


