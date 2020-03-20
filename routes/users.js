var express = require("express");
var router = express.Router();
var query = require("./query.js")
//引入连接池
var pool = require("../pool");
//注册
router.get("/signin", (req, res) => {
  var obj = req.query;
  var sql = "select verification_code,phone from xhs_user where phone=?";
  query(sql, [obj.phone])
    .then((result) => {
      // 如果不存在改用户
      if (result.length == 0) {
        // 重新生成一个随机数字
        var verification = "";
        for (var i = 0; i < 6; i++) {
          verification += Math.floor(Math.random() * 10);
        }
        obj.verification_code=verification
        // console.log(obj)
        var sql = "insert into xhs_user set ?";
        pool.query(sql, [obj], (err, result) => {
          err && console.log(err);
          // console.log(result)
          if (result.affectedRows > 0) {
            res.send({ code: 1, result, obj })
          }
        })
      } else {
        // 如果存在改用户
        var verification = "";
        // 还是生成一个随机数
        for (var i = 0; i < 6; i++) {
          verification += Math.floor(Math.random() * 10);
        } 
        // 功能变成修改改用户的验证码
        var sql = "update xhs_user set verification_code=? where phone=?";
        pool.query(sql, [verification, obj.phone], (err, result) => {
          if (err) throw err;
          if (result.affectedRows > 0) {
            res.send({ code: 1, result, obj:{'verification_code':verification} })
            // console.log(verification)
          } else {
            res.send({ code: 0, msg: "请重新发送..." })
          }
        })
      }
    })
    .catch(error => {
      console.log(error)
      return
    })
})
//登录
router.get("/login", (req, res) => {
  var phone = req.query.phone;
  var verification_code = req.query.verification_code;
  var uid = req.session.uid
  // console.log(uid)
  // if (uid == null) {
  //   res.write(JSON.stringify({ ok: 0 }));
  //   res.end();
  // } else {
  var sql = "select * from xhs_user where phone=? and verification_code=?";
  pool.query(sql, [phone, verification_code], (err, result) => {
    // res.write(JSON.stringify({ ok: 1, uname: result[0].uname }));
    if (err) throw err;
    console.log(result)
    console.log(result.length)
    if (result.length > 0) {
      res.send({ code: 1, msg: "登录成功",data:result })
    } else {
      res.send({ code: -1, msg: "登录失败" })
    }
  })
  // }
})
//注销
router.get("/signout", (req, res) => {
  delete req.session.uid;
  res.send();
})

module.exports = router;