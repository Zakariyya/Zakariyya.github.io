

[jib Official：GoogleContainerTools/jib](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FGoogleContainerTools%2Fjib)


[本文示例完整demo github地址 github.com/moxingwang/…](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fmoxingwang%2Fjib)


想要了解并且使用jib，首先你得知道或者使用过docker，在这个基础上才能够明白jib是干什么得，解决了什么问题。

首先我们先看一个例子，如何将一个spring-boot项目简单容器化，如果你从未操作过，可以动手自己实现，或者仔细阅读这篇文章[第一个 spring Boot 应用通过Docker 来实现构建、运行、发布](https://link.juejin.im/?target=https%3A%2F%2Fblog.csdn.net%2Fu010046908%2Farticle%2Fdetails%2F56008445)。你可能发现如果需要把一个java项目容器化这是一个麻烦和相对复杂的过程，首先你需要编写dockerfile，然后在build dockefile，如过需要push到registries，还需要经过push操作。虽然build和push还是非常简单得。但是写一个dockerfile真的比较麻烦，学习成本也高，看看官网[Dockerfile reference](https://link.juejin.im/?target=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fbuilder%2F%23usage)就不想学了。那么有没有简单得办法呢，记住几个简单得命令就可以运行了，如同‘mvn spring-boot:run’这么简单得命令，这个时候jib出场了，他就是来完成这个伟大得使命。
如果你还没明白jib是用来做什么事情得，推荐你阅读[谷歌开源Java镜像构建工具Jib](https://link.juejin.im/?target=http%3A%2F%2Fwww.infoq.com%2Fcn%2Fnews%2F2018%2F07%2Fgoogle-opensource-Jib)的前半部分，或者阅读[jib Official：GoogleContainerTools/jib](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FGoogleContainerTools%2Fjib)。
接下来主要介绍具体如何使用(maven的方式)。
将java项目容器化push到registries
jib的引入非常简单，已maven plugin的方式集成到项目中，只需要在你的项目中引入下面代码即可
```
<plugin>
    <groupId>com.google.cloud.tools</groupId>
    <artifactId>jib-maven-plugin</artifactId>
    <version>0.9.6</version>
    <configuration>
        <from>
            <!--base image-->
            <image>openjdk:alpine</image>
        </from>
        <to>
            <!--<image>registry.cn-hangzhou.aliyuncs.com/m65536/jibtest</image>-->
            <!--目标镜像registry地址，为了方便测试，你需要换成自己的地址，如果你的网络不好，可以选用国内加速器，比如阿里云的-->
            <image>registry.hub.docker.com/moxingwang/jibtest</image>
        </to>
    </configuration>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>build</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
复制代码这只是一个最简单的配置，比如registry认证配置，jvm配置等等，可以参考github jib详细说明[jib/jib-maven-plugin/](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FGoogleContainerTools%2Fjib%2Ftree%2Fmaster%2Fjib-maven-plugin%23from-object)。
构建你的镜像
mvn compile jib:build
复制代码可能你刚刚运行玩这一步就出现错误，提示Unauthorized，不用担心，这个命令需要把构建出来的image commit并且push到你远程的registry（我这里是registry.hub.docker.com），你可以按照【常见错误1】的方法解决问题。
如果你的网速慢一点可能会在最后步骤'Finalizing...',不过没有关系，稍微多等一会就ok，直到'BUILD SUCCESS'出现。最终一个完整的java project被实例化成镜像并且push到了registry里。接下来你可以测试刚刚完成push的镜像。
打开[hub.docker.com/](https://link.juejin.im/?target=https%3A%2F%2Fhub.docker.com%2F),你会发现你的image已经构建成功。


docker使用镜像

docker run -it --rm -p8080:8080 registry.hub.docker.com/moxingwang/jibtest
复制代码
一个spring-boot的image这样就被启动成功了。本文示例demo中集成了swagger-iu, 项目启动成功后我们可以通过[http://localhost:8080/sw/swagger-ui.html](https://link.juejin.im/?target=http%3A%2F%2Flocalhost%3A8080%2Fsw%2Fswagger-ui.html)访问，可以成功在浏览器打开swagger。

把镜像直接构建到本地docker中
使用这种构建方式，首先你要确保本已经安装docker并且环境变量都配置正确，因为这种方式jib依赖docker 命令执行，你还需要保证已经启动服务（在terminal中执行 docker --version 能够正确返回）。
mvn compile jib:dockerBuild
复制代码接下来直接操作，首先查看本地已有images
docker iamges
复制代码
执行mvn compile jib:dockerBuild

可以看到本地image已经build成功。可以直接启动使用
docker run -it --rm -p8080:8080 moxingwang/jibtest
复制代码启动成功后同样可以直接访问http://localhost:8080/sw/swagger-ui.htmlswagger页面。
常见错误
常见错误1  Failed to execute goal com.google.cloud.tools:jib-maven-plugin:0.9.6:build (default-cli) on project jib: Build image failed, perhaps you should set a credential helper name with the configuration '' or set credentials for 'registry.hub.docker.com' in your Maven settings: Unauthorized for registry.hub.docker.com/moxingwang/jibtest: 401 Unauthorized

当你从私有的registries pull或者push的时候需要认证机制。阅读官方说明按照步骤操作即可。[Authentication Methods](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FGoogleContainerTools%2Fjib%2Fblob%2Fmaster%2Fjib-maven-plugin%2FREADME.md)。
如果帮你本机已经按照docker，那么操作更简单，可以通过docker命令直接登陆registries，然后继续其他jib的操作。


registry.hub.docker.com

docker login --username=你的hub.docker的用户名 registry.hub.docker.com
复制代码
registry.cn-hangzhou.aliyuncs.com

docker login --username=阿里云docker用户名 registry.cn-hangzhou.aliyuncs.com

作者：m65536
链接：https://juejin.im/post/5b4e9c316fb9a04fa01d39d6
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。