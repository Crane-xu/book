const express = require('express');
const router = express.Router();
const books = require('../data/books');
const columns = require('../data/columns');

function response(req, res, page, data = {}) {
  if (req.session.visitorname == null) {
    res.render(page, {
      data,
      visitor1: 'input type="button" class="btn" value="登录" onclick="login()"',
      visitor2: 'input type="button" class="btn" value="注册" onclick="register()"'
    });
  } else {
    res.render(page, {
      data,
      visitor1: 'input type="text" id="showbox" value="' + req.session.visitorname + ',欢迎您" disabled readonly',
      visitor2: 'input type="button" class="btn" id="showbox" value="退出" onclick="logout()"'
    });
  }
}

/* GET home page. */
['/', 'index'].forEach(element =>
  router.get(element, (req, res) => response(req, res, 'index')));

['/login', '/register'].forEach(element =>
  router.get(element, (req, res) => response(req, res, element.substring(1))));

const ob = { 'a': 0, 'b': 4, 'c': 8, 'd': 11 };
// 二级页面
Object.keys(ob).forEach(c => {
  for (let i = 1; i <= 4; i++) {
    router.get(`/category/${c + i}`, function (req, res) {
      const data = columns.list.find(item => item.id === String(ob[c] + i));
      response(req, res, `category`, { ...data });
    });
  }
});

// 书籍详细页面
for (let idx = 1; idx <= 30; idx++) {
  router.get(`/category/book/${idx}`, function (req, res) {
    const data = books.list.find(item => item.id === String(idx));
    response(req, res, `book`, { ...data });
  });
  // 话题讨论页面
  if (idx <= 4) {
    router.get(`/comment${idx}`, function (req, res) {
      const comments = [
        { title: '#福尔摩斯探案全集#', img: '/images/3.png' },
        { title: '#CSS禅意花园#', img: '/images/4.jpg' },
        { title: '#我是猫#', img: '/images/5.png' },
        { title: '#三体Ⅲ·死神永生#', img: '/images/6.png' }
      ];
      response(req, res, `comment`, { ...comments[idx] });
    });
  }
}

module.exports = router;