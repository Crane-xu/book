// 退出登录
function logout() {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "http://localhost:82/users/logout");
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status < 200 || xhr.status >= 300 && xhr.status !== 304) {
                // alert(xhr.status);
                console.log('服务器异常');
                return;
            } else {
                let visitor = JSON.parse(xhr.response);
                if (visitor.msg) {
                    alert(visitor.msg);
                }
                let url = window.location.href;
                window.location.href = url;
            }
        }
    }
}
// 登录
function login() {
    window.localStorage.setItem('beforeloginUrl', window.location.href)
    window.location.href = 'http://localhost:82/login';
}
// 去往注册页面
function register() {
    window.location.href = 'http://localhost:82/register';
}
// 返回主页面
function homepage() {
    window.location.href = 'http://localhost:82/index';
}
// 进到相应书籍详情页面
function bookdetail(num) {
    window.location.href = 'book/' + num;
}
// 进到响应评论页面
function incomment(num) {
    window.location.href = 'comment' + num;
}