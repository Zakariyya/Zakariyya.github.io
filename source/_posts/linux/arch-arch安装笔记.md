---
title: arch安装笔记
date: 2015-12-21 18:55:56
tags: arch
categories: 系统 Linux
---

 ——(2)为解决问题(不定期更新)

2015年1月29日

下午，心血来潮，决定试着在装一次arch。
基本装完界面后，找到竹子。在大神的帮助下，开始解决之前不能解决的问题以下的出现的问题，及解决办法：

**Q：pacman -S sudo后，发现 sudo 不能用。出现提示：“不在SUDOERS文件中，此事将被报告。”**

```
nano /etc/sudoers  找到 
## Same thing without a password#  %wheel ALL=(ALL) NOPASSWD:ALL
```

取消“ #  %wheel ALL=(ALL) NOPASSWD:ALL”前面的“#”。

> %wheel：表示一个组的名称

前提是你必须在这个用户组，如果不是过不确定，那就改成“你的名字”

**eg： “rabbit ALL=(ALL) NOPASSWD:ALL”  ，将“%wheel”改成“rabbit”，“%wheel”是一个用户组。**

**重启ARCH后不能上网**
```
sudo dhcpcd wlp3s0   ##（wlp3s0是我的无线网卡）。
```

【前提是你在重启前安装了dialog，“pacman -S  dialog”】
若提示 NetworkManager的问题，意为“启动网络管理器”。则
```
sudo systemctl enable NetworkManager
sudo systemctl start NetworkManager
```
**Q：添加ARCHLINUXCN源**
可参考  [Archlinux CN 镜像源使用帮助](https://lug.ustc.edu.cn/wiki/mirrors/help/archlinuxcn)，[Arch Linux 中文社区仓库 / 镜像加速源](https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/)

```
nano /etc/pacman.conf
在 /etc/pacman.conf 文件末尾添加两行：

[archlinuxcn]SigLevel = Optional TrustAll
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
```

然后请安装 archlinuxcn-keyring 包以导入 GPG key。
具体做法为：

```
pacman -Syu   （刷新源）
pacman -S archlinuxcn-keyring　（安装archlinuxcn-keyring）
```

**Q：安装YAOURT  （前提，建议先添加ARCHLINUXCN源）**
****
```
sudo pacman -S yaourt
```
**注：**若是找不到wine软件，则**nano /etc/pacman.conf** 找到

```
Include = /etc/pacman.d/mirrorlist
```
取消注释，再刷新一下，如果想找软件，yaourt  描述如果想安装软件

```
yaourt -Ｓ 包名
```

记得“**yaourt -Syu**”一下

**Q： 安装CHROME　（前提，已安装YAOURT）**
```
yaourt -S google-chrome
```

**Q：安装搜狗输入法**

```
yaourt sogou
```

安装过程中遇到编辑 ，回车忽略。一般来说，aur的内容不需要编辑。

然后安装“fcitx-qt5”和　kcm-fcitx（如果不是kde桌面，就不用安装kcm-fcitx）
**注：**记得卸载ibus　命令：

```
yaourt -Rscn　ibus
```

附带依赖和配置文件，都删除
***
启动输入法：
记得安装“**ttf-dejavu**”
配置：参考“wiki.archlinux.org”，**nano /.xprofile**     文尾加入
```
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=”@im=fcitx”
```

重启电脑，完成

**Q：安装WINE**
```
yaourt -S wine-staging ##（听说目前的测试版比较稳定）
```



**Q：安装WINEQQ（这里使用“百度  清风博主 WINEQQ”）参考“[https://phpcj.org/wineqq/](http://phpcj.org/wineqq/)”**
****
第一步，安装wine
第二步，找到下载的安装包（tar.xz）的路径
终端使用“cd”一直不断进入到安装包所在的文件夹下，在该文件夹下输入：
```
tar xvf wineQQ8.1O17216.tar.xz -C ~/
```

***
***原文为：“~ $tar xvf wineQQ8.1O17216.tar.xz -C ~/” 中的“～$”为普通用户，“～#”为root下。***

**Q： 安装深度影音，深度影院**
***
```
yaourt deepin
```

在里面自己找，有music 、moive就是了。安装多个可以用空格隔开，如：1 3 5 52

***
深度影院安装后会出现打不开现象，终端执行：
```
deepin-movie
```

查看里面什么没有组建没安装，如“XXXX is not installed”下图：

google了一下这个module，加上了arch。然后搜到arch的仓库。
可得，执行
```
yaourt -S qt5-quickcontrols
```



**Q：修改GNOME桌面的样式，3.18已经不支持修改CSS来更换**
****
下载gnome-tweak-tools 优化工具，然后在“扩展-user them-启动”，重启优化工具，进入“外观-主题”选择你已经下载的主题



**Q：字体好奇怪，装完了文泉驿字体也是好奇怪。**
****
**nano /etc/pacman.conf **把下面的内容添加进去

```
[infinality-bundle]
SigLevel = Never
Server= http://bohoomil.com/repo/$arch

[infinality-bundle-multilib]
SigLevel = Never
Server= http://bohoomil.com/repo/multilib/$arch

[infinality-bundle-fonts]
SigLevel = Never
Server= http://bohoomil.com/repo/fonts
```

然后保存，并执行
```
sudo pacman -Syu infinality-bundle infinality-bundle-multilib ibfonts-meta-extended
```

因为是打补丁，所以会出现很多冲突，全部选择删除



**Q：添加WIN7启动项**
****

```
yaourt -S os-prober
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

可能出现“无法获取某些文件”，便多重试几次，这个网站是外国的，网速连接慢……（竹子说他曾经重试了十次）
***
推荐将win下的字体复制到“.fonts”。路径为“/home/你的用户名/.fonts”，该文件夹默认隐藏（“.”就是隐藏的意思）然后刷新字体缓存，
```
sudo fc-cache -fsv
```



**Q：GNOME3.18的桌面，将任务放到右上角（如UBUNTU一样）**
****

```
yaourt topicon
```

安装后，重启一下优化工具，“扩展-User themes”的上面就会出现“topicons”选项，启动它。
然后，键盘“alt+f2” ，输入“r”，回车。
**注：优化工具不会自动刷新的**
***
**Q：安装DEEPIN桌面环境（参考“ WIKI.ARCHLINUX.ORG ”）搜索“ DEEPIN DESKTOP ENVIRONMENT ”**


```
pacman -S deepin deepin-extra
```

**注：启动Deepin 桌面环境，使用登录管理器**

deepin默认lightdm greeter是lightdm-deepin-greeter，可通过pacman安装，安装后需编辑lightdm.conf:

```
sudo nano /etc/lightdm/lightdm.conf
```

然后找到，并修改
```
[SeatDefaults]
…
greeter-session=lightdm-deepin-greeter
```

之后终端执行

```
systemctl enable lightdm -f
```

重启
***
在进入deepin桌面后，可能出现设置部分英文现象。
终端执行
```
nano ~/.pam_environment
```

把 **en_US**  改成 **zh_CN**
两行都要，然后注销

**Q：安装ZSH**

```
yaourt -S zsh oh-my-zsh-git
```

安装完毕后会有让你cp一个文件，复制一下哪个命令
```
cp /usr/share/oh-my-zsh/zshrc ~/.zshrc
```

然后输入“ chsh ”
输入密码
输入“ /bin/zsh ”
***
每次进入终端，输入zsh后，会出现“ ～ ” ，说明进入zsh了，双击tab可补全命令。

**Q：删除base软件包组以外的所有软件包**

[参考网址](https://wiki.archlinux.org/index.php/Pacman/Tips_and_tricks_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#.E5.88.A0.E9.99.A4base.E8.BD.AF.E4.BB.B6.E5.8C.85.E7.BB.84.E4.BB.A5.E5.A4.96.E7.9A.84.E6.89.80.E6.9C.89.E8.BD.AF.E4.BB.B6.E5.8C.85)

```
pacman -Rs $(comm -23 <(pacman -Qeq|sort) <((for i in $(pacman -Qqg base); do pactree -ul $i; done)|sort -u|cut -d ' ' -f 1))
```



> [帖子来源](https://bbs.archlinux.org/viewtopic.php?id=130176)



Q：激活“ KEYBOARD SHORTCUTS ”(传说中的魔术键)，参考“[HTTPS://WIKI.ARCHLINUX.ORG/INDEX.PHP/KEYBOARD_SHORTCUTS](https://wiki.archlinux.org/index.php/Keyboard_shortcuts)”**

终端输入将临时启用

```
sysctl kernel.sysrq=1
```

或是
```
echo “1” > /proc/sys/kernel/sysrq
```

希望在系统启动时就开启，编辑“/etc/sysctl.d/99-sysctl.conf”文件
```
nano /etc/sysctl.d/99-sysctl.conf
```

文件中输入
```
kernel.sysrq = 1
```

保存

**注：**记住这个激活命令的通用口诀是 “Reboot Even If System Utterly Broken” (或者”REISUB”)。

 最后更新于2016年3月15日
