---
title: maven项目jar包导入失败
date:  2017.08.22 09:38
tags: maven
categories: Program
---

eclipse中导入maven项目时，从仓库中下载jar包失败。
提示缺失jar包
cmd  maven install 命令
```
Maven 安装 JAR 包的命令是：
mvn install:install-file -Dfile=jar包的位置 -DgroupId=上面的groupId -DartifactId=上面的artifactId -Dversion=上面的version -Dpackaging=jar
```
eg:
```
mvn install:install-file -Dfile=c:/Access_JDBC30.jar -DgroupId=com.hxtt -DartifactId=Access_JDBC30 -Dversion=1.0 -Dpackaging=jar
```
***
#参考
##将jar包安装到本地repository中
```
mvn install:install-file -Dfile=my-jar.jar -DgroupId=org.richard -DartifactId=my-jar -Dversion=1.0 -Dpackaging=jar
```
在http://mvnrepository.com/中找到对应的jar：
以 [spring](http://lib.csdn.net/base/javaee)-context-support-3.1.0.RELEASE.jar 为例，在 @3图中已经给出这个 jar 包的 groupId，artifactId，version信息，
手动安装的时候这些信息不要改，否则 Maven 项目移植的话，jar 包下载就会失败。顺便把这信息帖下面，方便对照：
```
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context-support</artifactId>
    <version>3.1.0.RELEASE</version>
</dependency>
```

***
参考来自
[向maven仓库中手动安装本地jar的三种方法 - - CSDN博客](http://blog.csdn.net/superit401/article/details/51567646)
