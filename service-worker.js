/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-Arch安装-日志/index.html","f4a56c611a7e83749b2f76465c750ad6"],["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-arch-arch安装笔记/index.html","77d18d45b3fb6c76270adb4ca53a13c1"],["D:/me/github/zakariyya.github.io/public/2016/01/15/碎碎念-那些住在手机里的朋友/index.html","c9398b3671eaa55c4c65e3e57ac4dd3e"],["D:/me/github/zakariyya.github.io/public/2016/01/28/碎碎念-时光/index.html","886077efea43c19cd4bc315719be34b5"],["D:/me/github/zakariyya.github.io/public/2016/02/21/电脑问题-禁止软件开机自启动的三种方法/index.html","ed3203ee1c80dc0ecbc002cf9a28fc7c"],["D:/me/github/zakariyya.github.io/public/2016/02/21/碎碎念-Google-x-’s-Loon，一个互联网气球/index.html","2b7ecd4cc3c1b899bfbfc47ab7d51dd4"],["D:/me/github/zakariyya.github.io/public/2016/02/26/电脑问题-windows7-我的电脑右键-管理“该文件没有与之关联的程序来执行该操作”/index.html","eb80c0acb77ef6909e68f3fae903505c"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-QQ右下角弹出新闻框/index.html","7af6a2b71f170edb9db1cff562ba78e5"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-win7隐藏IE浏览器/index.html","f0894a047b92381b0a31410d8dc426b5"],["D:/me/github/zakariyya.github.io/public/2016/02/28/电脑问题-禁用UEFI安全启动功能/index.html","6d932f8cd24c0c0cc867b4f468e8671c"],["D:/me/github/zakariyya.github.io/public/2016/02/29/电脑问题-说说在win7下优化软件的必要性/index.html","b9ff9d9caa2a623a3f1b343218ff7bb1"],["D:/me/github/zakariyya.github.io/public/2016/03/01/电脑问题-处理快捷方式小箭头/index.html","923d28249098e8e6804053017bba5cd0"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-一罐硬币实验的讨论——《信号与噪声》/index.html","877c1be3d655378f4b4ba3ab37b53e68"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-十二行代码/index.html","5b8d82137768045f759e90e16763238c"],["D:/me/github/zakariyya.github.io/public/2016/03/04/linux-arch打包sogou/index.html","74e0e02549fe60091a476f64a583b3a3"],["D:/me/github/zakariyya.github.io/public/2016/03/06/linux-arch分swap/index.html","683b5ec2738713117f6f99a122fe57fa"],["D:/me/github/zakariyya.github.io/public/2016/03/06/电脑问题-定时关机-睡眠/index.html","e1614c2bc49258a178ae39fe32c8f0ae"],["D:/me/github/zakariyya.github.io/public/2016/03/11/碎碎念-织梦/index.html","438c19caede2e51f152a68e5f5b075bf"],["D:/me/github/zakariyya.github.io/public/2016/03/14/碎碎念-麻雀告诉我们的故事/index.html","3247d95bc4fafaa0a63163e759a4f8aa"],["D:/me/github/zakariyya.github.io/public/2016/03/17/碎碎念-还没有晾干的旧伞，闷在寂寞的房里/index.html","da8b8a9541815208df7dfcec204bf4de"],["D:/me/github/zakariyya.github.io/public/2016/03/19/电脑问题-windows下启动项菜单-Boot-Manager-问题/index.html","8edb0f904efe3b115a8684078a8fe9cd"],["D:/me/github/zakariyya.github.io/public/2016/03/20/碎碎念-春分/index.html","a2abdd1ed4e8b7a2f2b18a295c9e8625"],["D:/me/github/zakariyya.github.io/public/2016/03/21/电脑问题-电脑文件搜索神器——Everything/index.html","d3b8580a06ac2174f4de4ee823d74249"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-f-lux和“薄暮微光”/index.html","706913ee31153a56e1e25130d996dbf4"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-windows7-打开休眠模式/index.html","768bddd0e42926117b7d01995924e79d"],["D:/me/github/zakariyya.github.io/public/2016/04/05/碎碎念-旧照片/index.html","98de6863b262e5499b1a981fe26aff70"],["D:/me/github/zakariyya.github.io/public/2016/04/07/linux-pppoe上网/index.html","d7e9ebc100a43a40b432d4ca9d204484"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-无标题文章/index.html","65b084c8078fa1ba1e402bd7c9e1e6fc"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-看几天韩剧的感想/index.html","b7ca178ff5f28d6d4abda28fdd131531"],["D:/me/github/zakariyya.github.io/public/2016/04/18/碎碎念-恶意代码引起的反思/index.html","ad2e337f824cf358c62594b4a6a7cb4e"],["D:/me/github/zakariyya.github.io/public/2016/04/22/电脑问题-OneTab-和-轻听/index.html","cbdb160d515727f38cf3591943682ee7"],["D:/me/github/zakariyya.github.io/public/2016/05/04/碎碎念-孙悟空无姓无名的时候，阎王生死簿是怎么写的呢？/index.html","90e004ce44d486556d0da1d451c75fd3"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-抠头发丝/index.html","c37ca3ed10763bc31f07de49b69bd8c5"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-百度，广告/index.html","c9461fda7bd8d5378a8075494cd1ab9d"],["D:/me/github/zakariyya.github.io/public/2016/05/25/碎碎念-“hello-os-world-”-of-Boot-Sector/index.html","a1ad32844ece03d914bc2f4833a1b87f"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏和身体/index.html","accfd05914c7d9c9e7b465d9ff649618"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏的设计/index.html","46a7b31338064c08d8b59015c410478a"],["D:/me/github/zakariyya.github.io/public/2016/06/05/文集-游戏性是什么-游戏性是什么-游戏和视觉/index.html","f131230d0481e9cf666a117cb9457f21"],["D:/me/github/zakariyya.github.io/public/2016/06/06/文集-游戏性是什么-游戏性是什么-游戏和世界/index.html","6bcfe5f9786d797a42e33e969a319a01"],["D:/me/github/zakariyya.github.io/public/2016/06/07/文集-游戏性是什么-游戏性是什么-游戏和触觉/index.html","92a069e4d601c3c144645200bdcd7294"],["D:/me/github/zakariyya.github.io/public/2016/06/08/文集-游戏性是什么-游戏性是什么-专注游戏的原因/index.html","415fdac29de5665b351db85662a80f4e"],["D:/me/github/zakariyya.github.io/public/2016/06/10/文集-游戏性是什么-游戏性是什么-难易度平衡设计与效率预测/index.html","801f0ee3ebe5acbaa28c5c19aa7debc1"],["D:/me/github/zakariyya.github.io/public/2016/06/11/文集-游戏性是什么-游戏性是什么-结构/index.html","bcdb3fe82afbf9da54d7f3bc7ebadc2d"],["D:/me/github/zakariyya.github.io/public/2016/06/12/文集-游戏性是什么-游戏性是什么-叙事和Narreme/index.html","3ac57ea6b7e5f91c5ce546bb8e79f437"],["D:/me/github/zakariyya.github.io/public/2016/06/13/文集-游戏性是什么-游戏性是什么-记录《游戏性是什么》/index.html","2b647cf95e65343d905f894caf6dc3cd"],["D:/me/github/zakariyya.github.io/public/2016/09/07/linux-sogou输入配置/index.html","b832c30217344d3bbe9219f4753dbbf3"],["D:/me/github/zakariyya.github.io/public/2016/09/11/linux-ubuntu修改ssh端口/index.html","4b3cb9613daf2b4b101aa5c17247b185"],["D:/me/github/zakariyya.github.io/public/2016/10/30/碎碎念-日常20161030/index.html","cfef2efd546bae9926a8a5e374cabdd0"],["D:/me/github/zakariyya.github.io/public/2016/10/31/碎碎念-日常——google涂鸦/index.html","1cc2a17be007e1ce3957729ec691be62"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Google18岁了/index.html","1c1be18a76454829404ee70e99637a44"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Many-Doors-In-My-Life/index.html","63d9982694b287b2df2cc36aa7786753"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-《越晚越开心》停播/index.html","fe78779353fd01e712eea6bc03a74f68"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-分数，教育的目的/index.html","cbc822eb31e776e5fd3bc0aa422b2a79"],["D:/me/github/zakariyya.github.io/public/2017/01/21/电脑问题-Tomcat提示指定的服务未安装Unable-to-open-the-service-tomcat/index.html","e445c7a22b37d6b08f06ed81323823c3"],["D:/me/github/zakariyya.github.io/public/2017/01/24/电脑问题-windows10关闭“自动更新”/index.html","2293bb413710709d3f1ed9675c5bb0c5"],["D:/me/github/zakariyya.github.io/public/2017/03/24/backEnd-服务配置-Redis/index.html","8d03aae3ec329f4daa695bd27ebdc41f"],["D:/me/github/zakariyya.github.io/public/2017/03/24/科普-Update与Modify两者区别/index.html","e1b86ec30dfb4457c980437e3ed1730e"],["D:/me/github/zakariyya.github.io/public/2017/04/23/backEnd-服务配置-apahce错误提示the-requested-operation-has-failed/index.html","872e5af79b0809c480c1b4768099d601"],["D:/me/github/zakariyya.github.io/public/2017/05/23/linux-解决CentOS（6和7版本），-etc-sysconfig-下没有iptables的问题-副本/index.html","4c35617fd8aa6cf8863e3089644b87d7"],["D:/me/github/zakariyya.github.io/public/2017/06/16/frontEnd-ajax-使用ajax-方法加载服务器数据/index.html","f272d21a8b718913600c7d634e18d5cd"],["D:/me/github/zakariyya.github.io/public/2017/06/18/frontEnd-ajax-this-id和-this-attr-id/index.html","f9c242eeb3c3ded0d74dbe98022d084b"],["D:/me/github/zakariyya.github.io/public/2017/08/05/电脑问题-eclipse中批量修改Java类文件中引入的package包路径/index.html","8a4606606c794e9ab65aae8b8942434b"],["D:/me/github/zakariyya.github.io/public/2017/08/22/backEnd-maven-maven项目jar包导入失败/index.html","8c27d9330676baf769bfb463d912d4c1"],["D:/me/github/zakariyya.github.io/public/2017/08/31/frontEnd-ajax-回调函数（callback）是什么？/index.html","a44084266ea94fd37adc51f491d553b0"],["D:/me/github/zakariyya.github.io/public/2018/03/14/碎碎念-我未曾见过你-而你的光却照耀到了我/index.html","507fe2ace8448e6e5b995bb272ba1836"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring-简介/index.html","64745417ecb645916742610d4119d00a"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring分析/index.html","867b1379452cf851ba69114d33c82817"],["D:/me/github/zakariyya.github.io/public/2018/03/24/科普-视频格式/index.html","8f0e2b4ba56ee7481fa749120d9480c5"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-arch-开机自启动脚本/index.html","2a0fa3548d2a65615187008a4a949c8a"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-客户端/index.html","1777a468e04e74109feb3519524c5157"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-服务端/index.html","0c9963ca10dd25cf18b81a841a4ccf50"],["D:/me/github/zakariyya.github.io/public/2018/06/28/backEnd-spring-Spring-Boot-YML文件配置多环境/index.html","3c81f20ef0e28df9f3863678d1bb0c4e"],["D:/me/github/zakariyya.github.io/public/2018/06/28/搭建-Hexo搭建/index.html","8e2c3d3df61ea993c211fddac3aecab8"],["D:/me/github/zakariyya.github.io/public/2018/07/03/科普-软件为何会有那么多权限/index.html","21467cab0e6bd4322d80d9c24f1323a6"],["D:/me/github/zakariyya.github.io/public/2018/07/12/编程-Java调用Python/index.html","60371e6c7cc99fbb5298c724a4da5b77"],["D:/me/github/zakariyya.github.io/public/2018/07/19/backEnd-spring-Spring-Boot多数据源整合/index.html","5873ad0023ba938db5172ca2b6a0555a"],["D:/me/github/zakariyya.github.io/public/2018/07/21/backEnd-修改形参对象值，会影响实参/index.html","3c61bf47134b42cd2772dfb6431560ec"],["D:/me/github/zakariyya.github.io/public/2018/08/01/搭建-Jib构建你的第一个java镜像/index.html","0519515dac3ba64e85108dae686a749f"],["D:/me/github/zakariyya.github.io/public/2018/08/01/科普-IaaS、SaaS-和-PaaS-的区别/index.html","e09b22452728d458bd4854118c70d731"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-Maven-安装与入门/index.html","600869608f66c3f8b8a4160a3d998aff"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-基于-Ubuntu-搭建个人网盘/index.html","c0e95f30e722a3b8e6c38e16c25d390e"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-基于Ubuntu搭建FTP/index.html","fe7100770998cb53bfd91d6240806b41"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-搭建Git服务器/index.html","9f82081816aecc9a3d513e2745806f0f"],["D:/me/github/zakariyya.github.io/public/2018/08/10/搭建-搭建javaweb开发环境/index.html","fc274edda100a21a7a9f1731181ae971"],["D:/me/github/zakariyya.github.io/public/2018/08/15/搭建-搭建个人-Leanote-云笔记本/index.html","31a507c05ba68122b9ba40887fda120c"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-FTP文件上传、下载/index.html","6f12dc7c426674d028621d67ad04b679"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-文件上传下载/index.html","ff9950850d346706c0f56bdc42e663df"],["D:/me/github/zakariyya.github.io/public/2018/08/23/backEnd-spring-springboot-Component下-Autowired的注入为null/index.html","9c532598e203fca682421620cae5f0c0"],["D:/me/github/zakariyya.github.io/public/2018/09/10/碎碎念-广电对游戏版号的限制/index.html","1afa8d6102acd0d67321a5a264917a7d"],["D:/me/github/zakariyya.github.io/public/2018/09/19/linux-Ubuntu添加可信任根证书/index.html","62dd65b95c4a6247dafdc5607d231bbc"],["D:/me/github/zakariyya.github.io/public/2018/09/19/搭建-mysql安装文档/index.html","da97fe8a71528b3ecbc64c5bb0c149ae"],["D:/me/github/zakariyya.github.io/public/2018/09/23/搭建-nginx-搭建文档/index.html","8c536351721455e4db03d0152b177312"],["D:/me/github/zakariyya.github.io/public/2018/09/23/电脑问题-Teamviewer-重置ID的工具/index.html","88fcf30fbdf04ddf71d9a6523fa56dcb"],["D:/me/github/zakariyya.github.io/public/2018/12/19/backEnd-IDEA多模块项目Module-must-not-contain-source-root-The-root-already-belongs-to-module/index.html","7caf00d2489f66cebf87eed2e61f3f8a"],["D:/me/github/zakariyya.github.io/public/2019/01/02/编程-markdown折叠内容语法/index.html","9af268b63f8dfe3744bf37ccd0e89532"],["D:/me/github/zakariyya.github.io/public/2019/01/03/backEnd-maven-maven标签字典/index.html","1195c1384e566b0a583223eff6624e33"],["D:/me/github/zakariyya.github.io/public/2019/01/11/linux-docker离线安装/index.html","1ccae32aa4cc6ff4fd7e2576029efdd6"],["D:/me/github/zakariyya.github.io/public/2019/01/17/linux-命令行下安装-oracle-11gR2-数据库/index.html","b04920aba62dc6150bb2b55481419cb3"],["D:/me/github/zakariyya.github.io/public/2019/01/24/backEnd-spring-异常捕获/index.html","8f3fb0b88d5125492cce9c2b85ce9f14"],["D:/me/github/zakariyya.github.io/public/2019/01/27/编程-Git/index.html","c7cf457f795212c351eb9ea05a06cefb"],["D:/me/github/zakariyya.github.io/public/2019/02/24/backEnd-spring-SpringCloud/index.html","a7217bcad674c0ce04abaa9845a2fe66"],["D:/me/github/zakariyya.github.io/public/2019/03/01/科普-常见版本号/index.html","b4001b954040c8b21ff905012048649a"],["D:/me/github/zakariyya.github.io/public/2019/03/04/搭建-RabbitMQ-server搭建/index.html","16ae44856c4c3a8a967de37e6ad24520"],["D:/me/github/zakariyya.github.io/public/2019/03/12/搭建-翻墙-v2ray搭建启动/index.html","2bebc2e764fe63c5f8bc44811870ddf5"],["D:/me/github/zakariyya.github.io/public/2019/03/14/backEnd-rabbitMQ-交换器/index.html","2e68c47a100dc8956a10c6a39661c906"],["D:/me/github/zakariyya.github.io/public/2019/05/28/cloud-cloud/index.html","4a3641ccfae7644ec8cfc308165176d3"],["D:/me/github/zakariyya.github.io/public/2019/06/11/编程-Github进行fork后与原仓库同步/index.html","48fafed8ad988ba717298eaf9da513df"],["D:/me/github/zakariyya.github.io/public/2019/10/24/搭建-Git-仓库恢复/index.html","abc6f846211097f3273f4af77886ac53"],["D:/me/github/zakariyya.github.io/public/2030/08/16/电脑问题-How-to-kill-a-currently-using-port-on-localhost-in-windows/index.html","cf4636719139e4a0701880ca486eb463"],["D:/me/github/zakariyya.github.io/public/archives/2015/12/index.html","af4ce8aa5dd23ce1ea3a6ec680d619b6"],["D:/me/github/zakariyya.github.io/public/archives/2015/index.html","af4ce8aa5dd23ce1ea3a6ec680d619b6"],["D:/me/github/zakariyya.github.io/public/archives/2016/01/index.html","5fbd0791466b3a879d23b56fc8e330f4"],["D:/me/github/zakariyya.github.io/public/archives/2016/02/index.html","b9ee876262eb09262345da7084ea04d7"],["D:/me/github/zakariyya.github.io/public/archives/2016/03/index.html","70b3c2dc0ffc8a08f31861399ae79393"],["D:/me/github/zakariyya.github.io/public/archives/2016/04/index.html","6f40c87aa30e4a9c906a0e58ee5497ff"],["D:/me/github/zakariyya.github.io/public/archives/2016/05/index.html","409a00ae476fead97911d4fda54d4b39"],["D:/me/github/zakariyya.github.io/public/archives/2016/06/index.html","752701d041cab7fdde4baf51010991fd"],["D:/me/github/zakariyya.github.io/public/archives/2016/09/index.html","6ceada1eec08f802e19f92291d4b8744"],["D:/me/github/zakariyya.github.io/public/archives/2016/10/index.html","21fca9b968c2791df074fab1077ccce0"],["D:/me/github/zakariyya.github.io/public/archives/2016/11/index.html","437d5d6edeabc8feaaa6bcddee4678ca"],["D:/me/github/zakariyya.github.io/public/archives/2016/index.html","0f8d762db6bf901136ea8c4ad8d111d5"],["D:/me/github/zakariyya.github.io/public/archives/2017/01/index.html","50efda792df1c9634202a20692f18bc6"],["D:/me/github/zakariyya.github.io/public/archives/2017/03/index.html","2e67ef67b22870df8c4778b98d4623ae"],["D:/me/github/zakariyya.github.io/public/archives/2017/04/index.html","7221f389142a4f9c8b5e47ed14ae23fb"],["D:/me/github/zakariyya.github.io/public/archives/2017/05/index.html","2a6a9064b4a49e1e4f26b3c6c2aff755"],["D:/me/github/zakariyya.github.io/public/archives/2017/06/index.html","accda0142534e465a3fc0e33e7d3d744"],["D:/me/github/zakariyya.github.io/public/archives/2017/08/index.html","a4783887ecd04ae745bd90468820915e"],["D:/me/github/zakariyya.github.io/public/archives/2017/index.html","21f6fe2ed035135123e92b88ad3faa2e"],["D:/me/github/zakariyya.github.io/public/archives/2018/03/index.html","88bddbd444371ee594731d86b0f5e7b0"],["D:/me/github/zakariyya.github.io/public/archives/2018/04/index.html","f85bdd2d9cc511b9d576027cbad68e65"],["D:/me/github/zakariyya.github.io/public/archives/2018/06/index.html","8979972804219cdd78717a933e1e6c23"],["D:/me/github/zakariyya.github.io/public/archives/2018/07/index.html","755a3f611c64bd0ea0c1f95c2035bac3"],["D:/me/github/zakariyya.github.io/public/archives/2018/08/index.html","6b4bc553ce543a97e569a2e65e5ffa48"],["D:/me/github/zakariyya.github.io/public/archives/2018/09/index.html","f3e201153e53f1bb521038cbaa455055"],["D:/me/github/zakariyya.github.io/public/archives/2018/12/index.html","7737dcc3aa9de4f524f09b0114263c09"],["D:/me/github/zakariyya.github.io/public/archives/2018/index.html","4a0e66789575f1758cc838afa9b2a3e9"],["D:/me/github/zakariyya.github.io/public/archives/2019/01/index.html","368c52a429800ecd4959665f2756b79a"],["D:/me/github/zakariyya.github.io/public/archives/2019/02/index.html","538c238aa39d1fd4537681cb7b452c97"],["D:/me/github/zakariyya.github.io/public/archives/2019/03/index.html","bc5c43c46eba288bc796d7152090b7c0"],["D:/me/github/zakariyya.github.io/public/archives/2019/05/index.html","bbf5cc09c1e8124aee3d47f4e3666dba"],["D:/me/github/zakariyya.github.io/public/archives/2019/06/index.html","49c5d3baf74e5a0382bf4deb6d6f32c3"],["D:/me/github/zakariyya.github.io/public/archives/2019/10/index.html","8f7dd737bf913331852db4db18f8ad85"],["D:/me/github/zakariyya.github.io/public/archives/2019/index.html","4b86655ec4e5d4d686237866281f4e56"],["D:/me/github/zakariyya.github.io/public/archives/2030/08/index.html","008cd9f94f91e9b450b64b52ad4d7cf6"],["D:/me/github/zakariyya.github.io/public/archives/2030/index.html","008cd9f94f91e9b450b64b52ad4d7cf6"],["D:/me/github/zakariyya.github.io/public/archives/index.html","bf808ad77b99d41c13b8073870b79e60"],["D:/me/github/zakariyya.github.io/public/categories/Program/index.html","b23bfa6dd74e2ff9227eac52f16bf459"],["D:/me/github/zakariyya.github.io/public/categories/backEnd/index.html","a2fec801c53f494437e570fa3b6a8aa3"],["D:/me/github/zakariyya.github.io/public/categories/index.html","1235babd4f8e8a617cb114f5f025378a"],["D:/me/github/zakariyya.github.io/public/categories/java-Program/index.html","b80f069e5800c111c039ac0d3465822b"],["D:/me/github/zakariyya.github.io/public/categories/linux/index.html","5fe9c0fb679435e0efaed3ed296e4776"],["D:/me/github/zakariyya.github.io/public/categories/windows电脑问题/index.html","8ef01aede81b31676ba109e48b5b4e65"],["D:/me/github/zakariyya.github.io/public/categories/搭建/index.html","3a472889b35ce361200357b31f41b054"],["D:/me/github/zakariyya.github.io/public/categories/日记本/index.html","9a21234d1edaf108104e5aaa6948b502"],["D:/me/github/zakariyya.github.io/public/categories/服务配置/index.html","a5557458dc4b2ad826ebe052d3e26519"],["D:/me/github/zakariyya.github.io/public/categories/游戏性是什么/index.html","7ed5eb4e3d3f17fda86a7f8c1ab00532"],["D:/me/github/zakariyya.github.io/public/categories/电脑问题/index.html","1ceb69b16489bcc0a7e0e403a7dce81b"],["D:/me/github/zakariyya.github.io/public/categories/科普/index.html","b69ce668763df5cf9761b98a51a762b7"],["D:/me/github/zakariyya.github.io/public/categories/系统-Linux/index.html","49eecb623ab50e637ac50b98a592e7e3"],["D:/me/github/zakariyya.github.io/public/categories/系统/index.html","778c784ed15ef42e2f6071740b5b62d9"],["D:/me/github/zakariyya.github.io/public/categories/编程/index.html","1556d3847bd0a6d0140e4a8efc574f3e"],["D:/me/github/zakariyya.github.io/public/categories/翻墙-Linux/index.html","60736ed983e52bffb436053e50d60158"],["D:/me/github/zakariyya.github.io/public/categories/翻墙/index.html","94dc2e7212904e8e1e0b934f07e2a112"],["D:/me/github/zakariyya.github.io/public/categories/软件/index.html","f84271b53f810a1382beaf59a2995579"],["D:/me/github/zakariyya.github.io/public/categories/随笔/index.html","07275f45b8fe9849f1dfd30923162aaf"],["D:/me/github/zakariyya.github.io/public/css/base.css","fcf23de323fad904dc5ceab77d2a7cf7"],["D:/me/github/zakariyya.github.io/public/css/calendar.css","702500ec322c3d9ca65d704c135a5921"],["D:/me/github/zakariyya.github.io/public/css/code.css","97f4c1dc01be1105228c1807f55b74e5"],["D:/me/github/zakariyya.github.io/public/css/footer.css","1fc73516d161e9161ddd9aafcdcc6e66"],["D:/me/github/zakariyya.github.io/public/css/header.css","6be9e934c0161c801d5ef99623854411"],["D:/me/github/zakariyya.github.io/public/css/main.css","d64b9c23395e66d5542ef28d8b9a0943"],["D:/me/github/zakariyya.github.io/public/css/navbar.css","9d9c69ea1d7c4421cad056e109aa3309"],["D:/me/github/zakariyya.github.io/public/css/post.css","17bf25bc7964184b4c1b67939f13d871"],["D:/me/github/zakariyya.github.io/public/index.html","ae80602bc054c353d6b1c418d0db235c"],["D:/me/github/zakariyya.github.io/public/js/main.js","04670d6d5af2a30bfdf379cf61e7b629"],["D:/me/github/zakariyya.github.io/public/tags/FTP-文件上传-文件下载/index.html","3c220ad9eda70954c78f8dc20d33b322"],["D:/me/github/zakariyya.github.io/public/tags/Google/index.html","c2e86ad497038f07cb57053c544dccb4"],["D:/me/github/zakariyya.github.io/public/tags/RabbitMQ/index.html","d2b60939d31bd58f495e03eda04817b7"],["D:/me/github/zakariyya.github.io/public/tags/Ubuntu/index.html","35fd8ae1cda54673973d290cea5a5cd7"],["D:/me/github/zakariyya.github.io/public/tags/ajax-前端/index.html","e0b0d8137177ec213d7169c8fd872b3f"],["D:/me/github/zakariyya.github.io/public/tags/apahce/index.html","40b0df0ac032f8c1587fe8e816803c8f"],["D:/me/github/zakariyya.github.io/public/tags/arch/index.html","19c701ae1c54dda4c009a381ac0836b6"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程-rabbitMQ/index.html","6cf4d3492b904caf4677fa7eb94baf86"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程/index.html","a6b7531c004f19853477d5348ea7ffbe"],["D:/me/github/zakariyya.github.io/public/tags/cloud-科普/index.html","8b6052c634e3019f797161ef26bdf01b"],["D:/me/github/zakariyya.github.io/public/tags/git/index.html","47e9842ed7900cf98c6e7dd71ded49d6"],["D:/me/github/zakariyya.github.io/public/tags/hexo-搭建/index.html","a041262cd2f0009f62e0302d6da34bd9"],["D:/me/github/zakariyya.github.io/public/tags/index.html","62839e08da17d8dc661ee57de00ed722"],["D:/me/github/zakariyya.github.io/public/tags/java-文件上传-文件下载-编程/index.html","c029ae0f4aef0e148d268d42b8f26255"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos-oracle-databases/index.html","d81af98bf24a3c4395e8f9c5a3238e48"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos/index.html","8c56c7c623b0294fe1651201a1f6e716"],["D:/me/github/zakariyya.github.io/public/tags/linux-docker-Oracle-Ubuntu/index.html","ea3bded0095441cbcf4647348c40f725"],["D:/me/github/zakariyya.github.io/public/tags/linux-sogou/index.html","35e46aa6b8808517444c26672a481f6b"],["D:/me/github/zakariyya.github.io/public/tags/linux-ssh/index.html","c022306deb058e4e86ebc72a0cc8a654"],["D:/me/github/zakariyya.github.io/public/tags/linux-网络/index.html","bb90b82e7a69c7ff923934eed131a25c"],["D:/me/github/zakariyya.github.io/public/tags/linux/index.html","035bb373b43466cfa17e132c2acc1516"],["D:/me/github/zakariyya.github.io/public/tags/maven/index.html","59f997d700f78654e7581d00a6fd0c75"],["D:/me/github/zakariyya.github.io/public/tags/nginx/index.html","819e4f8b7f56b6eeaac05d2d36eaad22"],["D:/me/github/zakariyya.github.io/public/tags/spring-SpringCloud-Eureka/index.html","73893d75d33718b01cde339be7b07fea"],["D:/me/github/zakariyya.github.io/public/tags/spring/index.html","70dbd3bc3a569dfb08a913b1ff4972ef"],["D:/me/github/zakariyya.github.io/public/tags/springboot/index.html","14920af778c36068e505453a65ae2147"],["D:/me/github/zakariyya.github.io/public/tags/teamviewer-电脑问题/index.html","0af07bed9d4e1220e7a3237edd0f3a41"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git-服务器/index.html","1861e6516f79516ac004c4f9c2532181"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git/index.html","cf239a8f3d79e2685b739b6c3d22da82"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Leanote-云-笔记-云笔记/index.html","4f4a9a406b50176c64676017eb45c3c1"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Maven/index.html","d29370464396317f00ddd0024f98961c"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Ubuntu-FTP/index.html","cebefbe1b0481d9621a711bcdfae9227"],["D:/me/github/zakariyya.github.io/public/tags/搭建-mysql/index.html","13c294c38808a7efe96cb77e437c41f2"],["D:/me/github/zakariyya.github.io/public/tags/搭建-开发环境-javaweb/index.html","92d6fec62359d64bb5f50535060e29c8"],["D:/me/github/zakariyya.github.io/public/tags/搭建-网盘-Ubuntu/index.html","adaef37f054f3d7ca2d2dc531166b61c"],["D:/me/github/zakariyya.github.io/public/tags/搭建/index.html","eb2667ab040446e5dba7bcc678619782"],["D:/me/github/zakariyya.github.io/public/tags/游戏/index.html","c034de5299dd7bf5e115d32403b07d46"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题-端口-占用/index.html","39316efde74ad68c1ab367779823bff4"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题/index.html","d32e41a36a08ecbc6e1bfce90c5b08f8"],["D:/me/github/zakariyya.github.io/public/tags/碎碎-子涵/index.html","4e5f8ad100ddbce7ac88d7e25728340b"],["D:/me/github/zakariyya.github.io/public/tags/神器/index.html","2368dfe5018d4bca5f86245955f09577"],["D:/me/github/zakariyya.github.io/public/tags/科普/index.html","54d03d5d32fbecc125be2bf9f3e85753"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks-arch/index.html","21b4ba3350b58388217318837d4999f4"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks/index.html","6f0236570bd2f8cf1c510c370a041648"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-v2ray/index.html","626fe4aab0e5d5cd58582eeb2a877685"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







