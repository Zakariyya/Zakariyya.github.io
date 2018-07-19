---
title: sogou输入配置
date:  2016.09.07 21:39
tags: linux sogou
categories: 系统 Linux
---


[![-1982943483](http://upload-images.jianshu.io/upload_images/1171873-7bda27d363237693.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)](http://yamida.org/2016/03/07/sogou%e8%be%93%e5%85%a5%e9%85%8d%e7%bd%ae/)

[2016年3月7日](http://yamida.org/2016/03/07/sogou%e8%be%93%e5%85%a5%e9%85%8d%e7%bd%ae/) / [芽蜜](http://yamida.org/author/rabbit/) / [1 COMMENT](http://yamida.org/2016/03/07/sogou%e8%be%93%e5%85%a5%e9%85%8d%e7%bd%ae/#comments)

参考“[arch的wiki词条fctix](https://wiki.archlinux.org/index.php/Fcitx_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))”

装完sogou后，装上“ fctix-im ”“ fctix-qt5 ”。

在~.xprofile，~.bashrc，~.zshrc里面都写上以下三行代码【这里的”~”是指“/home/用户名/”下的，之前弄成在”/”下了，怪不得一直找不到.xprofile文件】(手动滑稽～)

>export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=”@im=fcitx”

![](http://upload-images.jianshu.io/upload_images/1171873-4d080c26087320c0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 
>第二次装遇到最大的问题就是这个，哎～

