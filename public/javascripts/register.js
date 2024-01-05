// 判断输入内容是否有效
function isvalid(data) {
    const [form] = document.forms;

    const loginid = data.get('loginid');
    if (loginid.length > 16) {
        alert('用户名过长，请重新输入');
        form.elements["loginid"].value = "";
        return false;
    }

    const id_reg = /^[0-9a-zA-Z_]{1,}$/;
    let res = id_reg.test(loginid);
    if (!res) {
        alert('用户名为16位内字母数字下划线，请重新输入');
        form.elements["loginid"].value = "";
        return false;
    }

    const login_pwd = data.get('login_pwd');
    const login_repwd = data.get('login_repwd');
    if (login_pwd !== login_repwd) {
        alert('两次密码不一致，请重新输入');
        form.elements["login_pwd"].value = "";
        form.elements["login_repwd"].value = "";
        return false;
    }

    const nikename = data.get('nikename');
    if (nikename.length > 16) {
        alert('昵称过长，请重新输入');
        form.elements["nikename"].value = "";
        return false;
    }

    const brithday = data.get('brithday');
    if (brithday != "") {
        let date_reg = /^[\d]{4}-[\d]{1,2}-[\d]{1,2}$/;
        let res = date_reg.test(brithday);
        if (!res) {
            alert('生日格式不正确，请重新输入');
            form.elements["brithday"].value = "";
            return false;
        }
    }
    return true;
}

// 请求注册
function regist() {
    const [form] = document.forms;
    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const iterator of formData.entries()) {
        const [k, v] = iterator;
        params.set(k, v);
    }

    if (!isvalid(params)) return;

    const xhr = new XMLHttpRequest();
    xhr.open("post", "http://localhost:82/users/register");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params.toString());
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status < 200 || xhr.status >= 300 && xhr.status !== 304) {
                if (!xhr.response) {
                    alert('服务器异常,请稍后重试');
                    return;
                } else {
                    const remsg = JSON.parse(xhr.response);
                    if (remsg.msg == '该账号已存在') {
                        alert('该用户名已存在,请重试');
                        return;
                    }
                }
            } else {
                const remsg = JSON.parse(xhr.response);
                if (remsg.msg == '注册成功') {
                    alert('注册成功');
                    window.location.reload();
                }
            }
        }
    }
    return false;
}
// 返回前一页
function comeback() {
    window.history.back();
}