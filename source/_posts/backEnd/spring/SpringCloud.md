---
title: SpringCloud 的 Eureka
date: 2019-02-24 16:04:23
tags: spring SpringCloud Eureka
categories: java Program
---
# Eureka 注册中心三种角色

Eureka 是 Netflix 开发的服务发现组件，本身是一个基于 REST 的服务， SpringCloud将它继承在其子项目 spring-cloud-netflix 中，以实现 Springcloud 的服务注册与发现，同时还提供了负载均衡，故障转移等功能

## Eureka Server
### 单节点
通过 Register、Get、Renew 等接口提供服务和发现
> 通过spring 官网上 [eureka](https://spring.io/projects/spring-cloud-netflix)得到：
任何Spring Boot应用程序**@EnableEurekaClient**都会尝试联系Eureka服务器http://localhost:8761（默认值为 eureka.client.serviceUrl.defaultZone）

要运行您自己的服务器，请pom使用**spring-cloud-starter-netflix-eureka-server**依赖项和在启动类上添加**@EnableEurekaServer**。

```yml
server:
  port: 8761
  servlet:
    context-path: /eureka-server
eureka:
  client:
    register-with-eureka: false # 是否将自己注册到 eureka-server 中，默认为true。否则eureka会一直尝试自己注册自己，导致异常
    fetch-registry: false # 是否从 eureka-server 中获取服务注册信息，默认为true
```
> 不添加配置，会导致**eureka**一直自己注册自己导致启动异常

访问 **http://localhost:8761/eureka-server/** 看到 eureka 服务管理平台

### eureka 集群

在搭建 Eureka 集群时，需要添加多个配置文件，并且使用Springboot的多环境配置方式，集群中需要多少节点就添加多个配置文件

#### 注意：
1. 与单节点不同，配置文件属性**defaultZone**会指向另外一个节点，使得自己跑到指定的节点下注册自己
1. instance.hostname：是自己的主机名，多个节点都有自己的主机名。
1. hostname: eureka1 和 defaultZone 中的 eureka2 

```yml
eureka:
  instance:
    hostname: eureka1  # 设置eureka实例名称，建议与配置文件的变量为主
  client:
    service-url:
      defaultZone: http://eureka2:8761/eureka/  # 设置服务注册中心地址，指向另一个注册中心
```

## Application Server(Service Provider)
服务提供方，把自身的服务实例注册到 **Eureka Server** 中

## Application Client(Service Consumer)
服务调用方，通过**Eureka Server**获取服务列表，消费服务

