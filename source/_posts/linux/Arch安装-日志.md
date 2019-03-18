---
title: arch安装-日志
date: 2015-12-21 18:55:56
tags: arch
categories: 系统 Linux
---

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1171873-0cf0d522e5641d08.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[2016年2月24日](http://yamida.org/2016/02/24/arch%e5%ae%89%e8%a3%85%e6%97%a5%e5%bf%97/) / [芽蜜](http://yamida.org/author/rabbit/) / [1 COMMENT](http://yamida.org/2016/02/24/arch%e5%ae%89%e8%a3%85%e6%97%a5%e5%bf%97/#comments)

时间：2015.12.21～23
21日跟着视频在虚拟机上尝试了几遍。

22日早上，算是准备充分了，准备用物理机，以下是装机过程：（是我装机过程，并非教程。有流水账之嫌）
>cfdisk /dev/sda

选择了一个盘，write、quit    我选了sda8
```sh
mkfs.ext4 /dev/sda8
mount /dev/sda8 /mnt
ifconfig
dhcpcd eno16777736
```
然后就出事了
**eno16777736**……是什么鬼，视频里就是这么写的，我在虚拟机也这么用，没事啊。
于是上网找了下，原来是无线网卡。
这可是物理机，我得想办法连上家里的wifi（就是因为这个才没在学校装的）
```sh
iw dev  //识别无线网卡
wifi-menu wlp3s0
```
进入一个界面，在里面设置了wifi密码
```sh
dhcpcd wlp3s0
```
在里面设置联网的镜像
```sh
echo > /etc/pacman.d/mirrorlist
nano /etc/pacman.d/mirrorlist

Server=[http://mirrors.aliyun.com/archlinux/](http://mirrors.aliyun.com/archlinux/)$repo/os/$arch
```
ctrl+x  //保存
y  //确定
回车
```sh
pacstrap /mnt base base-devel  //安装基本工具
```

安装grub和一些基本配置
```sh
genfstab -U -p /mnt >> /mnt/etc/fstab
arch-chroot /mnt
nano /etc/locale.gen
```

会出现很多东西
找到“ **#en_US.UTF-8 UTF-8** ”，删掉前面的“##”
然后找到“ **#zh_CN.UTF-8 UTF-8** ”，删掉前面的“##”
同样X保存，y确定
回车
```sh
locale-gen  //生成中英文locale
echo Arch > /etc/hostname
passwd  //设置你root的密码
pacman -S grub
grub-install /dev/sda –recheck
```
若是错误了，试试这个，至于为什么，我不清楚，反正是在wiki上看到有关**uefi**安装的命令，然后就填上去，没想成了

```sh
grub-install –target=i386-pc –recheck –debug /dev/sda

grub-mkconfig -o /boot/grub/grub.cfg
pacman -Syu

useradd -m -s /bin/bash rabbit    //这里的rabbit是我添加的普通用户名
passwd rabbit                     //设置rabbit的密码

pacman -Syu net-tools
**pacman -S dialog  //超级注意，把这个装上，重启后联网会方便很多。**
**pacman -S wpa_supplicant dialog  //超级超级注意，保证新系统可以联网。**
**pacman -S rp-pppoe  //装上，有线上网时可通过pppoe设置**
systemctl enable dhcpcd
pacman -S sudo  //装个sudo，以示纪念
```
安装图形界面
```sh
pacman -S gnome
pacman -S gdm
systemctl enable gdm -f
```
配置ARCHLINUXCN源
参考“[https://lug.ustc.edu.cn/wiki/mirrors/help/archlinuxcn](https://lug.ustc.edu.cn/wiki/mirrors/help/archlinuxcn)”，
“[https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/](https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/)”
>nano /etc/pacman.conf
在 /etc/pacman.conf 文件末尾添加两行：
```sh
[archlinuxcn]
SigLevel = Optional TrustAll
Server = [https://mirrors.ustc.edu.cn/archlinuxcn/](https://mirrors.ustc.edu.cn/archlinuxcn/)$arch
```
然后安装** archlinuxcn-keyring **包以导入 **GPG key**。
具体做法为：
```sh
pacman -Syu （刷新源）
pacman -S archlinuxcn-keyring（安装archlinuxcn-keyring）
```

安装YAOURT （前提，建议先添加ARCHLINUXCN源）
```
sudo pacman -S yaourt
```
若是找不到wine软件，则nano /etc/pacman.conf
取消注释，再刷新一下，就有了
如果想找软件，yaourt 描述如果想安装软件yaourt -Ｓ 包名记得“yaourt -Syu”一下

安装常用软件
```sh
pacman -S fcitx-im fcitx-sunpinyin fcitx-cloudpinyin fcitx-configtool  //输入法
pacman -S gstreamer ffmpeg smplayer  //播放器和解码器
pacman -S alsa-utils pulseaudio-alsa  //音频
```

安装网络管理器
```sh
pacman -S network-manager-applet
systemctl enable NetworkManager.service
systemctl start NetworkManager.service
```

自己加到用户组里
```sh
gpasswd -a yourname audio
gpasswd -a yourname video
```
字体
```sh
pacman -S wqy-microhei ttf-dejavu ttf-droid cantarell-fonts
pacman -S ttf-dejavu wqy-microhei
```
各项驱动和必要的软件
```sh
pacman -S texlive-most
yaourt -S acroread-fonts-systemwide
**pacman -S wpa_supplicant dialog  //保证新系统可以联网。**
pacman -S xf86-input-synaptics // 支持触摸屏、板
pacman -S libreoffice// 办公软件,语言包选101简体中文
pacman -S gnome-tweak-tool// 系统美化工具
pacman -S xfce4-terminal  //终端
```
好像差不多了
```sh
exit
umount -R /mnt
reboot
```
重启
重启后发现不能上网
查到的解释是：arch需要两次配置网络
在安装后，arch会把原来的配置关了还是怎么了，需要再开一次
```
systemctl enable dhcpcd  //设置开机启动
sudo dhcpcd wlp3s0  //wlp3s0 是我的网卡
```
大致搞完，收工。然而这个我弄了一整天。
我的装机就到这里了

重启后会出现些问题，部分问题解决办法查看“[Arch安装-笔记](http://yamida.org/2016/02/24/arch%e5%ae%89%e8%a3%85-%e7%ac%94%e8%ae%b02/)”

分类： [0和1](http://yamida.org/category/%e7%ac%94%e8%ae%b0/0%e5%92%8c1/), [arch](http://yamida.org/category/%e7%ac%94%e8%ae%b0/0%e5%92%8c1/arch/), [笔记](http://yamida.org/category/%e7%ac%94%e8%ae%b0/)
 标签： [Arch](http://yamida.org/tag/arch/)
