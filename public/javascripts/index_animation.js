window.onload = function () {
    main(1);
    setTimeout(changeSrc, 5000);
    onesentence()
}

// 实现打字机效果
var str = '-博观而约取，厚积而薄发。';
function setText(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.getElementsByClassName('word')[0].innerHTML = t;
            resolve();
        }, 200);
    });
}
async function main(flag) {
    if (flag) {
        for (var i = 1; i < str.length; i++) {
            await setText(str.substr(0, i));
        }
    } else {
        for (var i = str.length; i > 0; i--) {
            await setText(str.substr(0, i));
        }
    }
    setTimeout(() => {
        main(!flag)
    }, 1000);
}

const arr = ['/images/2.jpg', '/images/7.jpg', '/images/8.jpg']
var k = 0;
// 改变图片路径 实现轮播
function changeSrc() {
    k++;
    if (k > 2) k = 0;
    var path = arr[k];
    document.querySelector('.carousel').setAttribute('src', path);
    setTimeout(changeSrc, 5000);
}

// 请求一个动态句子
function onesentence() {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "https://api.66mz8.com/api/quotation.php");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status < 200 || xhr.status >= 300 && xhr.status !== 304) {
                // alert(xhr.status);
                console.log('服务器异常');
                return;
            } else {
                // console.log(xhr.response);
                document.querySelector('.carousel').setAttribute('title', xhr.response);
            }
        }
    }
}
