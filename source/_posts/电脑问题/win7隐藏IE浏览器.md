---
title: windows7隐藏IE浏览器
date:  2016.02.27 15:33
tags: 电脑问题
categories: windows电脑问题
---

点击开始，运行，输入 **“regedit”**，打开注册表编辑器。

然后找到下面的项删除，最后的项名称不一定是一样，注意该项数据是**Internet Explorer**，如果还有其他浏览器被改，找到对应项删除即可

```HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{FAC36FAA-6F1A-0EB6-A06D-841C1415FB7E}
```
右边窗口（名称，类型，数据）删掉“数据”为：**Internet Explorer** 即可。（找不到或没用的话 ，则为：“ **Windows media **”）
