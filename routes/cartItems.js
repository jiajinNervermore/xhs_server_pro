const express = require('express')
var router = express.Router()
var pool = require("../pool.js")


router.get("/cart", (req, res) => {
  //获取session id凭证
  var id = req.session.id;
  var obj = req.query;
  var uid = parseInt(obj.uid);
  // console.log(uid);
  //2.如果当前用户没有登录凭证，输出请登录
  // if (!uid) {
  //     res.send({ code: -2, msg: "请登录", data: [] });
  //     return
  // }
  var sql = "select product_id ,count from xhs_shopping_cart where user_id=?";
  pool.query(sql, [uid], (err, result) => {
    try{
    if (err) throw err;
    // console.log(result);
    // 判断result是否为0 是则说明该用户购物车里没有商品，否则，说明有再根据查询到的商品编号，去商品表查询相应的商品信息，返回到前端
    if (result.length == 0) {
      res.send({ code: 0, msg: '购物车是空的' })
      return;
    } else {
      //根据查询到的product_id因为是外键关联到商品表lid
      var lids = [];
      //由于查出的商品可能不止一条，所以遍历result，得到一个lid的数组，然后循环执行查询语句，最后生成一个数组返回到前端
      for (var i = 0; i < result.length; i++) {
        // 由于购物车表里没有商品数量
        //所以需要将得到的对象保存住
        lids.push(result[i])
      };
      console.log(lids.length, 'lids长度', typeof (lids.length));
      // 提前声明一个变量cartList 保存查询结果
      var cartList = [];
      var sql = "SELECT lid,family_id,title,parameter,key_word,price,store,details_pic FROM xhs_product where lid=?";
      var len = lids.length;
      for (var i = 0; i < len; i++) {
        (function (sql, i, len) {
          pool.query(sql, [lids[i].product_id], (err, result) => {
            if (err) throw err
            // console.log(cartList)
            cartList.push(result[0])
            // 将购物车表里的数量强行赋值到返回数组对象里
            cartList[i].count=lids[i].count
            if (i == len - 1) {
              res.send({ code: 1, msg: '查询成功', data: cartList })
            }
          })
        })(sql,i,len)
      }
    }
  }catch(err){
    console.log(err);
  }
  })
})
module.exports = router