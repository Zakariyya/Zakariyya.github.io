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

var precacheConfig = [["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-Arch安装-日志/index.html","4d19ad34053d608c8987464fc8e6f5df"],["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-arch-arch安装笔记/index.html","9688f0400c2ce6a81a90280fff0145ab"],["D:/me/github/zakariyya.github.io/public/2016/01/15/碎碎念-那些住在手机里的朋友/index.html","4a9269bf9f4e3ca164bea057aa5c4774"],["D:/me/github/zakariyya.github.io/public/2016/01/28/碎碎念-时光/index.html","1c0fee1ca4d3f42f990bd9b7f933a1b0"],["D:/me/github/zakariyya.github.io/public/2016/02/21/电脑问题-禁止软件开机自启动的三种方法/index.html","0f378f3a7c7635c233603aecd65cc25c"],["D:/me/github/zakariyya.github.io/public/2016/02/21/碎碎念-Google-x-’s-Loon，一个互联网气球/index.html","a11f945d797569a579fde5c28263a9d9"],["D:/me/github/zakariyya.github.io/public/2016/02/26/电脑问题-windows7-我的电脑右键-管理“该文件没有与之关联的程序来执行该操作”/index.html","71812bcd104b9ef5f41cee5fa0ad78bf"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-QQ右下角弹出新闻框/index.html","52f81d798b9c6de47c70a6d1cd85d431"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-win7隐藏IE浏览器/index.html","a8e125861598a7b3864ff1d11647c40a"],["D:/me/github/zakariyya.github.io/public/2016/02/28/电脑问题-禁用UEFI安全启动功能/index.html","38df0912ea4cd8ed8ecfde49b36d487a"],["D:/me/github/zakariyya.github.io/public/2016/02/29/电脑问题-说说在win7下优化软件的必要性/index.html","f25e93489762a6f01e0abb0aa35cde44"],["D:/me/github/zakariyya.github.io/public/2016/03/01/电脑问题-处理快捷方式小箭头/index.html","f897ff5ad7f208e82a56591aeee36d2c"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-一罐硬币实验的讨论——《信号与噪声》/index.html","44de91f2c6d6eeee98cdd2ce291da649"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-十二行代码/index.html","860739833b11ca06b17ba067c0abe22d"],["D:/me/github/zakariyya.github.io/public/2016/03/04/linux-arch打包sogou/index.html","6cab3808b0ffa590e8a3c1be83aa4a0f"],["D:/me/github/zakariyya.github.io/public/2016/03/06/linux-arch分swap/index.html","e7835e950a409f2aea0cd56dbcdf6be0"],["D:/me/github/zakariyya.github.io/public/2016/03/06/电脑问题-定时关机-睡眠/index.html","a5035b084e93af6319cffa4da6a3d00d"],["D:/me/github/zakariyya.github.io/public/2016/03/11/碎碎念-织梦/index.html","5d74c559636ff702d869862ff4bf46e8"],["D:/me/github/zakariyya.github.io/public/2016/03/14/碎碎念-麻雀告诉我们的故事/index.html","ac17894218d27381c6733ea7383a06ec"],["D:/me/github/zakariyya.github.io/public/2016/03/17/碎碎念-还没有晾干的旧伞，闷在寂寞的房里/index.html","9631f3134865239452db96f4045e4705"],["D:/me/github/zakariyya.github.io/public/2016/03/19/电脑问题-windows下启动项菜单-Boot-Manager-问题/index.html","fad6b05cdbd9d479311c7b020bfb38ce"],["D:/me/github/zakariyya.github.io/public/2016/03/20/碎碎念-春分/index.html","66b6c18613d6c25a65b164204bf281fe"],["D:/me/github/zakariyya.github.io/public/2016/03/21/电脑问题-电脑文件搜索神器——Everything/index.html","2cbe04aa034ceb8e68ebc47682cdd072"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-f-lux和“薄暮微光”/index.html","924671a3193c9ab9b86aec9b4d18d5ed"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-windows7-打开休眠模式/index.html","a8a5a7dcb1adcace2e3a95f46c80fae7"],["D:/me/github/zakariyya.github.io/public/2016/04/05/碎碎念-旧照片/index.html","c256878a770afe4ff2189f14cd9d6ec5"],["D:/me/github/zakariyya.github.io/public/2016/04/07/linux-pppoe上网/index.html","31ea1cd151add66598cb5eeddcdcfea5"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-无标题文章/index.html","78d756e199e5a727033cfacd1ab074c8"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-看几天韩剧的感想/index.html","1cb004c3d073dc8cee03b6b0c1d4a8df"],["D:/me/github/zakariyya.github.io/public/2016/04/18/碎碎念-恶意代码引起的反思/index.html","b23216f886a8fa42e491d1c49ccfabc8"],["D:/me/github/zakariyya.github.io/public/2016/04/22/电脑问题-OneTab-和-轻听/index.html","8c1d3dae4f9093e196926ed36a91c963"],["D:/me/github/zakariyya.github.io/public/2016/05/04/碎碎念-孙悟空无姓无名的时候，阎王生死簿是怎么写的呢？/index.html","dd3e0231bc6bedc24f2b330b25963ae3"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-抠头发丝/index.html","cfbfbb240344784d3f33bbcb74942abc"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-百度，广告/index.html","255daf2cc5b144b02e0204dbbc51c2ea"],["D:/me/github/zakariyya.github.io/public/2016/05/25/碎碎念-“hello-os-world-”-of-Boot-Sector/index.html","a799d95ce9f4345576ccb7d5e3798878"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏和身体/index.html","72d9be299e4bf80ed1986efdc999d8d4"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏的设计/index.html","394c13361129f9f85e191c9bb35ad330"],["D:/me/github/zakariyya.github.io/public/2016/06/05/文集-游戏性是什么-游戏性是什么-游戏和视觉/index.html","8c19b7bba773d420039dfce763c0887d"],["D:/me/github/zakariyya.github.io/public/2016/06/06/文集-游戏性是什么-游戏性是什么-游戏和世界/index.html","f30c04a6484906330d0b8e468b206013"],["D:/me/github/zakariyya.github.io/public/2016/06/07/文集-游戏性是什么-游戏性是什么-游戏和触觉/index.html","5226eed1a449c542e1a7f20bcbb320d5"],["D:/me/github/zakariyya.github.io/public/2016/06/08/文集-游戏性是什么-游戏性是什么-专注游戏的原因/index.html","25cfba41dcc0c10147906a4ba05b7293"],["D:/me/github/zakariyya.github.io/public/2016/06/10/文集-游戏性是什么-游戏性是什么-难易度平衡设计与效率预测/index.html","946bd5065545a507ae1aa572705ea92f"],["D:/me/github/zakariyya.github.io/public/2016/06/11/文集-游戏性是什么-游戏性是什么-结构/index.html","220444fdee667ab75c7a3334f114da5b"],["D:/me/github/zakariyya.github.io/public/2016/06/12/文集-游戏性是什么-游戏性是什么-叙事和Narreme/index.html","84ad36152ac62b7024f5fc9cf088bdd2"],["D:/me/github/zakariyya.github.io/public/2016/06/13/文集-游戏性是什么-游戏性是什么-记录《游戏性是什么》/index.html","6f0b90d4bc7d330f571ecfa8086d6b08"],["D:/me/github/zakariyya.github.io/public/2016/09/07/linux-sogou输入配置/index.html","ca54751fc4ca3f4fdba9e4a7304f8dad"],["D:/me/github/zakariyya.github.io/public/2016/09/11/linux-ubuntu修改ssh端口/index.html","57490e52a17c250187c16c12387cced6"],["D:/me/github/zakariyya.github.io/public/2016/10/30/碎碎念-日常20161030/index.html","5319773c5900b7597beba86eec9eb372"],["D:/me/github/zakariyya.github.io/public/2016/10/31/碎碎念-日常——google涂鸦/index.html","fd13a21449d5f7c13006ca99deb98b71"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Google18岁了/index.html","f0af6707efe7d8651c17d5dade194799"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Many-Doors-In-My-Life/index.html","fe25e7002aa1bd07ef82e6d5e7a14e2e"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-《越晚越开心》停播/index.html","71a3adbee7dc8b67d7105fa4a193b686"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-分数，教育的目的/index.html","0781e41487bb353235ded683805837d2"],["D:/me/github/zakariyya.github.io/public/2017/01/21/电脑问题-Tomcat提示指定的服务未安装Unable-to-open-the-service-tomcat/index.html","69613cc7332f7bce057465306165557f"],["D:/me/github/zakariyya.github.io/public/2017/01/24/电脑问题-windows10关闭“自动更新”/index.html","4dae9911e8a0b51e96a0e9dd303bc07c"],["D:/me/github/zakariyya.github.io/public/2017/03/24/backEnd-服务配置-Redis/index.html","432f0881cf40eaadbde0851dbb0f1a98"],["D:/me/github/zakariyya.github.io/public/2017/03/24/科普-Update与Modify两者区别/index.html","dffa10c41c8968a8cdbbf6e8441182cc"],["D:/me/github/zakariyya.github.io/public/2017/04/23/backEnd-服务配置-apahce错误提示the-requested-operation-has-failed/index.html","9303687e3f44d677d154f75d357995f5"],["D:/me/github/zakariyya.github.io/public/2017/05/23/linux-解决CentOS（6和7版本），-etc-sysconfig-下没有iptables的问题-副本/index.html","64c8ebde1168274fbabc2dcd65e96484"],["D:/me/github/zakariyya.github.io/public/2017/06/16/frontEnd-ajax-使用ajax-方法加载服务器数据/index.html","d07f037d10b2c47607be2217f2b463d7"],["D:/me/github/zakariyya.github.io/public/2017/06/18/frontEnd-ajax-this-id和-this-attr-id/index.html","5e5ced5cfb00139d40f3b545aa27f6df"],["D:/me/github/zakariyya.github.io/public/2017/08/05/电脑问题-eclipse中批量修改Java类文件中引入的package包路径/index.html","6341c25a3d9ca8cc315a5c01678858d8"],["D:/me/github/zakariyya.github.io/public/2017/08/22/backEnd-maven-maven项目jar包导入失败/index.html","d756680cc62afc42e2213d862ce53ca3"],["D:/me/github/zakariyya.github.io/public/2017/08/31/frontEnd-ajax-回调函数（callback）是什么？/index.html","296cae72f16e0309e1d5f25db233a2cd"],["D:/me/github/zakariyya.github.io/public/2018/03/14/碎碎念-我未曾见过你-而你的光却照耀到了我/index.html","5d25873b1bd75167ae6c2d822f6b2ee3"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring-简介/index.html","ffc1b73eb0e4abe899e5eeaf9fb72b00"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring分析/index.html","2e89a069159f6df90e33ea5e9878cca8"],["D:/me/github/zakariyya.github.io/public/2018/03/24/科普-视频格式/index.html","3f7c46c9a1f4baf4f9d744a33af44553"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-arch-开机自启动脚本/index.html","37e2d5de57831a77429d48418618eb4b"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-客户端/index.html","57cd1be45d8b586b2ec86d162855d745"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-服务端/index.html","5cbf1efa86763b4ac4e5e9e060834355"],["D:/me/github/zakariyya.github.io/public/2018/06/28/backEnd-spring-Spring-Boot-YML文件配置多环境/index.html","75a4d0787af5e582a3018e6c82ab4fed"],["D:/me/github/zakariyya.github.io/public/2018/06/28/搭建-Hexo搭建/index.html","9d3c95b5c37f2ca7d7117379fb4199b0"],["D:/me/github/zakariyya.github.io/public/2018/07/03/科普-软件为何会有那么多权限/index.html","b64ca0ac98e5cc3cb7af244fb42ae6dc"],["D:/me/github/zakariyya.github.io/public/2018/07/12/编程-Java调用Python/index.html","17e65c333d9b553e086846ea764da579"],["D:/me/github/zakariyya.github.io/public/2018/07/19/backEnd-spring-Spring-Boot多数据源整合/index.html","3a392edab5685dd6587c29cb7f832be0"],["D:/me/github/zakariyya.github.io/public/2018/07/21/backEnd-修改形参对象值，会影响实参/index.html","4529c6a957160ec1b568e8eaaf467e5f"],["D:/me/github/zakariyya.github.io/public/2018/08/01/搭建-Jib构建你的第一个java镜像/index.html","a8f91859502868d5d95dcb3bf9cd21b8"],["D:/me/github/zakariyya.github.io/public/2018/08/01/科普-IaaS、SaaS-和-PaaS-的区别/index.html","b7fbaac4f96de2fcfd6135e0a7639840"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-Maven-安装与入门/index.html","ea8ba1dde71e8ebd1b62b1a54baeca7e"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-基于-Ubuntu-搭建个人网盘/index.html","a4772e02c497851a238a037e3a806244"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-基于Ubuntu搭建FTP/index.html","1b680343c30986c1d3ae55a7fe43fa0f"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-搭建Git服务器/index.html","e043d165bc989d6e092287166e5b39f4"],["D:/me/github/zakariyya.github.io/public/2018/08/10/搭建-搭建javaweb开发环境/index.html","3db6526b1c1596ff0bd927f013c8039f"],["D:/me/github/zakariyya.github.io/public/2018/08/15/搭建-搭建个人-Leanote-云笔记本/index.html","fe2c902f966108266d3e5a86410ea99a"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-FTP文件上传、下载/index.html","665be5f6eca7cdcbb40335304c9c56e7"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-文件上传下载/index.html","4be7f4fae8799de7b1c19964f035b2f9"],["D:/me/github/zakariyya.github.io/public/2018/08/23/backEnd-spring-springboot-Component下-Autowired的注入为null/index.html","db65c81dc9e540028d5725e663e50d64"],["D:/me/github/zakariyya.github.io/public/2018/09/10/碎碎念-广电对游戏版号的限制/index.html","df2c70c32fc8f1e2a61aa4626915a1f0"],["D:/me/github/zakariyya.github.io/public/2018/09/19/linux-Ubuntu添加可信任根证书/index.html","ee31f63a1e754ad0aed5c5e08837bd5d"],["D:/me/github/zakariyya.github.io/public/2018/09/19/搭建-mysql安装文档/index.html","39500acc726856f9aac7721e6100338e"],["D:/me/github/zakariyya.github.io/public/2018/09/23/搭建-nginx-搭建文档/index.html","abd188cfe775b083883395d2ec71c413"],["D:/me/github/zakariyya.github.io/public/2018/09/23/电脑问题-Teamviewer-重置ID的工具/index.html","2832d94c583203b1b71ee4c3abf8bdfb"],["D:/me/github/zakariyya.github.io/public/2018/12/19/backEnd-IDEA多模块项目Module-must-not-contain-source-root-The-root-already-belongs-to-module/index.html","2e152d918cca258fbdec555d10997046"],["D:/me/github/zakariyya.github.io/public/2019/01/02/编程-markdown折叠内容语法/index.html","fdc0a5dc9d1b728bfdc7403a962bfb7b"],["D:/me/github/zakariyya.github.io/public/2019/01/03/backEnd-maven-maven标签字典/index.html","522828023d47b1c1032ce3b6dfae9fd5"],["D:/me/github/zakariyya.github.io/public/2019/01/11/linux-docker离线安装/index.html","34171630da1b8e094b6faace0db675c8"],["D:/me/github/zakariyya.github.io/public/2019/01/17/linux-命令行下安装-oracle-11gR2-数据库/index.html","fcf6526065098582efc0c2eec620a9fe"],["D:/me/github/zakariyya.github.io/public/2019/01/24/backEnd-spring-异常捕获/index.html","74a8b110c2113ad1bfd6d0eb821e27e7"],["D:/me/github/zakariyya.github.io/public/2019/01/27/编程-Git/index.html","d9115f0d240c149e684a8d3aa5fc7691"],["D:/me/github/zakariyya.github.io/public/2019/02/24/backEnd-spring-SpringCloud/index.html","8dc584237451c87ce0177261efddf177"],["D:/me/github/zakariyya.github.io/public/2019/03/01/科普-常见版本号/index.html","5a553bb7572c82a5067af26ef52c1634"],["D:/me/github/zakariyya.github.io/public/2019/03/04/搭建-RabbitMQ-server搭建/index.html","9cee3051dc5f54a7b090b54492b995f4"],["D:/me/github/zakariyya.github.io/public/2019/03/12/搭建-翻墙-v2ray搭建启动/index.html","673060c70bde04be13394c29f782c558"],["D:/me/github/zakariyya.github.io/public/2019/03/14/backEnd-rabbitMQ-交换器/index.html","3a60383db16f4104ce72bd1af51d4a06"],["D:/me/github/zakariyya.github.io/public/2019/05/28/cloud-cloud/index.html","179c1b85e8e594ae93516889c9e13a18"],["D:/me/github/zakariyya.github.io/public/2019/06/11/编程-Github进行fork后与原仓库同步/index.html","05344a2962224674681574e644d607c8"],["D:/me/github/zakariyya.github.io/public/2019/10/24/搭建-Git-仓库恢复/index.html","fb01b97a3b3a16874238fa6c2fc80c81"],["D:/me/github/zakariyya.github.io/public/2019/11/21/编程-多个git账号的SSH-key切换/index.html","9f673c48723862d273b926c361610ad9"],["D:/me/github/zakariyya.github.io/public/2030/08/16/电脑问题-How-to-kill-a-currently-using-port-on-localhost-in-windows/index.html","0d06aacd4df90da3ef34542178294500"],["D:/me/github/zakariyya.github.io/public/archives/2015/12/index.html","c1ed3fe8bce6d670994d891f6af33b79"],["D:/me/github/zakariyya.github.io/public/archives/2015/index.html","c1ed3fe8bce6d670994d891f6af33b79"],["D:/me/github/zakariyya.github.io/public/archives/2016/01/index.html","2b26b4d37f06971280064ee286683c04"],["D:/me/github/zakariyya.github.io/public/archives/2016/02/index.html","759c17df85da03a1b2bfeb57acbece34"],["D:/me/github/zakariyya.github.io/public/archives/2016/03/index.html","da018928cf4c1fe33c1e90535008e2b9"],["D:/me/github/zakariyya.github.io/public/archives/2016/04/index.html","2cb396fcb4a3afc103f14bf1e1a489cf"],["D:/me/github/zakariyya.github.io/public/archives/2016/05/index.html","9867856f7f76e0e47d12647fdc74ba8e"],["D:/me/github/zakariyya.github.io/public/archives/2016/06/index.html","5d495d132b6456f7bdccfa30483f81f4"],["D:/me/github/zakariyya.github.io/public/archives/2016/09/index.html","192501a3082bb1c86d5ef6503cfc55e0"],["D:/me/github/zakariyya.github.io/public/archives/2016/10/index.html","2dcbba32a3c6dc18659e0e5348919c1d"],["D:/me/github/zakariyya.github.io/public/archives/2016/11/index.html","84cdd0eb5f0a4e959df210af5e1dbec9"],["D:/me/github/zakariyya.github.io/public/archives/2016/index.html","09586b3fc9723afa15d5c2079978187e"],["D:/me/github/zakariyya.github.io/public/archives/2017/01/index.html","5bd42bdc5c087cb5fd6f9e5adb06b462"],["D:/me/github/zakariyya.github.io/public/archives/2017/03/index.html","30d5c93edc3e61117c410bedf628e95e"],["D:/me/github/zakariyya.github.io/public/archives/2017/04/index.html","8d5f9503b566379f340354b9e82b2585"],["D:/me/github/zakariyya.github.io/public/archives/2017/05/index.html","8012ee8c4b795090d1f3b1e6f0352d65"],["D:/me/github/zakariyya.github.io/public/archives/2017/06/index.html","de8d4f7c4b17f25a90a1ab616d5ed7c4"],["D:/me/github/zakariyya.github.io/public/archives/2017/08/index.html","953b34f32bec36766c19bead90ffcbbb"],["D:/me/github/zakariyya.github.io/public/archives/2017/index.html","6414183b5b5112c216ef7123a5e2fe55"],["D:/me/github/zakariyya.github.io/public/archives/2018/03/index.html","b397eef9171455febea45b7f5662aab6"],["D:/me/github/zakariyya.github.io/public/archives/2018/04/index.html","f0e26fa9be319b1d286c257439299e52"],["D:/me/github/zakariyya.github.io/public/archives/2018/06/index.html","30b00e446d459f520c57a95d6086bf5b"],["D:/me/github/zakariyya.github.io/public/archives/2018/07/index.html","8d1dcd78a38c88ac9ed5237f8b8f7fe3"],["D:/me/github/zakariyya.github.io/public/archives/2018/08/index.html","8e8403eb3feb34ca7b68270bb36c609d"],["D:/me/github/zakariyya.github.io/public/archives/2018/09/index.html","c3f9e75b45a1978b3ead06f19bc0453a"],["D:/me/github/zakariyya.github.io/public/archives/2018/12/index.html","dec5c4ea036ee9b1d77116ef34fa6b10"],["D:/me/github/zakariyya.github.io/public/archives/2018/index.html","6a82eb03769a382a7c79c322e852a367"],["D:/me/github/zakariyya.github.io/public/archives/2019/01/index.html","3d82b76c340cd39a22f4827012ea26f3"],["D:/me/github/zakariyya.github.io/public/archives/2019/02/index.html","b08fca2b5bb16ce46ea864b216fdacc8"],["D:/me/github/zakariyya.github.io/public/archives/2019/03/index.html","11bd263ceb193e306db07750883458de"],["D:/me/github/zakariyya.github.io/public/archives/2019/05/index.html","74ff7ba3c265c3254b8cfcc4fcf0b318"],["D:/me/github/zakariyya.github.io/public/archives/2019/06/index.html","298f78950d21076ccfd47671ad3df27b"],["D:/me/github/zakariyya.github.io/public/archives/2019/10/index.html","3b86f80e3b9961e2743e6fd59890b3e3"],["D:/me/github/zakariyya.github.io/public/archives/2019/11/index.html","015595ada3c4de9526616e8487c25574"],["D:/me/github/zakariyya.github.io/public/archives/2019/index.html","49e02c7a4035c5e0db165b706da0457a"],["D:/me/github/zakariyya.github.io/public/archives/2030/08/index.html","87599c6f2f60d4080d09d0f7044431fc"],["D:/me/github/zakariyya.github.io/public/archives/2030/index.html","87599c6f2f60d4080d09d0f7044431fc"],["D:/me/github/zakariyya.github.io/public/archives/index.html","c9dd0dbf26675f423edeef9476701c99"],["D:/me/github/zakariyya.github.io/public/categories/Program/index.html","8f91fb0cd3956910939bfa454f195d3b"],["D:/me/github/zakariyya.github.io/public/categories/backEnd/index.html","4645adac6ebfcf6e3db4409ee81df4e7"],["D:/me/github/zakariyya.github.io/public/categories/index.html","4a8d3adfc2f8b74a023bae398266062c"],["D:/me/github/zakariyya.github.io/public/categories/java-Program/index.html","572575a391eb7653ce91c5a2864e2e25"],["D:/me/github/zakariyya.github.io/public/categories/linux/index.html","8c164f626592da6e5f7fa4a16c42797b"],["D:/me/github/zakariyya.github.io/public/categories/windows电脑问题/index.html","95a95e85b9a7f72c3665fd88239a96e9"],["D:/me/github/zakariyya.github.io/public/categories/搭建/index.html","870a8325fd6a5fb9a05819e70d2f0539"],["D:/me/github/zakariyya.github.io/public/categories/日记本/index.html","cf043b27be80eb956afe1f9b42040d78"],["D:/me/github/zakariyya.github.io/public/categories/服务配置/index.html","b980d45d779313fa92e6ba9763323591"],["D:/me/github/zakariyya.github.io/public/categories/游戏性是什么/index.html","1386f40b360e5b522193173551e343f1"],["D:/me/github/zakariyya.github.io/public/categories/电脑问题/index.html","5ec07f78a0a198eabffa8b27a507ef16"],["D:/me/github/zakariyya.github.io/public/categories/科普/index.html","dcd4f2afe28ead16d83411dfa4b964c6"],["D:/me/github/zakariyya.github.io/public/categories/系统-Linux/index.html","aa7b36bb4147e51885d4402dc6a997aa"],["D:/me/github/zakariyya.github.io/public/categories/系统/index.html","b617f29e0b021d6119dbb13facc8fe05"],["D:/me/github/zakariyya.github.io/public/categories/编程/index.html","b9b594f3ac9de2051dd405b25bf43ebd"],["D:/me/github/zakariyya.github.io/public/categories/翻墙-Linux/index.html","a2d9156461a9561ea63fcdb1e9d11057"],["D:/me/github/zakariyya.github.io/public/categories/翻墙/index.html","90283e29961b0e3abb3f4f1ba1833d1b"],["D:/me/github/zakariyya.github.io/public/categories/软件/index.html","96dec00053aec9c974a058ff13825b1b"],["D:/me/github/zakariyya.github.io/public/categories/随笔/index.html","99158fa1b888ce6395032499aad2203d"],["D:/me/github/zakariyya.github.io/public/css/base.css","fcf23de323fad904dc5ceab77d2a7cf7"],["D:/me/github/zakariyya.github.io/public/css/calendar.css","702500ec322c3d9ca65d704c135a5921"],["D:/me/github/zakariyya.github.io/public/css/code.css","97f4c1dc01be1105228c1807f55b74e5"],["D:/me/github/zakariyya.github.io/public/css/footer.css","df2c454e5e4fb8631700f2e412a78940"],["D:/me/github/zakariyya.github.io/public/css/header.css","6be9e934c0161c801d5ef99623854411"],["D:/me/github/zakariyya.github.io/public/css/main.css","efe260268a251ae6cc53212b4dc671d2"],["D:/me/github/zakariyya.github.io/public/css/navbar.css","9d9c69ea1d7c4421cad056e109aa3309"],["D:/me/github/zakariyya.github.io/public/css/post.css","e84eee86b9d23ca47adfcd28817877e3"],["D:/me/github/zakariyya.github.io/public/index.html","ff44e687d3fbb7dcf9c0d363fb1c6f35"],["D:/me/github/zakariyya.github.io/public/js/main.js","04670d6d5af2a30bfdf379cf61e7b629"],["D:/me/github/zakariyya.github.io/public/tags/FTP-文件上传-文件下载/index.html","48d1b46d97b10056cf050aff94df7be1"],["D:/me/github/zakariyya.github.io/public/tags/Google/index.html","81a16200e061ca694b6b483687aaa4a2"],["D:/me/github/zakariyya.github.io/public/tags/RabbitMQ/index.html","f850221d8b1e379178666c2e9b104628"],["D:/me/github/zakariyya.github.io/public/tags/Ubuntu/index.html","39f154055a02d267c0eb7213f52e229b"],["D:/me/github/zakariyya.github.io/public/tags/ajax-前端/index.html","b6101cf49c612aa1de087ba4d8a1ae5d"],["D:/me/github/zakariyya.github.io/public/tags/apahce/index.html","90eac7ca9b6c26cb4ce002162c06ef89"],["D:/me/github/zakariyya.github.io/public/tags/arch/index.html","9b6f240c899ce935595f59cc1dcf17d1"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程-rabbitMQ/index.html","c148b8767ecf43585ee818d569331940"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程/index.html","1e7432e5fae5a37c579ecf826c38bd5e"],["D:/me/github/zakariyya.github.io/public/tags/cloud-科普/index.html","8a1c33061acc52fdd472164b2a92df3a"],["D:/me/github/zakariyya.github.io/public/tags/git-ssh/index.html","844aedf34e72089ee7c60d6bfceb0771"],["D:/me/github/zakariyya.github.io/public/tags/git/index.html","bcbf289aac71c99fdc1ce1d5db3aca78"],["D:/me/github/zakariyya.github.io/public/tags/hexo-搭建/index.html","4827bb59928c86e93922ff5b819b114e"],["D:/me/github/zakariyya.github.io/public/tags/index.html","d03df1e940208b16cd9acfad96a56035"],["D:/me/github/zakariyya.github.io/public/tags/java-文件上传-文件下载-编程/index.html","868db49ee1266942df0cde00389f552f"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos-oracle-databases/index.html","f4167860874d8c52df4f84288f0112da"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos/index.html","0b2986f26673f312e4fd83f04de1ed3e"],["D:/me/github/zakariyya.github.io/public/tags/linux-docker-Oracle-Ubuntu/index.html","f85a361840eb7602328a226f19ed1e9e"],["D:/me/github/zakariyya.github.io/public/tags/linux-sogou/index.html","4fd35ad838bec946fe68df5a33d760ad"],["D:/me/github/zakariyya.github.io/public/tags/linux-ssh/index.html","cda9e70e5885fa95e7acf66ad83c5ae5"],["D:/me/github/zakariyya.github.io/public/tags/linux-网络/index.html","0c6980be844c332b2251ea86ddeda597"],["D:/me/github/zakariyya.github.io/public/tags/linux/index.html","97aff60ca9398b261de5b6494097a769"],["D:/me/github/zakariyya.github.io/public/tags/maven/index.html","dd8033c3e3377f35674266487b6bd37d"],["D:/me/github/zakariyya.github.io/public/tags/nginx/index.html","6427444ea486522ab3300574aeb3aaeb"],["D:/me/github/zakariyya.github.io/public/tags/spring-SpringCloud-Eureka/index.html","364ecdac79ff3095244d7a31710a9f08"],["D:/me/github/zakariyya.github.io/public/tags/spring/index.html","fb94e30104e4db0ebf09cde22af83175"],["D:/me/github/zakariyya.github.io/public/tags/springboot/index.html","72fbf1909cb8987127007eeebabe3f66"],["D:/me/github/zakariyya.github.io/public/tags/teamviewer-电脑问题/index.html","e4336402066be5bad7f5bba435bb2c40"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git-服务器/index.html","242fd5869b4efb8e5cdc229c524724a6"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git/index.html","6536d04c541afc8f2393f46405bdd8d6"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Leanote-云-笔记-云笔记/index.html","ac6478fbe99dbfdf8fbc4c4899fcb673"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Maven/index.html","72027d61560a332aa6761081f9f60394"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Ubuntu-FTP/index.html","61ded61195be05c8e222731b6b826838"],["D:/me/github/zakariyya.github.io/public/tags/搭建-mysql/index.html","ec4446b4ed59725b169368b989951ae1"],["D:/me/github/zakariyya.github.io/public/tags/搭建-开发环境-javaweb/index.html","8dc777728e22ba34029ffea1b8a329f7"],["D:/me/github/zakariyya.github.io/public/tags/搭建-网盘-Ubuntu/index.html","114341026649449a72a5b74752292677"],["D:/me/github/zakariyya.github.io/public/tags/搭建/index.html","9349af6b1986afe7690a05643e19216f"],["D:/me/github/zakariyya.github.io/public/tags/游戏/index.html","a041f08c4c9bee7f0b714442b9568e26"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题-端口-占用/index.html","46ac4e31f20d38794b4d70754a7e7f87"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题/index.html","fdb531d225227fc430f1f16b2c7e7ed0"],["D:/me/github/zakariyya.github.io/public/tags/碎碎-子涵/index.html","7ccddd573e362492af7c350d9061a98c"],["D:/me/github/zakariyya.github.io/public/tags/神器/index.html","fd78c2963495c927df04b30eff4c650d"],["D:/me/github/zakariyya.github.io/public/tags/科普/index.html","8cf3753d2aa3d352b9acee0a87c15f92"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks-arch/index.html","53e542b52075cf692871e4a70a64a751"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks/index.html","64cbdc465ac333747f9996220c7960ae"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-v2ray/index.html","8e35d0d604d06e25a3e1f0b00d1eb91e"]];
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







