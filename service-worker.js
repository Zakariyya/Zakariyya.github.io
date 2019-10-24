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

var precacheConfig = [["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-Arch安装-日志/index.html","34c26a7492db8d74aad77bddc5956447"],["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-arch-arch安装笔记/index.html","8885f96178b1766d44039f008eebd45d"],["D:/me/github/zakariyya.github.io/public/2016/01/15/碎碎念-那些住在手机里的朋友/index.html","c8e547d80595d0058d7a10d19b523ec7"],["D:/me/github/zakariyya.github.io/public/2016/01/28/碎碎念-时光/index.html","243dd9ca53dbf0864c28e50dbee312b1"],["D:/me/github/zakariyya.github.io/public/2016/02/21/电脑问题-禁止软件开机自启动的三种方法/index.html","2c1d01f410483e349138c94839c2e369"],["D:/me/github/zakariyya.github.io/public/2016/02/21/碎碎念-Google-x-’s-Loon，一个互联网气球/index.html","f58fa31ac45f8a6927b1d2d81dacbf6b"],["D:/me/github/zakariyya.github.io/public/2016/02/26/电脑问题-windows7-我的电脑右键-管理“该文件没有与之关联的程序来执行该操作”/index.html","d608b5b5a3c105668787b3d3ff71c2ea"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-QQ右下角弹出新闻框/index.html","d9ce503dbad3030beb6ca5e6842d1b2a"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-win7隐藏IE浏览器/index.html","aebc29f9a996b77e2e515ed4741b3c50"],["D:/me/github/zakariyya.github.io/public/2016/02/28/电脑问题-禁用UEFI安全启动功能/index.html","e2a23928a20f558d9983af8d38ca70a6"],["D:/me/github/zakariyya.github.io/public/2016/02/29/电脑问题-说说在win7下优化软件的必要性/index.html","8f9be1439f914cb13b75fe00fc63755c"],["D:/me/github/zakariyya.github.io/public/2016/03/01/电脑问题-处理快捷方式小箭头/index.html","6f2a33472979211aaeca8a65ba53ba5f"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-一罐硬币实验的讨论——《信号与噪声》/index.html","ee4489b1fbeb0c041c142ea04b8f4df9"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-十二行代码/index.html","6a4358191c885a5e2491f27716b6bc7a"],["D:/me/github/zakariyya.github.io/public/2016/03/04/linux-arch打包sogou/index.html","404b6839d6685799baaab2fc64efe90a"],["D:/me/github/zakariyya.github.io/public/2016/03/06/linux-arch分swap/index.html","ac8b10ae1e65596249fcc941b343da58"],["D:/me/github/zakariyya.github.io/public/2016/03/06/电脑问题-定时关机-睡眠/index.html","98fe2982012362957a99700ee8c69537"],["D:/me/github/zakariyya.github.io/public/2016/03/11/碎碎念-织梦/index.html","fff2b69d040c6519d048300a586078f4"],["D:/me/github/zakariyya.github.io/public/2016/03/14/碎碎念-麻雀告诉我们的故事/index.html","48b25a15389aee815ab1b2c7739f88a4"],["D:/me/github/zakariyya.github.io/public/2016/03/17/碎碎念-还没有晾干的旧伞，闷在寂寞的房里/index.html","8a56fd6fe7565516211c330c297866d6"],["D:/me/github/zakariyya.github.io/public/2016/03/19/电脑问题-windows下启动项菜单-Boot-Manager-问题/index.html","1752bbdcd08f697cd6c69d24927ec930"],["D:/me/github/zakariyya.github.io/public/2016/03/20/碎碎念-春分/index.html","801275262a8855cb037eeb018452682f"],["D:/me/github/zakariyya.github.io/public/2016/03/21/电脑问题-电脑文件搜索神器——Everything/index.html","22bc0d290551fe74b9880a62ad8fc7c1"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-f-lux和“薄暮微光”/index.html","522d7069c6278f839c8e66800e6f0745"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-windows7-打开休眠模式/index.html","f1cb62225480ad0cb60bb3e09da22996"],["D:/me/github/zakariyya.github.io/public/2016/04/05/碎碎念-旧照片/index.html","ce172299860670a99e87f0ec49626a8e"],["D:/me/github/zakariyya.github.io/public/2016/04/07/linux-pppoe上网/index.html","457307cd929157f4f62e978f9c6e4845"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-无标题文章/index.html","671c84bc0dbd9ae8887f2192204315f9"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-看几天韩剧的感想/index.html","e879df369081683319666b9d51226d00"],["D:/me/github/zakariyya.github.io/public/2016/04/18/碎碎念-恶意代码引起的反思/index.html","52679847a9924b1399deea0e91db4d8d"],["D:/me/github/zakariyya.github.io/public/2016/04/22/电脑问题-OneTab-和-轻听/index.html","0ddf8cc22338f2f866760f033666244d"],["D:/me/github/zakariyya.github.io/public/2016/05/04/碎碎念-孙悟空无姓无名的时候，阎王生死簿是怎么写的呢？/index.html","45ca6ab77039d38eeb3d0159662d45f6"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-抠头发丝/index.html","0a2227d07ae22913c29301a72475164f"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-百度，广告/index.html","f434d1ca4b5cb0079b3f5e56c67cdff5"],["D:/me/github/zakariyya.github.io/public/2016/05/25/碎碎念-“hello-os-world-”-of-Boot-Sector/index.html","fae6994369f8eae18d34f2a5d5bf49ea"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏和身体/index.html","087750c3adbcb527e9acf906f143ff95"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏的设计/index.html","712dd081a317d14d26794ed272f48856"],["D:/me/github/zakariyya.github.io/public/2016/06/05/文集-游戏性是什么-游戏性是什么-游戏和视觉/index.html","5d3dc952aa87c222b303dcc419047551"],["D:/me/github/zakariyya.github.io/public/2016/06/06/文集-游戏性是什么-游戏性是什么-游戏和世界/index.html","4b7e3d7a55fb79f4f5c6013726486f89"],["D:/me/github/zakariyya.github.io/public/2016/06/07/文集-游戏性是什么-游戏性是什么-游戏和触觉/index.html","d71578b0202ad5276ccced22f4743261"],["D:/me/github/zakariyya.github.io/public/2016/06/08/文集-游戏性是什么-游戏性是什么-专注游戏的原因/index.html","ac095be722634e25e9a413bd8c275685"],["D:/me/github/zakariyya.github.io/public/2016/06/10/文集-游戏性是什么-游戏性是什么-难易度平衡设计与效率预测/index.html","6411d05f596732d90af9963d5ee3dc3e"],["D:/me/github/zakariyya.github.io/public/2016/06/11/文集-游戏性是什么-游戏性是什么-结构/index.html","ecf6bbafe26c8d17ddf5bb0c6482733a"],["D:/me/github/zakariyya.github.io/public/2016/06/12/文集-游戏性是什么-游戏性是什么-叙事和Narreme/index.html","cb31ac247a9317d56738ade433b7fae4"],["D:/me/github/zakariyya.github.io/public/2016/06/13/文集-游戏性是什么-游戏性是什么-记录《游戏性是什么》/index.html","ad0887219f26692f3d003f9829d8bf58"],["D:/me/github/zakariyya.github.io/public/2016/09/07/linux-sogou输入配置/index.html","7383c6c9656b4c2e270ce45305b7b0b5"],["D:/me/github/zakariyya.github.io/public/2016/09/11/linux-ubuntu修改ssh端口/index.html","07d83c6eaabf4c4efcd9e3a7698596f8"],["D:/me/github/zakariyya.github.io/public/2016/10/30/碎碎念-日常20161030/index.html","382e78ce6692121dce56e34038c21dd3"],["D:/me/github/zakariyya.github.io/public/2016/10/31/碎碎念-日常——google涂鸦/index.html","1f1e222ed435a1f3d316576c81fef6b5"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Google18岁了/index.html","8ed20c24e1756b5b45bb17f16a047fae"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Many-Doors-In-My-Life/index.html","702e439e8b2794d0fc3e24963add1aa1"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-《越晚越开心》停播/index.html","bc9e6e46ffb7d99c3ef5055e36d7b314"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-分数，教育的目的/index.html","2c299e2bb80a007ba85025bdc3f44887"],["D:/me/github/zakariyya.github.io/public/2017/01/21/电脑问题-Tomcat提示指定的服务未安装Unable-to-open-the-service-tomcat/index.html","3e7be26ae7b604de925018ab813693bf"],["D:/me/github/zakariyya.github.io/public/2017/01/24/电脑问题-windows10关闭“自动更新”/index.html","bc4309c10eafc615652f8424d0639cb4"],["D:/me/github/zakariyya.github.io/public/2017/03/24/backEnd-服务配置-Redis/index.html","7cc8bc5f9d010bb515b7d1566c99535d"],["D:/me/github/zakariyya.github.io/public/2017/03/24/科普-Update与Modify两者区别/index.html","ddf4694b661f60bf8f0b16bdbf7aada2"],["D:/me/github/zakariyya.github.io/public/2017/04/23/backEnd-服务配置-apahce错误提示the-requested-operation-has-failed/index.html","8107b9e9eac91e3d20411169dbb02ac9"],["D:/me/github/zakariyya.github.io/public/2017/05/23/linux-解决CentOS（6和7版本），-etc-sysconfig-下没有iptables的问题-副本/index.html","a52d89a839e4f645f3d9be915d4c04df"],["D:/me/github/zakariyya.github.io/public/2017/06/16/frontEnd-ajax-使用ajax-方法加载服务器数据/index.html","336231d2733d31953ef5a70d2b950a9c"],["D:/me/github/zakariyya.github.io/public/2017/06/18/frontEnd-ajax-this-id和-this-attr-id/index.html","0e3d2b15c052bfc27c8cc0dea2883e10"],["D:/me/github/zakariyya.github.io/public/2017/08/05/电脑问题-eclipse中批量修改Java类文件中引入的package包路径/index.html","5ba7981efa69cb091e571b836e625f4d"],["D:/me/github/zakariyya.github.io/public/2017/08/22/backEnd-maven-maven项目jar包导入失败/index.html","7c6d59775534de686512ab6663805892"],["D:/me/github/zakariyya.github.io/public/2017/08/31/frontEnd-ajax-回调函数（callback）是什么？/index.html","9fe18f56bc19908e30d8b8687601c370"],["D:/me/github/zakariyya.github.io/public/2018/03/14/碎碎念-我未曾见过你-而你的光却照耀到了我/index.html","7e0cc422fefae5b4e34de470a14a94fd"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring-简介/index.html","56981de5ade4db8a645742296551532b"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring分析/index.html","52cf1641f2e85b0041ee694bfb4f78a6"],["D:/me/github/zakariyya.github.io/public/2018/03/24/科普-视频格式/index.html","f22e79f2ba73bdafd42db9a232cab29a"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-arch-开机自启动脚本/index.html","1dd13605ba99f1c09d8cd1a956215b20"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-客户端/index.html","a7cf176bfb3661f7df76733b90f00f17"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-服务端/index.html","8bd37e4e565427f01721ddb5ca0a6444"],["D:/me/github/zakariyya.github.io/public/2018/06/28/backEnd-spring-Spring-Boot-YML文件配置多环境/index.html","5a500298349244697e7126e79a8f828f"],["D:/me/github/zakariyya.github.io/public/2018/06/28/搭建-Hexo搭建/index.html","d483507e3a69b6a7b80e8ac81040cab7"],["D:/me/github/zakariyya.github.io/public/2018/07/03/科普-软件为何会有那么多权限/index.html","17ab00aaa467a3eb4709df37301b8748"],["D:/me/github/zakariyya.github.io/public/2018/07/12/编程-Java调用Python/index.html","f9693ba33a2594a68bcbd550013c7328"],["D:/me/github/zakariyya.github.io/public/2018/07/19/backEnd-spring-Spring-Boot多数据源整合/index.html","8cb8db00563b1835d86ffa9f439b2503"],["D:/me/github/zakariyya.github.io/public/2018/07/21/backEnd-修改形参对象值，会影响实参/index.html","c4a60dea9dee202f066933b4df4ea977"],["D:/me/github/zakariyya.github.io/public/2018/08/01/搭建-Jib构建你的第一个java镜像/index.html","a08dd2e391147951d747686eae27da8d"],["D:/me/github/zakariyya.github.io/public/2018/08/01/科普-IaaS、SaaS-和-PaaS-的区别/index.html","424a5004b0a44e4647c957878bb62020"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-Maven-安装与入门/index.html","d722f329d0d5d24d988b65299498bb10"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-基于-Ubuntu-搭建个人网盘/index.html","bbcf2b1ca70ac0c2066864b757b8f172"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-基于Ubuntu搭建FTP/index.html","c56a52a5ed7d63a6c6686936ebad0ac6"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-搭建Git服务器/index.html","b310e8d5f66300963074d78470898faa"],["D:/me/github/zakariyya.github.io/public/2018/08/10/搭建-搭建javaweb开发环境/index.html","209351b932b1900cbb739ac5c722b43d"],["D:/me/github/zakariyya.github.io/public/2018/08/15/搭建-搭建个人-Leanote-云笔记本/index.html","076c339a20f341df84a91ca129d8f4f6"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-FTP文件上传、下载/index.html","807fb25bba72f3c7241dd51737040355"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-文件上传下载/index.html","b8607eab66fd538d46422006ca87ac77"],["D:/me/github/zakariyya.github.io/public/2018/08/23/backEnd-spring-springboot-Component下-Autowired的注入为null/index.html","cf1277c85c24e4e84b49ba4dff1b552f"],["D:/me/github/zakariyya.github.io/public/2018/09/10/碎碎念-广电对游戏版号的限制/index.html","dee286f953f333eef224b77dbc2636ad"],["D:/me/github/zakariyya.github.io/public/2018/09/19/linux-Ubuntu添加可信任根证书/index.html","6d9369da9829a242c2e30690be326f93"],["D:/me/github/zakariyya.github.io/public/2018/09/19/搭建-mysql安装文档/index.html","5b2917785f82c0a90fed3ca4860c236c"],["D:/me/github/zakariyya.github.io/public/2018/09/23/搭建-nginx-搭建文档/index.html","ef53528acbbb855de0784dd423433854"],["D:/me/github/zakariyya.github.io/public/2018/09/23/电脑问题/Teamviewer-重置ID的工具/index.html","850c67402651d4289e1b9b43d160a077"],["D:/me/github/zakariyya.github.io/public/2018/12/19/backEnd-IDEA多模块项目Module-must-not-contain-source-root-The-root-already-belongs-to-module/index.html","049145e1883d932da061836465e5c45b"],["D:/me/github/zakariyya.github.io/public/2019/01/02/编程-markdown折叠内容语法/index.html","58cf2ccca8ebdf4b0fa7457c9cb13165"],["D:/me/github/zakariyya.github.io/public/2019/01/03/backEnd-maven-maven标签字典/index.html","bccb4c0c0601ed5d102c61556380eab4"],["D:/me/github/zakariyya.github.io/public/2019/01/11/linux-docker离线安装/index.html","788c120abf36e627f6091bfae7b007fe"],["D:/me/github/zakariyya.github.io/public/2019/01/17/linux-命令行下安装-oracle-11gR2-数据库/index.html","50bcd0b4c78b85f36f542dde92cf50b9"],["D:/me/github/zakariyya.github.io/public/2019/01/24/backEnd-spring-异常捕获/index.html","62bdee2d9161b7bc324718c58e247b5b"],["D:/me/github/zakariyya.github.io/public/2019/01/27/编程-Git/index.html","3f359c878f0a124deab4826be1314bd7"],["D:/me/github/zakariyya.github.io/public/2019/02/24/backEnd/spring/SpringCloud/index.html","74b39a88df2611a8762ce017719a5342"],["D:/me/github/zakariyya.github.io/public/2019/03/01/科普-常见版本号/index.html","6693c3c78a5a298feb7a0b6446efe71b"],["D:/me/github/zakariyya.github.io/public/2019/03/04/搭建-RabbitMQ-server搭建/index.html","65b7ef6ca11f326c552127bdffe34ef5"],["D:/me/github/zakariyya.github.io/public/2019/03/12/搭建-翻墙-v2ray搭建启动/index.html","4376da6b3a996674a033b3826a3df677"],["D:/me/github/zakariyya.github.io/public/2019/03/14/backEnd-rabbitMQ-交换器/index.html","43e87203cec066e7fcc7e53824431741"],["D:/me/github/zakariyya.github.io/public/2030/08/16/电脑问题-How-to-kill-a-currently-using-port-on-localhost-in-windows/index.html","304dc6b3ffd4e55fff9bfe5ceb12c93a"],["D:/me/github/zakariyya.github.io/public/archives/2015/12/index.html","73f700091534c15748872001897b9ceb"],["D:/me/github/zakariyya.github.io/public/archives/2015/index.html","2bf5fc99a4cb549ead621843032eca8a"],["D:/me/github/zakariyya.github.io/public/archives/2016/01/index.html","87bff069f8b6d9149ff2dff447ebf2e9"],["D:/me/github/zakariyya.github.io/public/archives/2016/02/index.html","7f9d7df703e3f3dbc20be2e1823c9ee7"],["D:/me/github/zakariyya.github.io/public/archives/2016/03/index.html","0e1882a98835f780b7780062247852c8"],["D:/me/github/zakariyya.github.io/public/archives/2016/03/page/2/index.html","31830a8f3061ccad0c4604d1a5cb151e"],["D:/me/github/zakariyya.github.io/public/archives/2016/04/index.html","4a232535911f7977b9c47a6f5b4f6350"],["D:/me/github/zakariyya.github.io/public/archives/2016/05/index.html","3eb0d6f578f4061b05613f31748f69eb"],["D:/me/github/zakariyya.github.io/public/archives/2016/06/index.html","05ff8ef437e5e32c311a3266ce9606f0"],["D:/me/github/zakariyya.github.io/public/archives/2016/09/index.html","a1b25812e4ff3b9eb89f08b49cbb440e"],["D:/me/github/zakariyya.github.io/public/archives/2016/10/index.html","ead22e66c058ae3041fa6cadd4054e2f"],["D:/me/github/zakariyya.github.io/public/archives/2016/11/index.html","add1d177ba4c1ef35cf45b09cd619d6c"],["D:/me/github/zakariyya.github.io/public/archives/2016/index.html","471ac6b8bfdbe9b2e2da6e5be679edc1"],["D:/me/github/zakariyya.github.io/public/archives/2016/page/2/index.html","fb0fc5801504669d790843aad41ca161"],["D:/me/github/zakariyya.github.io/public/archives/2016/page/3/index.html","4c6a8065151297cf576782257293e3fc"],["D:/me/github/zakariyya.github.io/public/archives/2016/page/4/index.html","7a14cf53aaeed6b028ed835e5bff74ab"],["D:/me/github/zakariyya.github.io/public/archives/2016/page/5/index.html","688879c06f547f94f16c76bcd53baf62"],["D:/me/github/zakariyya.github.io/public/archives/2016/page/6/index.html","4dcaaab2043067c548244b9cc839a66a"],["D:/me/github/zakariyya.github.io/public/archives/2017/01/index.html","27b1be613de7cc2746e169ca23b9c2e8"],["D:/me/github/zakariyya.github.io/public/archives/2017/03/index.html","d8eb9d912142df675edf86b4c8033358"],["D:/me/github/zakariyya.github.io/public/archives/2017/04/index.html","6c05cf9ea1d5bbb428666f3e7844b3f2"],["D:/me/github/zakariyya.github.io/public/archives/2017/05/index.html","ce14aea08b6416f99eb60d470008d483"],["D:/me/github/zakariyya.github.io/public/archives/2017/06/index.html","9e762f6a36c22cc77c4bf6fbbffc551a"],["D:/me/github/zakariyya.github.io/public/archives/2017/08/index.html","067c60717ea85661dc3f736c85140824"],["D:/me/github/zakariyya.github.io/public/archives/2017/index.html","5736cdab716bac46d7b13763335ca863"],["D:/me/github/zakariyya.github.io/public/archives/2017/page/2/index.html","289527f5228732e7d59aed6c077b2515"],["D:/me/github/zakariyya.github.io/public/archives/2018/03/index.html","7622043bdfa4a262dba7edf6ec871503"],["D:/me/github/zakariyya.github.io/public/archives/2018/04/index.html","35f7c4efa150d254d13feffbc4a6f9cb"],["D:/me/github/zakariyya.github.io/public/archives/2018/06/index.html","63b7ce9b03a11a4914e4bf78ca985d33"],["D:/me/github/zakariyya.github.io/public/archives/2018/07/index.html","08cd1bbc1b6832b1d7ec3fd5967cd87d"],["D:/me/github/zakariyya.github.io/public/archives/2018/08/index.html","3794190eb5043fa50b0358f9c84365c6"],["D:/me/github/zakariyya.github.io/public/archives/2018/08/page/2/index.html","400eac7e674c1161b305ad63c13be947"],["D:/me/github/zakariyya.github.io/public/archives/2018/09/index.html","569faea2182ea32bbf577c584c870120"],["D:/me/github/zakariyya.github.io/public/archives/2018/12/index.html","9ded5ba2c40f5403793f20e8dc18ab95"],["D:/me/github/zakariyya.github.io/public/archives/2018/index.html","0ed035aa1b5c02d55fca11c0ed0a22bc"],["D:/me/github/zakariyya.github.io/public/archives/2018/page/2/index.html","73437d0100df975730da259606773446"],["D:/me/github/zakariyya.github.io/public/archives/2018/page/3/index.html","96ae6b4a2d9e22ea98c76fa007986977"],["D:/me/github/zakariyya.github.io/public/archives/2019/01/index.html","a18806486acd59f62072c28ec5548d74"],["D:/me/github/zakariyya.github.io/public/archives/2019/02/index.html","320b2323ae67e293ddefa3fd7288b7c9"],["D:/me/github/zakariyya.github.io/public/archives/2019/03/index.html","9e95080e4a0e97b1a7320841b21f8ebe"],["D:/me/github/zakariyya.github.io/public/archives/2019/index.html","4225c2bd02a981868162ab859ec98de2"],["D:/me/github/zakariyya.github.io/public/archives/2019/page/2/index.html","4128aec19eda7a666500447bbe0c03bf"],["D:/me/github/zakariyya.github.io/public/archives/2030/08/index.html","f2975738569859bb40b377400e4855c6"],["D:/me/github/zakariyya.github.io/public/archives/2030/index.html","9ed585b8c3f2cd2202909ec69622f937"],["D:/me/github/zakariyya.github.io/public/archives/index.html","6a829438e1bb81074f6e40283a0d6c36"],["D:/me/github/zakariyya.github.io/public/archives/page/10/index.html","e4fef3b5675dc3710dba7a2e594851d2"],["D:/me/github/zakariyya.github.io/public/archives/page/11/index.html","f648a56b62ea2b496a181d271448c5c7"],["D:/me/github/zakariyya.github.io/public/archives/page/2/index.html","b0d082964ca4f2ba0c9a515fefcb0296"],["D:/me/github/zakariyya.github.io/public/archives/page/3/index.html","6bb4363ec75eaa9b57f3de58317d5f16"],["D:/me/github/zakariyya.github.io/public/archives/page/4/index.html","de64421e6151c07ccc1a2d090f9c6f6f"],["D:/me/github/zakariyya.github.io/public/archives/page/5/index.html","598be79f3007b36ba3a4214189a00159"],["D:/me/github/zakariyya.github.io/public/archives/page/6/index.html","8d548b15303174d554a5ea414dec39e7"],["D:/me/github/zakariyya.github.io/public/archives/page/7/index.html","ce854fa2742deed5ed682302f785eee3"],["D:/me/github/zakariyya.github.io/public/archives/page/8/index.html","8da3d7f3bb8553804c67095f2399b54e"],["D:/me/github/zakariyya.github.io/public/archives/page/9/index.html","ca3e81c21628c978e308823b04b3e43f"],["D:/me/github/zakariyya.github.io/public/categories/Program/index.html","efca7b2d9c979be06c1caca1a7da41d6"],["D:/me/github/zakariyya.github.io/public/categories/backEnd/index.html","9e9ceddde1dd4909501fba54a49292fc"],["D:/me/github/zakariyya.github.io/public/categories/index.html","7f344275ece1bf59d497abed232b851c"],["D:/me/github/zakariyya.github.io/public/categories/java-Program/index.html","6514b9d5fc0fcd61fa94d8691e002f01"],["D:/me/github/zakariyya.github.io/public/categories/linux/index.html","d96e8887de0d1c6f5925009aa20343b8"],["D:/me/github/zakariyya.github.io/public/categories/windows电脑问题/index.html","ea2820eb0fd87e1e1881c102def949b2"],["D:/me/github/zakariyya.github.io/public/categories/windows电脑问题/page/2/index.html","4c4a160fe827c29edcade528dd414cc5"],["D:/me/github/zakariyya.github.io/public/categories/搭建/index.html","0fae72cf617d7f70c9ed41ab12bcc0e9"],["D:/me/github/zakariyya.github.io/public/categories/搭建/page/2/index.html","c8a8785a08835287ca97e793d1175bfe"],["D:/me/github/zakariyya.github.io/public/categories/日记本/index.html","9d3c223c7d118cbd169c533ec09506aa"],["D:/me/github/zakariyya.github.io/public/categories/日记本/page/2/index.html","025648fc15c31ad6092ca0982ac90468"],["D:/me/github/zakariyya.github.io/public/categories/服务配置/index.html","ce39c47b986f1abd72a94db14790eba5"],["D:/me/github/zakariyya.github.io/public/categories/游戏性是什么/index.html","e797ab7f05e7948df89c2efeaafe6b10"],["D:/me/github/zakariyya.github.io/public/categories/电脑问题/index.html","bc4031bb7cb6a9d694c2ffa7b14d3575"],["D:/me/github/zakariyya.github.io/public/categories/科普/index.html","a178d5e8e25df9528d65dc8197540473"],["D:/me/github/zakariyya.github.io/public/categories/系统-Linux/index.html","3b7c3244387abb6dda53f10f22b66ce7"],["D:/me/github/zakariyya.github.io/public/categories/系统/index.html","025b30e0cc4c6688d8819efd1fe50b20"],["D:/me/github/zakariyya.github.io/public/categories/编程/index.html","3fd6b202168d56c232c28709a3bfc199"],["D:/me/github/zakariyya.github.io/public/categories/翻墙-Linux/index.html","81226b72b94a2374c5cc9ac3b554015f"],["D:/me/github/zakariyya.github.io/public/categories/翻墙/index.html","1cf0e81e2af904ca2ebcc7a71ede7d83"],["D:/me/github/zakariyya.github.io/public/categories/软件/index.html","23aefac54502ec3a9fdca16d2d3d7a4d"],["D:/me/github/zakariyya.github.io/public/categories/随笔/index.html","a2b2ea236c2f032f075d3d61bde2377b"],["D:/me/github/zakariyya.github.io/public/css/base.css","fcf23de323fad904dc5ceab77d2a7cf7"],["D:/me/github/zakariyya.github.io/public/css/calendar.css","702500ec322c3d9ca65d704c135a5921"],["D:/me/github/zakariyya.github.io/public/css/code.css","97f4c1dc01be1105228c1807f55b74e5"],["D:/me/github/zakariyya.github.io/public/css/footer.css","1fc73516d161e9161ddd9aafcdcc6e66"],["D:/me/github/zakariyya.github.io/public/css/header.css","6be9e934c0161c801d5ef99623854411"],["D:/me/github/zakariyya.github.io/public/css/index.css","f75d4fa1e08a1c31522afe034fc65e7f"],["D:/me/github/zakariyya.github.io/public/css/main.css","d64b9c23395e66d5542ef28d8b9a0943"],["D:/me/github/zakariyya.github.io/public/css/navbar.css","9d9c69ea1d7c4421cad056e109aa3309"],["D:/me/github/zakariyya.github.io/public/css/post.css","17bf25bc7964184b4c1b67939f13d871"],["D:/me/github/zakariyya.github.io/public/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["D:/me/github/zakariyya.github.io/public/img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["D:/me/github/zakariyya.github.io/public/img/top.jpg","03cc36b2ab3cc5ce08f3589aaf3527b3"],["D:/me/github/zakariyya.github.io/public/img/top1.jpg","5e034327988f6ab5749a7f0ed3359976"],["D:/me/github/zakariyya.github.io/public/index.html","9fe88714552ff944eff09fbe82585049"],["D:/me/github/zakariyya.github.io/public/js/copy.js","f4607057c0513bd07a69fcac08121979"],["D:/me/github/zakariyya.github.io/public/js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["D:/me/github/zakariyya.github.io/public/js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["D:/me/github/zakariyya.github.io/public/js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["D:/me/github/zakariyya.github.io/public/js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["D:/me/github/zakariyya.github.io/public/js/main.js","04670d6d5af2a30bfdf379cf61e7b629"],["D:/me/github/zakariyya.github.io/public/js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["D:/me/github/zakariyya.github.io/public/js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["D:/me/github/zakariyya.github.io/public/js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["D:/me/github/zakariyya.github.io/public/js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["D:/me/github/zakariyya.github.io/public/js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["D:/me/github/zakariyya.github.io/public/js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["D:/me/github/zakariyya.github.io/public/js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["D:/me/github/zakariyya.github.io/public/js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["D:/me/github/zakariyya.github.io/public/js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["D:/me/github/zakariyya.github.io/public/js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["D:/me/github/zakariyya.github.io/public/js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["D:/me/github/zakariyya.github.io/public/js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["D:/me/github/zakariyya.github.io/public/js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["D:/me/github/zakariyya.github.io/public/js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["D:/me/github/zakariyya.github.io/public/js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["D:/me/github/zakariyya.github.io/public/js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["D:/me/github/zakariyya.github.io/public/js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["D:/me/github/zakariyya.github.io/public/js/transition.js","bd261a5dda799613501070ecc19d6e69"],["D:/me/github/zakariyya.github.io/public/js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["D:/me/github/zakariyya.github.io/public/page/10/index.html","b684edee502ac5713b4d78778c0a1adc"],["D:/me/github/zakariyya.github.io/public/page/11/index.html","64e62d939ebc73bd9102e8490c6f6b4c"],["D:/me/github/zakariyya.github.io/public/page/2/index.html","8fe2a427a40437ec794aa8dae67b283b"],["D:/me/github/zakariyya.github.io/public/page/3/index.html","ded46fc19a35eae0865e7a99f672cc6f"],["D:/me/github/zakariyya.github.io/public/page/4/index.html","29464f80b114c9356e8fa7d74784a815"],["D:/me/github/zakariyya.github.io/public/page/5/index.html","db256ff0ce697dfbcc862c891fbec841"],["D:/me/github/zakariyya.github.io/public/page/6/index.html","454594109c76550089dcedbe68eb5e4b"],["D:/me/github/zakariyya.github.io/public/page/7/index.html","0974e22eb24f4474a53ce0be588c0cf5"],["D:/me/github/zakariyya.github.io/public/page/8/index.html","366439c7dffa4c15bff36d3fba23edf6"],["D:/me/github/zakariyya.github.io/public/page/9/index.html","b5372e53d129300ad462c2d01dc94224"],["D:/me/github/zakariyya.github.io/public/tags/FTP-文件上传-文件下载/index.html","c06f78e09984a47d5735da6ffa9b9f9c"],["D:/me/github/zakariyya.github.io/public/tags/Google/index.html","2dfe26ba0864d389c83c055b27584900"],["D:/me/github/zakariyya.github.io/public/tags/RabbitMQ/index.html","42451c34dbbe8e1e80a5aee507d757ea"],["D:/me/github/zakariyya.github.io/public/tags/Ubuntu/index.html","6cfa9a173f806d31c5fe12357ff4a7fa"],["D:/me/github/zakariyya.github.io/public/tags/ajax-前端/index.html","dc86b42f90f3c10e0a237d3f5520e1e0"],["D:/me/github/zakariyya.github.io/public/tags/apahce/index.html","a3f119ada5896dda4cae6a01d3c0325c"],["D:/me/github/zakariyya.github.io/public/tags/arch/index.html","a16241d7c9e0d835cf51c2081f5755f1"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程-rabbitMQ/index.html","28d2b285e09ae11514855aaa013dc950"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程/index.html","964197361d0d14f871b6638dd0898cae"],["D:/me/github/zakariyya.github.io/public/tags/git/index.html","569c131bd2c6bd56519abc60f35a3a4f"],["D:/me/github/zakariyya.github.io/public/tags/hexo-搭建/index.html","76850a609e750b264ed5f0beec57e7b1"],["D:/me/github/zakariyya.github.io/public/tags/index.html","9e1d8436594052460a3794d1822639dc"],["D:/me/github/zakariyya.github.io/public/tags/java-文件上传-文件下载-编程/index.html","7f87a5e11546afea7b9912eb2436434b"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos-oracle-databases/index.html","683a4617e81e303cf511147d9bccb197"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos/index.html","37b47b486cbb7702931318e9a6bf66df"],["D:/me/github/zakariyya.github.io/public/tags/linux-docker-Oracle-Ubuntu/index.html","db7435db179bb425a55ed015c30f470c"],["D:/me/github/zakariyya.github.io/public/tags/linux-sogou/index.html","41360a7a8586d34d471df5c96ee5d9ed"],["D:/me/github/zakariyya.github.io/public/tags/linux-ssh/index.html","4f827a4aa95c0818a956872c0c092da4"],["D:/me/github/zakariyya.github.io/public/tags/linux-网络/index.html","8974cb22d969576c7298d4c549b66945"],["D:/me/github/zakariyya.github.io/public/tags/linux/index.html","4185a21e2a448153a40ad77576b5a650"],["D:/me/github/zakariyya.github.io/public/tags/maven/index.html","3cc1de70998932968e046ad4e38cc725"],["D:/me/github/zakariyya.github.io/public/tags/nginx/index.html","c5debe84a066feff378f2111084e855d"],["D:/me/github/zakariyya.github.io/public/tags/spring-SpringCloud-Eureka/index.html","219f7e08a06694fd35b02e109b14c860"],["D:/me/github/zakariyya.github.io/public/tags/spring/index.html","f8d7e05bf496015a228538081f4145a4"],["D:/me/github/zakariyya.github.io/public/tags/springboot/index.html","3910fe378ea9c61db36465fad9f742c2"],["D:/me/github/zakariyya.github.io/public/tags/teamviewer-电脑问题/index.html","27d9097e45a0a0140f3f2db69c1e5db5"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git-服务器/index.html","17a3f66308a58438241f5ed3da0c2224"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Leanote-云-笔记-云笔记/index.html","90c9fa88c4d7e6d63785e06ea01dec39"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Maven/index.html","ab0b4061cf1b38584370d5619e178dcb"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Ubuntu-FTP/index.html","c75413f8a2c21b85a07a18c60070accd"],["D:/me/github/zakariyya.github.io/public/tags/搭建-mysql/index.html","819f8ce93a67809932e7962068af0ff3"],["D:/me/github/zakariyya.github.io/public/tags/搭建-开发环境-javaweb/index.html","112de66719f7ba10103e0173a601c837"],["D:/me/github/zakariyya.github.io/public/tags/搭建-网盘-Ubuntu/index.html","c687ce863334238b3f5ef1da57d0d7a9"],["D:/me/github/zakariyya.github.io/public/tags/搭建/index.html","2f38d4fad6a04d69fe4d0a48879fde56"],["D:/me/github/zakariyya.github.io/public/tags/游戏/index.html","69e2c7e9e86f1726ed00f2e75e44ad76"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题-端口-占用/index.html","a1375984d1f662881da4e3e5e83713d4"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题/index.html","212a384d864c7ced0be41b586aea4cf0"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题/page/2/index.html","91d01271f64e28499c0ad8c07e854e86"],["D:/me/github/zakariyya.github.io/public/tags/碎碎-子涵/index.html","465d389a15683e884b81453c554f58ad"],["D:/me/github/zakariyya.github.io/public/tags/神器/index.html","6ab5c28e4da3c58709e85478f66d7d94"],["D:/me/github/zakariyya.github.io/public/tags/科普/index.html","bfc90b8e0f8a73da6a512224ef1f7ce3"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks-arch/index.html","d88941d8b8d137e4ac2b8e64720c1010"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks/index.html","c78e083358460810802b4eab26f6c9f7"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-v2ray/index.html","234d3c887dafa28fd24938dc884b9aec"]];
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







