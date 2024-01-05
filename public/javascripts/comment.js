function discuss() {
     //获取评论内容
     var sentence = document.getElementById('commentbox').value;
     //创建标签节点
     var mynode = document.createElement("li");
     //创建文本节点
     var text = document.createTextNode(sentence);
     //文本节点加入标签内
     mynode.appendChild(text);
     //ul最后面添加上创的节点
     document.getElementById('commentlist').appendChild(mynode);
     //清空评论框
     document.getElementById('commentbox').value = "";
}