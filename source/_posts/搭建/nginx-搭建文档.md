---
title: nginx 搭建文档
date: 2018-09-23 15:44:03
tags: nginx
categories: 搭建
---

> 以Centos 7 为例

## Edit yum's aliyun源

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
yum makecache #生成缓存
```
## Yum command
```
yum update  ## Update all rpm packages
yum upgrade ## 大规模的版本升级,与yum update不同的是,连旧的淘汰的包也升级
```

## Install some softs and the environment

```
mkdir app backup download logs work  # 这里是自己的习惯的目录结构
yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
yum -y install wget httpd-tools vim

yum list | grep gcc
```

## Install nginx
> link: [https://nginx.org/en/download.html](https://nginx.org/en/download.html)

 - click: Linux packages for [stable version](http://nginx.org/en/linux_packages.html#stable)
 - copy

 ```
 [nginx]
 name=nginx repo
 baseurl=http://nginx.org/packages/OS/OSRELEASE/$basearch/
 gpgcheck=0
 enabled=1
 ```

 - create a file of nginx by yum in vim

 ```
 vim /etc/yum.repos.d/nginx.repo

 [nginx]
 name=nginx repo
 baseurl=http://nginx.org/packages/OS/OSRELEASE/$basearch/
 gpgcheck=0
 enabled=1
 ```
 
 - install
 
 ```
 yum list | grep nginx
 ## You can find the nginx app

 yum install nginx
 ```

## Installed nginx

```
ngxin -v  # view the version
systemctl start nginx.service
systemctl restart nginx.servcice
systemctl reload nginx.service
```

### 查看nginx安装目录
```
rpm -ql nginx
```

### 安装目录
|路径|类型|作用|
|:--|:--|:--|
|/etc/logrotate.d/nginx|配置文件|Nginx日志轮转，用于logrotate服务的日志切割|
|/etc/nginx/nginx.conf|||
|/etc/nginx/nginx.conf|||
|/etc/nginx/conf.d|目录、配置文件|Nginx主配置文件|
|/etc/nginx/conf.d/default.conf|||
|/etc/nginx/fastcgi_params|配置文件|cgi配置相关，fascgi配置|
|/etc/nginx/uwsgi_params|||
|/etc/nginx/scgi_params|||
|/etc/nginx/koi-utf|配置文件|编码转换映射转化文件|
|/etc/nginx/koi-win|||
|/etc/nginx/win-utf|||
|/etc/nginx/mime.types|配置文件|设置http协议的COntent-type与扩展名对应关系|


|路径|类型|作用|
|:--|:--|:--|
|/usr/lib/systemd/system/nginx-debug.service|配置文件|用于配置出系统守护进程管理器管理方式|
|/usr/lib/systemd/system/nginx.service|||
|/etc/sysconfig/nginx|||
|/etc/sysconfig/nginx-debug|||
|/usr/lib64/nginx/modules|目录|Nginx模块目录|
|/etc/nginx/modules|||
|/usr/sbin/nginx|命令|Nginx服务启动管理的终端命令|
|/usr/sbin/nginx-debug|||
|/usr/share/doc/nginx-1.12.0|文件目录|Nginx的手册和帮助文件|
|/usr/share/doc/nginx-1.12.0/COPYRIGHT|||
|/usr/share/man/man8/nginx.8.gz|||
|/var/cache/nginx|目录|Nginx的缓存目录|
|/var/log/nginx|目录|Nginx的日志目录|
















## reference
[将Centos的yum源更换为国内的阿里云源](https://www.jianshu.com/p/4aa7b63f9026)
[nginx: download](http://nginx.org/en/download.html)
[nginx: Linux packages](http://nginx.org/en/linux_packages.html#stable)
