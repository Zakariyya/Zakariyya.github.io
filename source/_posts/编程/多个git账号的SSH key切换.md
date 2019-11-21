---
title: 多个git账号的SSH key切换
date: 2019.11.21 15:21
tags: git ssh
categories: 编程
---

> 摘自：[多github帐号的SSH key切换](https://www.jianshu.com/p/c596d584ed82)

## 大纲
1. 根据需要创建两个别名的**ssh key**
1. 新密钥添加到SSH agent中
1. 创建 config 配置文件
1. 分别测试

## 细节
### 创建 ssh key 时起个名字

不要一路回车了，给这个文件起一个名字 不然默认的话就覆盖了之前生成的第一个
```sh
$ ssh-keygen -o -t rsa -b 4096 -C "rabbitucute@facebook.com"

Generating public/private rsa key pair.

( 起个名字 ) Enter file in which to save the key (/c/Users/anan/.ssh/id_rsa): facebook 


Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in facebook.
Your public key has been saved in facebook.pub.
The key fingerprint is:
SHA256:fYY3j8+sQocxaCUw2O2AhknZhnww9RNo5dhaNUIDTs4 rabbitucute@facebook.com
The key's randomart image is:
+---[RSA 4096]----+
| o+O+OOoo        |
|  **X=o*o..      |
|   =E *o +       |
|     o .+.o.     |
|    .  .S o+=    |
|          o+.+   |
|         . .. .  |
|          .  +   |
|           ...+  |
+----[SHA256]-----+

```
> 重复操作，分别创建了 **facebook** 和 **google**，得到四个文件

```sh
$ cd .ssh
$ ls

  google
  google.pub
  facebook
  facebook.pub
```

### 新密钥添加到SSH agent中
因为默认只读取id_rsa，为了让SSH识别新的私钥，需将其添加到SSH agent中：
```
ssh-add ~/.ssh/id_rsa_work
```
> 如果出现 **Could not open a connection to your authentication agent** 的错误，就试着用以下命令：
```
ssh-agent bash
ssh-add ~/.ssh/id_rsa_work
```

### 创建 config 配置文件
```
# 该文件用于配置私钥对应的服务器
# Default github user(first@mail.com)

Host facebook.com
 HostName facebook.com
 User git
 IdentityFile C:/Users/Administrator/.ssh/facebook

# second user(second@mail.com) # 建一个github别名，新建的帐号使用这个别名做克隆和更新

Host google
 HostName google.com
 User git
 IdentityFile C:/Users/Administrator/.ssh/google
```

## 测试
```
$ ssh -T git@facebook.com
Hi anan! You've successfully authenticated, but GitHub does not provide shell access.
```





