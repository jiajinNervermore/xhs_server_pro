//引入express模块
const express = require("express")
var router = express.Router();

let pool = require("../pool.js")
//引入封装好了的连接池语句
// var query = require("./query.js")
router.get("/details",(req,res)=>{
  var lid = req.query.lid;
  // console.log(lid)
  var sql = "SELECT family_id,title,price,details_pic FROM xhs_product where lid=?";
  pool.query(sql,[lid],(err,result)=>{
    if(err)throw err;
    // console.log(result)
    if(result.length==0){
      res.set('Access-Control-Allow-Orign','*')
      res.send({code:-1,msg:"没有找到相关信息"});
    }else{
      res.set('Access-Control-Allow-Orign','*')
      res.send(result)
    }
  })
})
module.exports=router