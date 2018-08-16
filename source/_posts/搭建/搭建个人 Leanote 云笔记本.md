---
title: 搭建个人Leanote云笔记
date: 2018-08-15 11:01:00
tag: 搭建 Leanote 云 笔记 云笔记
categories: 搭建
---

## 下载启动 MongoDB
> Leanote 依赖 MongoDB 作为数据存储，下面开始安装 MongoDB：

### 下载 MongoDB
进入 /home 目录，并下载 MongoDB：
```
cd /home
```
下载源码：
```
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.1.tgz
```
解压缩源码包：
```
tar -xzvf mongodb-linux-x86_64-3.0.1.tgz
```
创建用于存储的文件夹目录
```
mkdir -p /data/db
```

### 配置 MongoDB 的环境变量
编辑 /etc/profile，在文件末尾追加以下配置：
```
示例代码：/etc/profile
export PATH=$PATH:/home/mongodb-linux-x86_64-3.0.1/bin
```
并执行以下命令，使环境变量生效。
```
source /etc/profile
```
启动 MongoDB（启动需要 3 ~ 5 分钟，耐心等待）：
```
mongod --bind_ip localhost --port 27017 --dbpath /data/db/ --logpath=/var/log/mongod.log --fork
```

## 安装 Leanote
> Leanote 是一款 Linux 下开源的软件，下面开始安装 Leanote：

### 下载 Leanote
先进入 /home 目录
```
cd /home
```
下载 Leanote 源码
```
wget https://iweb.dl.sourceforge.net/project/leanote-bin/2.4/leanote-linux-amd64-v2.4.bin.tar.gz
```
解开压缩包
```
tar -zxvf leanote-linux-amd64-v2.4.bin.tar.gz
```
### 编辑 Leanote 配置文件
编辑文件 app.conf，在文件中找到 app.secret= 项，并修改为如下内容：
```
app.secret=qcloud666
```

### 初始化数据库
导入初始化数据
```
mongorestore -h localhost -d leanote --dir /home/leanote/mongodb_backup/leanote_install_data/
```
启动 Leanote 服务
```
nohup /bin/bash /home/leanote/bin/run.sh >> /var/log/leanote.log 2>&1 &
```

## 准备域名和证书
 - 域名注册
 - 域名解析
 - ping www.yourdomain.com
 
 > 如果 ping 命令返回的信息中含有你设置的解析的 IP 地址，说明解析成功。

注意替换下面命令中的 www.yourmpdomain.com 为你自己的注册的域名

## 访问 Leanote 云笔记本

通过 ip 访问笔记本
通过访问 http://<你的 CVM IP 地址>:9000 就可以了使用自己的笔记本。

 - 初始化账户： admin
 - 初始化密码： abc123
 - 请务必修改密码已确保使用安全！

通过域名访问笔记本
如果你申请了域名，可以将 Ip 地址替换为对应的域名作为访问凭据，如：http://www.yourmpdomain.com:9000 , 注：请将 www.yourmpdomain.com 替换为你申请的域名。