//****连接池模块****
// 引入mysql模块
const mysql = require("mysql")
//创建连接池对象
let pool = mysql.createPool({
  // host:"127.0.0.1",
  // port:3306,
  // database:"xhs",
  // user:"root",
  // password:'',
  host:process.env.MYSQL_HOST,
  port:process.env.MYSQL_PORT,
  database:'app_' + process.env.APPNAME,
  user:process.env.ACCESSKEY,
  password:process.env.SECRETKEY,
  connectionLimit:15
})
module.exports=pool