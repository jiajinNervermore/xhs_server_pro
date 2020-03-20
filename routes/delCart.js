const express = require ('express')
var router = express();
var pool = require('../pool.js')
router.get('/delCart',(req,res)=>{
  var obj = req.query;
  var user_id = obj.user_id;
  var pids=obj.pids;
  //{user_id:?,[product_id:?...]}
  var sql = 'delete from xhs_shopping_cart where user_id=? and product_id=?';
  var len = pids.length;
  for(var i = 0;i<len;i++){
    (function(sql,i,len){
      pool.query(sql,[user_id,pids[i]],(err,result)=>{
        if(err) throw err;
        if(i==len-1){
          if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"})
          }else{
            res.send({code:-1,msg:'删除失败'})
          }
        }
      })
    })(sql,i,len)
  }
})
module.exports = router;