---
title: arch分swap
date:  2016.03.06 19:30
tags: linux
categories: 系统
---

安装gparted在硬盘里划出一定量的空间，并格式化为swap（linux-swap）

```
sudo swapon /dev/sda9    //把我的swap挂在上
sudo mv /etc/fstab /etc/fstab.bak && sudo genfstab / > /etc/fstab
```

**注：若出现“ mv：无法获取’/etc/fstab’的文件状态(stat):没有那个文件或目录 ”，则直接执行“&&”后面的语句……若还是出现相关问题**
```
yaourt -S arch-install-scripts
```

之后
```
genfstab -U -p / >> /etc/fstab
cat /etc/fstab
```

![ ](http://upload-images.jianshu.io/upload_images/1171873-a1462beff9a45e15.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

重启，出现开机错误（前提：我的boot不是单独分的）
![](http://upload-images.jianshu.io/upload_images/1171873-df7214833d0582f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 
在grub倒计时时按下e，进入编辑模式
![  ](http://upload-images.jianshu.io/upload_images/1171873-ccab91cfa0b09b76.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
倒数第三行，**rw后面，空格，写上  init=/bin/bash ** ，F10引导
nano /etc/fstab
```

然后把中间的两行gvf用#注释掉，留下一个“ / ”和最后一个swap

ctrl+alt+del  重启
