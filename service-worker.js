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

var precacheConfig = [["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-Arch安装-日志/index.html","4eb452066253d8386c5585ee9a854687"],["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-arch-arch安装笔记/index.html","2d17c25e4dfaaf4fc3352bb8b9b7424f"],["D:/me/github/zakariyya.github.io/public/2016/01/15/碎碎念-那些住在手机里的朋友/index.html","6ff83eadeba369b863f0cdc4789928bb"],["D:/me/github/zakariyya.github.io/public/2016/01/28/碎碎念-时光/index.html","eafa6cdd0b2ed213f69ecb6833fa5428"],["D:/me/github/zakariyya.github.io/public/2016/02/21/电脑问题-禁止软件开机自启动的三种方法/index.html","5a819245d4d99259aeaa7bf9a274a2dc"],["D:/me/github/zakariyya.github.io/public/2016/02/21/碎碎念-Google-x-’s-Loon，一个互联网气球/index.html","c8ecf8e1a5cfbd059abd91515ab207d0"],["D:/me/github/zakariyya.github.io/public/2016/02/26/电脑问题-windows7-我的电脑右键-管理“该文件没有与之关联的程序来执行该操作”/index.html","f8afd267b545002dddb99591ba627a7a"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-QQ右下角弹出新闻框/index.html","de788fc8640384c49d3b9a046087faa6"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-win7隐藏IE浏览器/index.html","e8aa74c0f0ca98966c58a616191d4604"],["D:/me/github/zakariyya.github.io/public/2016/02/28/电脑问题-禁用UEFI安全启动功能/index.html","55aac5258d07cc5331d1088c7f6fb06b"],["D:/me/github/zakariyya.github.io/public/2016/02/29/电脑问题-说说在win7下优化软件的必要性/index.html","9ef0480b18b73c8b36b14ec2cdcb138b"],["D:/me/github/zakariyya.github.io/public/2016/03/01/电脑问题-处理快捷方式小箭头/index.html","0cf72b0022be959a32d8ddd4b61526ff"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-一罐硬币实验的讨论——《信号与噪声》/index.html","6e6367deb892e83e49a20c6c2aca00eb"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-十二行代码/index.html","658baf8cf3d0d1a65f76949552a5726f"],["D:/me/github/zakariyya.github.io/public/2016/03/04/linux-arch打包sogou/index.html","ec4418d6682f5382772660a4a0d48709"],["D:/me/github/zakariyya.github.io/public/2016/03/06/linux-arch分swap/index.html","c33e1b48900847535cb6f1bc892c6be6"],["D:/me/github/zakariyya.github.io/public/2016/03/06/电脑问题-定时关机-睡眠/index.html","c16719afe375f924ff0b0f64b60f5c58"],["D:/me/github/zakariyya.github.io/public/2016/03/11/碎碎念-织梦/index.html","b20fc89cc209a7eaec12a9455cfccfcc"],["D:/me/github/zakariyya.github.io/public/2016/03/14/碎碎念-麻雀告诉我们的故事/index.html","1f39968bc3a2067550793f106b7fe96b"],["D:/me/github/zakariyya.github.io/public/2016/03/17/碎碎念-还没有晾干的旧伞，闷在寂寞的房里/index.html","2aef73d6b2342b2d1e7960f0af6cad76"],["D:/me/github/zakariyya.github.io/public/2016/03/19/电脑问题-windows下启动项菜单-Boot-Manager-问题/index.html","512abbd801ee0100e4d80da2bb9b46f3"],["D:/me/github/zakariyya.github.io/public/2016/03/20/碎碎念-春分/index.html","0bae3344e7426747931d398cc5d6e7ec"],["D:/me/github/zakariyya.github.io/public/2016/03/21/电脑问题-电脑文件搜索神器——Everything/index.html","4a83a8e641b01a13c7791b2dd61af799"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-f-lux和“薄暮微光”/index.html","a0aa54a0282ed316e3b55a8a6cd3dddf"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-windows7-打开休眠模式/index.html","bef2ebb6a6edf0f5412aafffc4d10c1f"],["D:/me/github/zakariyya.github.io/public/2016/04/05/碎碎念-旧照片/index.html","e89f146440f9ba307c3965417bd0be3f"],["D:/me/github/zakariyya.github.io/public/2016/04/07/linux-pppoe上网/index.html","559c080040c9f2da5365f2c82cd5f728"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-无标题文章/index.html","195b480e91b6859dc30b9d8536f4935d"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-看几天韩剧的感想/index.html","b01aece5cfa39d8ad0ebcc0962225836"],["D:/me/github/zakariyya.github.io/public/2016/04/18/碎碎念-恶意代码引起的反思/index.html","0a4b648fe76b3ced8a2605b0326380a6"],["D:/me/github/zakariyya.github.io/public/2016/04/22/电脑问题-OneTab-和-轻听/index.html","baa3b208c55e8d3c36e02772e5333c09"],["D:/me/github/zakariyya.github.io/public/2016/05/04/碎碎念-孙悟空无姓无名的时候，阎王生死簿是怎么写的呢？/index.html","8cfcd9be5f8257b25bf9bc1ca16fc4dc"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-抠头发丝/index.html","d2804a4ee1f5f5742a6393dafaa07055"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-百度，广告/index.html","f223de15888ac81b86e9b58cf588647d"],["D:/me/github/zakariyya.github.io/public/2016/05/25/碎碎念-“hello-os-world-”-of-Boot-Sector/index.html","6bd8c284dbe7bde2d05ef990b774fe1d"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏和身体/index.html","eb13c2cd262661632513507eeac3f423"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏的设计/index.html","10ad5a96c33464621b9b0deb29e842ab"],["D:/me/github/zakariyya.github.io/public/2016/06/05/文集-游戏性是什么-游戏性是什么-游戏和视觉/index.html","6910dc23021bc6a609f6bbd078f2d1a6"],["D:/me/github/zakariyya.github.io/public/2016/06/06/文集-游戏性是什么-游戏性是什么-游戏和世界/index.html","a14d4dbf9d1557c533df7cff20437cea"],["D:/me/github/zakariyya.github.io/public/2016/06/07/文集-游戏性是什么-游戏性是什么-游戏和触觉/index.html","69d47ddc993be61a285fa14b52a8374e"],["D:/me/github/zakariyya.github.io/public/2016/06/08/文集-游戏性是什么-游戏性是什么-专注游戏的原因/index.html","18312612f84d9b050fbca7197e5d7e73"],["D:/me/github/zakariyya.github.io/public/2016/06/10/文集-游戏性是什么-游戏性是什么-难易度平衡设计与效率预测/index.html","b71c7be32a6a3cee5e46622b2812009e"],["D:/me/github/zakariyya.github.io/public/2016/06/11/文集-游戏性是什么-游戏性是什么-结构/index.html","48596cc1ffe26c6ac6927dd907830d00"],["D:/me/github/zakariyya.github.io/public/2016/06/12/文集-游戏性是什么-游戏性是什么-叙事和Narreme/index.html","6510a6ded4428214c816e3c70dd8944d"],["D:/me/github/zakariyya.github.io/public/2016/06/13/文集-游戏性是什么-游戏性是什么-记录《游戏性是什么》/index.html","7236a54705eb2da0863d8dc6ba0f8727"],["D:/me/github/zakariyya.github.io/public/2016/09/07/linux-sogou输入配置/index.html","dd99094e8b3ed044897a035033d133f8"],["D:/me/github/zakariyya.github.io/public/2016/09/11/linux-ubuntu修改ssh端口/index.html","d5122bbf18997daf3257b8652eeac0a5"],["D:/me/github/zakariyya.github.io/public/2016/10/30/碎碎念-日常20161030/index.html","b98714d6e24c9b597b595f0b9ddcc3a1"],["D:/me/github/zakariyya.github.io/public/2016/10/31/碎碎念-日常——google涂鸦/index.html","0b9d23c1d098dd28aa189f0ae3ec51fb"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Google18岁了/index.html","1a5d66cdaa2046ae9cfc9a935a91d2db"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Many-Doors-In-My-Life/index.html","071e86dcf560c74adc16c07799cbe8cc"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-《越晚越开心》停播/index.html","dbd3df487500b71af362acd1bcf03946"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-分数，教育的目的/index.html","2e44680fef3eae1c5dc7a170cc3a3d7f"],["D:/me/github/zakariyya.github.io/public/2017/01/21/电脑问题-Tomcat提示指定的服务未安装Unable-to-open-the-service-tomcat/index.html","eb10fe4c723ad99dcde33196c008fbe3"],["D:/me/github/zakariyya.github.io/public/2017/01/24/电脑问题-windows10关闭“自动更新”/index.html","e2cb3f634dffdc452f890afee19d6193"],["D:/me/github/zakariyya.github.io/public/2017/03/24/backEnd-服务配置-Redis/index.html","81b796f9d265e2f39866a134ba09d098"],["D:/me/github/zakariyya.github.io/public/2017/03/24/科普-Update与Modify两者区别/index.html","b72e7889072fc741c422231fa3fa5bf7"],["D:/me/github/zakariyya.github.io/public/2017/04/23/backEnd-服务配置-apahce错误提示the-requested-operation-has-failed/index.html","8ffe12ac413b68837899297dd2ce2b8e"],["D:/me/github/zakariyya.github.io/public/2017/05/23/linux-解决CentOS（6和7版本），-etc-sysconfig-下没有iptables的问题-副本/index.html","76d1eae3f940b0c7f22a8615ce11a786"],["D:/me/github/zakariyya.github.io/public/2017/06/16/frontEnd-ajax-使用ajax-方法加载服务器数据/index.html","0666cbcc3cf3ee54972c58b9da09a972"],["D:/me/github/zakariyya.github.io/public/2017/06/18/frontEnd-ajax-this-id和-this-attr-id/index.html","9154ae438cb3065a57cceee7f28bc52c"],["D:/me/github/zakariyya.github.io/public/2017/08/05/电脑问题-eclipse中批量修改Java类文件中引入的package包路径/index.html","073660c6961120f0d24ff44f316266b7"],["D:/me/github/zakariyya.github.io/public/2017/08/22/backEnd-maven-maven项目jar包导入失败/index.html","8b9401720ccbfe69d5afb48fd15bc7bb"],["D:/me/github/zakariyya.github.io/public/2017/08/31/frontEnd-ajax-回调函数（callback）是什么？/index.html","d1aa117fa3354a665adfee324c8fa2a2"],["D:/me/github/zakariyya.github.io/public/2018/03/14/碎碎念-我未曾见过你-而你的光却照耀到了我/index.html","6f2a7fc8585bf027ff8191c067f2f3d6"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring-简介/index.html","e123add8d5703740cc0e1e4600e258f2"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring分析/index.html","baa46e4dceba2e2b5d437ba4c5125de5"],["D:/me/github/zakariyya.github.io/public/2018/03/24/科普-视频格式/index.html","486be902c83506c7541be3f4cf1f19ec"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-arch-开机自启动脚本/index.html","67e34d2b633bdc37e67de63c57e99da9"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-客户端/index.html","b9299df0bc28edfeb311c07ed45b22b7"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-服务端/index.html","2a712930dd8b0eb222751a07674a94ce"],["D:/me/github/zakariyya.github.io/public/2018/06/28/backEnd-spring-Spring-Boot-YML文件配置多环境/index.html","6ba923d7471f98a6b614690467050e56"],["D:/me/github/zakariyya.github.io/public/2018/06/28/搭建-Hexo搭建/index.html","0bb9494753d636a19bbfc08965a97426"],["D:/me/github/zakariyya.github.io/public/2018/07/03/科普-软件为何会有那么多权限/index.html","d7499f350ccb407d1b98a13ac4f5bb81"],["D:/me/github/zakariyya.github.io/public/2018/07/12/编程-Java调用Python/index.html","bff4829d4945591b7a4642db626e11e3"],["D:/me/github/zakariyya.github.io/public/2018/07/19/backEnd-spring-Spring-Boot多数据源整合/index.html","1cdb9bc4b23cd83495a35c42a77b9e98"],["D:/me/github/zakariyya.github.io/public/2018/07/21/backEnd-修改形参对象值，会影响实参/index.html","778f491edcbb62a52b1115180bc2c032"],["D:/me/github/zakariyya.github.io/public/2018/08/01/搭建-Jib构建你的第一个java镜像/index.html","df1162f7004e016fd2183f8b52a71dc8"],["D:/me/github/zakariyya.github.io/public/2018/08/01/科普-IaaS、SaaS-和-PaaS-的区别/index.html","9f1330b79344bb12628dbb5de2a203fc"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-Maven-安装与入门/index.html","e47000443f3a009c9a460d4444886091"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-基于-Ubuntu-搭建个人网盘/index.html","7e39d5fe22694ad5077338226f479397"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-基于Ubuntu搭建FTP/index.html","b637a245367ab0fb670598011792353d"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-搭建Git服务器/index.html","1175805bb0471ea14579e0f2f77b31fb"],["D:/me/github/zakariyya.github.io/public/2018/08/10/搭建-搭建javaweb开发环境/index.html","704ac60c25c903e737640e3258c1f55d"],["D:/me/github/zakariyya.github.io/public/2018/08/15/搭建-搭建个人-Leanote-云笔记本/index.html","5473e28673ad0a082f4d8ef2380d1ee8"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-FTP文件上传、下载/index.html","9d685d51f2c3c1b456f2672c27bb50cd"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-文件上传下载/index.html","885c61d24d91aa316bf40da8c4f99d8c"],["D:/me/github/zakariyya.github.io/public/2018/08/23/backEnd-spring-springboot-Component下-Autowired的注入为null/index.html","8b839e3e7991ec08b9ea66a229f3405b"],["D:/me/github/zakariyya.github.io/public/2018/09/10/碎碎念-广电对游戏版号的限制/index.html","931a6ca0d6af8a098d6bf3c9918d86c6"],["D:/me/github/zakariyya.github.io/public/2018/09/19/linux-Ubuntu添加可信任根证书/index.html","6da6cec45d8caf4dcbe16a1cc952a1d3"],["D:/me/github/zakariyya.github.io/public/2018/09/19/搭建-mysql安装文档/index.html","ca077a0acd80777129d2ead5be68011f"],["D:/me/github/zakariyya.github.io/public/2018/09/23/搭建-nginx-搭建文档/index.html","2ea19e16cfe75e82f42c7593334748b6"],["D:/me/github/zakariyya.github.io/public/2018/09/23/电脑问题-Teamviewer-重置ID的工具/index.html","b3cd23f1c9417409c81a002f4913ede5"],["D:/me/github/zakariyya.github.io/public/2018/12/19/backEnd-IDEA多模块项目Module-must-not-contain-source-root-The-root-already-belongs-to-module/index.html","c6d37c282361e27cf94c4211bfa44465"],["D:/me/github/zakariyya.github.io/public/2019/01/02/编程-markdown折叠内容语法/index.html","4918abf7a09198fdf127d344abef2f5a"],["D:/me/github/zakariyya.github.io/public/2019/01/03/backEnd-maven-maven标签字典/index.html","c469e990236cd75769e664e0aac67357"],["D:/me/github/zakariyya.github.io/public/2019/01/11/linux-docker离线安装/index.html","91a26898c4e1e2a1e1ea17c3803c76ca"],["D:/me/github/zakariyya.github.io/public/2019/01/17/linux-命令行下安装-oracle-11gR2-数据库/index.html","5ae28b715f757fe6c48998ca367651f3"],["D:/me/github/zakariyya.github.io/public/2019/01/24/backEnd-spring-异常捕获/index.html","02d6d1c762a523ce6624e3fabaabd403"],["D:/me/github/zakariyya.github.io/public/2019/01/27/编程-Git/index.html","82c60c7d1550ef3b7109dcc5944a176f"],["D:/me/github/zakariyya.github.io/public/2019/02/24/backEnd-spring-SpringCloud/index.html","e0dc392eacc60d76608a1a07598e7a9c"],["D:/me/github/zakariyya.github.io/public/2019/03/01/科普-常见版本号/index.html","936fae20b5c1a7155231dd0e86483a4b"],["D:/me/github/zakariyya.github.io/public/2019/03/04/搭建-RabbitMQ-server搭建/index.html","dfdd0c6fb11d4176e2f9497c06f7527a"],["D:/me/github/zakariyya.github.io/public/2019/03/12/搭建-翻墙-v2ray搭建启动/index.html","f44ddc5d3b457ffb8f6d0e45adf55c10"],["D:/me/github/zakariyya.github.io/public/2019/03/14/backEnd-rabbitMQ-交换器/index.html","ef5b3a115854f755d974ab788d06fe95"],["D:/me/github/zakariyya.github.io/public/2019/05/28/cloud-cloud/index.html","d793f2bc897307d122324a592b63bcd3"],["D:/me/github/zakariyya.github.io/public/2019/06/11/编程-Github进行fork后与原仓库同步/index.html","6b8678fafd7ab3bf46cc67609927c3d4"],["D:/me/github/zakariyya.github.io/public/2019/10/24/搭建-Git-仓库恢复/index.html","817cbc194b7d3caecc129d939586a46f"],["D:/me/github/zakariyya.github.io/public/2030/08/16/电脑问题-How-to-kill-a-currently-using-port-on-localhost-in-windows/index.html","d958e36f37163ad07c29976481a4f79f"],["D:/me/github/zakariyya.github.io/public/archives/2015/12/index.html","45e4f46b6d6caea4c579d9f3de778de1"],["D:/me/github/zakariyya.github.io/public/archives/2015/index.html","45e4f46b6d6caea4c579d9f3de778de1"],["D:/me/github/zakariyya.github.io/public/archives/2016/01/index.html","8ec173d1b4b49815aed5fd24045fcc4d"],["D:/me/github/zakariyya.github.io/public/archives/2016/02/index.html","46139e9d1db6db31a381104b3ecbab82"],["D:/me/github/zakariyya.github.io/public/archives/2016/03/index.html","51adaef78e55232ba933fc59ef5cfab0"],["D:/me/github/zakariyya.github.io/public/archives/2016/04/index.html","b10b59b86cbf94c4514171d84c1b1a06"],["D:/me/github/zakariyya.github.io/public/archives/2016/05/index.html","7e0c3e81a401da0898faa33dcf1acd0b"],["D:/me/github/zakariyya.github.io/public/archives/2016/06/index.html","e8e2a41ff95db6b20de610aad0474c9a"],["D:/me/github/zakariyya.github.io/public/archives/2016/09/index.html","b9b8caa75abd2f63a1da654c7807ba25"],["D:/me/github/zakariyya.github.io/public/archives/2016/10/index.html","fab20de3b4ee1bc7c50cbd8e35f48e7f"],["D:/me/github/zakariyya.github.io/public/archives/2016/11/index.html","245f9e3589ae997d16dea1ea6ab20748"],["D:/me/github/zakariyya.github.io/public/archives/2016/index.html","71ac96da0cd463c41abd4a484d8e850f"],["D:/me/github/zakariyya.github.io/public/archives/2017/01/index.html","5021fe877785f241735bbae4b37635cf"],["D:/me/github/zakariyya.github.io/public/archives/2017/03/index.html","065816f1a7fd668e5efb1dc0905cb3e2"],["D:/me/github/zakariyya.github.io/public/archives/2017/04/index.html","bef257bcd5054a1843aba541d48e03b7"],["D:/me/github/zakariyya.github.io/public/archives/2017/05/index.html","e24a8d16c74cbeaa8a7837cef8d73e0e"],["D:/me/github/zakariyya.github.io/public/archives/2017/06/index.html","b58be638119a1cb4b1f7da8668ad02ab"],["D:/me/github/zakariyya.github.io/public/archives/2017/08/index.html","d87b510e19479ec27f75e9b193127ae7"],["D:/me/github/zakariyya.github.io/public/archives/2017/index.html","374392cbb4371a18e618ea3c5eea7fa1"],["D:/me/github/zakariyya.github.io/public/archives/2018/03/index.html","604cd1f63ceaf593fbd93aa2d84d7b1d"],["D:/me/github/zakariyya.github.io/public/archives/2018/04/index.html","98fb958aa3a952436e57dc637db9393f"],["D:/me/github/zakariyya.github.io/public/archives/2018/06/index.html","31f06341ac2e45eef31b45858f85352d"],["D:/me/github/zakariyya.github.io/public/archives/2018/07/index.html","80ee473bc9bf950e534c1fa538992b58"],["D:/me/github/zakariyya.github.io/public/archives/2018/08/index.html","beee88cefcd4c74e1211a81db75aeee3"],["D:/me/github/zakariyya.github.io/public/archives/2018/09/index.html","0dc667b64857ab6ea26aef4547fa23e0"],["D:/me/github/zakariyya.github.io/public/archives/2018/12/index.html","73e358b4dba97969ceb8b8579e66dbd8"],["D:/me/github/zakariyya.github.io/public/archives/2018/index.html","106321598e4f480979280502906c60c5"],["D:/me/github/zakariyya.github.io/public/archives/2019/01/index.html","86235b5f4d6ddaae927b21c02227f6c2"],["D:/me/github/zakariyya.github.io/public/archives/2019/02/index.html","29eccb5e0a5ce63f760bbe53b55e0228"],["D:/me/github/zakariyya.github.io/public/archives/2019/03/index.html","a0c196a7a8a22e845dd4aed9824a3428"],["D:/me/github/zakariyya.github.io/public/archives/2019/05/index.html","37d84abd0c6e0605a2b4dcb2ad10664a"],["D:/me/github/zakariyya.github.io/public/archives/2019/06/index.html","1d651e662e9627d1f3f83865c7cec109"],["D:/me/github/zakariyya.github.io/public/archives/2019/10/index.html","819ecfa47be55f495b482397a0d7d621"],["D:/me/github/zakariyya.github.io/public/archives/2019/index.html","050e731a5ff00f330041f9fce60a7a0b"],["D:/me/github/zakariyya.github.io/public/archives/2030/08/index.html","0d747ff1a4d81ddf6211a57c90346a10"],["D:/me/github/zakariyya.github.io/public/archives/2030/index.html","0d747ff1a4d81ddf6211a57c90346a10"],["D:/me/github/zakariyya.github.io/public/archives/index.html","e30ab1aa59fb2ed78b5d8189bc682735"],["D:/me/github/zakariyya.github.io/public/categories/Program/index.html","3cf15d57eeb07eb38ac80f80b1860881"],["D:/me/github/zakariyya.github.io/public/categories/backEnd/index.html","c40e8c4d1e92d24889ecc36e9cfc7cd2"],["D:/me/github/zakariyya.github.io/public/categories/index.html","20d81c49db69b5bbb2b38ba785a2a6c8"],["D:/me/github/zakariyya.github.io/public/categories/java-Program/index.html","a3b56bac381489b0140d3b721b0fa8aa"],["D:/me/github/zakariyya.github.io/public/categories/linux/index.html","bd09b3d8a4ad43a12100ee83793a650f"],["D:/me/github/zakariyya.github.io/public/categories/windows电脑问题/index.html","2d91fd26817e59c460b0d21f3121b85a"],["D:/me/github/zakariyya.github.io/public/categories/搭建/index.html","dcfdf9d0caea41f255ad07798436df25"],["D:/me/github/zakariyya.github.io/public/categories/日记本/index.html","e747fc83730cddb33b6183425c587cba"],["D:/me/github/zakariyya.github.io/public/categories/服务配置/index.html","9ea608c2d5952e5a028f41fb4b74fdd3"],["D:/me/github/zakariyya.github.io/public/categories/游戏性是什么/index.html","3bcca31c6a3e9de373aa5a1e286b7633"],["D:/me/github/zakariyya.github.io/public/categories/电脑问题/index.html","cd32c873ad9cfc377ff7d0306f2648aa"],["D:/me/github/zakariyya.github.io/public/categories/科普/index.html","f88f1272566bc5b206408f5f49f80412"],["D:/me/github/zakariyya.github.io/public/categories/系统-Linux/index.html","0e0e04e7a07af2f9b4e737964d7d038a"],["D:/me/github/zakariyya.github.io/public/categories/系统/index.html","c14bb793929daf009211eca4c09df1d5"],["D:/me/github/zakariyya.github.io/public/categories/编程/index.html","50abf24f41579f10a3f6abab39c1ab81"],["D:/me/github/zakariyya.github.io/public/categories/翻墙-Linux/index.html","cd5dbe6a6a8b14aab5cb7ec6cfa52dfc"],["D:/me/github/zakariyya.github.io/public/categories/翻墙/index.html","b728a6889537781b0b5fff35c9d85186"],["D:/me/github/zakariyya.github.io/public/categories/软件/index.html","1d7da7602fa97fad2d5529d1dabe1d23"],["D:/me/github/zakariyya.github.io/public/categories/随笔/index.html","c6735f597e534d355289e7dddc7dbfad"],["D:/me/github/zakariyya.github.io/public/css/base.css","fcf23de323fad904dc5ceab77d2a7cf7"],["D:/me/github/zakariyya.github.io/public/css/calendar.css","702500ec322c3d9ca65d704c135a5921"],["D:/me/github/zakariyya.github.io/public/css/code.css","97f4c1dc01be1105228c1807f55b74e5"],["D:/me/github/zakariyya.github.io/public/css/footer.css","df2c454e5e4fb8631700f2e412a78940"],["D:/me/github/zakariyya.github.io/public/css/header.css","6be9e934c0161c801d5ef99623854411"],["D:/me/github/zakariyya.github.io/public/css/main.css","efe260268a251ae6cc53212b4dc671d2"],["D:/me/github/zakariyya.github.io/public/css/navbar.css","9d9c69ea1d7c4421cad056e109aa3309"],["D:/me/github/zakariyya.github.io/public/css/post.css","e84eee86b9d23ca47adfcd28817877e3"],["D:/me/github/zakariyya.github.io/public/index.html","ffb35deb69a6ad9a561b3ad7970cd58c"],["D:/me/github/zakariyya.github.io/public/js/main.js","04670d6d5af2a30bfdf379cf61e7b629"],["D:/me/github/zakariyya.github.io/public/tags/FTP-文件上传-文件下载/index.html","5e5064065161046b16e90606f54d22e4"],["D:/me/github/zakariyya.github.io/public/tags/Google/index.html","ffa2273293926fba0fa76fda733bcb07"],["D:/me/github/zakariyya.github.io/public/tags/RabbitMQ/index.html","f1b0fcc90c513efab7fdb74ae3658628"],["D:/me/github/zakariyya.github.io/public/tags/Ubuntu/index.html","3483c1c722906925e29e820cb7fa37a9"],["D:/me/github/zakariyya.github.io/public/tags/ajax-前端/index.html","27b867f6dbd111e4b1f34db0464edebd"],["D:/me/github/zakariyya.github.io/public/tags/apahce/index.html","4d9f28d16f14989728e7ca3939166a1a"],["D:/me/github/zakariyya.github.io/public/tags/arch/index.html","006a46f76d070e5bf223f2d3c245b018"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程-rabbitMQ/index.html","e061c367a0a06a8af0deebc4792162b3"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程/index.html","b648b8cdd30f0a4f95b18bb44751142e"],["D:/me/github/zakariyya.github.io/public/tags/cloud-科普/index.html","8c40a3565f910d019f821a68feee7be9"],["D:/me/github/zakariyya.github.io/public/tags/git/index.html","d9b9fae2a46da17e6a288360a3e725db"],["D:/me/github/zakariyya.github.io/public/tags/hexo-搭建/index.html","b49e5ef15c12cd6f9d6ef7c827701fd9"],["D:/me/github/zakariyya.github.io/public/tags/index.html","a3a615c037dc123cdfd680ab71c84fbf"],["D:/me/github/zakariyya.github.io/public/tags/java-文件上传-文件下载-编程/index.html","4e7cbd6154fa2601371603a389f8310a"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos-oracle-databases/index.html","36427ab98f02fc6651e46521036ad953"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos/index.html","50750590b26ce73a4af55ac47632b124"],["D:/me/github/zakariyya.github.io/public/tags/linux-docker-Oracle-Ubuntu/index.html","b5c531f82e2738d2e0019ae590d4f22e"],["D:/me/github/zakariyya.github.io/public/tags/linux-sogou/index.html","55a68451b869796983c790c150533040"],["D:/me/github/zakariyya.github.io/public/tags/linux-ssh/index.html","b0b13f541a5eecd730e7e2fbaba537c1"],["D:/me/github/zakariyya.github.io/public/tags/linux-网络/index.html","3d3c5b9bb0fc0f6a0fde217eee47b68f"],["D:/me/github/zakariyya.github.io/public/tags/linux/index.html","02108aa8d1ecd8da2b8d2d6fb900fe27"],["D:/me/github/zakariyya.github.io/public/tags/maven/index.html","616b09d1357f72bdb6aeb452ad9621bd"],["D:/me/github/zakariyya.github.io/public/tags/nginx/index.html","575d52a8a24f7d203468ce762b1be9be"],["D:/me/github/zakariyya.github.io/public/tags/spring-SpringCloud-Eureka/index.html","7b41e086714c980d95ece7ce76397e8a"],["D:/me/github/zakariyya.github.io/public/tags/spring/index.html","0def7f41fabfe97865b96d450cde7f20"],["D:/me/github/zakariyya.github.io/public/tags/springboot/index.html","0a3c31333477ccf08d084295451fede8"],["D:/me/github/zakariyya.github.io/public/tags/teamviewer-电脑问题/index.html","f54d200069204903656dff2500a1e788"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git-服务器/index.html","4784a58010d88828a8131a3f78e2d883"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git/index.html","0f1df57af3981f50b910b3f4e08b32f8"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Leanote-云-笔记-云笔记/index.html","beb71273801f0a7cb9f62d083f7933cd"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Maven/index.html","379064aa8040392432706a022a9cc93d"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Ubuntu-FTP/index.html","4ae3627abc04650d93e1b19efb224c02"],["D:/me/github/zakariyya.github.io/public/tags/搭建-mysql/index.html","117bfa8fd8c9fce4b20955174ead0f58"],["D:/me/github/zakariyya.github.io/public/tags/搭建-开发环境-javaweb/index.html","f13f1190e037b2092faff765f5619efe"],["D:/me/github/zakariyya.github.io/public/tags/搭建-网盘-Ubuntu/index.html","14eb2d0a7f83caa96a02e760c7591353"],["D:/me/github/zakariyya.github.io/public/tags/搭建/index.html","316f1d9a4a84973118c9a53c32a9e486"],["D:/me/github/zakariyya.github.io/public/tags/游戏/index.html","37595078f09cd8e10452df59c7d37564"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题-端口-占用/index.html","a86f041c359279cd2927749ddb3383c8"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题/index.html","e29e8513501688d515c5817db5d034f9"],["D:/me/github/zakariyya.github.io/public/tags/碎碎-子涵/index.html","9ff0c734704f5aa4663758838ca737db"],["D:/me/github/zakariyya.github.io/public/tags/神器/index.html","aa27a3de6804438f94837b2f50256665"],["D:/me/github/zakariyya.github.io/public/tags/科普/index.html","7c3bf904ebe45253eb35b891199ab79e"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks-arch/index.html","58a9fdea93c780736101dd1c8b467b28"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks/index.html","362f8c030385936a201ca10d96cefbc7"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-v2ray/index.html","f09d55d640185a47cc3cbf5591a08404"]];
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







