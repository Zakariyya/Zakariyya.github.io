---
title: Shadowsocks搭建过程(服务端)
date: 2018-04-23 13:42:50
tags: 翻墙 Shadowsocks
categories: 翻墙 
---

>链接扩展 
[shadowsocks](https://shadowsocks.org/en/index.html)
[shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows/releases/tag/4.0.9)
[shadowsocks-libev](https://github.com/shadowsocks/shadowsocks-libev/)
[v2ray](https://v2ray.com)
[vultr](https://vultr.com)

## 安装shadowsocks-libev

shadowsocks的服务端也分python版本、go版本以及C语言写的shadowsocks-libev，因为libev版更新快，而且C语言编写的运行效率更高些，所以采用libev版。

### 安装预编译包

在shadowsocks-libev的github项目上有release预编译版本，可以直接安装（以目前的3.1.3版本为例）：

```
#下载预编译文件
wget https://github.com/shadowsocks/shadowsocks-libev/releases/download/v3.0.3/shadowsocks-libev-3.1.3.tar.gz
tar zxf shadowsocks-libev-3.0.3.tar.gz    #解压缩
cd shadowsocks    #进入项目文件夹
./configure    #配置安装
make
make install
```

### 编译源码安装

```
git clone https://github.com/shadowsocks/shadowsocks-libev.git #下载源码
cd shadowsocks-libev/    #进入项目目录
git submodule update --init    #下载git子模块
./autogen.sh    #生成配置文件
./configure    #配置编译环境
make     #编译
make install    #安装
```

这样就装好了，shadowsocks-libev中常用的命令有
**ss-server**、**ss-local**、**ss-redir**、**ss-tunnel**等，
服务端只用**ss-server**。关于使用方法，可以man shadowsocks-libev或者man ss-server来查看，下面只会提到必要用法。


## 编辑配置文件

一般为了方便，会将shadowsocks设置的参数写成配置文件，配置文件为json格式，服务端可以使用的key如下：

|key|说明|
| :--: | :--: |
|server	|服务器IP|
|server_port	|服务端口|
|password	|密码|
|method	|加密算法|
|timeout	|超时|
|mode	|代理协议|


服务器IP如果设为0.0.0.0则绑定所有IP；代理协议指的是代理TCP还是UDP，
至于加密算法，3.0以上版本的shadowsocks目前支持18种算法，但推荐使用以下支持AEAD加密的：

 - chacha20-ietf-poly1305
 - aes-256-gcm
 - aes-192-gcm
 - aes-128-gcm

至于原因可以参考这篇文章这里以我常用的配置文件为例：

```
touch config.json    #新建文件
vim config.json    #编辑文件
```

config.json

```
{
    "server":"0.0.0.0",    //服务器IP，0.0.0.0代表绑定服务器的所有IP
    "server_port":8088,    //服务端口
    "password":"password",    //密码
    "timeout":"5",    //超时重连
    "method":"chacha20-ietf-poly1305",    //加密方式
    "mode":"tcp_and_udp"    //代理TCP和UDP
}
```


配置文件为json格式，//后为注释，方便说明加的，实际配置文件里不能写注释（看那个红色就知道不能加）。

这里用的是在移动设备上性能相对效好的chacha20-ietf-poly1305。

因为只有shadowsocks-libev更新了AEAD加密，所以为了兼容可以改为chacha20等非AEAD加密算法。

## 运行shadowsocks-libev

```
ss-server -c config.json
```

可以看到服务在前台运行，-c后面接配置文件。若要后台运行，可以加上-f参数，后面接一个pid文件名，运行后会生成这个pid文件，里面保存着这个后台ss-server进程的pid。

```
ss-server -c config.json -f proxy.pid
```


如果想开多个端口，可以使用多个配置文件+多个pid文件的方式来管理。这样服务端就完成了。


> 文章摘自[shino.space](https://shino.space/2017/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E6%90%AD%E5%BB%BAshadowsocks%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91%E7%B3%BB%E7%BB%9F-%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AF%87/)
