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

var precacheConfig = [["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-Arch安装-日志/index.html","77ebde8b7ff6737ba4488cd83cad63d4"],["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-arch-arch安装笔记/index.html","6d2a6551ef981fe4221185f6efa10c22"],["D:/me/github/zakariyya.github.io/public/2016/01/15/碎碎念-那些住在手机里的朋友/index.html","e9667ddea2f59d29136ebda4a9ec4f66"],["D:/me/github/zakariyya.github.io/public/2016/01/28/碎碎念-时光/index.html","8272506b693acadb2a18dc80a0d75f9a"],["D:/me/github/zakariyya.github.io/public/2016/02/21/电脑问题-禁止软件开机自启动的三种方法/index.html","6bcebaee4290e63928b94afbb802f150"],["D:/me/github/zakariyya.github.io/public/2016/02/21/碎碎念-Google-x-’s-Loon，一个互联网气球/index.html","d1c6f718c09597052f31b77906941baf"],["D:/me/github/zakariyya.github.io/public/2016/02/26/电脑问题-windows7-我的电脑右键-管理“该文件没有与之关联的程序来执行该操作”/index.html","abcff0b839614bd1bab10fa1b2198493"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-QQ右下角弹出新闻框/index.html","705c24e99c18652a1b16c27d73736a14"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-win7隐藏IE浏览器/index.html","bbc1ae9fae42b000632e86e2171e627e"],["D:/me/github/zakariyya.github.io/public/2016/02/28/电脑问题-禁用UEFI安全启动功能/index.html","dd40853afe48ec456e30f734211e5e81"],["D:/me/github/zakariyya.github.io/public/2016/02/29/电脑问题-说说在win7下优化软件的必要性/index.html","b21e5c2d46e17bf79cf60fe03361a696"],["D:/me/github/zakariyya.github.io/public/2016/03/01/电脑问题-处理快捷方式小箭头/index.html","01f07b169a4e4fb69045ac86b86c00f0"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-一罐硬币实验的讨论——《信号与噪声》/index.html","8a05f5a36694e0f4e670818f0b5474a9"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-十二行代码/index.html","b0a9440021296504c9c50b8870cf579a"],["D:/me/github/zakariyya.github.io/public/2016/03/04/linux-arch打包sogou/index.html","b951dceec132356c47c1f3bfc785369a"],["D:/me/github/zakariyya.github.io/public/2016/03/06/linux-arch分swap/index.html","e0acbbbe0c2b92b298cc9f3329cb5abd"],["D:/me/github/zakariyya.github.io/public/2016/03/06/电脑问题-定时关机-睡眠/index.html","b6a41379423f078d73e95b7e32a8b53e"],["D:/me/github/zakariyya.github.io/public/2016/03/11/碎碎念-织梦/index.html","188b94ede1bee9617636133163e0b0d9"],["D:/me/github/zakariyya.github.io/public/2016/03/14/碎碎念-麻雀告诉我们的故事/index.html","1677c640216871741f96acba4750c1f7"],["D:/me/github/zakariyya.github.io/public/2016/03/17/碎碎念-还没有晾干的旧伞，闷在寂寞的房里/index.html","4456a3acce9e76ef0bf774a30041ef94"],["D:/me/github/zakariyya.github.io/public/2016/03/19/电脑问题-windows下启动项菜单-Boot-Manager-问题/index.html","5f9abdafa1dbe2fd51852bc4d2bc1636"],["D:/me/github/zakariyya.github.io/public/2016/03/20/碎碎念-春分/index.html","0a3678111e364d961dffe38357b36028"],["D:/me/github/zakariyya.github.io/public/2016/03/21/电脑问题-电脑文件搜索神器——Everything/index.html","215476e09543f3ab2ce7806fb43104b6"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-f-lux和“薄暮微光”/index.html","f3b6736f116e1584de79810f34d8ebbc"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-windows7-打开休眠模式/index.html","1496f5ab234b78d1b04cad239ac7da8f"],["D:/me/github/zakariyya.github.io/public/2016/04/05/碎碎念-旧照片/index.html","efa928150e86baeaba71b6760b97e3ab"],["D:/me/github/zakariyya.github.io/public/2016/04/07/linux-pppoe上网/index.html","e358ef3ad9d8905cab93574a09c620d8"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-无标题文章/index.html","58f602daf163c3718c5ea3747efd57c8"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-看几天韩剧的感想/index.html","5d97c2d5aeea753647dd9dda4a4462f9"],["D:/me/github/zakariyya.github.io/public/2016/04/18/碎碎念-恶意代码引起的反思/index.html","cd72c0259a78c0cfb5ad7ce5dd0f1a50"],["D:/me/github/zakariyya.github.io/public/2016/04/22/电脑问题-OneTab-和-轻听/index.html","41a5b16c70848d215c410e6c8b8b857c"],["D:/me/github/zakariyya.github.io/public/2016/05/04/碎碎念-孙悟空无姓无名的时候，阎王生死簿是怎么写的呢？/index.html","bee6e7f33b537baab2581b90f96b04ed"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-抠头发丝/index.html","fc9477eb85dcc5042151b91909dae907"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-百度，广告/index.html","45e0163cc6a334ef7bc42aadc662a1a8"],["D:/me/github/zakariyya.github.io/public/2016/05/25/碎碎念-“hello-os-world-”-of-Boot-Sector/index.html","7a5052aedf9e84c20990df158762d437"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏和身体/index.html","adca351f44a040b4f14525d01c8a96d7"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏的设计/index.html","07a25fc0c6a3d4670936838fa1a99878"],["D:/me/github/zakariyya.github.io/public/2016/06/05/文集-游戏性是什么-游戏性是什么-游戏和视觉/index.html","7c54200b0b89161b1532725bfdddad12"],["D:/me/github/zakariyya.github.io/public/2016/06/06/文集-游戏性是什么-游戏性是什么-游戏和世界/index.html","b3158a1a43a4cb48a11c7df3b6004fb7"],["D:/me/github/zakariyya.github.io/public/2016/06/07/文集-游戏性是什么-游戏性是什么-游戏和触觉/index.html","d9816c3392b22410071907b300996c4b"],["D:/me/github/zakariyya.github.io/public/2016/06/08/文集-游戏性是什么-游戏性是什么-专注游戏的原因/index.html","54507da3d21bbeb7b35189c993e7bf30"],["D:/me/github/zakariyya.github.io/public/2016/06/10/文集-游戏性是什么-游戏性是什么-难易度平衡设计与效率预测/index.html","dff6d8d128d521c9b1f7fd1e2ef561fe"],["D:/me/github/zakariyya.github.io/public/2016/06/11/文集-游戏性是什么-游戏性是什么-结构/index.html","92f4175895d96a320ea21a71b6e64777"],["D:/me/github/zakariyya.github.io/public/2016/06/12/文集-游戏性是什么-游戏性是什么-叙事和Narreme/index.html","8dade7ff1c5e7fa54b7f8788aad2e4d5"],["D:/me/github/zakariyya.github.io/public/2016/06/13/文集-游戏性是什么-游戏性是什么-记录《游戏性是什么》/index.html","a5b3da176405d103d1d7caa0fb4a17b5"],["D:/me/github/zakariyya.github.io/public/2016/09/07/linux-sogou输入配置/index.html","6373eb580abd37e80e1224cb1b332237"],["D:/me/github/zakariyya.github.io/public/2016/09/11/linux-ubuntu修改ssh端口/index.html","19597253a82713c9abd6ddf40f4b5110"],["D:/me/github/zakariyya.github.io/public/2016/10/30/碎碎念-日常20161030/index.html","2c709269042f725a3b1be7297e7a9aaa"],["D:/me/github/zakariyya.github.io/public/2016/10/31/碎碎念-日常——google涂鸦/index.html","9602834a9fc414dc250842f0730e56b8"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Google18岁了/index.html","56ab6155dce5d62513704c8d611b1557"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Many-Doors-In-My-Life/index.html","a32b83238cd1c236602285328e20f605"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-《越晚越开心》停播/index.html","c29a225b3085a3c5a8c837256c8abd1b"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-分数，教育的目的/index.html","e9bd14864f9019d53bbf6c3e68ad4ee2"],["D:/me/github/zakariyya.github.io/public/2017/01/21/电脑问题-Tomcat提示指定的服务未安装Unable-to-open-the-service-tomcat/index.html","2c3f3a7a5c15267b03b4268001d4dd15"],["D:/me/github/zakariyya.github.io/public/2017/01/24/电脑问题-windows10关闭“自动更新”/index.html","6cc104176d9b361a3bc604e393100bd7"],["D:/me/github/zakariyya.github.io/public/2017/03/24/backEnd-服务配置-Redis/index.html","a742614411d666cbf36c56e30e7e0a63"],["D:/me/github/zakariyya.github.io/public/2017/03/24/科普-Update与Modify两者区别/index.html","fa4aa054cee2e6d4336c6068a863a3be"],["D:/me/github/zakariyya.github.io/public/2017/04/23/backEnd-服务配置-apahce错误提示the-requested-operation-has-failed/index.html","25b4dafc31db7acd2ed331b1d84e43f5"],["D:/me/github/zakariyya.github.io/public/2017/05/23/linux-解决CentOS（6和7版本），-etc-sysconfig-下没有iptables的问题-副本/index.html","cde8838b1adf80a4140ae34faf36334a"],["D:/me/github/zakariyya.github.io/public/2017/06/16/frontEnd-ajax-使用ajax-方法加载服务器数据/index.html","1b544a4cd5b8a2186cc42c13e15374ba"],["D:/me/github/zakariyya.github.io/public/2017/06/18/frontEnd-ajax-this-id和-this-attr-id/index.html","2b69229fa96c99d89db5370f0a2eb7d3"],["D:/me/github/zakariyya.github.io/public/2017/08/05/电脑问题-eclipse中批量修改Java类文件中引入的package包路径/index.html","007eebb4dacd300f1fd1f6177b1a3766"],["D:/me/github/zakariyya.github.io/public/2017/08/22/backEnd-maven-maven项目jar包导入失败/index.html","d512446467a1f5c02a1ecaa18127e955"],["D:/me/github/zakariyya.github.io/public/2017/08/31/frontEnd-ajax-回调函数（callback）是什么？/index.html","56e0699c66caab037bd16d2cfc8c34d7"],["D:/me/github/zakariyya.github.io/public/2018/03/14/碎碎念-我未曾见过你-而你的光却照耀到了我/index.html","9b282661c1de7352d91c7a56940c61fc"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring-简介/index.html","613ab8836c39279dffd2b9930d7b43c0"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring分析/index.html","4e04cc16a4bc729b781c4d296f89093e"],["D:/me/github/zakariyya.github.io/public/2018/03/24/科普-视频格式/index.html","2456c1c26aa3c68911f9a0264f85231b"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-arch-开机自启动脚本/index.html","f4967e5651807596c2db9189ec01fc12"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-客户端/index.html","591c697e329e09c0968ac51f6ffc6bc8"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-服务端/index.html","a86ce03b1c56564fdc84d42e046d63ee"],["D:/me/github/zakariyya.github.io/public/2018/06/28/backEnd-spring-Spring-Boot-YML文件配置多环境/index.html","b29d760aba5ac91e70e90841b8961dee"],["D:/me/github/zakariyya.github.io/public/2018/06/28/搭建-Hexo搭建/index.html","0bfe0ed61b19975f0dd48c19b275b999"],["D:/me/github/zakariyya.github.io/public/2018/07/03/科普-软件为何会有那么多权限/index.html","d60bee06437331ca8364a2ed81c3fe29"],["D:/me/github/zakariyya.github.io/public/2018/07/12/编程-Java调用Python/index.html","fd9ea5d6d824aec0ba06dcd7e10b0a8e"],["D:/me/github/zakariyya.github.io/public/2018/07/19/backEnd-spring-Spring-Boot多数据源整合/index.html","f3d896bbae108e172346e89c8ab198f0"],["D:/me/github/zakariyya.github.io/public/2018/07/21/backEnd-修改形参对象值，会影响实参/index.html","ec1794ab5929ec9b373248061b039ffd"],["D:/me/github/zakariyya.github.io/public/2018/08/01/搭建-Jib构建你的第一个java镜像/index.html","c540cddaa99432c9ce676f13c2c7ff3c"],["D:/me/github/zakariyya.github.io/public/2018/08/01/科普-IaaS、SaaS-和-PaaS-的区别/index.html","9488fba8ad65eb2874456dc94079ef78"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-Maven-安装与入门/index.html","001be45a73ad29d87e2f18c634846e9c"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-基于-Ubuntu-搭建个人网盘/index.html","174c016ff05c45975b124b7b36fadd59"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-基于Ubuntu搭建FTP/index.html","8cacdd62515a0f1a586625649013dd77"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-搭建Git服务器/index.html","fd84607f2ec50a676daf92a19be8a72a"],["D:/me/github/zakariyya.github.io/public/2018/08/10/搭建-搭建javaweb开发环境/index.html","1fc75aa568c4f6a82da9980790d3c19d"],["D:/me/github/zakariyya.github.io/public/2018/08/15/搭建-搭建个人-Leanote-云笔记本/index.html","bd3459334a35fa40b555dd4cf393f591"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-FTP文件上传、下载/index.html","e82068b8cfaaa346a4002ccd20db5b62"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-文件上传下载/index.html","384485c212ed29588cc69b48be938d36"],["D:/me/github/zakariyya.github.io/public/2018/08/23/backEnd-spring-springboot-Component下-Autowired的注入为null/index.html","7ae37379626853081329bd6e79ea66aa"],["D:/me/github/zakariyya.github.io/public/2018/09/10/碎碎念-广电对游戏版号的限制/index.html","f2c1caba9aa466ce26d1e8ea14dae48a"],["D:/me/github/zakariyya.github.io/public/2018/09/19/linux-Ubuntu添加可信任根证书/index.html","ef3b7742fe37546f6c845993f793d997"],["D:/me/github/zakariyya.github.io/public/2018/09/19/搭建-mysql安装文档/index.html","89f093fa5ad6641c153f28d63540ecbc"],["D:/me/github/zakariyya.github.io/public/2018/09/23/搭建-nginx-搭建文档/index.html","8e48641c0a688fd941703934cdc598cd"],["D:/me/github/zakariyya.github.io/public/2018/09/23/电脑问题-Teamviewer-重置ID的工具/index.html","e05fce76756244727ee3e5e54a1a8e45"],["D:/me/github/zakariyya.github.io/public/2018/12/19/backEnd-IDEA多模块项目Module-must-not-contain-source-root-The-root-already-belongs-to-module/index.html","56d3c2ba00b832ffa9f55fa23bd8e120"],["D:/me/github/zakariyya.github.io/public/2019/01/02/编程-markdown折叠内容语法/index.html","82db9e1fe5fcb4c677ba102475432c4c"],["D:/me/github/zakariyya.github.io/public/2019/01/03/backEnd-maven-maven标签字典/index.html","c11d0ed059bb53480c5709fcfe5d94b9"],["D:/me/github/zakariyya.github.io/public/2019/01/11/linux-docker离线安装/index.html","34fbff7411dfc5075e98dd33b855a492"],["D:/me/github/zakariyya.github.io/public/2019/01/17/linux-命令行下安装-oracle-11gR2-数据库/index.html","9d3d8a86ec9435a2786521b058ecda05"],["D:/me/github/zakariyya.github.io/public/2019/01/24/backEnd-spring-异常捕获/index.html","11918f9b51d2b4a1826706131317075f"],["D:/me/github/zakariyya.github.io/public/2019/01/27/编程-Git/index.html","782e070c3d4e9c347cf543acf3368577"],["D:/me/github/zakariyya.github.io/public/2019/02/24/backEnd-spring-SpringCloud/index.html","7da97ce7cc8ac929e6f942bd6f86a274"],["D:/me/github/zakariyya.github.io/public/2019/03/01/科普-常见版本号/index.html","18b931ffadf276c55066c34cd2a59439"],["D:/me/github/zakariyya.github.io/public/2019/03/04/搭建-RabbitMQ-server搭建/index.html","9a782592d9007da71c5a12f41b580b69"],["D:/me/github/zakariyya.github.io/public/2019/03/12/搭建-翻墙-v2ray搭建启动/index.html","f857568dce5ce2f1a58273d3726b7831"],["D:/me/github/zakariyya.github.io/public/2019/03/14/backEnd-rabbitMQ-交换器/index.html","8c6d401f04ccbcde4c005ab21196d9f8"],["D:/me/github/zakariyya.github.io/public/2019/05/28/cloud-cloud/index.html","77835aca3397be0af6ba82608b29e7f2"],["D:/me/github/zakariyya.github.io/public/2019/06/11/编程-Github进行fork后与原仓库同步/index.html","a82c4a2888f5e74bab5ce2775708cbe7"],["D:/me/github/zakariyya.github.io/public/2019/10/24/搭建-Git-仓库恢复/index.html","7f5f4315b0d08e1dd8b15fd13ef39e4c"],["D:/me/github/zakariyya.github.io/public/2019/11/21/编程-多个git账号的SSH-key切换/index.html","5229411fa88f0cefd9952089342930aa"],["D:/me/github/zakariyya.github.io/public/2020/01/10/电脑问题-idea-2019-3-破解/index.html","348fb5ed5614145f1386a5f1191c4b7b"],["D:/me/github/zakariyya.github.io/public/2020/03/23/搭建-MinDoc搭建过程/index.html","7ddc27efb75091966e485ed02970a3a8"],["D:/me/github/zakariyya.github.io/public/2030/08/16/电脑问题-How-to-kill-a-currently-using-port-on-localhost-in-windows/index.html","a55bccf243be26570b34955e75541b35"],["D:/me/github/zakariyya.github.io/public/archives/2015/12/index.html","617eb57355af218b9cf3d4de6ae5d619"],["D:/me/github/zakariyya.github.io/public/archives/2015/index.html","617eb57355af218b9cf3d4de6ae5d619"],["D:/me/github/zakariyya.github.io/public/archives/2016/01/index.html","3aa11047cd6ee6e30f2dbe2783e072c5"],["D:/me/github/zakariyya.github.io/public/archives/2016/02/index.html","8692a698c1e6309a964498df9d1e990c"],["D:/me/github/zakariyya.github.io/public/archives/2016/03/index.html","a48d4a45a2f1a60430198ead133c9163"],["D:/me/github/zakariyya.github.io/public/archives/2016/04/index.html","c5e68f4713b171c3f2f260bc807bb380"],["D:/me/github/zakariyya.github.io/public/archives/2016/05/index.html","b4bc7ca7b700e83a87b20d46420ae8ea"],["D:/me/github/zakariyya.github.io/public/archives/2016/06/index.html","4d98c4518a50d31144db53aa619f8264"],["D:/me/github/zakariyya.github.io/public/archives/2016/09/index.html","10632f54cf2c49e5e3bfaccfc95a2a00"],["D:/me/github/zakariyya.github.io/public/archives/2016/10/index.html","54a5cb7b3a5ff39f05f1e0ed057107f8"],["D:/me/github/zakariyya.github.io/public/archives/2016/11/index.html","dc027c28549bbfba7a2f6deb0066d673"],["D:/me/github/zakariyya.github.io/public/archives/2016/index.html","2d10aed8c1a0da58475b9d8e93aebd86"],["D:/me/github/zakariyya.github.io/public/archives/2017/01/index.html","4c3d67dcfeebb407bd0ff6ccfbc131fc"],["D:/me/github/zakariyya.github.io/public/archives/2017/03/index.html","077b7268973b4c2a113b100d6e3c222e"],["D:/me/github/zakariyya.github.io/public/archives/2017/04/index.html","c97788c666b3d959378bb73f7a309906"],["D:/me/github/zakariyya.github.io/public/archives/2017/05/index.html","318aad6023077c42e272c4b2fe6b505e"],["D:/me/github/zakariyya.github.io/public/archives/2017/06/index.html","c3330b6ee66dd720537a649c4b782ff1"],["D:/me/github/zakariyya.github.io/public/archives/2017/08/index.html","5e130de0604316656f5234af092f7f84"],["D:/me/github/zakariyya.github.io/public/archives/2017/index.html","e87a775015a993fe3835007772789b6e"],["D:/me/github/zakariyya.github.io/public/archives/2018/03/index.html","50b01115fc6865536538c16871ebf068"],["D:/me/github/zakariyya.github.io/public/archives/2018/04/index.html","6742cabad2f4cfc4245e43d5c0c8e40e"],["D:/me/github/zakariyya.github.io/public/archives/2018/06/index.html","690d13dedb9d8f81e696c229ae62b214"],["D:/me/github/zakariyya.github.io/public/archives/2018/07/index.html","2fcdd7e5e684bcf5c7ece441cd1bac34"],["D:/me/github/zakariyya.github.io/public/archives/2018/08/index.html","5ec46664d4be817cd952912747da3b16"],["D:/me/github/zakariyya.github.io/public/archives/2018/09/index.html","cf00954d464a694f1ddc7049c1c37730"],["D:/me/github/zakariyya.github.io/public/archives/2018/12/index.html","0f8ba0d8bc74c38539274065d60e9838"],["D:/me/github/zakariyya.github.io/public/archives/2018/index.html","8e0d66231f6b676e50ca6efdaa412fb8"],["D:/me/github/zakariyya.github.io/public/archives/2019/01/index.html","1db3d842051e65c0394e8533308d7827"],["D:/me/github/zakariyya.github.io/public/archives/2019/02/index.html","ed3b583d493a49eb381ec0a9f006ce6d"],["D:/me/github/zakariyya.github.io/public/archives/2019/03/index.html","1d788408c5ee27a3d6aaa2375a9795a8"],["D:/me/github/zakariyya.github.io/public/archives/2019/05/index.html","b8a8a8ae1bbae5b88443d2ab37d2dbb0"],["D:/me/github/zakariyya.github.io/public/archives/2019/06/index.html","f5cba4576185a8cbadd395349a7e4fb6"],["D:/me/github/zakariyya.github.io/public/archives/2019/10/index.html","d0e44d4b7344a4f85034a690bae70d90"],["D:/me/github/zakariyya.github.io/public/archives/2019/11/index.html","af9d41a9321f81a48900bfde860bad46"],["D:/me/github/zakariyya.github.io/public/archives/2019/index.html","cfb29511a66d86ea296f3f63b242addb"],["D:/me/github/zakariyya.github.io/public/archives/2020/01/index.html","f67cded3eda0d28208f920642b887e35"],["D:/me/github/zakariyya.github.io/public/archives/2020/03/index.html","b6b9bd2d6dd83c67fc785fccae827919"],["D:/me/github/zakariyya.github.io/public/archives/2020/index.html","1a87539134c5c26539734f9c31ec621e"],["D:/me/github/zakariyya.github.io/public/archives/2030/08/index.html","490fbb371002010f011f1e45d9eea2bf"],["D:/me/github/zakariyya.github.io/public/archives/2030/index.html","490fbb371002010f011f1e45d9eea2bf"],["D:/me/github/zakariyya.github.io/public/archives/index.html","faacc28ed528c7e4e84bcb6c8c94f1a4"],["D:/me/github/zakariyya.github.io/public/categories/Program/index.html","ca824d71fbe321e0287e894b0b2c7d63"],["D:/me/github/zakariyya.github.io/public/categories/backEnd/index.html","425fb4602e5c111afc533ca03319bc49"],["D:/me/github/zakariyya.github.io/public/categories/index.html","4ea0adeb00db5477b4c7ef62310723b4"],["D:/me/github/zakariyya.github.io/public/categories/java-Program/index.html","718690dd8a5c1ae39ff21ec6d83453c8"],["D:/me/github/zakariyya.github.io/public/categories/linux/index.html","14a076f87ca3115ffdf19efc9dd7765f"],["D:/me/github/zakariyya.github.io/public/categories/windows电脑问题/index.html","aabb0dba257e101482419c7c15561403"],["D:/me/github/zakariyya.github.io/public/categories/搭建/index.html","31bb276f5b6caa508794bbc762ac055f"],["D:/me/github/zakariyya.github.io/public/categories/日记本/index.html","fff34ba1f7aa2432b12c0a507596049e"],["D:/me/github/zakariyya.github.io/public/categories/服务配置/index.html","170ad5bb964acbc2aeb53e7d10f961b5"],["D:/me/github/zakariyya.github.io/public/categories/游戏性是什么/index.html","709539f2510301194757c1baa109f083"],["D:/me/github/zakariyya.github.io/public/categories/电脑问题/index.html","e7c9d987e5a8b6a96d28e93126e8efe6"],["D:/me/github/zakariyya.github.io/public/categories/科普/index.html","08f91bbe386f9bc5bb796fbf76e6bfb3"],["D:/me/github/zakariyya.github.io/public/categories/系统-Linux/index.html","25356e9efa06e7d9155af43ede96bccf"],["D:/me/github/zakariyya.github.io/public/categories/系统/index.html","8d06a36e1cdf1d660fcba6ddde3329ac"],["D:/me/github/zakariyya.github.io/public/categories/编程/index.html","d9cda4c1a40c68c798192cfd9cb62455"],["D:/me/github/zakariyya.github.io/public/categories/翻墙-Linux/index.html","6766ab54164bac3fc2a957a07c60bd31"],["D:/me/github/zakariyya.github.io/public/categories/翻墙/index.html","2d11f7033ef6d077623ba22173de8556"],["D:/me/github/zakariyya.github.io/public/categories/软件/index.html","873860cdbaa259788f71c48e76e07c1f"],["D:/me/github/zakariyya.github.io/public/categories/随笔/index.html","0bb0255c8512bd4fc1a318db30dcd0c9"],["D:/me/github/zakariyya.github.io/public/css/base.css","fcf23de323fad904dc5ceab77d2a7cf7"],["D:/me/github/zakariyya.github.io/public/css/calendar.css","702500ec322c3d9ca65d704c135a5921"],["D:/me/github/zakariyya.github.io/public/css/code.css","97f4c1dc01be1105228c1807f55b74e5"],["D:/me/github/zakariyya.github.io/public/css/footer.css","df2c454e5e4fb8631700f2e412a78940"],["D:/me/github/zakariyya.github.io/public/css/header.css","6be9e934c0161c801d5ef99623854411"],["D:/me/github/zakariyya.github.io/public/css/main.css","efe260268a251ae6cc53212b4dc671d2"],["D:/me/github/zakariyya.github.io/public/css/navbar.css","9d9c69ea1d7c4421cad056e109aa3309"],["D:/me/github/zakariyya.github.io/public/css/post.css","e84eee86b9d23ca47adfcd28817877e3"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解1.jpg","57179fc2fc54305772b9742f643d2663"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解2.jpg","967a08b249d58a816b0d8b26a386909f"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解3.jpg","3cbdca5d487b8b3d75a08bf5b6aa7e42"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解4.jpg","473dee667479517a8a1e6efc7b4778f3"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解5.jpg","440672c914d39c5fc52d7c2466502ee6"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解6.jpg","ca131ee0383864d134cbc685eed974ac"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解7.jpg","ac7cf1e379a48a638250a8a4e138a961"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解8.jpg","097e39c1bb9d4a32dcb01fa58b42aabc"],["D:/me/github/zakariyya.github.io/public/index.html","78443ac312fa5a6d014a4b252014ce75"],["D:/me/github/zakariyya.github.io/public/js/main.js","04670d6d5af2a30bfdf379cf61e7b629"],["D:/me/github/zakariyya.github.io/public/tags/FTP-文件上传-文件下载/index.html","7fa21cc015ae323e13cf40dea1b9cfcf"],["D:/me/github/zakariyya.github.io/public/tags/Google/index.html","ceed48724ab457edfefa70cb4dbb1c3a"],["D:/me/github/zakariyya.github.io/public/tags/RabbitMQ/index.html","cbd686cd32784b683963c88b6775b1dc"],["D:/me/github/zakariyya.github.io/public/tags/Ubuntu/index.html","889a622a675b03bd2cc941c361a7eb5e"],["D:/me/github/zakariyya.github.io/public/tags/ajax-前端/index.html","4f9e5670190e3c4e56b9bf80026cedc5"],["D:/me/github/zakariyya.github.io/public/tags/apahce/index.html","4eb2bcd5392db91c9bdc488691491ce6"],["D:/me/github/zakariyya.github.io/public/tags/arch/index.html","57088cee6e44bb82337b9960b48e81f3"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程-rabbitMQ/index.html","6cf832ec336a8a43dbf7d3ee8ebac61d"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程/index.html","5eee21e6d0aa48486f77a67edad1f5e7"],["D:/me/github/zakariyya.github.io/public/tags/cloud-科普/index.html","eb8d70d52a0520db5276dce4a66f78f5"],["D:/me/github/zakariyya.github.io/public/tags/git-ssh/index.html","c6044b33e007ede3a2070dde37f2db94"],["D:/me/github/zakariyya.github.io/public/tags/git/index.html","3659d56524a3f76ad9ad985d6299d524"],["D:/me/github/zakariyya.github.io/public/tags/hexo-搭建/index.html","7525fb54bc63b9a4b0711f62fa4ac663"],["D:/me/github/zakariyya.github.io/public/tags/index.html","74c7d8458feb07ad82f4cfd5446cc4f6"],["D:/me/github/zakariyya.github.io/public/tags/java-文件上传-文件下载-编程/index.html","8a36fd0ccad7eba58a1e521762c205ba"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos-oracle-databases/index.html","d032fb33ff1794a763de26b9461cb667"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos/index.html","6390d42ca8dd468b3424e6a46ad7bd55"],["D:/me/github/zakariyya.github.io/public/tags/linux-docker-Oracle-Ubuntu/index.html","8edb9232a8d82ac67047f424b87d8068"],["D:/me/github/zakariyya.github.io/public/tags/linux-sogou/index.html","03a596cd129a634fd072fc777116ee62"],["D:/me/github/zakariyya.github.io/public/tags/linux-ssh/index.html","0a0d380cb1bdaa5685cfb14ae0c1ad5f"],["D:/me/github/zakariyya.github.io/public/tags/linux-网络/index.html","7f463779aec4de1e4cbed8e5910ce8fb"],["D:/me/github/zakariyya.github.io/public/tags/linux/index.html","274970f9a781bb9d5085ebb4e36b9f4a"],["D:/me/github/zakariyya.github.io/public/tags/maven/index.html","c96379aa95ea5ae036ea372864839000"],["D:/me/github/zakariyya.github.io/public/tags/nginx/index.html","66b2fc14dda8299056901eaf6aa9b030"],["D:/me/github/zakariyya.github.io/public/tags/spring-SpringCloud-Eureka/index.html","3fb993e225b338d9802f6b236118a727"],["D:/me/github/zakariyya.github.io/public/tags/spring/index.html","845eb0803f160b5a94da2321bc8110bb"],["D:/me/github/zakariyya.github.io/public/tags/springboot/index.html","710622233e84114403f1cbef0251dc43"],["D:/me/github/zakariyya.github.io/public/tags/teamviewer-电脑问题/index.html","e9d0965cf935af4bf577b820d337f7bb"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git-服务器/index.html","e0fa97d4f8e3107a3273fbe6e3a984bf"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git/index.html","f9ea4ffec9b3abc38c266e73acb59a15"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Leanote-云-笔记-云笔记/index.html","46a0ae9880b9407fe3ca9830f485b8d8"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Maven/index.html","fa85961d1741f4cc98167bfa757a35d9"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Ubuntu-FTP/index.html","979163e567c49f1bc06f2dd08c9d9c6d"],["D:/me/github/zakariyya.github.io/public/tags/搭建-mysql/index.html","62f294dfbce95133a87263b7282d442d"],["D:/me/github/zakariyya.github.io/public/tags/搭建-开发环境-javaweb/index.html","b9356fa260e5a2bc4fcb2105c394ea47"],["D:/me/github/zakariyya.github.io/public/tags/搭建-网盘-Ubuntu/index.html","1769bc8aede9cbb0221da4d44dce1810"],["D:/me/github/zakariyya.github.io/public/tags/搭建/index.html","2c25c2c08a7fb726043dcffeeae234f8"],["D:/me/github/zakariyya.github.io/public/tags/游戏/index.html","533fe972077a8db0705f0b1dabb4b349"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题-端口-占用/index.html","b39ddf4765064009c40fde247c97f946"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题/index.html","f813c17fedf6a4956fe235112eb7e0a2"],["D:/me/github/zakariyya.github.io/public/tags/碎碎-子涵/index.html","7922650f06913de2bd6822528a715156"],["D:/me/github/zakariyya.github.io/public/tags/神器/index.html","dcc3f3bef3228ae9a615322eb0383d7d"],["D:/me/github/zakariyya.github.io/public/tags/科普/index.html","60ef7659f37484f22fff1d2bd9350e54"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks-arch/index.html","1a26fee717d7845751046a45ae1beedb"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks/index.html","79db7f8a297c61039a13cf7684e8db5f"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-v2ray/index.html","73f0e56e0dcd5eb5b5e4a53e4b41ba06"]];
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







