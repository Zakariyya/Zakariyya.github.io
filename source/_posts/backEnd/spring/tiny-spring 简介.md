---
title: tiny-spring 简介
date: 2018-03-18 19:50:12
tags: spring
categories: java Program
---

tiny-spring是模拟Spring的一个简单的框架，主要包含如下设计模式：

 -  模板方法模式

该模式大量使用，例如在 BeanFactory 中，把 getBean() 交给子类实现，不同的子类 **BeanFactory** 对其可以采取不同的实现。

 -  代理模式

在tiny-spring 中，ApplicationContext继承了BeanFactory接口，具备了 getBean() 功能，但是又内置了一个BeanFactory实例，getBean()直接调用 BeanFactory的 getBean() 。但是ApplicationContext 加强了 BeanFactory，它把类定义的加载也包含进去了。

 -  策略模式

生成代理对象时，可以使用 JDK 的动态代理和 Cglib 的动态代理，对于不同的需求可以委托给不同的类实现

## tiny-spring IOC构建流程

(节选之tiny-spring的changelog.md)

### 1. step1-最基本的容器

IoC最基本的角色有两个：容器(`BeanFactory`)和Bean本身。这里使用`BeanDefinition`来封装了bean对象，这样可以保存一些额外的元信息。测试代码：

```
// 1.初始化beanfactory
BeanFactory beanFactory = new BeanFactory();

// 2.注入bean
BeanDefinition beanDefinition = new BeanDefinition(new HelloWorldService());
beanFactory.registerBeanDefinition("helloWorldService", beanDefinition);

// 3.获取bean
HelloWorldService helloWorldService = (HelloWorldService) beanFactory.getBean("helloWorldService");
helloWorldService.helloWorld();
```

### 2. step2-将bean创建放入工厂

step1中的bean是初始化好之后再set进去的，实际使用中，我们希望容器来管理bean的创建。于是我们将bean的初始化放入BeanFactory中。为了保证扩展性，我们使用Extract Interface的方法，将`BeanFactory`替换成接口，而使用`AbstractBeanFactory`和`AutowireCapableBeanFactory`作为其实现。"AutowireCapable"的意思是“可自动装配的”，为我们后面注入属性做准备。

```
 // 1.初始化beanfactory
BeanFactory beanFactory = new AutowireCapableBeanFactory();

// 2.注入bean
BeanDefinition beanDefinition = new BeanDefinition();
beanDefinition.setBeanClassName("us.codecraft.tinyioc.HelloWorldService");
beanFactory.registerBeanDefinition("helloWorldService", beanDefinition);

// 3.获取bean
HelloWorldService helloWorldService = (HelloWorldService) beanFactory.getBean("helloWorldService");
helloWorldService.helloWorld();
```

### 3. step3-为bean注入属性

这一步，我们想要为bean注入属性。我们选择将属性注入信息保存成`PropertyValue`对象，并且保存到`BeanDefinition`中。这样在初始化bean的时候，我们就可以根据PropertyValue来进行bean属性的注入。Spring本身使用了setter来进行注入，这里为了代码简洁，我们使用Field的形式来注入。

```
// 1.初始化beanfactory
BeanFactory beanFactory = new AutowireCapableBeanFactory();

// 2.bean定义
BeanDefinition beanDefinition = new BeanDefinition();
beanDefinition.setBeanClassName("us.codecraft.tinyioc.HelloWorldService");

// 3.设置属性
PropertyValues propertyValues = new PropertyValues();
propertyValues.addPropertyValue(new PropertyValue("text", "Hello World!"));
beanDefinition.setPropertyValues(propertyValues);

// 4.生成bean
beanFactory.registerBeanDefinition("helloWorldService", beanDefinition);

// 5.获取bean
HelloWorldService helloWorldService = (HelloWorldService) beanFactory.getBean("helloWorldService");
helloWorldService.helloWorld();
```

### 4. step4-读取xml配置来初始化bean

这么大一坨初始化代码让人心烦。这里的`BeanDefinition`只是一些配置，我们还是用xml来初始化吧。我们定义了`BeanDefinitionReader`初始化bean，它有一个实现是`XmlBeanDefinitionReader`。

```
// 1.读取配置
XmlBeanDefinitionReader xmlBeanDefinitionReader = new XmlBeanDefinitionReader(new ResourceLoader());
xmlBeanDefinitionReader.loadBeanDefinitions("tinyioc.xml");

// 2.初始化BeanFactory并注册bean
BeanFactory beanFactory = new AutowireCapableBeanFactory();
for (Map.Entry<String, BeanDefinition> beanDefinitionEntry : xmlBeanDefinitionReader.getRegistry().entrySet()) {
        beanFactory.registerBeanDefinition(beanDefinitionEntry.getKey(), beanDefinitionEntry.getValue());
}

// 3.获取bean
HelloWorldService helloWorldService = (HelloWorldService) beanFactory.getBean("helloWorldService");
helloWorldService.helloWorld();
```

### 5. step5-为bean注入bean

使用xml配置之后，似乎里我们熟知的Spring更近了一步！但是现在有一个大问题没有解决：我们无法处理bean之间的依赖，无法将bean注入到bean中，所以它无法称之为完整的IoC容器！如何实现呢？我们定义一个`BeanReference`，来表示这个属性是对另一个bean的引用。这个在读取xml的时候初始化，并在初始化bean的时候，进行解析和真实bean的注入。

```
for (PropertyValue propertyValue : mbd.getPropertyValues().getPropertyValues()) {
    Field declaredField = bean.getClass().getDeclaredField(propertyValue.getName());
    declaredField.setAccessible(true);
    Object value = propertyValue.getValue();
    if (value instanceof BeanReference) {
        BeanReference beanReference = (BeanReference) value;
        value = getBean(beanReference.getName());
    }
    declaredField.set(bean, value);
}
```

同时为了解决循环依赖的问题，我们使用lazy-init的方式，将createBean的事情放到`getBean`的时候才执行，是不是一下子方便很多？这样在注入bean的时候，如果该属性对应的bean找不到，那么就先创建！因为总是先创建后注入，所以不会存在两个循环依赖的bean创建死锁的问题。

```
// 1.读取配置
XmlBeanDefinitionReader xmlBeanDefinitionReader = new XmlBeanDefinitionReader(new ResourceLoader());
xmlBeanDefinitionReader.loadBeanDefinitions("tinyioc.xml");

// 2.初始化BeanFactory并注册bean
AbstractBeanFactory beanFactory = new AutowireCapableBeanFactory();
for (Map.Entry<String, BeanDefinition> beanDefinitionEntry : xmlBeanDefinitionReader.getRegistry().entrySet()) {
    beanFactory.registerBeanDefinition(beanDefinitionEntry.getKey(), beanDefinitionEntry.getValue());
}

// 3.初始化bean
beanFactory.preInstantiateSingletons();

// 4.获取bean
HelloWorldService helloWorldService = (HelloWorldService) beanFactory.getBean("helloWorldService");
helloWorldService.helloWorld();
```

### 6. step6-ApplicationContext登场

现在BeanFactory的功能齐全了，但是使用起来有点麻烦。于是我们引入熟悉的`ApplicationContext`接口，并在`AbstractApplicationContext`的`refresh()`方法中进行bean的初始化工作。

```
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("tinyioc.xml");
HelloWorldService helloWorldService = (HelloWorldService) applicationContext.getBean("helloWorldService");
helloWorldService.helloWorld();
```

是不是非常熟悉？至此为止，我们的tiny-spring的IoC部分可说完工了。这部分的类、方法命名和作用，都是对应Spring中相应的组件。虽然代码量只有400多行，但是已经有了基本的IoC功能！

## tiny-spring的核心类

### 1. Resource家族

Resource以及继承它的几个类，用于IOC的类定位，也就是：**配置文件从哪读、如何读。**

#### Resource接口

标识一个外部资源。定义getInputStream()方法来获取资源的输入流。

#### UrlResource

实现 Resource 接口的资源类，通过 URL 获取资源。

#### ResourceLoader

资源加载类。通过 getResource(String)方法获取一个Resouce对象，是获取Resouce的主要途径。

### 2. BeanDefinition家族

BeanDefinition为核心的几个类，是用来**定义Bean**：名字是什么、类型是什么、属性赋予了哪些值或者引用，使得IoC容器可以根据这个定义来生成实例。

#### BeanDefinition

该类保存了Bean定义，包括，名字(String beanClassName)、类型(Class beanClass)、属性(PropertyValues propertyValues)。根据其类型可以生成一个类实例，然后可以把属性 注入进去。

#### BeanDefinitionReader

解析BeanDefinition的接口。通过loadBeanDefinitions(String)从一个地址加载类定义。

#### AbstractBeanDefinitionReader

实现 BeanDefinitionReader 接口的抽象类（未具体实现 loadBeanDefinitions，而是规范了 BeanDefinitionReader 的基本结构）。内置一个 HashMap rigistry，用于保存 String - beanDefinition 的键值对。内置一个 ResourceLoader resourceLoader，用于保存类加载器。使用时，只需要向其 loadBeanDefinitions() 传入一个资源地址，就可以自动调用其类加载器，并把解析到的 BeanDefinition 保存到 registry 中去。

#### XmlBeanDefinitionReader

具体实现了loadBeanDefinitions()方法，并从XML文件中读取类定义。

### 3. BeanFactory家族

以BeanFactory为核心的类，用于IoC容器在已经获取Bean时，对Bean实例的装配、获取。

#### BeanFactory

接口，标识一个 IoC 容器。通过 getBean(String) 方法来获取一个对象

#### AbstractBeanFactory

BeanFactory 的一种抽象类实现，规范了 IoC 容器的基本结构，但是把生成 Bean 的具体实现方式留给子类实现。

同时维护一个 beanDefinitionMap 哈希表用于保存类的定义信息（BeanDefinition）。获取 Bean 时，如果 Bean 已经存在于容器中，则返回之，否则则调用 doCreateBean 方法装配一个 Bean。

#### AutowireCapableBeanFactory

实现了 doCreateBean 方法，该方法分三步：1 通过 BeanDefinition 中保存的类信息实例化一个对象；2 把对象保存在 BeanDefinition 中，以备下次获取；3 为其装配属性。

### 4. ApplicationContext家族

以ApplicationContext 接口为核心的类，主要是对前面 Resouce、BeanFactoryBeanDefinition 进行了功能的封装，解决 **根据地址获取 IoC 容器并使用**的问题。

#### ApplicationContext

标记接口，继承了 BeanFactory。通常，要实现一个 IoC 容器时，需要先通过 ResourceLoader 获取一个 Resource，其中包括了容器的配置、Bean 的定义信息。接着，使用 BeanDefinitionReader 读取该 Resource 中的 BeanDefinition 信息。最后，把 BeanDefinition 保存在 BeanFactory 中，容器配置完毕可以使用。

注意到 BeanFactory只实现了Bean的装配、获取，并未说明Bean的来源 也就是 BeanDefinition是如何加载的。该接口把 BeanFactory 和 BeanDefinitionReader 结合在了一起。

#### AbstractApplicationContext

ApplicationContext的抽象实现，内部包含一个BeanFactory类。主要方法有 getBean() 和 refresh() 方法。getBean() 直接调用了内置 BeanFactory 的 getBean() 方法，refresh() 则用于实现 BeanFactory 的刷新，也就是告诉 BeanFactory 该使用哪个资源（Resource）加载类定义（BeanDefinition）信息，该方法留给子类实现，用以实现 从不同来源的不同类型的资源加载类定义 的效果

#### ClassPathXmlApplicationContext

从类路径加载资源的具体实现类。内部通过 XmlBeanDefinitionReader 解析 UrlResourceLoader 读取到的 Resource，获取 BeanDefinition 信息，然后将其保存到内置的 BeanFactory 中。