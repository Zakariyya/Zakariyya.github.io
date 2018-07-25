https://cloud.tencent.com/developer/labs/lab/10134



1. 准备域名
任务时间：15min ~ 20min

域名注册
如果您还没有域名，可以在腾讯云上选购，过程可以参考下面的视频：

视频 - 在腾讯云上购买域名
域名解析
域名购买完成后, 需要将域名解析到实验云主机上，实验云主机的 IP 为：

<您的 CVM IP 地址>
在腾讯云购买的域名，可以到控制台添加解析记录，过程可参考下面的视频：

视频 - 如何在腾讯云上解析域名
域名设置解析后需要过一段时间才会生效，通过 ping 命令检查域名是否生效 [?]，如：

ping www.yourdomain.com
如果 ping 命令返回的信息中含有你设置的解析的 IP 地址，说明解析成功。


注意替换下面命令中的 www.yourdomain.com 为您自己的注册的域名

2.安装 Seafile 服务器
任务时间：15min ~ 20min

安装依赖环境
在 Debian/Ubuntu 系统下，可以使用以下命令安装 MySQL：

sudo apt-get update
sudo apt-get install mysql-server
使用以下命令安装 Python 相关依赖：

sudo apt-get install python2.7 python-setuptools python-imaging python-ldap python-mysqldb python-memcache python-urllib3
安装 MySQL 过程需要为 MySQL 的 root 用户设置新密码，请记住该[密码]以供后面步骤使用。

为 Seafile 创建一个用户
创建 Seafile 用户，使用它运行 Seafile 服务：

sudo useradd -m -s /bin/bash seafile
为该用户设置密码：

sudo passwd seafile
下载Seafile
切换到新用户，需要输入你刚才为seafile用户设置的密码：

su - seafile
切换目录：

cd ~
这里可以查看获取最新 Seafile 下载链接，参考以下命令进行下载。

wget http://seafile-downloads.oss-cn-shanghai.aliyuncs.com/seafile-server_6.1.1_i386.tar.gz
解压:

tar -xzf seafile-server_*
mv seafile-server-*/ seafile-server/
配置 Seafile
运行Seafile设置脚本，并回答预设问题：

cd seafile-server*
./setup-seafile-mysql.sh
执行过程输入参数如下图：

其中：

[ This server's ip or domain ] 字段输入教程第一步申请的域名或者IP地址（<您的 CVM IP 地址>）。
mysql 的 [ root password ] 字段输入数据库密码。
其他字段一路回车使用默认值。


启动 Seafile
./seafile.sh start
./seahub.sh start
执行过程输入参数如截图所示，其中 [ admin email ] 设置为您登录网盘的帐号，如 admin@qcloudlab.wang。

[ admin password ] 和 [ admin password again ] 设置为登录网盘的密码，如 admin_Password：



大功告成！
恭喜，您的 Seafile 已经部署完成，您现在拥有专属的网盘了，登录的帐号密码为您启动 Seafile 步骤中设置的邮箱和密码。

可以通过 IP 访问网盘：http://<您的域名>:8000