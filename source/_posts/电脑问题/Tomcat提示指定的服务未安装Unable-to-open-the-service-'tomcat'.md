---
title: Tomcat提示指定的服务未安装Unable to open the service 'tomcat'
date:  2017.01.21 00:12
tags: 电脑问题
categories: windows电脑问题
---

装了windows10后，tomcat莫名其妙的不能用，网上七姑八婆说win10不能用解压版，只能用安装版@#$%^&^%$^&...啧啧啧。然后用解压版后就出现了这个问题
***

在使用NetBeans时出现如下所示错误，其原因是部分已安装的组件没有以服务的方式存在。

![](http://upload-images.jianshu.io/upload_images/1171873-5c5aed60d49d7622?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
下面就是解决办法：
   打开“运行”到“cmd”，然后进入到tomcat安装路径“*:\Program Files (x86)\Apache Tomcat 8.0.3\bin”的bin下面，然后输入如下所示内容即可：service.bat install
效果如下图所示：

![](http://upload-images.jianshu.io/upload_images/1171873-18e59ba54e43616b?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
图2 安装后界面

在安装之后，我们能够看到已经安装成功字符，这时就可以正常启动tomcat。
----------------------------------------------------------------------------------
当然，你也可以这样玩，那就是安装之后又卸载，卸载时在安装后界面输入以下代码即可：service.bat uninstall,就这样，完成了卸载，那我们就继续从头开始安装吧，哈哈

以上就是Tomcat提示指定的服务未安装Unable to open the service 'tomcat'的解决方法。

***
声明：
本文转载自[suwu150的博客](http://blog.csdn.net/suwu150)
 [Tomcat提示指定的服务未安装Unable to open the service 'tomcat'](http://blog.csdn.net/suwu150/article/details/51506493)
