---
title: windows下启动项菜单(Boot-Manager)问题
date:  2016.03.19 14:23
tags: 电脑问题
categories: windows电脑问题
---

这个问题通常会在装linux、win双系统后，用EasyBCD之类的软件重置了电脑的 mbr ，导致在windows下的启动菜单变成英文，或是欢迎界面变成英文版的……

这种情况笔者在deepin下遇过……deepin挂了，连win的启动项都找不到，情急之下用启动盘将重写了win的mbr。

在win中，以管理员身份运行 “ cmd ” ，输入
``` BCDEDIT -SET {CURRENT} LOCALE ZH-CN```

(此命令将把需要启动的操作系统的选择菜单，也就是多重操作系统共存时选择需要启动哪个操作系统的选择菜单的显示语言修改为简体中文)
``` BCDEDIT -SET {MEMDIAG} LOCALE ZH-CN```

(此命令将把当前选定的 Windows操作系统的 F8 高级启动菜单的显示语言修改为简体中文)
``` BCDEDIT -SET {BOOTMGR} LOCALE ZH-CN```

(此命令将把 Windows 内存诊断工具的显示语言修改为简体中文)
``` BCDEDIT /ENUM ALL```

查看上述项目的 LOCALE 值是否已成功修改为ZH-CH简体中文。
![ ](http://upload-images.jianshu.io/upload_images/1171873-aad8b8af50722c2d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 
**这方法不是原创，搜索引擎上一大把（多也就意味着要去筛选）。这样记下来以后要是就方便了……**
>笔者发现，搜索解决问题办法时，常因表达不明确而导致难以找到满意的答案。普通使用者哪会知道每次开机时黑色背景的倒计时叫做 “ 启动项菜单 ”？ 笔者最近的arch出了问题，还好有grub，省去了不必要的麻烦。

