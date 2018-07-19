---
title: windows10关闭自动更新
date:  2017.01.24 14:23
tags: 电脑问题
categories: windows电脑问题
---

**方法一：禁用Windows updata服务**
Windows updata为自动更新的服务，我们只要将其禁用，也就可以达到更新服务不可用的目的从而阻止自动更新；操作步骤：按WIN+R 打开运行，输入 services.msc 回车 然后找到 “Windows updata”服务，双击后设置为禁用 应用即可；
![](http://upload-images.jianshu.io/upload_images/1171873-706fe65a3311855e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**方法二：推迟自动更新**
微软在win10系统中Windows更新处虽然没有提供关闭自动更新的选项，不过却提供了延迟更新的选项；操作步骤：打开win10系统的Windows更新，点击高级选项，勾选“推迟升级”选项即可；（同样，我们也可以在组策略中的Windows组件-Windows更新 下 启用“延迟升级”达到推迟几个月升级的目的）
![](http://upload-images.jianshu.io/upload_images/1171873-cb817e2ec1d840d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**方法三：为windows更新指定一个错误的升级服务器地址**
在win10系统中，组策略中我们可以为Windows更新服务器指定一个地址，从而达到无法检测到更新，而无法更新的目的。操作步骤：按“Win+R”组合键打开运行输入“gpedit.msc”再点“确定”。打开“本地组策略编辑器”展开“管理模版”→“Windows组件”。接着双击“Windows组件”找到“Windows Update”。在“Windows Update”内找到“指定Intranet Microsoft更新服务位置”。选中“指定Intranet Microsoft更新服务位置”右键编辑。将“未配置”框选为“已启用”。再在“设置检测更新的Intranet更新服务”填写127.0.0.1 (注：127.0.0.1为本机IP)
![](http://upload-images.jianshu.io/upload_images/1171873-37773d28d91ab823.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注意：win10基础版将不会有组策略等功能，也无法关闭自动更新！PS：我们了解到新的Windows系统，要求用户接受每一次更新。“Windows 10家庭版”用户(绝大多数消费者所用版本)完全无法逃避更新；“[Windows10专业版](http://www.xitonghe.com/win10/)”用户有8个月的时间来推迟安装更新，但同样无法拒绝；只有“Windows 10企业版”高级用户才能无限期推迟更新。
***
（注：本文非原创，因为需要随便百度来的，作为记录，防止以后忘了而已，部分因时间原因导致文与实际不符。作参考）
