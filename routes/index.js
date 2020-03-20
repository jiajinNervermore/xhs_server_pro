const express=require("express");
const pool=require("../pool.js");
var router=express.Router();
router.get("/index",(req,res)=>{
  var sql="SELECT user,title,video,likes,locat FROM xhs_index";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
    // console.log(result)
  });
});
module.exports=router