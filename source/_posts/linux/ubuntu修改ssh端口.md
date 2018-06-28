---
title: ubuntu修改SSH端口
date:  2016.09.11 21:25
tags: linux ssh
categories: 系统 Linux
---


修改**/etc/ssh/sshd_config**，在***Port 22***下添加你的端口

```
Port 22
```
Port YOUR_PORT

修改/etc/ssh/ssh_config，在Host *下添加你的端口
```
Host *
Port 22
Port YOUR_PORT
\#   ForwardAgent no
```

重启ssh

```service ssh restart```

再ssh连接新的端口，成功连接后再修改上面的配置把22端口注释掉
再在本机~/.ssh/下新建一个config文件，文件内容为：
```
Host YOUR_HOST
    User YOUR_USER_NAME
    Port YOUR_NEW_PORT
```
这样下次连接就只需要**ssh YOUR_HOST**就ok了。

修改ssh默认端口后git的一些远程操作会失败，解决办法也是修改config文件：

```
Host github.com
HostName github.com
Port 22
Host bitbucket.org
HostName bitbucket.org
Port 22
```
原文摘自“[阿小信的博客](http://note.axiaoxin.com/contents/change-ubuntu-ssh-port.html)”
***
中午朋友说我服务器被人攻击，还成功登录了。丫的，密码设linux就是在作死啊……
