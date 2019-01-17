---
title: Offline Installation Docker
date:  2019.01.11 10:46
tags: linux docker Oracle Ubuntu
categories: 系统 Linux
---

## Offline Installation Docker

[download docker .tar.gz](https://download.docker.com/linux/static/stable/x86_64/) and follow  the doucment

1. Download the statis binary archive. Go to http://download.docker.com/linux/static/stabl
(or change stable to edge or test), choose your hardware platform, and download the **.taz** file relating to the version of Docker CE you want to install.
1. Extract the archive using the tar utility. The dockerd and docker binaries are ectracted.
```
tar zxvf /path/to/<FILE>.tar.gz
```
1. Optional: Move the biaries to a directory on your executable path, such as ** /usr/bin/ ** . If you skip this step, you must provide the path to the executable when you invoke ** docker ** or  ** dockerd ** commands.
```
sudo cp docker/* /usr/bin/
```
1. Start the Docker daremon:
```
sudo dockerd &
```

If you need to start the daemon with additional options, modify the above command accordingly or create and edit the file ** /etc/docker/daemon.json ** to add the custom configuration options.


## DockerHub sreach oracle
> warning: Step1 is online , Step2 is offline install docker

### Step 1 docker pull
```
docker pull wnameless/oracle-xe-11g
```
> [wnameless/oracle-xe-11g](https://hub.docker.com/r/wnameless/oracle-xe-11g/)

Just being bored like this, here is "offline install " 

### Step 2 cloning the project [wnameless/oracle-xe-11g](https://github.com/wnameless/docker-oracle-xe-11g) on github
1. find the file( ** dockerfile ** )location, exec command then waiting
```
docker build .
```
1. start command (in github readme)
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

### Step 3 copy the image with other PC
you can exec the Step1 and then save the image with other PC, copy into the target PC, save the image
```
docker images ## show the images list
docker save -o <save /path/file name.tar>  <image name> 

eg : docker save -o /opt/oracle.tar  wnameless/-oracle-xe-11g:v1
```

Target PC
```
docker load < /home/save.tar>

eg: docker load /opt/oracle.tar
```
> docker command ** save ** and ** load ** ,
 ** export ** and ** import ** ,
save is used for image, no container.
export is used for container, no image.

## Docker modify the default path
> use yum install the docker ,the default path is: /var/lib/docker . In fact, we need custom path into save and install it. 

在硬盘上开一个100g大小的空间，并格式化，参考命令：mkfs.ext4 /dev/sda2 ，然后挂载。如果不明白如何分区格式化并且挂载，请看考[这里](https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Disks)。这篇文章可以说是我见过关于初级磁盘管理最好的一篇文章了。
挂载之后复制文件夹/var/lib/docker/ 到挂载的位置，再软连接回去。（然后docker images就可以持久化放到硬盘里面了重启不会丢失）。参考操作如下：

### 查看docker的基本信息
```
docker info  #查看docker的基本信息
```

### 更改安装路径
#### 停止docker服务
```
systemctl stop docker
```

#### 备份原目录
```
cp -r /var/lib/docker  /data/app/docker
mv /var/lib/docker /var/lib/docker.bak
ln -s /data/app/docker /var/lib/docker
```
或者
```
cp -rf /var/lib/docker /mnt/
rm -rf /var/lib/docker
ln -s /mnt/docker /var/lib/docker
```
#### 重启docker服务
```
systemctl start docker
```
#### 查看docker信息
```
docker info
```

## Docker 持久化

### 容器中数据持久化主要有两种方式：

 - 数据卷（Data Volumes）
 - 数据卷容器（Data Volumes Dontainers）

#### 数据卷
数据卷是一个可供一个或多个容器使用的特殊目录，可以绕过UFS（Unix File System）。

 - 数据卷可以在容器之间共享和重用
 - 对数据卷的修改会立马生效
 - 对数据卷的更新，不会影响镜像
 - 数据卷默认会一直存在，即使容器被删除
 - 一个容器可以挂载多个数据卷

> 注意：数据卷的使用，类似于 Linux 下对目录或文件进行 mount。

##### 创建数据卷
示例：

```
docker run --name nginx-data -v /mydir nginx
```
执行如下命令即可查看容器构造的详情：
```
docker inspect 容器ID
```
由测试可知
- Docker会自动生成一个目录作为挂载的目录。
- 即使容器被删除，宿主机中的目录也不会被删除。

##### 删除数据卷
数据卷是被设计来持久化数据的，因此，删除容器并不会删除数据卷。如果想要在删除容器时同时删除数据卷，可使用如下命令
```
docker rm -v 容器ID
```
这样既可在删除容器的同时也将数据卷删除。

##### 挂载宿主机目录作为数据卷
```
docker run --name nginx-data2 -v /host-dir:/container-dir nginx
```
这样既可将宿主机的/host-dir路径加载到容器的/container-dir中。

需要注意的是：

 - 宿主机路径尽量设置绝对路径——如果使用相对路径会怎样？
  - 测试给答案
 - 如果宿主机路径不存在，Docker会自动创建

##### TIPS
> Dockerfile暂时不支持这种形式。

##### 挂载宿主机文件作为数据卷
```
docker run --name nginx-data3 -v /文件路径:/container路径 nginx
```

#### 指定权限
> 默认情况下，挂载的权限是读写权限。也可使用:ro 参数指定只读权限。

示例
```
docker run --name nginx-data4 -v /host-dir:/container-dir:ro nginx
```
这样，在容器中就只能读取/container-dir中的文件，而不能修改了。

### 数据卷容器
> 如果有数据需要在多个容器之间共享，此时可考虑使用数据卷容器。

创建数据卷容器
```
docker run --name nginx-volume -v /data nginx
```
在其他容器中使用** -volumes-from ** 来挂载** nginx-volume ** 容器中的数据卷。
```
docker run --name v1 --volumes-from nginx-volume nginx
docker run --name v2 --volumes-from nginx-volume nginx
```
这样
 - v1、v2两个容器即可共享nginx-volume这个容器中的文件。
 - 即使nginx-volume停止，也不会有任何影响。


***
## Tips / Reference: docker, 离线安装, centos, ubuntu, linux
 - [简单离线安装docker](https://blog.csdn.net/ghui23/article/details/82185037?tdsourcetag=s_pctim_aiomsg)
 - [从二进制文件安装Docker CE](https://docs.docker.com/install/linux/docker-ce/binaries/)

 - [Docker 修改默认存储位置](https://www.jianshu.com/p/5a2ff266b6e9)
 - [CoreOS 在 PC 上快速安装方法指南](http://www.runoob.com/w3cnote/coreos-setup-pc.html)
 - [Preparing the disks](https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Disks)

 - [docker wnameless/oracle-xe-11g](https://hub.docker.com/r/wnameless/oracle-xe-11g/)
 - [github wnameless](https://github.com/wnameless/docker-oracle-xe-11g)
 
 - [docker save load export import的区别](https://blog.csdn.net/guizaijianchic/article/details/78324646)

 - [Docker系列教程14-Docker数据持久化](http://www.itmuch.com/docker/14-docker-volume/)
