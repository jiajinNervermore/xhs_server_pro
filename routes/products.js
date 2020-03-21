const express=require('express');
var router=express.Router();
var pool=require("../pool.js");
router.get("/product",(req,res)=>{
  var sql="SELECT cid,img,title,href FROM xhs_product_carousel";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.set('Access-Control-Allow-Orign','*')
    res.send({code:1,data:result})
  })
})
router.get("/item",(req,res)=>{
  var sql="SELECT lid,details_pic,title,price,subtitle FROM xhs_product";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.set('Access-Control-Allow-Orign','*')
    res.send({code:1,data:result});
  })
})


module.exports=router;