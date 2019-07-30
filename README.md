# nodejs-demo-1

## 三种方式局部刷新
## 两种JSONP实现方法

## 启动应用
node server.js 8888

### 指定端口启动
node server.js 8001
<br>
node server.js 8002

### 实现zhouwanwen.com:8001和jack.com:8002之间的JSONP请求需先修改hosts文件：
<br>
目录：C:\Windows\System32\drivers\etc下的hosts文件<br>
右键记事本打开，添加如下在末尾：<br>
127.0.0.1 zhouwanwen.com<br>
127.0.0.1 jack.com
