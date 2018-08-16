---
title: 基于Ubuntu搭建个人网盘
date: 2018-08-02 22:00:00
tag: 搭建 网盘 Ubuntu
categories: 搭建
---

## 准备域名

### 域名注册
ping www.yourdomain.com
如果 ping 命令返回的信息中含有你设置的解析的 IP 地址，说明解析成功。

注意替换下面命令中的 www.yourdomain.com 为您自己的注册的域名

## 安装 Seafile 服务器

### 安装依赖环境
在 Debian/Ubuntu 系统下，可以使用以下命令安装 MySQL：
```
sudo apt-get update
sudo apt-get install mysql-server
```

使用以下命令安装 Python 相关依赖：
```
sudo apt-get install python2.7 python-setuptools python-imaging python-ldap python-mysqldb python-memcache python-urllib3
```

安装 MySQL 过程需要为 MySQL 的 root 用户设置新密码，请记住该[密码]以供后面步骤使用。

### 为 Seafile 创建一个用户
创建 Seafile 用户，使用它运行 Seafile 服务：
```
sudo useradd -m -s /bin/bash seafile
```

为该用户设置密码：
```
sudo passwd seafile
```

### 下载Seafile
切换到新用户，需要输入你刚才为seafile用户设置的密码：
```
su - seafile
```
切换目录：
```
cd ~
```

这里可以查看获取最新 Seafile 下载链接，参考以下命令进行下载。
```
wget http://seafile-downloads.oss-cn-shanghai.aliyuncs.com/seafile-server_6.1.1_i386.tar.gz
```

解压:
```
tar -xzf seafile-server_*
mv seafile-server-*/ seafile-server/
```

## 配置 Seafile
运行Seafile设置脚本，并回答预设问题：
```
cd seafile-server*
./setup-seafile-mysql.sh
```
执行过程输入参数如下：

其中：

 - [ This server's ip or domain ] 字段输入教程第一步申请的域名或者IP地址（<您的 CVM IP 地址>）。
 - mysql 的 [ root password ] 字段输入数据库密码。
 - 其他字段一路回车使用默认值。

```
[serve name] Seafile

What is the ip or domain of the server?
For example: www.mucompany.com, 192.168.1.101
[This server's ip or domain] www.qcloudlab.wang

Wheredo you want to put your seafile data?
Please use a volume with enough free space
[default "/opt/seafile/seafile-data"]

Which port do you want to use for the seafile fileserver?
[default "8082"]

------------------------------------------------------
Please choose a way to initialize seafile databases:
------------------------------------------------------

[1] Create new ccnet/seafile/seahub databases
[2] Use existing ccnet/sseafile/seahub databases

[1 ro 2] 1

What is the host of mysql server?
[default "localhost"]

What is the port of mysql server?
[default "3306"]

What is the password of the mysql root user?
[root password]

verifying password of user root ... done 

Enter the name for mysql user of seafile. It would be created if not exists.
[default "root"]

Enter the database name for ccnet-server:
[default "ccnet-db"]

Enter the database name for seafile-server:

```

## 启动 Seafile
```
./seafile.sh start
./seahub.sh start
```

执行过程输入参数如截图所示，其中 [ admin email ] 设置为您登录网盘的帐号，如 admin@qcloudlab.wang。

[ admin password ] 和 [ admin password again ] 设置为登录网盘的密码，如 admin_Password：

```
What is the email for the admin account?
[admin email] admin@qcloudlab.wang

What is the password for the admin account?
[admin password]

Enter the password again:
[admin password again]

```

此时 Seafile 已经部署完成，登录的帐号密码是：启动 Seafile 步骤中设置的邮箱和密码。
可以通过 IP 访问网盘：http://<您的域名>:8000