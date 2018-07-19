---
title: PPPOE上网
date:  2016.04.07 21:39
tags: linux 网络
categories: 系统
---

*韶华易逝，望能有松的坚强，山的稳重*
***
好吧～我承认这很傻逼，现在才知道怎么越过学校上网客户端上网。因为之前总觉得这些客户端都很高大上的，管着几千几万学生。

几天前一网友得知我是用pppoe拨号，语音里大笑  “这很简单啊～自己弄去”

在学校开网以后会得到一个拨号器软件—— “蝴蝶” ，安装中还需依赖插件——“ [winpcap](https://en.wikipedia.org/wiki/Pcap#WinPcap) ”，才能上网。

国内大部分高校均采用IEEE 802.1X认证方式对校内宽带接入进行认证，在802.1X认证下，一般的路由器无法使用。

>笔者学校称之为 “ 蝴蝶 ”……类似的有安腾、安朗、锐捷……（某朋友竟然无聊到跟我争论广东地区只用“ 锐捷 ”……-_-||  ……）

@_@……我arch大法就这样复活了


```
pppoe-setup     //设置pppoe
输入账号、
网卡名字、
DNS、
密码、
0-2 （我设置“ 0 ”）、
y
pppoe-start    //启动
…Connected!【一般没说超时（timeout）就是好了】
```

>看网上的说明，说是要装“ rp-pppoe ”，可是我装了也没什么用好像  -_-||
（呃，后来亲测还是要装的，不然连pppoe-setup都不能用——补充于20160515）

gnome下设置
“ 添加配置 ”
![2016-04-07](http://upload-images.jianshu.io/upload_images/1171873-2489474018dcd8e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![2016-04-07-1](http://upload-images.jianshu.io/upload_images/1171873-6a05f5b9104869ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 
做以记录～
