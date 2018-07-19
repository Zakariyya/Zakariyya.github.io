---
title: apahce错误提示the-requested-operation-has-failed
date: 2017-04-23 15:08:48
tags: apahce
categories: 服务配置
---

今天在修改了**httpd.conf**文件配置之后启动**apache**时提示**the requested operation has failed **
错误，无法正常启动apache了，后来搜索了一些解决办法，下面分享给各位同学，有需要了解的朋友可参考。**

**找到解决方法：**
运行cmd 进入到[apache](http://www.111cn.net/list-121/)的bin目录。输入httpd.exe -w -n "Apache2.2" -k start
看到这个哥就笑了 原来是180行有问题 找到的时候才知道 180行这个
DocumentRoot "D:/www/demo"  就是没有这个目录
之后哥把这个删除了 就运动正常了 后来才明白 之前服务器主人 www 目录下有demo这个文件夹 之后删除了
就没有把http.conf 下的配置删除
重启就没有问题了
如果不会ddos命令的朋友我们可以进入你apache安装上当，然后打开httpd.conf，修改你写错误的地址也是可以地。
后来网上找到了一些导致apache 提示**the [request](http://www.111cn.net/tags.php/request/)ed operation has failed** 原因总结
原因一：80端口占用 例如IIS，另外就是迅雷。我的apache服务器就是被迅雷害得无法启用！
原因二：软件冲突 装了某些软件会使apache无法启动如Dr.com 你打开网络连接->TcpIp属性->高级->WINS标签 把netbios的lmhosts对勾去掉，禁用tcp/ip的netbios. 然后再启动应该就可以了。
原因三：httpd.conf配置错误 如果apache的配置文件httpd.conf搞错了，在windows里启动它，会提示the requested operation has failed


