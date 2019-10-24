---
title: Github进行fork后与原仓库同步
date: 2019-06-11 18:04:23
tags: git
categories: Program 
---

## 问题场景

新公司要求所有的代码提交都要先通过自己的库提交到主repo上去，所以先在gitlab网页上fork出一个自己的库，在本地修改完代码后提交到远程自己库上，然后在gitlab网页上发起一个merge request请求，然后等待主repo主人review，同意之后合入。

**问题是同时也有其他同学在主repo合入代码，所以我要定期和主repo保持同步。**

### 开始我的想法

gitlab网页上提供了git pull这样的按钮，这样点一下就能让自己fork的库和原始库保持同步。然后自己在本地git pull，就能间接和原始的库保持同步。

但是我没找到这个按钮。但是我找到了下面这篇文章，照着操作之后，一步一步跟踪观察发现，每一步都能成功。

#### 整体思路如下
1. 在自己的本地添加主repo为上游代码库，注意只是配置原仓库的路径，并没有真正clone原仓库
1. 然后将远程主repo同步到自己本地的机器
1. 然后本地的机器再push到自己的远程的fork库
1. 所有的操作都要在本地命令行完成

## 下面是我转载的，照着这个操作，完全没问题

我们在进行Github协同开发的时候，往往会去fork一个仓库到自己的Github中，过一段时间以后，原仓库可能会有各种提交以及修改，很可惜，Github本身并没有自动进行同步的机制，这个需要我们手动去执行，

现在我来演示一下如何进行自己的仓库和原仓库进行Gith同步的操作。

1. 我使用终端 命令行的方式在Mac中来操作。首先在终端中配置原仓库的位置。进入项目目录，执行如下命令：查看你的远程仓库的路径。
```sh
$ git remote -v

origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
```
1. 配置原仓库的路径：下面这步操作即添加主repo为上游代码库。
**注意一定要cd到你自己fork出来的库里面去，比如工程名叫 luoluo，那要先 cd 到 luoluo 中去，然后才能操作**
```sh
$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```
1. 再次查看远程目录的位置
```sh
$ git remote -v

origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY (fetch)
upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY (push)
```
1. 抓取原仓库的修改文件
```sh
$ git fetch upstream

From https://github.com/Zakariyya/symphony
 * [new branch]          3.6.0-dev  -> upstream/3.6.0-dev
 * [new branch]          master     -> upstream/master

```
1. 切换到master分支
```sh
$ git checkout master

Switched to branch 'master'
```
1. 合并远程的master分支
**下面这行代码执行结束之后，本地代码会立刻和主库保持同步，非常神奇**
```sh
$ git merge upstream/master

Updating a422352..5fdff0f
Fast-forward
 README				|	9 ------
 REAME.md			|   7 ++++
 2 files changed, 7 insertions(+), 9 deletons(-)
 delete mode 100644 REAME
 create mode 100644 README.md
```
1. 此时，你的本地库已经和原仓库已经完全同步了。
但是注意，此时只是你电脑上的本地库和远程的github原仓库同步了，你自己的github仓库还没有同步，
此时需要使用 **git push** 命令把你本地的仓库提交到github中。

***

其实(4)(5)(6)可以合并成一条命令
```
git pull upstream master
```
 - 第一个参数pustream 表示远程主repo
 - 第二个参数master 表示自己fork库的master分支

这个是公司文档上写的，并不是从网上找来的
为了说清楚这个问题，亲自做了一张图

```
 __________________________________________________________________
 | gitlab                                                          |
 |                                                                 |
 |   __________                                     __________     |
 |  |          |         fork                      |          |    |
 |  | 主 repo  |---------------------------------> |  My repo |    |
 |  |__________|                                   |__________|    |
 |_______|____________________________________________| __ ^ ______|
         |                                            |    |
         |                                       Pull |    |
 _______ > __________________________________________ > __ | _________
 |                                                                    |
 | local                                                              |
 |                                                                    |
 |   __________                                       ______________  |
 |  |          |  git remote add upstream https://   |              | |
 |  | upstream | <-----------------------------------| Local master | |
 |  |__________|-----------------------------------> |______________| |
 |               git pull upstream master                             |
 |____________________________________________________________________|


```


***
参考：
- [Github进行fork后如何与原仓库同步](https://blog.csdn.net/matrix_google/article/details/80676034)