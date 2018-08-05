---
title: Hexo 的搭建过程
date: 2018-06-28 22:30:16
tags: hexo 搭建
categories: 搭建
---

# Hexo的搭建

> A fast, simple & powerful blog framework
一个快速、简洁、强大的静态博客框架。

根据以下官网wiki安装即可
[Nodejs](https://nodejs.org/zh-cn/)
[Git](https://git-scm.com/)
[Hexo](https://hexo.io/zh-cn/index.html)

## 安装Nodejs，git
略

## hexo
### 安装/初始化 hexo
之后打开终端，使用npm安装hexo，需要root权限进行某些文件的写入 
```
sudo npm install hexo-cli -g
```
博客初始化，hexo会初始化文件夹（没有会自己创建），博客所有内容将放在改文件夹中。
初始化完毕后，进入该文件夹中执行npm install对npm模块进行初始化安装
```
hexo init dirName #eg:hexo init H2O2
cd dirName
npm install #对dirName进行nodejs库的安装（用于后续插件安装）
```

之后打开刚才的文件夹，会看到这样的结构
```
.
├── _config.yml     //hexo配置文件
├── node_modules     //node.js运行库
├── package.json
├── scaffolds     //markdown模板
├── source     //资源文件夹
└── themes     //主题
```

试着运行
```
hexo s
```
用浏览器打开 http://localhost:4000

hexo编译的时候会出现报错：
```
eg:

{ [Error: Cannot find module './build/Release/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/default/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/Debug/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
```
这是模块报错，npm install 重装一遍
```
npm install hexo --no-optional
```
如果是墙的问题导致安装不成功，切换淘宝镜像源
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm install hexo --no-optional
```
### 新建文章
```
hexo new '文章名称'
```
之后就会在 **source/_posts/**生成对应的md文件

```
---
title: test
date: 2016-03-05 14:56:52
tags:
---	
```
多标签的写法
```
tags:

- tag1
- tag2
- tag3
```

### 主题更换
hexo默认的主题是**landscape**，主题放在themes文件夹中，之后在hexo的配置文件_config.yml中将theme后的名称改成想更改的主题名称即可。主题的配置因主题而异，在主题中同样有一个_config.yml文件，是配置主题设置的，不要与hexo的配置文件弄混。

### **_config.yml**配置文件
hexo的相关配置在这个文件中都可以配置，详细介绍一下
>[Docs](https://hexo.io/docs/configuration.html)
 [Source](https://github.com/hexojs/hexo/)

```yml
## Site        #网站基本信息
title: Hexo        #网站名称
subtitle:        #副标题
description:        #描述，会被搜索引擎抓取，分享文章的时候也会显示
author: John Doe        #作者
language:        #语言
timezone:        #时区，留空为系统默认时区

# URL        #网站URL信息
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com        #网站URL
root: /        #网站根目录，如果整个博客是一个网站的子目录，需要将根目录改为子目录的名称
permalink: :year/:month/:day/:title/        #每篇文章的URL格式
permalink_defaults:        #默认URL格式

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md # File name of new posts        #默认新文章的名字
default_layout: post        #默认文章布局
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab        #是否在新标签页打开链接
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:        #代码高亮设置
  enable: true        #代码高亮开关
  line_number: true        #是否显示行号
  auto_detect: false        #是否自动判断语言
  tab_replace:        #用空格替换tab

# Category & Tag        #目录与标签设置
default_category: uncategorized
category_map:
tag_map:

# Date / Time format        #日期设置
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD        #日期格式
time_format: HH:mm:ss        #时间格式

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10        #每页的文章数目
pagination_dir: page        #页面路径

# Extensions        #扩展配置，配置主题以及hexo插件信息
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape        #主题名称

# Deployment        #发布相关配置，需要安装相应插件
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type:
```

### 生成网站文件
```
hexo g
```
之后会生成一个public文件夹，文件夹中的文件即为生成的网页文件。


### 将博客部署到github
按照github pages的说明配置，申请一个github帐号，之后新建项目，注意项目名称为用户名.github.io否则之后是无法访问的，一个账户只能建一个github pages。之后将之前的public文件夹里的内容都同步到这个项目的master分支，之后浏览器访问用户名.github.io就能看到hexo的博客界面了。

连接github同步可以直接使用git命令或者github客户端，但是这样都需要 **hexo generate** 之后再使用git，还是有些麻烦。hexo-deployer-git是hexo的一个插件，可以直接使用hexo命令在生成博客文件后部署到github上。
（此处关于github注册，连接，创建仓库不讲，自行搜索）

#### 首先进入到博客文件夹，安装hexo-deployer-git
```
cd 博客文件夹
npm install hexo-deployer-git --save
```

然后在博客的配置文件_config.yml（注意是hexo工作目录，不是主题中的）中添加
```
deploy:
  type: git
  repo: git@github.com:Zakariyya/zakariyya.github.io.git # 这是我的仓库，请自行修改对应的
  branch: master  #博客生成网页推送的分支，请于源码（很多个.md文件）区分开

```
git地址在git主页中可以看到，注意选择ssh的地址


#### 在本地生成ssh密钥(做连接github用)
> 这里只简单讲解ssh密钥，复杂配置自行搜索
##### git bash运行生成密钥对
```
ssh-keygen
```
 - windows用户：**C:/用户/.ssh**
 - linux用户：**~/.ssh**
进入以上路径后可以看到**id_rsa**和**id_rsa.pub**两个文件，分别是私钥和公钥，下面就不用多解释了。此时还没有**know_hosts**文件，使用ssh连接后才会生成。

##### 读取生成密钥的公钥：id_rsa.pub
把显示出来的内容复制下来，然后到github的网页上，进入到设置界面，找到ssh key，新建一个key，那刚才的内容粘贴进去。
添加之后测试一下
```
ssh -T git@github.com
```
第一次使用ssh连接github会有提示，输入yes即可，之后如果出现success的字样说明连接正常，ssh配置成功。
现在就可以使用hexo-deployer-git插件了，方法很简单，
```
hexo g  ##之后再使用
hexo deploy  ##就可以自动部署了。
```

### hexo短命令
hexo支持短命令，使用起来不用输入太长的指令，只列出常用的：
```
hexo s    //相当于hexo server在本机预览网页
hexo g    //相当于hexo generate生成静态网页
hexo d    //相当于hexo deploy部署网页到服务器
hexo g -d    //hexo generate和hexo deploy的结合
```
至此博客已经可以使用了。

