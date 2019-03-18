---
title: git tag
date: 2019-01-27 16:04:23
tags: git
categories: Program 
---

## 基本 git tag 常用命令
### 查看tag列表
```sh
git tag # 展示出当前仓库所有的tag
git tag -l 'v1.0*' # 搜索并展示出v1.0开头的tag
```
### 增加（“打”）tag
```sh
git tag test # 创建轻量tag
git tag -a 'v1.0.0' -m "1.0.0版本" # 创建附注tag，参数a即annotated的缩写，指定Tag类型，后附Tag名。参数m指定Tag说明，说明信息会保存在Tag对象中。
```
### 切换tag
```sh
git checkout test # 切换到 test tag
git branch <branch name> <tag name> #在tag点上创建分支
```
### 查看某个tag信息
```sh
git show test # 查看test tag的版本信息
```
### 删除某个tag
```sh
git tag -d test # 删除test tag
```
### 给指定的commit打Tag
打Tag不必要在head之上，也可在之前的版本上打，这需要你知道某个提交对象的校验和（通过git log获取）。
注意：需要填写保存信息并输入:wq
```sh
git tag -a v1.0.1 sd74d5s7
```
### tag推送远程仓库
通常的git push不会将Tag对象提交到git服务器
```sh
git push origin –-tags # 将本地所有Tag提交到远程仓库
```
### 重命名
```sh
git tag new old
git tag -d old
git push origin :refs/tags/old
git push --tags
```

## 仓库常用命令
```sh
查看远程仓库：$ git remote -v
添加远程仓库：$ git remote add [name] [url]
删除远程仓库：$ git remote rm [name]
修改远程仓库：$ git remote set-url --push [name][newUrl]
拉取远程仓库：$ git pull [remoteName] [localBranchName]
推送远程仓库：$ git push [remoteName] [localBranchName]
```
## 远程创建分支
```sh
git push origin 本地:远程     
git push origin test:test  //eg 注意，操作不当会覆盖掉远程现有分支 
```

