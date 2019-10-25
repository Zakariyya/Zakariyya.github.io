---
title: 云
date: 2019-05-28 17:25:03
tags: cloud 科普
categories: 科普
---

> 这部分是当初公司让我做 openstack、云概念的分享写的草稿，后来因为时间问题分享黄了。大部分内容是说给非技术人员听的

- more: [青云](https://www.qingcloud.com/solutions)

- [如何通俗的解释云计算 公有云 私有云 混合云？](https://www.zhihu.com/question/35442270)
- [OpenStack文档](https://docs.openstack.org/zh_CN/)
- [docker容器与虚拟机有什么区别？](https://www.zhihu.com/question/48174633)

- [Kubernetes vs OpenStack](https://juejin.im/post/5b953d21f265da0afa3dc61b)

- [什么是公有云、私有云和混合云？](https://azure.microsoft.com/zh-cn/overview/what-are-private-public-hybrid-clouds/)
- [什么是云计算？](https://azure.microsoft.com/zh-cn/overview/what-is-cloud-computing/)

- [分布式与集群是什么 ？ 区别是什么？](https://blog.csdn.net/jiangyu1013/article/details/80417961)

***

## 云计算 公有云 私有云 混合云 

### 服务提供商的由来 云计算
> 资源的动态分配

云计算提出的愿景，是要构建一个自来水厂，而不需要每家每户打井取水，只要通过水管和电线便可享受专业的更高水平的水电服务，且按需付费，若短期突然要大量用水用电，也无需担心资源不足，用多用少可自主决定。

云计算服务提供商建设好大规模的IT基础设施，通过互联网（网线或无线）为企业提供服务器（虚拟机）、存储、应用程序等的租用，企业无需自己再建设IT基础设施，便可享受专业的更高水平的IT服务，且按需付费。

若短期内业务访问量暴增（如双11）需要更多的计算资源，也无需担心云计算服务提供商的资源不足，资源的租用可根据使用情况自动伸缩，企业只需按实际使用量付费即可。

这就是公有云，微软Azure、亚马逊AWS、阿里云、腾讯云便是公有云提供商，提供云计算服务。

### 公有云
公有云顾名思义，它是公开对外销售的。

任何人都可以租用他们的云服务，他们的规模可以做得非常大。亚马逊的AWS服务的年营收高达174.6亿美元，而且还在高速增长中。相应的，这些租用客户的数据存在公有云厂商的服务器上，就会存在着保密问题。

### 私有云
而私有云虽然也是云计算，但是私有云并不对外提供服务。

而是由私有云的所有者自己使用。一般来说，只有对保密性有很高要求，或者本身业务规模比较庞大的机构才会建设私有云。比如政府机构，大型企业集团等。比如我国各地纷纷建立的政务云就是典型的私有云产品。

### 混合云
私有云虽然安全，但是成本还是比较高。

于是另外一种综合了公有云与私有云优点的混合云业务发展起来了。比如铁道部的12306，在高峰时期会租用阿里云来提升自己对外服务的能力，这个时候的12306系统就是一个混合云。
混合云可以做到将保密的核心数据存放在私有云上，而将对外服务提供用户访问的部分放在公有云上。


### 比方
如果用住酒店来描述

- 张三天天住家里，是私有云
- 李四天天住酒店，一般住单间，心情好就换大套间，这叫公有云
- 某一天张三家来了十来个客人，这是业务突增，家里睡不了那么多人，带着大家去酒店开房，这是私有云转公有云。
- 然后王五比较牛叉，在酒店有个固定包间，不对外开放，这是托管型私有云（专有云）。包间就好比云数据中心的托管服务器

> 房间所以按租收费，随意调整大小弹性扩容

随着云计算的流行，很多本来通过互联网提供服务的东西都改名跟云扯上关系，如：

- 网络硬盘改名为**云盘**
- 网站主机改名为**云主机**
- 流媒体改名为**云播放**
- 以及什么**云输入法**
- **云阅读**
- **云音乐**

照这样说的话，一早就有的搜索引擎更加是云计算服务了。
发展趋势：趋向于基础功能免费、高级功能收费。


## OpenStack历史
OpenStack 是**NASA**和**Rackspace**合作研发的云计算软件，以**Apache**授权条款授权，并且是自由和开放源代码软件。

是一系列开源软件项目的组合，这些项目之间是松耦合关系，它们可以独立安装，启动，停止，只有在必要的时候才进行通讯。
- 好处是安全性高，不会存在单点故障
- 缺点是安装和配置比较复杂

OpenStack是基础设施即服务（IaaS）软件，让任何人都可以自行创建和提供云计算服务。
可以是我们以集中的方式有效的管理，CPU，硬盘，内存，网络等这些资源

我们把传统的资源管理方式比作为打井取水的话，那openstack就是自来水厂，让我们以按需的方式获取所需要的资源，而不是每家每户去打一口井，
当然自来水厂，想向每家每户提供自来水，都需要自来水管道一样，openstack它向用户提供计算机资源的基础，就是计算机网络，当然对于绝大公司来说，
目前的网络都不成问题。


## OpenStack是什么? 
OpenStack是一个云操作系统，通过数据中心可控制大型的计算、存储、网络等资源池。所有的管理通过前端界面管理员就可以完成，同样也可以通过web接口让最终用户部署资源。

OpenStack系统由几个关键服务组成，它们可以单独安装。这些服务根据你的云需求工作在一起。
这些服务包括计算服务、认证服务、网络服务、镜像服务、块存储服务、对象存储服务、计量服务、编排服务和数据库服务。可以独立安装这些服务、独自配置它们或者连接成一个整体。

## [OpenStack能做什么](https://www.redhat.com/zh/topics/openstack)

## OpenStack组件

### Horizon(dashboard)
 - 用于管理Openstack各种服务的、基于web的管理接口
 - 通过图形界面实现创建用户、管理网络、启动实例等操作

### Nova
 - 在节点上用于管理虚拟机的服务
 - Nova是一个分布式的服务,能够与Keystone交互实现认证,与Glance交互实现镜像管理
 - Nova被设计成在标准硬件上能够进行水平扩展
 - 启动实例时,如果有需要则下载镜像

### Keystone
 - 为其他服务提供认证和授权的集中身份管理服务
 - 也提供了集中的目录服务
 - 支持多种身份认证模式,如果密码认证、令牌认证、以及AWS(亚马逊Web服务)登陆
 - 为用户和其他服务提供了SSO认证服务

### Neutron
 - 一种软件定义网络服务
 - 用于创建网络、子网、路由器、管理浮动IP地址
 - 可以实现虚拟交换机、虚拟路由器
 - 可用于在项目中创建VPN

### Cinder
 - 为虚拟机管理存储卷的服务
 - 为运行在Nova中的实例提供永久的块存储
 - 可以通过快照进行数据备份
 - 经常应用在实例存储环境中,如果数据库文件

### Glance
 - 扮演虚拟机镜像注册的角色
 - 允许用户为直接存储拷贝服务器镜像
 - 这些镜像可以用于新建虚拟机的模板



## 扩展 - k8s & docker 

> docker(集群 swarm) -> k8s 
[Swarm模式概述](https://docs.docker.com/engine/swarm/)

###  openstack & k8s

openstack  是一个云操作系统，
通过数据中心可控制大型的计算、存储、网络等资源池。所有的管理通过前端界面管理员就可以完成，同样也可以通过web接口让最终用户部署资源。

简单理解: 
- 可以把它类比公有云，它将各种基础资源虚拟化，并提供简化的方式去管理。偏向IAAS服务
- kubenretes 是用于自动部署、扩展和管理容器化（containerized）应用程序的开源系统。简单理解: 容器编排，管理多机的容器状态. 偏向PAAS服务


### kubernetes & spring cloud 
- [Spring Cloud + Kubernetes 微服务框架原理和实践](https://zhuanlan.zhihu.com/p/31670782)
- [部署微服务的时候，Spring Cloud 和 Kubernetes 哪个更好？](http://dockone.io/article/2896)
- [redhat k8s](https://www.redhat.com/zh/topics/containers/what-is-kubernetes)


## 容器 & 虚拟机  
 - [kvm Wikipedia](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine)
 - [kvm arch wiki](https://wiki.archlinux.org/index.php/KVM_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
