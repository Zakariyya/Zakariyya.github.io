---
title: docker 离线安装
date:  2019.01.11 10:46
tags: linux docker Oracle Ubuntu
categories: 系统 Linux
---

## centos offline installation docker

[download docker .tar.gz](https://download.docker.com/linux/static/stable/x86_64/) and follow  the doucment

1. Download the statis binary archive. Go to http://download.docker.com/linux/static/stabl
(or change stable to edge or test), choose your hardware platform, and download the **.taz** file relating to the version of Docker CE you want to install.
1. Extract the archive using the tar utility. The dockerd and docker binaries are ectracted.
```
tar zxvf /path/to/<FILE>.tar.gz
```
1. Optional: Move the biaries to a directory on your executable path, such as ``` /usr/bin/ ``` . If you skip this step, you must provide the path to the executable when you invoke ``` docker ``` or  ``` dockerd ``` commands.
```
$ sudo cp docker/* /usr/bin/
```
1. Start the Docker daremon:
```
$ sudo dockerd &
```

If you need to start the daemon with additional options, modify the above command accordingly or create and edit the file ``` /etc/docker/daemon.json ``` to add the custom configuration options.


## DockerHub sreach oracle
> 这里是离线安装，即 “我的服务器只能内网” 

### 做法 1
```
docker pull wnameless/oracle-xe-11g
```
> [wnameless/oracle-xe-11g](https://hub.docker.com/r/wnameless/oracle-xe-11g/)
如果是这样就没意思了

### 做法2 github上clone该项目[wnameless/oracle-xe-11g](https://github.com/wnameless/docker-oracle-xe-11g)
找到dockerfile的位置
```
docker build .
```
随即等待……

start command (in github readme)
```
docker run -d -p 49161:1521 -e ORACLE_DISABLE_ASYNCH_IO=true wnameless/oracle-xe-11g
```

By default, the password verification is disable(password never expired)
Connect database with following setting:
```
hostname: localhost
port: 49161
sid: xe
username: system
password: oracle
```



#### 问题一
这个镜像是依赖于ubuntu的，如果本地没有ubuntu镜像，docker会自动去 pull ubuntu。这里因为是无网络状态，所以需要我们再去找 ubuntu 对应的 dockerfile。这里做法和上面一样。但是我没有找到对应的ubuntu dockerfile

## 客户端连接oracle 失败
> TNS: no listen 什么鬼的没有监听到

找到 listener.ora，存放位置一般在
```
cd $ORACLE_HOME/network/admin ## 这个目录下
cp listener.ora listener.ora.bak
vim listener.ora
```

清空内容，复制下面内容
```
LISTENER=
  (DESCRIPTION=
    (ADDRESS_LIST=
      (ADDRESS=(PROTOCOL=tcp)(HOST=sale-server)(PORT=1521))
      (ADDRESS=(PROTOCOL=ipc)(KEY=extproc))))
SID_LIST_LISTENER=
  (SID_LIST=
    (SID_DESC=
      (GLOBAL_DBNAME=sales.us.acme.com)
      (ORACLE_HOME=/oracle10g)
      (SID_NAME=sales))
    (SID_DESC=
      (SID_NAME=plsextproc)
      (ORACLE_HOME=/oracle10g)
      (PROGRAM=extproc)))
```

### 文件组成部分
- listener的名称
- listener接受连接的协议地址
- 数据库服务名
- Oracle8之后的版本有动态监听注册，可以不需要配置静态监听。但是Oracle官网说如果想要使用em需要配置静态监听
- 控制参数

### 监听参数说明
#### 协议地址部分
```
listener_name=
(DESCRIPTION=
(ADDRESS=(PROTOCOL=tcp)(HOST=hr-server)(PORT=1521))
(ADDRESS=(PROTOCOL=tcp)(HOST=sales-server)(PORT=1521)))
```

##### 可选参数
```
QUEUESIZE：并发请求连接数
RECV_BUF_SIZE，SEND_BUF_SIZE
```

##### 示例
```
listener_name=
(DESCRIPTION=
(ADDRESS=(PROTOCOL=tcp)(HOST=hr-server)(PORT=1521)(RECV_BUF_SIZE=11784)(SEND_BUF_SIZE=11280))
(ADDRESS=(PROTOCOL=tcp)(HOST=sales-server)(PORT=1521)(QUEUESIZE=20)))
```

#### 静态监听部分
静态监听就是SID_LIST_xxx节点下的配置，最简单的配置如下
```
SID_LIST_listener_name=
(SID_LIST= 
(SID_DESC=...)
(SID_DESC=...))
```
##### 可允许的参数
 - ENVS环境变量键值对
 - GLOBAL_DBNAME：对外提供的网络服务名
 - ORACLE_HOME
 - PROGRAM：用来标识服务可执行程序，最常用的PROGRAM=extproc
 - SID_NAME： Oracle System Identifier (SID)
 - SDU： session data unit 

##### 示例配置
```
SID_LIST_listener_name=
(SID_LIST= 
(SID_DESC=
(SDU=2085)
(GLOBAL_DBNAME=sales.us.acme.com)
(SID_NAME=sales)
(ORACLE_HOME=/usr/oracle)(ENVS="LD_LIBRARY_PATH=/private/xpm/lib:/private/mylibs,MYPATH=/usr/ucb:/usr/local/packages,APL_ENV_FILE=/apl/conf/env.txt")))
```

#### 控制参数部分（基本不需要配置）
```
 - ADMIN_RESTRICTIONS_listener_name #主要用来保护lsnrctl命令下，对没有使用密码保护的listener的更改，设置了on之后，就不允许在命令行动态的更改参数配置，只有stop，start才行。
 - INBOUND_CONNECT_TIMEOUT_listener_name #连接超时
 - LOG_DIRECTORY_listener_name #日志路径
 - LOG_FILE_listener_name #日志名称
 - LOGGING_listener_name #是否记录日志
 - PASSWORDS_listener_name #listener的密码
 - SAVE_CONFIG_ON_STOP_listener_name # 关闭监听的时候是否保存配置
 - SSL_CLIENT_AUTHENTICATION #ssl认证

STARTUP_WAIT_TIME_listener_name
TRACE_DIRECTORY_listener_name
TRACE_FILE_listener_name
TRACE_FILELEN_listener_name
TRACE_FILENO_listener_name
TRACE_LEVEL_listener_name
TRACE_TIMESTAMP_listener_name
WALLET_LOCATION
```


## Docker 修改默认存储位置
> 使用yum安装docker 默认的安装路径在/var/lib/docker这个文件夹下，而在实际生产过程中，我们需要使用自定义的路径进行保存和安装，这里记录一下更改的方法

### 查看docker的基本信息
```
docker info  #查看docker的基本信息
```

### 更改安装路径
####停止docker服务
```
systemctl stop docker
```

#### 备份原目录
```
cp -r /var/lib/docker  /data/app/docker
mv /var/lib/docker /var/lib/docker.bak
ln -s /data/app/docker /var/lib/docker
```

#### 重启docker服务
```
systemctl start docker
```

#### 查看docker信息
```
docker info
```


***
 - [简单离线安装docker](https://blog.csdn.net/ghui23/article/details/82185037?tdsourcetag=s_pctim_aiomsg)
 - [Docker 修改默认存储位置](https://www.jianshu.com/p/5a2ff266b6e9)
 - [docker wnameless/oracle-xe-11g](https://hub.docker.com/r/wnameless/oracle-xe-11g/)
 - [github wnameless](https://github.com/wnameless/docker-oracle-xe-11g)
 - [Oracle listener.ora配置](https://blog.csdn.net/wang77777/article/details/84369248)


关键字
docker 离线安装 centos