---
title: 命令行下安装 oracle 11gR2 数据库
date:  2019.01.17 15:36
tags: linux centos oracle databases
categories: 系统 Linux
---

# Centos linux系统 命令行（静默）安装oracle 11gR2
> [参考](http://www.cnblogs.com/yingsong/p/6031235.html?tdsourcetag=s_pctim_aiomsg)

## 修改 hostname db / hosts文件
```
10.10.0.48   db
```

## 修改内核参数
### /etc/sysctl.conf
```sh
#vim /etc/sysctl.conf  
net.ipv4.ip_local_port_range= 9000 65500 
fs.file-max = 6815744 
kernel.shmall = 10523004 
kernel.shmmax = 6465333657 
kernel.shmmni = 4096 
kernel.sem = 250 32000 100128 
net.core.rmem_default=262144 
net.core.wmem_default=262144 
net.core.rmem_max=4194304 
net.core.wmem_max=1048576 
fs.aio-max-nr = 1048576
# sysctl -p  #使配置生效

```

### 用户的限制文件/etc/security/limits.conf 
```sh
oracle           soft    nproc           2047
oracle           hard    nproc           16384
oracle           soft    nofile          1024
oracle           hard    nofile          65536
oracle           soft    stack           10240
```
> 修改/etc/pam.d/login文件，增加如下：

```sh
session  required   /lib64/security/pam_limits.so  //64为系统，千万别写成/lib/security/pam_limits.so，否则导致无法登录
session  required   pam_limits.so
```

## 创建用户及组
```
//创建用户及组
# groupadd oinstall 
# groupadd dba
# useradd -g oinstall -G dba -d /home/u11 oracle
# passwd oracle

//创建安装目录
# mkdir -p /opt/app/oracle/product/11.2.0/db_1

//数据文件存放目录
# mkdir -p /opt/app/oracle/oradata

//数据恢复目录
# mkdir -p /opt/app/oracle/recovery_area

//数据库创建及使用过程中的日志目录
# mkdir -p /opt/app/oracle/oraInventory

####################

//修改安装目录权限
#chown -R oracle:oinstall /opt/app/oracle
#chmod 775 /opt/app/oracle
```


## 登录oracle用户，设置环境变量
```
#su - oracle
```
view .bash_profile //这里我修改为/etc/profile
```sh
export ORACLE_BASE=/opt/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/11.2.0/db_1
export PATH=$PATH:$ORACLE_HOME/bin

export CLASSPATH=$ORACLE_HOME/JRE:$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib64:/usr/lib64:/usr/local/lib64
export ORACLE_SID=cgw

//如果设置NLS_LANG，容易产生导入sql或dmp出错，因为其他环境下的不是utf8
export NLS_LANG=AMERICAN_AMERICA.AL32UTF8

//监听服务创建是为了后面静默安装用的
export DISPLAY=127.0.0.1:1.0 
```
使设置生效
```
source .bash_profile // 我为 /etc/profile
```

## 安装oracle
### 安装依赖包

```
# yum -y install gcc gcc-c++ make binutilscompat-libstdc++-33 elfutils-libelf elfutils-libelf-develglibc glibc-commonglibc-devel libaio libaio-devel libgcclibstdc++libstdc++-devel unixODBC unixODBC-devel ksh
```
或
```
# yum -y installbinutils compat-libstdc++-33 compat-libstdc++-33.i686 
elfutils-libelfelfutils-libelf-devel gcc gcc-c++ glibc glibc.i686 glibc-common 
glibc-devel glibc-devel.i686glibc-headers ksh libaio libaio.i686 libaio-devel 
libaio-devel.i686 libgcclibgcc.i686 libstdc++ libstdc++.i686 libstdc++-devel make 
sysstat unixODBC unixODBC-devel
```
### 解压安装包
> unzip 两个包，在oracle用户下在 /home/u11 下面

### 数据库安装
> 路径： /databases/response

- db_install.rsp 安装应答配置文件
- dbca.rsp 创建数据库应答
- netca.rsp 建立监听、本地服务名等网络设置应答

#### 修改配置文件db_install.rsp，并安装
> 下面把主要修改的地方贴出来，具体详细文件，请查看另一篇文章：[Oracle 11gR2 db_install.rsp详解](http://www.cnblogs.com/yingsong/p/6031452.html)

```sh
oracle.install.option=INSTALL_DB_SWONLY
ORACLE_HOSTNAME=db
UNIX_GROUP_NAME=oinstall
INVENTORY_LOCATION=/opt/app/oracle/oraInventory
SELECTED_LANGUAGES=en,zh_CN
ORACLE_HOME=/opt/app/oracle/product/11.2.0/db_1
ORACLE_BASE=/opt/app/oracle
oracle.install.db.InstallEdition=EE
oracle.install.db.DBA_GROUP=dba
oracle.install.db.OPER_GROUP=oinstall
oracle.install.db.config.starterdb.characterSet=AL32UTF8
oracle.install.db.config.starterdb.storageType=FILE_SYSTEM_STORAGE
oracle.install.db.config.starterdb.fileSystemStorage.dataLocation=/opt/app/oracle/oradata
oracle.install.db.config.starterdb.fileSystemStorage.recoveryLocation=/opt/app/oracle/recovery_data
DECLINE_SECURITY_UPDATES=true    //一定要设为true
```
> 报错：[DISPLAY environment variable not set! Oracle Net Configuration Assistan](http://blog.51cto.com/linuxzqdn/1751651) .处理：export DISPLAY=127.0.0.1:1.0 (上面已经处理了)

### 登录oracle用户，执行安装
在解压路径下：/database/response路径下
```sh
./runInstaller -silent -responseFile /home/u11/database/response/db_install.rsp 
## 安装过程中，如果提示[WARNING]不必理会，此时安装程序仍在进行，如果出现[FATAL]，则安装程序已经停止了。
## 打开另一个终端，执行命令
tail -100 f /u01/app/oracle/oraInventory/logs/installActions......log
 

## 可以实时跟踪查看安装日志，了解安装的进度。
## 当出现


  以下配置脚本需要以 "root" 用户的身份执行。
   #!/bin/sh
   #要运行的 Root 脚本

  /u01/app/oracle/oraInventory/orainstRoot.sh
  /u01/app/oracle/product/11.2.0/db_1/root.sh
  要执行配置脚本, 请执行以下操作:
     1. 打开一个终端窗口
     2. 以 "root" 身份登录
     3. 运行脚本
     4. 返回此窗口并按 "Enter" 键继续

  Successfully Setup Software.

 

## 出现这个的话，说明已安装成功，则需要按提示操作，操作完返回Enter成功
```

####  缺包
> [Error: libXext.so.6: cannot open shared object file: No such file or directory](https://stackoverflow.com/questions/29741518/error-libxext-so-6-cannot-open-shared-object-file-no-such-file-or-directory)

```
yum install libXext.x86_64 libXrender.x86_64 libXtst.x86_64
```

#### 静默安装Oracle 11g过程中提示：Exception in thread "main" java.lang.NoClassDefFoundError
> https://my.oschina.net/siiiso/blog/809173
```
unset DISPLAY
```

### 配置监听配置文件 response/netca.rsp
- 命令netca path：$ORACLE_HOME/bin
- netca.rsp path: /home/u11/database/response/netca.rsp

```sh
netca -silent -responsefile response/netca.rsp

正在对命令行参数进行语法分析:
 参数"silent" = true
 参数"responsefile" = /home/oracle/response/netca.rsp
 完成对命令行参数进行语法分析。
 Oracle Net Services 配置:
 完成概要文件配置。
 Oracle Net 监听程序启动:
  正在运行监听程序控制:
    /opt/oracle/11.2.0/bin/lsnrctl start LISTENER
  监听程序控制完成。
  监听程序已成功启动。
 监听程序配置完成。
 成功完成 Oracle Net Services 配置

## 成功运行后，在/opt/oracle/11.2.0/network/admin目录下生成sqlnet.ora和listener.ora两个文件。
## 完成后通过命令“netstat -tlnp”可以查看到1521端口已开
tcp  0   0 :::1521        :::*      LISTEN      5477/tnslsnr
```

### 修改配置文件response/dbca.rsp，静默建立新库
```sh
 RESPONSEFILE_VERSION = "11.2.0"  ## 不能更改
 OPERATION_TYPE = "createDatabase"
 GDBNAME = "hello.dlxg.gov.cn"  ## 全局数据库的名字=SID+主机域名
 SID = "hello"    ## 对应的实例名字
 TEMPLATENAME = "General_Purpose.dbc" ## 建库用的模板文件
 DATAFILEDESTINATION = /opt/oracle/oradata ## 数据文件存放目录
 RECOVERYAREADESTINATION=/opt/oracle/recovery_data ## 恢复数据存放目录
 CHARACTERSET = "AL32UTF8"   ## 字符集，重要!!! 建库后一般不能更改，所以建库前要确定清楚。
 TOTALMEMORY = "5120"    ## oracle内存5120MB
```
#### 配置完之后，执行命令

```sh

dbca -silent -responseFile /etc/dbca.rsp 
## 注意，这里我用的时候很奇怪，界面光标往回走的，我改用这个，这个就没有使用上面的配置文件
dbca -silent -createDatabase -templateName General_Purpose.dbc -gdbName test -sysPassword oracle -systemPassword oracl

1% 已完成
3% 已完成
11% 已完成
18% 已完成
26% 已完成
37% 已完成
正在创建并启动 Oracle 实例
40% 已完成
45% 已完成
50% 已完成
55% 已完成
56% 已完成
60% 已完成
62% 已完成
正在进行数据库创建
66% 已完成
70% 已完成
73% 已完成
85% 已完成
96% 已完成
100% 已完成
有关详细信息, 请参阅日志文件 "/u01/app/oracle/cfgtoollogs/dbca/wang/wang.log"。
 
查看日志文件
$ cat /u01/app/oracle/cfgtoollogs/dbca/wang/wang.log
```

### ORA-12528: TNS Listener: all appropriate instances are blocking new connections. Instance “CLRExtProc”, status UNKNOWN
> https://stackoverflow.com/questions/23743910/ora-12528-tns-listener-all-appropriate-instances-are-blocking-new-connections

```
set ORACLE_SID=<YOUR_SID> 
sqlplus "/as sysdba"
alter system disable restricted session;

eg : set ORACLE_SID=oracle
```
or maybe
```
shutdown abort;
```
or maybe
```
lsnrctl stop
lsnrctl start
```

## 登陆连接
- sid:oracle
- username: system
- password: oracle

## navicat connect oracle fail
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



 - [Oracle listener.ora配置](https://blog.csdn.net/wang77777/article/details/84369248)
 - [docker wnameless/oracle-xe-11g](https://hub.docker.com/r/wnameless/oracle-xe-11g/)
 - [github wnameless](https://github.com/wnameless/docker-oracle-xe-11g)
