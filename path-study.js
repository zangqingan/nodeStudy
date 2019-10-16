/**
 * path 模块提供用于处理文件路径和目录路径的实用工具。 
 * 这个模块都是要和url，fs等模块一起使用的。
 * 
 */
// 1 引入
const path = require('path')

// 2 使用
var testpath = 'W:/VSCodeProjects/nodeStudy/readme.md'
// path.basename() 方法返回 path 的最后一部分,即取最后一层(取文件名)。
// path.dirname() 方法返回 path 的目录名，去掉最后一层(去掉文件名)
console.log(path.basename('取到的是文件名'+ testpath))//readme.md
console.log(path.dirname('取到的是文件目录名'+ testpath))//W:/VSCodeProjects/nodeStudy