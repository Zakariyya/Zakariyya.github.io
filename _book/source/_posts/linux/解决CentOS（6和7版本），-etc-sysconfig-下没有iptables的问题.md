---
title: 解决CentOS（6和7版本），-etc-sysconfig-下没有iptables的问题
date:  2017.05.23 22:38
tags: linux centos
categories: 系统 Linux
---

##一、Centos 6版本解决办法：

1. 任意运行一条iptables防火墙规则配置命令：
> iptables -P OUTPUT ACCEPT  

2. 对iptables服务进行保存：
>service iptables save  

3. 重启iptables服务：
>service iptables restart 

##二、Centos 7版本解决办法：

1. 停止并屏蔽firewalld服务
>systemctl stop firewalld
systemctl mask firewalld

2. 安装iptables-services软件包
>yum install iptables-services

3. 在引导时启用iptables服务
>systemctl enable iptables

4. 启动iptables服务
>systemctl start iptables

5. 保存防火墙规则
>service iptables save
或
/usr/libexec/iptables/iptables.init save

**另外：管理iptables服务**
>systemctl [stop|start|restart] iptables

***
注：原文摘自==>[解决CentOS（6和7版本），/etc/sysconfig/下没有iptables的问题](http://blog.csdn.net/CSDN_LQR/article/details/53885808)
