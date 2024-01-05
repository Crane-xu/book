function login() {
    const [form] = document.forms;
    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const iterator of formData.entries()) {
        const [k, v] = iterator;
        params.set(k, v);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("post", "http://localhost:82/users/login");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params.toString());
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status < 200 || xhr.status >= 300 && xhr.status !== 304) {
                alert('服务器异常,请稍后重试');
                return;
            } else {
                const visitor = JSON.parse(xhr.response);
                if (visitor.msg == '登录成功') {
                    alert(visitor.msg + ',欢迎您,' + visitor.nikename);
                    const url = window.localStorage.getItem('beforeloginUrl');
                    window.localStorage.removeItem('beforeloginUrl');
                    window.location.href = url;
                } else if (visitor.msg == '该账号不存在') {
                    alert(visitor.msg + ',请注册或重新登录');
                    window.location.reload();
                } else if (visitor.msg == '密码错误') {
                    alert(visitor.msg);
                    form.elements["login_pwd"].value = "";
                }
            }
        }
    }
}
function comeback() {
    window.history.back();
}