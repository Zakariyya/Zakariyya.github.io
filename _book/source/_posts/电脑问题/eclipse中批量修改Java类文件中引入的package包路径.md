---
title: eclipse中批量修改Java类文件中引入的package包路径
date:  2017.08.05 15:33
tags: 电脑问题
categories: windows电脑问题
---

当复制其他工程中的包到新工程的目录中时，由于包路径不同，出现红叉，下面的类要一个一个修改包路径，类文件太多的话就比较麻烦了，如何批量改变包路径解决这个问题？
## 方法一：

Ctrl+H > File Serach > 输入原包名 > File name patterns下填写*.java > Replace... > 找到后输入要替换的包名 然后自己选择是全部替换还是部分替换.
![](http://upload-images.jianshu.io/upload_images/1171873-7d92f8f3597989f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 方法二：

直接修改出错的类所在的包的名称再改回来，这样就可以统一修改所有出错的类的package包名称。

***
原文转载自：[https://my.oschina.net/leeoo/blog/37852](https://my.oschina.net/leeoo/blog/37852)
