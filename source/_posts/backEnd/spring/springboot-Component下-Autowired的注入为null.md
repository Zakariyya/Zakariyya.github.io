---
title: Springboot @Component下@Autowired的注入为null【转】
date: 2018-08-23 16:17:39
tags: springboot
categories: backEnd
---

> 原文： [SpringBoot在自定义类中调用service层等Spring其他层](https://blog.csdn.net/georgeshaw1/article/details/74943089)

自定义类时，出现**@Autowired**下的层出现空指针异常。

## 背景
做了一个TCP服务器来接入智能设备，然后需要将设备实时发送的定位等关键信息存储到数据库。为了考虑将来可能对外提供rest接口，采用将TCP服务器集成到SpringBoot框架，当然，也是为了能最快利用mybatis框架实现数据访问，然后依次解决了如何启动，如何注销等各种问题，然后在TCP服务器消息处理时，需要写数据库，直接调用DAO层，编译报错。改为调用Service层，编译正常，运行到调用的地方，报空指针异常，跟踪到异常位置，发现service为空，也就是按照之前controller层通过@Autowired注入service层失效。 

## 解决方案

```java
@Component
public class ServerHandler extends IoHandlerAdapter {
    @Autowired
    protected HealthDataService healthDataService;
    private static ServerHandler  serverHandler ;
    @PostConstruct //通过@PostConstruct实现初始化bean之前进行的操作
    public void init() {  
        serverHandler = this;  
        serverHandler.healthDataService = this.healthDataService;        
        // 初使化时将已静态化的testService实例化
    }  
    //测试调用
    public void test(){
        serverHandler .healthDataService.你的service层方法;
        //
    }
```

## 说明

 - 将需要调用Spring的Service层的类通过@Component注解为组件加载； 
 - 同样通过@Autowired获取Service层的Bean对象； 
 - 为类声明一个静态变量，方便下一步存储bean对象； 
 - **划重点：通过注解 @PostConstruct ，在初始化的时候初始化静态对象和它的静态成员变量healthDataService，原理是拿到service层bean对象，静态存储下来，防止被释放。**

## 那些趟过的坑 
刚开始调用的时候，总觉得很简单，以前springmvc写个配置，将对象标注为bean就可以随意调用Spring IOC容器的beans了，但是这是SpringBoot，估计还是有区别，依次试验了百度出来的前三页帮助，基本没有成功的。包括： 
 - 将工具类申明为spring组件，如**@controller** **@compent** 等，在spring自动扫描包设置中将工具类所在的包加进来； 无效 
 - new一个service； 无效； 
等等！

> 以上为原文转载，再次感谢原文作者分享： [SpringBoot在自定义类中调用service层等Spring其他层](https://blog.csdn.net/georgeshaw1/article/details/74943089)