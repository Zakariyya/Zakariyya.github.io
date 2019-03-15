---
title: SpringCloud 的 Eureka
date: 2019-01-24 16:04:23
tags: spring SpringCloud Eureka
categories: java Program
---
# Eureka 注册中心三种角色

## Eureka Server
通过 Register、Get、Renew 等接口提供服务和发现

## Application Server(Service Provider)
服务提供方，把自身的服务实例注册到 **Eureka Server** 中

## Application Client(Service Consumer)
服务调用方，通过**Eureka Server**获取服务列表，消费服务



