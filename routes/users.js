var express = require('express');
var router = express.Router();
// 引入数据库支持
var dbConfig = require('../util/dbconfig');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
// 注册接口
router.post('/register', (req, res) => {
  const { loginid, password, nikename, brithday, email } = req.body;
  const sql = `insert into tb_visitor values(?,?,?,?,?)`;
  const record = [loginid, password, nikename, brithday, email];
  const callBack = (err, data) => {
    if (err) {
      if (err.errno == 1062) {
        res.status(500).send({ 'msg': '该账号已存在' });
      } else {
        res.status(500).send({ 'msg': 'Something failed!' });
      }
    } else {
      res.status(200).send({
        'msg': "注册成功",
        'loginid': { loginid }.loginid
      });
    }
  }
  dbConfig.sqlConnect(sql, record, callBack);
});
// 登录接口
router.post('/login', (req, res) => {
  const { loginid, password } = req.body;
  const sql = `select * from tb_visitor where loginid=?`;
  const loginInfo = [loginid, password];
  const callBack = (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    } else {
      if (data[0] == null) {
        res.status(200).send({ 'msg': '该账号不存在' });
        return;
      }
      if ({ password }.password == data[0].password) {
        req.session.visitorname = null;
        req.session.visitorname = data[0].nikename;
        res.status(200).send({
          'nikename': data[0].nikename,
          'msg': '登录成功'
        })
      } else {
        res.status(200).send({ 'msg': '密码错误' })
      }
    }
  }
  dbConfig.sqlConnect(sql, loginInfo, callBack);
});
// 退出登录接口
router.get('/logout', (req, res) => {
  req.session.visitorname = null;
  res.status(200).send({ 'msg': '退出成功' });
});

module.exports = router;
