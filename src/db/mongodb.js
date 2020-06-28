// 建立mongodb连接
module.exports = app => {
  // 引入mongoose模块
  const mongoose =require('mongoose')
  // 建立连接
  mongoose.connect('mongodb://localhost:27017/express-test',
  { useNewUrlParser: true ,useUnifiedTopology: true},err => {
      if(err){
          console.log("数据库连接失败",err)
          return
      }
      console.log("数据库连接成功!")
  })
}