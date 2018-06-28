---
title: Spring Boot YML文件配置多环境
date: 2018-06-28 18:10:12
tags: spring
categories: java Program
---

## yml与properties
其实yml和properties文件是一样的原理，且一个项目上要么yml或者properties，二选一的存在。

推荐使用yml，更简洁。

## bootstrap与application
### 加载顺序
这里主要是说明application和bootstrap的加载顺序。

>bootstrap.yml（bootstrap.properties）先加载
application.yml（application.properties）后加载
bootstrap.yml 用于应用程序上下文的引导阶段。

bootstrap.yml 由父Spring ApplicationContext加载。
父ApplicationContext 被加载到使用 application.yml 的之前。

### 配置区别
bootstrap.yml 和application.yml 都可以用来配置参数。

bootstrap.yml 可以理解成系统级别的一些参数配置，这些参数一般是不会变动的。
application.yml 可以用来定义应用级别的，如果搭配 **spring-cloud-config** 使用 application.yml 里面定义的文件可以实现动态替换。
使用**Spring-Cloud-Config-Server**时，应在 bootstrap.yml 中指定：

spring.application.name
spring.cloud.config.server.git.uri
一些加密/解密信息
实例：

bootstrap.yml
```yaml
spring:
  application:
    name: service-a
  cloud:
    config:
      uri: http://127.0.0.1:8888
      fail-fast: true
      username: user
      password: ${CONFIG_SERVER_PASSWORD:password}
      retry:
        initial-interval: 2000
        max-interval: 10000
        multiplier: 2
        max-attempts: 10
```
*** 
## 两种配置方式 1：在一个yml文件中，2：在多个yml文件中

### 一个yml文件
application.yml
```yaml
spring:
  profiles:
    active: dev

---
#开发环境配置
spring:
  profiles: dev

server:
  port: 1000


---
#测试环境配置
spring:
  profiles: stg

server:
  port: 1001


---
#生产环境配置
spring:
  profiles: prd

server:
  port: 1002
```

###  多个yml文件

application.yml

```yaml
spring:
  profiles:
    active: dev
```

application-dev.yml
```yaml
server:
  port: 1000
```
application-stg.yml
```yaml
server:
  port: 1001
```
application-prd.yml
```yaml
server:
  port: 1002
```

