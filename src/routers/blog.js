//blog 相关的路由方法
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controllers/blog')

// 路由
const handleBlogRouter = (req,res) => {
  const method = req.method  
 
  //获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list'){
   
    return getList()
    
  }

  //获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail'){
    return getDetail()
  }
  
  //新建博客
  if(method === 'POST' && req.path === '/api/blog/new'){
    return newBlog()
  }

  //更新博客
  if(method === 'PATCH' && req.path === '/api/blog/update'){
    return updateBlog()
  }

  //删除博客
  if(method === 'DELETE' && req.path === '/api/blog/del'){
    return delBlog()
  }




  


}
// 导出路由
module.exports = handleBlogRouter