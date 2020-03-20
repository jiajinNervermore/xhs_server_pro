//添加商品到购物车路由
//引入express模块
const express = require('express');
//创建路由管理器
var router = express();
//引入连接池模块
var pool = require('../pool.js')
//发送添加请求
router.get('/addcart',(req,res)=>{
  //获取前端传来的参数
  var obj = req.query;
  console.log(obj,'购物车');
  if(!obj){//非空验证
    return 
  }
  //声明 变量 保存 sql 语句
  var sql = 'insert into xhs_shopping_cart set ?';
  //sql 语句执行
  pool.query(sql,[obj],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:'添加成功'})
    }else{
      res.send({code:-1,msg:'添加失败'})
    }
  })
})
module.exports=router;