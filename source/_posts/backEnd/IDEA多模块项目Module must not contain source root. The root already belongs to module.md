---
title: IDEA 多模块项目Module must not contain source root. The root already belongs to module
date: 2018-12-19 19:00:00
tags: backEnd 编程
categories: backEnd
---

> 本文来自 CSDN [多模块项目Module must not contain source root. The root already belongs to module](https://blog.csdn.net/u013041642/article/details/72835242 )

有时候新建了maven工程，然后删了里面的src目录让它成为空的父项目，但是会报下面的错误。

Module “*” must not contain source root *. The root already belongs to module “*”.

## 方案1
打开工程的iml文件后，发现里面记录了开始的源文件和资源文件的配置。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<module org.jetbrains.idea.maven.project.MavenProjectsManager.isMavenModule="true" type="JAVA_MODULE" version="4">
  <component name="NewModuleRootManager" LANGUAGE_LEVEL="JDK_1_5" inherit-compiler-output="false">
    <output url="file://$MODULE_DIR$/target/classes" />
    <output-test url="file://$MODULE_DIR$/target/test-classes" />
    <content url="file://$MODULE_DIR$">
      <sourceFolder url="file://$MODULE_DIR$/src/main/java" isTestSource="false" />
      <sourceFolder url="file://$MODULE_DIR$/src/main/resources" type="java-resource" />
      <sourceFolder url="file://$MODULE_DIR$/src/test/java" isTestSource="true" />
      <excludeFolder url="file://$MODULE_DIR$/target" />
    </content>
    <orderEntry type="inheritedJdk" />
    <orderEntry type="sourceFolder" forTests="false" />
  </component>
</module>
```

修改以后的
```
<?xml version="1.0" encoding="UTF-8"?>
<module org.jetbrains.idea.maven.project.MavenProjectsManager.isMavenModule="true" type="JAVA_MODULE" version="4">
  <component name="NewModuleRootManager" LANGUAGE_LEVEL="JDK_1_5" inherit-compiler-output="false">
    <output url="file://$MODULE_DIR$/target/classes" />
    <output-test url="file://$MODULE_DIR$/target/test-classes" />
    <content url="file://$MODULE_DIR$">
      <excludeFolder url="file://$MODULE_DIR$/target" />
    </content>
    <orderEntry type="inheritedJdk" />
    <orderEntry type="sourceFolder" forTests="false" />
  </component>
</module>
```

## 方案二
![hexo贴图片确实是个问题](https://img-blog.csdn.net/20170601210423506?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzA0MTY0Mg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

在项目设置中, 右侧有源文件、资源文件等 目录列表。
删除掉不是子工程该有的目录。

