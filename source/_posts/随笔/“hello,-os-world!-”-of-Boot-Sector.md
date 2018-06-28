---
title: hello,os-world of Boot Sector
date: 2016.05.25
tags: 
categories: 随笔
---

这不是个完整的os，而只是个最最简单的引导扇区(Boot Sector)，但至少它是在裸机上运行的，不依赖任何其他软件～
***
在图书馆无意中挖到一本《**自己动手写操作系统**》。欢哉～

可惜是2005年的书了，书中讲到的软盘和软盘映像相应的软件在网上实在不好找，特别是win系统的。最后还是装个deepin来编译.asm和.img文件来得方便。

为什么是deepin？方便啊，十几分钟自动安装，然后就能用了。
[![一个简单的Boot Sector](http://upload-images.jianshu.io/upload_images/1171873-ed5b2fee51b9e54f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)](http://7xn7w0.com1.z0.glb.clouddn.com/wp-content/uploads/2016/05/20160513132812.jpg)

将下面的代码保存为 BOOT.ASM
```
org 07c00h  ;告诉编译器程序加载到7c00处
mov ax,cs
mov ds,ax
mov es,ax
call DispStr  ;无线循环
jmp $
DispStr:
  mov ax,BootMessage
  mov bp,ax   ;es:bp = 串地址
  mov cx,16 ;cx = 传长度
  mov ax,01301h ;ah = 13,all = 01h
  mov bx,000ch   ;页号为0(bh=0)，黑底红字(b1=0Ch,高亮)
  mov dl,0
  int 10h  ;10h号中断
  ret
BootMessage: db "hello ,os world!"
times 510-($-$$) db 0    ;填充剩下的空间，使生成的二进制代码，恰到好处为512字节
dw 0xaa55   ;结束标志`
```

**linux下安装nasm，编译：**
```
**nasm boot.asm -o boot.bin**
```

使用linux下的dd命令，网上找了下dd制作映像文件，果然是可以的，制作方法如下：
1 先制作一个空的软盘映像文件diska.img(1.44Mb的软盘映像文件)：
```
**dd if=/dev/zero of=diska.img bs=512 count=2880**
```

2 制作一个包含boot.bin的映像文件boot.img:
```
**dd if=boot.bin of=boot.img bs=512 count=1**
```

3 将diska.img中1个扇区后面的数据拷贝到boot.img的后面
```
**dd if=diska.img of=boot.img skip=1 seek=1 bs=512 count=2879**
```

这样就做成了一个大小为1.44Mb的包含引导代码的映像文件。
 
接着，创建一个空的虚拟机，在设置中将Floppy（软盘）的路径设置为上面制作的引导扇区的路径：
[![20160515125816](http://upload-images.jianshu.io/upload_images/1171873-59867994fdf17b2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)](http://7xn7w0.com1.z0.glb.clouddn.com/wp-content/uploads/2016/05/20160515125816.png)
开启虚拟机，便出现本文开头的那张图——hello ,os world!

其实这些在网上是能够找到的，可奈何脑子笨，弄了一天试了好多软件才出现这一界面，固然欣喜。如何与硬件做沟通？正是我想要了解的。[![](http://upload-images.jianshu.io/upload_images/1171873-3fd3dee55e0a9bbd.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)](http://7xn7w0.com1.z0.glb.clouddn.com/wp-content/uploads/2016/05/1786778861.jpg)
一个不懂汇编和C语言的，可怜的娃。
