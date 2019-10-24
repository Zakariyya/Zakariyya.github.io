---
title: Gogs, GitLab 如何恢复repository
date: 2019-10-24 10:57:15
tag: 搭建 Git
categories: 搭建
---

## 自建Git 数据库丢失

1. 进入git的repository目录，将其中某个project，重命名为其它名字，比如 **赚了100万.git** 改名为 **赚了100万.git.11 **
1. 打开gogs控制台，创建 **赚了100万项目**
1. 删除目录中刚刚创建的 **赚了100万.git** ，将 **赚了100万.git.11** 再改为 **赚了100万.git**
1. 在本地 **clone 赚了100万.git**，如果之前已经有了，可以跳过这一步
1. 随意修改某一文件，提交到origin
1. 刷新gogs控制台，你会发现一切又都回来了（如果你的项目很多的话，恩。。。写个for循环吧）



## GIT拉出错误-远程对象已损坏
> [GIT pull error - remote object is corrupted]((https://stackoverflow.com/questions/4170317/git-pull-error-remote-object-is-corrupted))

eg
```
Cloning into 'Allcloud'...
remote: Counting objects: 36, done.
remote: fatal: Out of memory, malloc failed (tried to allocate 185646833 bytes)
remote: aborting due to possible repository corruption on the remote side.
fatal: protocol error: bad pack header
```

```
$ git pull

remote: fatal: object 21f3981dd35fccd28febabd96f27241eea856c50 is corrupted
error: git upload-pack: git-pack-objects died with error.
fatal: git upload-pack: aborting due to possible repository corruption on the remote side.
remote: aborting due to possible repository corruption on the remote side.
fatal: protocol error: bad pack header
```

### 解决

> [Git indexing fails due to bad pack header](https://confluence.atlassian.com/display/FISHKB/Git+indexing+fails+due+to+bad+pack+header)

这确实可能是内存问题，并且要确保我们在这里不会丢失解决方案：
```
git config --global pack.windowMemory "100m"
git config --global pack.SizeLimit "100m" 
git config --global pack.threads "1"
```
> 有人说 git config --global pack.window "0" 也可以

#### 原因

Git克隆在克隆存储库时压缩数据，

在接收数据/文件之前，它将压缩服务器内存上的数据。

如果服务器内存不足，则打包对象时会出现上述错误

您可以通过使git克隆存储库而不用以下方法打包服务器上的对象来解决此问题。

git config --global pack.window "0"

***
[gogs: 如何恢复repository](https://www.cnblogs.com/ilovewindy/p/6700867.html)
[GIT拉出错误-远程对象已损坏](https://stackoverflow.com/questions/4170317/git-pull-error-remote-object-is-corrupted)

