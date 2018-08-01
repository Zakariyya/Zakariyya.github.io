---
title: Redis 配置安装
date: 2017-03-24 22:01:00
categories: 服务配置
---

## Install Redis for windows

https://github.com/ServiceStack/redis-windows



安装步骤：

1. 安装linux虚拟机

2. 拷贝Redis压缩包

3. 解压缩

4. 进入解压目录，进行make操作

5. make PREFIX="/opt/kgc/install/redis3" install

   cd src && make install

   > PREFIX=""：是安装的路径

6. 如果出现一个bin目录，说明安装成功了

## Redis工具简介

redis-server：用来启动Redis的工具

redis-bencnmark：检测Redis在本机的运行效率

redis-check-aof：修复AOE持久化

redis-check-rdb：修复RDB持久化文件

redis-cli：命令行工具

redis-sentinel：软链接



## Redis使用

### 启动

想启动Redis，需要Redis的配置文件

> 路径：cd redis-3.2.3
>
> 当中有“redis.conf”，是redis默认的配置文件
>
> 将这个文件拷贝出去，cp 文件名  拷贝后的路径

接着，在redis解压后中的bin文件夹，找到“redis-server“

启动服务

> ./redis-server  ../redis.conf      #启动server命令，并让server启动哪个配置文件

当看到一个六角形图标出现的时候，就说明Redis启动成功了

![](http://upload-images.jianshu.io/upload_images/1171873-e0742e98607cbed2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### redis-bencnmark

在bin目录下。执行：./redis-bencnmark

会进行一段比较长的时间扫描、检测


![image.png](http://upload-images.jianshu.io/upload_images/1171873-d25045bd9595e1fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


> redis-bencnmark检测后的吞吐量：37313.43。（配置：deepin、2G内存、1核CPU）
>
> 2013年Redis官方发布，如果没有性能评定的话**Redis**的秒吞吐量应该能达到60万。



### redis-cli

进入Redis命令界面

因为是key、value的存储方式

命令：

redis-cli  #进入redis

> set k1 v1
>
> 会提示：OK
>
> 取出数据：get k1
>
> 弹出：”v1“


![](http://upload-images.jianshu.io/upload_images/1171873-786d168690352aba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




### redis-sentinel

软连接，相当于**redis-server**



------

**（运行redis以上的命令的前提：启动redis成功，既执行：redis-server）**



## Redis常见应用场景

- 缓存（最基本的优点）
- 取最新N个数据的操作，List
- 排行榜类的应用
- 计数器应用
  - Redis本身自带这方面的API
- 存储关系
- 实时分析系统
- 记录日志（最基本的优点）































