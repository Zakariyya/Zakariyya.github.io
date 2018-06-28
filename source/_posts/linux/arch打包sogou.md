---
title: arch打包sogou
date:  2016.03.04 21:39
tags: linux sogou
categories: 系统 Linux
---


[![](http://upload-images.jianshu.io/upload_images/1171873-6b9207c12b5b1acc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)](http://yamida.org/2016/03/04/arch%e6%89%93%e5%8c%85sogou/)

[2016年3月4日](http://yamida.org/2016/03/04/arch%e6%89%93%e5%8c%85sogou/) / [芽蜜](http://yamida.org/author/rabbit/) / [2 COMMENTS](http://yamida.org/2016/03/04/arch%e6%89%93%e5%8c%85sogou/#comments)

几天前，搜狗输入法不知发什么疯了。尝试重装sogou的时候发现yaourt不到sogou。在竹子的帮助下，学会了打包。这以后应该会方便多了吧～

在[arch网站](https://www.archlinux.org/)里面找到[aur](https://aur.archlinux.org/)页面，搜sogou

![](http://upload-images.jianshu.io/upload_images/1171873-864fd484ef046f03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
***
![](http://upload-images.jianshu.io/upload_images/1171873-48525df6a6ab9650.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 

点击“  [Download snapshot](https://aur.archlinux.org/cgit/aur.git/snapshot/fcitx-sogoupinyin.tar.gz)  ”

![](http://upload-images.jianshu.io/upload_images/1171873-f720721281390d3e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
下载后解压……

>题外话：当时电脑还不能解压tar
>yaourt -S file-roller   //这是gnome的归档管理器

>![](http://upload-images.jianshu.io/upload_images/1171873-165e55638ef02c7b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
安装上所有的依赖，可奇怪的还是不能用，双击解压包后鼠标一直转啊转，然后就没有然后了
解压命令：tar -xzvf 文件名
//文件名用tab补全，这样不容易出错
```
解压后，
```
makepkg     //打包
sudo pacman -U 文件名.tar   //安装
```

装好搜狗了。第二次重装系统的过程也是不顺利，输入法一直不听话……（干嘛？～我就要用搜狗，你管我啊～）
搜狗问题，见文《[sogou输入配置](http://www.jianshu.com/p/f2bbff538856)》
> 这篇的重点不是装搜狗，而是如何打包……
