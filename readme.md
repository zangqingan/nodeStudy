## node学习开始前
### cmd常用命令的学习：
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

## node主要知识点
一.nodejs基本介绍和使用
二.node模块系统与NPM
三.node核心模块学习
四.node操作数据库
五.node-express框架
六.中间件学习
七.node-koa框架

## 一.nodejs基本介绍和使用
### 1.1前端和后端的概念 
前端：主要和页面打交道，主要工作写页面（HTML），美化页面（css），调用后端提供的 api接口去请求或提交数据（js）vue等。
后端：主要进行业务逻辑的操作，如数据的增删改查，数据库的操作，对外暴露api接口等。

### 1.2node历史介绍
简单的说 Node.js 就是运行在服务端的 JavaScript。
Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。
Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。


## 二.node模块系统与NPM
### 2.1npm(node package manager node包管理)工具
nodejs的使用需要依赖nodejs环境，安装即可。在安装时会自动把npm也安装上。
npm是一个命令行工具，用于下载管理node开发所需要的各种模块。
npm list 
npm config list查看全局安装。
流程: 
1，先使用 npm init 初始化项目（ npm init -y 快速初始化包管理文件（描述文件）package.json），将来安装的包都会纪录在这个package.json文件中有描述当前项目的各种信息。
package.json文件中的常见属性如下:
&emsp;&emsp;name - 包名/项目名称.
&emsp;&emsp;version - 包的版本号/项目的版本号。
&emsp;&emsp;description - 包的描述/项目的描述。
&emsp;&emsp;scripts - 指定了运行脚本命令的npm命令行缩写。修改实现启动项目的自定义命令,代替node 运行文件名。
语法：npm run 自定义的命令。(自定义的命令是scripts中的键，如果定义为start则run可以省略)
&emsp;&emsp;author - 包的作者/项目的作者，
&emsp;&emsp;contributors - 包的其他贡献者。
&emsp;&emsp;dependencies - 指定了项目运行（即生产环境所依赖的包列表）所依赖的模块。
它们将会被安装在 node_module 目录下。
&emsp;&emsp;devDependencies - 开发环境依赖包列表，里面的模块是开发时用的，发布时用不到它。
&emsp;&emsp;repository - 包代码的Repo信息，包括type和URL，type可以是git或svn，URL则是包的Repo地址。
&emsp;&emsp;main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。
这个字段的默认值是模块根目录下面的 index.js。
&emsp;&emsp;keywords - 关键字
2，使用 npm install/uninstall 包名/模块名 --sava/--save-dev -g。
安装/卸载需要的包/模块后面没有参数，会把模块直接安装到node_modules目录中，不会修改package.json
&emsp;&emsp;--save，安装到运行依赖dependencies中，即---自动更改package.json 写入dependencies 节点中。项目发布上线之后还会依赖用到的插件，没有这些插件，项目不能运行。
&emsp;&emsp;--save-dev，安装到开发依赖中，即---自动更改package.json 写入devDependencies 节点。项目上线之后不会用到的插件，例如'babel-loader'。
&emsp;&emsp;-g,表示全局安装，就可以在任何目录下使用
补充:版本号知识
主版本号.次版本号.修改版本号
主版本号：功能模块有大的变动，比如增加多个模块或者整体架构发生变化。
次版本：局部的变动。
修改版本：bug修复或者增加一些小功能。
~，用户使用当前版本后，最多升级到修改版的最新版本
^,用户使用当前版本后，最多升级到次版本的最新版本
*,用户使用当前版本后，可以升级到最新版本

### 2.2 node 模块系统
&emsp;&emsp;在node.js中是以模块(.js文件)为基本单位来划分功能的，为了让Node.js的模块(.js文件)可以相互调用，Node.js提供了一个完整的模块加载系统。注：这里文件和模块是一一对应的。即：一个 Node.js 文件(主要是js文件)就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。所以创建一个模块是很简单的就是新建一个.js文件。

#### 2.2.1 模块的分类：原生(核心)模块和文件模块
&emsp;&emsp;原生(核心)模块:nodejs自己提供的原生api,调用时只写模块名称即可。
&emsp;&emsp;文件模块：第三方提供的api，调用时要写清楚路径。
nodejs模块在使用前都需要使用 require('模块名/模块路径') 方法先加载。
注：node会对模块进行缓存，所以在第二次require相同的模块时不会重新加载。

### 2.3 node模块使用
#### 2.3.1 模块导入引用
&emsp;&emsp;node对原生模块和文件模块的加载方法基本是一样的，注：核心模块定义在 Node.js 源代码的 lib/ 目录下，如果加载同名的模块，require() 总是会优先加载核心模块 。
原生模块调用：使用 require('原生模块名')加载，加载成功该方法返回的是一个node模块对象，这个对象拥有这个加载模块的所有属性和方法(即exports和module.exports向外暴露的属性和方法)。可以定义一个变量接收这个对象返回值，这样定义的变量就可以调用模块的所有属性和方法。
`const http = require('http') `
`http.createServer((req,res)=>{}).listen(port) `

文件模块调用：使用 require('文件模块路径')
require()引入文件模块的路径问题：  
&emsp;&emsp;以 '/' 为前缀的模块是文件的绝对路径。
&emsp;&emsp;以 './' 为前缀的模块是相对于当前调用 require() 的文件的。也就是说， circle.js 必须和 foo.js 在同一目录下以便于 require('./circle') 找到它。
&emsp;&emsp;以 '../' 为前缀的模块是相对当前文件的上一级目录。
&emsp;&emsp;当没有以 '/'、 './' 或 '../' 开头来表示文件时，这个模块必须是一个核心模块或加载自 node_modules 目录。
注意：如果给定的路径不存在，则 require() 会抛出一个 code 属性为 'MODULE_NOT_FOUND' 的 Error。即找不到要加载的模块。

#### 2.3.2 模块属性方法的导出
&emsp;&emsp;在node模块中定义了一些变量，函数和对象只在该模块内有效，别人使用require方法来调用这个模块本意就是使用这些变量，函数，对象。使用require方法会返回一个对象，这个对象拥有的就是模块使用exports和module.exports导出的属性和方法。
&emsp;&emsp;exports对象：在模块中使用这个对象就可以向外暴露变量，对象或函数了。语法：exports.导出变量名/导出方法名=模块内定义的变量名/方法名。
&emsp;&emsp;module.exports：向外暴露数据。
语法1：module.exports.导出变量名/导出方法名=模块内定义的变量名/方法名
语法2：module.exports= {//对象} 对象里放要导出的内容。
注意：
** exports ** 返回的是模块函数
** module.exports **返回的是require方法返回的对象即模块对象本身，返回的是一个类。
** exports是module.exports的一个引用，exports指向的是module.exports **
module.exports才是module模块的真正接口，而exports可以理解为它的一个副本(简写形式)。一个模块文件中可以有多个exports输出，但只能有一个module.exports输出
如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，数组等就用 module.exports。(都是用module.exports就行)

## 三.node核心模块学习
&emsp;&emsp;