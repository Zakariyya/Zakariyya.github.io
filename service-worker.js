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

var precacheConfig = [["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-Arch安装-日志/index.html","7cab869ea89ba5e85492f663a4b916af"],["D:/me/github/zakariyya.github.io/public/2015/12/21/linux-arch-arch安装笔记/index.html","e7216e96becb9ffca9d5c69e32f95ae8"],["D:/me/github/zakariyya.github.io/public/2016/01/15/碎碎念-那些住在手机里的朋友/index.html","a504f49d05dbb9141eb63b2c3b3a4b16"],["D:/me/github/zakariyya.github.io/public/2016/01/28/碎碎念-时光/index.html","e9a71adb4754358a2db2f0ad45ab51c4"],["D:/me/github/zakariyya.github.io/public/2016/02/21/电脑问题-禁止软件开机自启动的三种方法/index.html","d79a5e1ecb29e921d6d06dd8ffa448cd"],["D:/me/github/zakariyya.github.io/public/2016/02/21/碎碎念-Google-x-’s-Loon，一个互联网气球/index.html","7cdc9e544c051732fadb6d99ded4e62c"],["D:/me/github/zakariyya.github.io/public/2016/02/26/电脑问题-windows7-我的电脑右键-管理“该文件没有与之关联的程序来执行该操作”/index.html","5102118b90738f5c4ba22b15605a1fee"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-QQ右下角弹出新闻框/index.html","aef762da32f1461bb295011c00757674"],["D:/me/github/zakariyya.github.io/public/2016/02/27/电脑问题-win7隐藏IE浏览器/index.html","7086d85de9c00aded630ee42df2d599b"],["D:/me/github/zakariyya.github.io/public/2016/02/28/电脑问题-禁用UEFI安全启动功能/index.html","b72bfb1738dde659e9bc1af213012919"],["D:/me/github/zakariyya.github.io/public/2016/02/29/电脑问题-说说在win7下优化软件的必要性/index.html","af4860938dbe7b61356b9e7842c47415"],["D:/me/github/zakariyya.github.io/public/2016/03/01/电脑问题-处理快捷方式小箭头/index.html","da56e93b48c8991109e4a031ef7b2c13"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-一罐硬币实验的讨论——《信号与噪声》/index.html","27d376eeb6703f376de8d2191d995a6f"],["D:/me/github/zakariyya.github.io/public/2016/03/02/碎碎念-十二行代码/index.html","5d2ebadc6d80f6218ab41e950df46c86"],["D:/me/github/zakariyya.github.io/public/2016/03/04/linux-arch打包sogou/index.html","e38c6fe582f89accea66f5ef0a529b9c"],["D:/me/github/zakariyya.github.io/public/2016/03/06/linux-arch分swap/index.html","f6142a8184cd82b6be996854ac41405b"],["D:/me/github/zakariyya.github.io/public/2016/03/06/电脑问题-定时关机-睡眠/index.html","0823e71ea698c0ad170a5861541dcea9"],["D:/me/github/zakariyya.github.io/public/2016/03/11/碎碎念-织梦/index.html","f8884637f228bf396d9799d42b4f2e23"],["D:/me/github/zakariyya.github.io/public/2016/03/14/碎碎念-麻雀告诉我们的故事/index.html","f6dc01fec01cfe935a79117e17b7cdd3"],["D:/me/github/zakariyya.github.io/public/2016/03/17/碎碎念-还没有晾干的旧伞，闷在寂寞的房里/index.html","cd96baee880fcbb45eb135f599c21bbe"],["D:/me/github/zakariyya.github.io/public/2016/03/19/电脑问题-windows下启动项菜单-Boot-Manager-问题/index.html","6e228f7507b3d0ee353030a8cd37469d"],["D:/me/github/zakariyya.github.io/public/2016/03/20/碎碎念-春分/index.html","54031f5b3008aa14816d4f79dd93c646"],["D:/me/github/zakariyya.github.io/public/2016/03/21/电脑问题-电脑文件搜索神器——Everything/index.html","8668272ce7ae9f6a8294c18369539dc3"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-f-lux和“薄暮微光”/index.html","320d72971c1ca41b4c8e263e4f4f6ac6"],["D:/me/github/zakariyya.github.io/public/2016/04/01/电脑问题-windows7-打开休眠模式/index.html","692763a8d3e457a63eb7a39bdfb4d701"],["D:/me/github/zakariyya.github.io/public/2016/04/05/碎碎念-旧照片/index.html","35f26180faec81ed3a9c5c334517d66b"],["D:/me/github/zakariyya.github.io/public/2016/04/07/linux-pppoe上网/index.html","678d94f6a268c236a066d7c47353c4cd"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-无标题文章/index.html","f309c08ae740eaca2cb02396483a4c2f"],["D:/me/github/zakariyya.github.io/public/2016/04/15/碎碎念-看几天韩剧的感想/index.html","b581b6c73ea1a0449b1ac481346b4e87"],["D:/me/github/zakariyya.github.io/public/2016/04/18/碎碎念-恶意代码引起的反思/index.html","e006f330f1924d8ad2d381ddd6956faa"],["D:/me/github/zakariyya.github.io/public/2016/04/22/电脑问题-OneTab-和-轻听/index.html","30d63682e40d60b3342c5f73852f0002"],["D:/me/github/zakariyya.github.io/public/2016/05/04/碎碎念-孙悟空无姓无名的时候，阎王生死簿是怎么写的呢？/index.html","1eb75a36090c5e761b01aef22ab41688"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-抠头发丝/index.html","678e8060fcce40152cb75fe23cb147c6"],["D:/me/github/zakariyya.github.io/public/2016/05/08/碎碎念-百度，广告/index.html","382a89953033afe6be789a20285ace95"],["D:/me/github/zakariyya.github.io/public/2016/05/25/碎碎念-“hello-os-world-”-of-Boot-Sector/index.html","f46a443525e01a651b0bd0a7f53f2abe"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏和身体/index.html","7edcf3b920725f97fa82a9c1f612c084"],["D:/me/github/zakariyya.github.io/public/2016/06/04/文集-游戏性是什么-游戏性是什么-游戏的设计/index.html","56806052c78bb0dc0a5242d252b22c58"],["D:/me/github/zakariyya.github.io/public/2016/06/05/文集-游戏性是什么-游戏性是什么-游戏和视觉/index.html","20a677072a5d4a54f98ecb2a9b2a7c2a"],["D:/me/github/zakariyya.github.io/public/2016/06/06/文集-游戏性是什么-游戏性是什么-游戏和世界/index.html","0bb2b5c202921a00f8e3b9af13aa5f15"],["D:/me/github/zakariyya.github.io/public/2016/06/07/文集-游戏性是什么-游戏性是什么-游戏和触觉/index.html","55fc8c9bd88bc653ee3607a901ed2d36"],["D:/me/github/zakariyya.github.io/public/2016/06/08/文集-游戏性是什么-游戏性是什么-专注游戏的原因/index.html","6b71f8f589cc28fd54cd8f010a084e06"],["D:/me/github/zakariyya.github.io/public/2016/06/10/文集-游戏性是什么-游戏性是什么-难易度平衡设计与效率预测/index.html","e751bd3f427d69efa135267f9bfbcdc0"],["D:/me/github/zakariyya.github.io/public/2016/06/11/文集-游戏性是什么-游戏性是什么-结构/index.html","32dc6f4fec68838fe65e79f421513ff1"],["D:/me/github/zakariyya.github.io/public/2016/06/12/文集-游戏性是什么-游戏性是什么-叙事和Narreme/index.html","8570dc7e9828cfb70132e48fef5db0ae"],["D:/me/github/zakariyya.github.io/public/2016/06/13/文集-游戏性是什么-游戏性是什么-记录《游戏性是什么》/index.html","517160327ec094615486d1a56ba401d3"],["D:/me/github/zakariyya.github.io/public/2016/09/07/linux-sogou输入配置/index.html","7ee13993e592065032c2e00d3a9c37b1"],["D:/me/github/zakariyya.github.io/public/2016/09/11/linux-ubuntu修改ssh端口/index.html","ec61fbf0a8994701687fc2357aae15ef"],["D:/me/github/zakariyya.github.io/public/2016/10/30/碎碎念-日常20161030/index.html","fb963c6d79931ead58596b8eed3e7d02"],["D:/me/github/zakariyya.github.io/public/2016/10/31/碎碎念-日常——google涂鸦/index.html","f1079ac1fdae288e45e68cdbcb856f97"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Google18岁了/index.html","04e6bbe5368f589ef5385514eda41219"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-Many-Doors-In-My-Life/index.html","c57d114c7e0eed15592cbd11b2569425"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-《越晚越开心》停播/index.html","4656609b352169c5c985f3469fec296d"],["D:/me/github/zakariyya.github.io/public/2016/11/05/碎碎念-分数，教育的目的/index.html","e94b9ee052ae5be9ff87b5dd81f25174"],["D:/me/github/zakariyya.github.io/public/2017/01/21/电脑问题-Tomcat提示指定的服务未安装Unable-to-open-the-service-tomcat/index.html","9b259c6a00f3852731eed92d62946b06"],["D:/me/github/zakariyya.github.io/public/2017/01/24/电脑问题-windows10关闭“自动更新”/index.html","2e352263ed4a60d1fe41a66e27cc1a34"],["D:/me/github/zakariyya.github.io/public/2017/03/24/backEnd-服务配置-Redis/index.html","68d2c9749aac68e62d4a4f058bff1aba"],["D:/me/github/zakariyya.github.io/public/2017/03/24/科普-Update与Modify两者区别/index.html","a927b46a434466d6932b004ed0650abf"],["D:/me/github/zakariyya.github.io/public/2017/04/23/backEnd-服务配置-apahce错误提示the-requested-operation-has-failed/index.html","cc0f2caaf2aa25be687022a7904f6d76"],["D:/me/github/zakariyya.github.io/public/2017/05/23/linux-解决CentOS（6和7版本），-etc-sysconfig-下没有iptables的问题-副本/index.html","2b68ab750c29064697dfe40af266395a"],["D:/me/github/zakariyya.github.io/public/2017/06/16/frontEnd-ajax-使用ajax-方法加载服务器数据/index.html","1d951ba67405953c91cae704880302f1"],["D:/me/github/zakariyya.github.io/public/2017/06/18/frontEnd-ajax-this-id和-this-attr-id/index.html","0005c1b7dde25467b4590a12c06fec6b"],["D:/me/github/zakariyya.github.io/public/2017/08/05/电脑问题-eclipse中批量修改Java类文件中引入的package包路径/index.html","9145ff367f6effbd577f05d4a2793b09"],["D:/me/github/zakariyya.github.io/public/2017/08/22/backEnd-maven-maven项目jar包导入失败/index.html","7a4d2cfd39cae3d7a3a15509ae43c762"],["D:/me/github/zakariyya.github.io/public/2017/08/31/frontEnd-ajax-回调函数（callback）是什么？/index.html","de30332de5b0c77f4342a7f857075fab"],["D:/me/github/zakariyya.github.io/public/2018/03/14/碎碎念-我未曾见过你-而你的光却照耀到了我/index.html","3563cdcb28e55696eb92bfa768fd4d3a"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring-简介/index.html","c20399f1e03deb9db96fa67e6b1c4ee0"],["D:/me/github/zakariyya.github.io/public/2018/03/18/backEnd-spring-tiny-spring分析/index.html","0502c03754968d3bfe2565e729009129"],["D:/me/github/zakariyya.github.io/public/2018/03/24/科普-视频格式/index.html","8fc41bc71b44af45737420f3c669067d"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-arch-开机自启动脚本/index.html","20925c77f6f8149825e4e97ef528a124"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-客户端/index.html","74cd11f24df511ad90734031c8ee83dd"],["D:/me/github/zakariyya.github.io/public/2018/04/23/搭建-翻墙-shadowsocks搭建过程-服务端/index.html","109dcefd965205539d17e5161b1d84bc"],["D:/me/github/zakariyya.github.io/public/2018/06/28/backEnd-spring-Spring-Boot-YML文件配置多环境/index.html","369dfe18a18ac622fe7e9b6af6f6e572"],["D:/me/github/zakariyya.github.io/public/2018/06/28/搭建-Hexo搭建/index.html","7f325032c2453ea7215a41285576b19b"],["D:/me/github/zakariyya.github.io/public/2018/07/03/科普-软件为何会有那么多权限/index.html","d3a33f66c20ecc6e6d07bd1e0cff77c2"],["D:/me/github/zakariyya.github.io/public/2018/07/12/编程-Java调用Python/index.html","313276e9ef6045c8a5adf73a5b243250"],["D:/me/github/zakariyya.github.io/public/2018/07/19/backEnd-spring-Spring-Boot多数据源整合/index.html","5711172e0cfdf2753781dd716f731452"],["D:/me/github/zakariyya.github.io/public/2018/07/21/backEnd-修改形参对象值，会影响实参/index.html","a0ba6d57b64ee7e2e5223400b088ae37"],["D:/me/github/zakariyya.github.io/public/2018/08/01/搭建-Jib构建你的第一个java镜像/index.html","9d2ea9a4f0eec18626499f90a0aa0c76"],["D:/me/github/zakariyya.github.io/public/2018/08/01/科普-IaaS、SaaS-和-PaaS-的区别/index.html","8b1d937026fafd3c253c99ff0fe858b4"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-Maven-安装与入门/index.html","a598f50d8eaf3947abac03607860d109"],["D:/me/github/zakariyya.github.io/public/2018/08/02/搭建-基于-Ubuntu-搭建个人网盘/index.html","e9952075b9ab00ed080681eadea9d932"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-基于Ubuntu搭建FTP/index.html","dd0b46ad623d2d00ccc697e2e8bc1b7d"],["D:/me/github/zakariyya.github.io/public/2018/08/03/搭建-搭建Git服务器/index.html","41c9da69663d1e7ca214abc42c91c22d"],["D:/me/github/zakariyya.github.io/public/2018/08/10/搭建-搭建javaweb开发环境/index.html","dceaf1288c1d99ccdcc4ec2604941c4a"],["D:/me/github/zakariyya.github.io/public/2018/08/15/搭建-搭建个人-Leanote-云笔记本/index.html","5abd7137bfc65ac8d10e6e646c5375bf"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-FTP文件上传、下载/index.html","53f3b8f84fb2488dff92528ffb5eada5"],["D:/me/github/zakariyya.github.io/public/2018/08/17/backEnd-文件上传下载/index.html","b7ad8f3709fa9e07026b90d297451d41"],["D:/me/github/zakariyya.github.io/public/2018/08/23/backEnd-spring-springboot-Component下-Autowired的注入为null/index.html","27332365ed3b32faac7a845ca151fc70"],["D:/me/github/zakariyya.github.io/public/2018/09/10/碎碎念-广电对游戏版号的限制/index.html","d521abea63072084eb4377536fc7e061"],["D:/me/github/zakariyya.github.io/public/2018/09/19/linux-Ubuntu添加可信任根证书/index.html","cacf34bb5f97e58005b1640cef8e5c1d"],["D:/me/github/zakariyya.github.io/public/2018/09/19/搭建-mysql安装文档/index.html","69324ac0c75edbdf07f157f32e22bf84"],["D:/me/github/zakariyya.github.io/public/2018/09/23/搭建-nginx-搭建文档/index.html","740dcba83fc3af3de916f438da6e3a4a"],["D:/me/github/zakariyya.github.io/public/2018/09/23/电脑问题-Teamviewer-重置ID的工具/index.html","ea12e1583861a8374d648ab8840f76c8"],["D:/me/github/zakariyya.github.io/public/2018/12/19/backEnd-IDEA多模块项目Module-must-not-contain-source-root-The-root-already-belongs-to-module/index.html","118ed6424cfd82052c202155d708417c"],["D:/me/github/zakariyya.github.io/public/2019/01/02/编程-markdown折叠内容语法/index.html","6647f6bcb351c6f70992c738fcd00a1a"],["D:/me/github/zakariyya.github.io/public/2019/01/03/backEnd-maven-maven标签字典/index.html","17fd6bcf6f9363eddefb778d8546412d"],["D:/me/github/zakariyya.github.io/public/2019/01/11/linux-docker离线安装/index.html","87454e4da6f85e1969611ce0028a6cb9"],["D:/me/github/zakariyya.github.io/public/2019/01/17/linux-命令行下安装-oracle-11gR2-数据库/index.html","3263c51686a512020ef93b077732fba8"],["D:/me/github/zakariyya.github.io/public/2019/01/24/backEnd-spring-异常捕获/index.html","00ea6baa6fbe818d8fe393dcd301f273"],["D:/me/github/zakariyya.github.io/public/2019/01/27/编程-Git/index.html","6cb5b18545546eaf2fb3e64ef86d67db"],["D:/me/github/zakariyya.github.io/public/2019/02/24/backEnd-spring-SpringCloud/index.html","1420df544d3037c64b9b5ec8c202b434"],["D:/me/github/zakariyya.github.io/public/2019/03/01/科普-常见版本号/index.html","04a7ad22645fc5759be7b547f7652dfd"],["D:/me/github/zakariyya.github.io/public/2019/03/04/搭建-RabbitMQ-server搭建/index.html","68ba3f3af014ba11fd851da50c2b4101"],["D:/me/github/zakariyya.github.io/public/2019/03/12/搭建-翻墙-v2ray搭建启动/index.html","39dd3bdd326b824b91ec0b17eb83f0c4"],["D:/me/github/zakariyya.github.io/public/2019/03/14/backEnd-rabbitMQ-交换器/index.html","ce3b560a613f4b96c727f3add2823f03"],["D:/me/github/zakariyya.github.io/public/2019/05/28/cloud-cloud/index.html","c3bb81289652610dde98e868ea586f6d"],["D:/me/github/zakariyya.github.io/public/2019/06/11/编程-Github进行fork后与原仓库同步/index.html","2c6a55b87ea4276ff386e2f8be17e173"],["D:/me/github/zakariyya.github.io/public/2019/10/24/搭建-Git-仓库恢复/index.html","a94157bde3ab1eac112b164ca3709bc4"],["D:/me/github/zakariyya.github.io/public/2019/11/21/编程-多个git账号的SSH-key切换/index.html","3ede5c4d8c9191547cad1f50d75bfb59"],["D:/me/github/zakariyya.github.io/public/2020/01/10/电脑问题-idea-2019-3-破解/index.html","2572ff531438e9e121f2b17df769e909"],["D:/me/github/zakariyya.github.io/public/2030/08/16/电脑问题-How-to-kill-a-currently-using-port-on-localhost-in-windows/index.html","503d972714c45fb20a160304e4ca5bd5"],["D:/me/github/zakariyya.github.io/public/archives/2015/12/index.html","9f830b85013d84ad7e60cb3f8c3277cf"],["D:/me/github/zakariyya.github.io/public/archives/2015/index.html","9f830b85013d84ad7e60cb3f8c3277cf"],["D:/me/github/zakariyya.github.io/public/archives/2016/01/index.html","7c6e4c663bfaf7c25ad6fcd2d1f1b9fe"],["D:/me/github/zakariyya.github.io/public/archives/2016/02/index.html","840687899b46aa40fc8d51fe00526219"],["D:/me/github/zakariyya.github.io/public/archives/2016/03/index.html","ef228fa244b03eb2a08268343872fb6d"],["D:/me/github/zakariyya.github.io/public/archives/2016/04/index.html","4aa125849d715f6aa58b7dc15c4642ad"],["D:/me/github/zakariyya.github.io/public/archives/2016/05/index.html","bc0d732f80b18a4ec373400dfda60d85"],["D:/me/github/zakariyya.github.io/public/archives/2016/06/index.html","52ce81ea271d41df368a33c4ee9adddf"],["D:/me/github/zakariyya.github.io/public/archives/2016/09/index.html","ce794895f04fc176017c5f4103c2ae8a"],["D:/me/github/zakariyya.github.io/public/archives/2016/10/index.html","2e5e821a98c635b052116bd1575e4a02"],["D:/me/github/zakariyya.github.io/public/archives/2016/11/index.html","6bb10c56932b67044a81f0609e2037a5"],["D:/me/github/zakariyya.github.io/public/archives/2016/index.html","590e04d6ad651291d1d6801a3a655d8e"],["D:/me/github/zakariyya.github.io/public/archives/2017/01/index.html","df6b311463c5368bd04cb8748de1f744"],["D:/me/github/zakariyya.github.io/public/archives/2017/03/index.html","30c0121621a2eb4e026f1d6044f18ce6"],["D:/me/github/zakariyya.github.io/public/archives/2017/04/index.html","bce697a0ddf05e78a79f910089592b18"],["D:/me/github/zakariyya.github.io/public/archives/2017/05/index.html","8629b222fde0a09b9957810d9349d44b"],["D:/me/github/zakariyya.github.io/public/archives/2017/06/index.html","e394217b09d495bf655f1a33dc5848f0"],["D:/me/github/zakariyya.github.io/public/archives/2017/08/index.html","a419a4864123868ad9473ef349d3b5ce"],["D:/me/github/zakariyya.github.io/public/archives/2017/index.html","e6af00ad82fedf3a4bad13de02c022b5"],["D:/me/github/zakariyya.github.io/public/archives/2018/03/index.html","72e321ef658b8935d5cf83da9517ea55"],["D:/me/github/zakariyya.github.io/public/archives/2018/04/index.html","de4a5b2af8f7b04522bacceaf387443a"],["D:/me/github/zakariyya.github.io/public/archives/2018/06/index.html","cc663391c418d8d26a5152c27f1c405b"],["D:/me/github/zakariyya.github.io/public/archives/2018/07/index.html","18754ddf0474106c3919fd596db159c6"],["D:/me/github/zakariyya.github.io/public/archives/2018/08/index.html","d567fedd8ae8b2fc5bfb4aeeada64698"],["D:/me/github/zakariyya.github.io/public/archives/2018/09/index.html","8d1ed7f95f3403e141b0a1db8a3e466d"],["D:/me/github/zakariyya.github.io/public/archives/2018/12/index.html","f8ffa291c5b96c117b3ee6178bea1c9b"],["D:/me/github/zakariyya.github.io/public/archives/2018/index.html","b53745da2877d506fcf5d58186c6fdc0"],["D:/me/github/zakariyya.github.io/public/archives/2019/01/index.html","75f45eaafa01835b2ab5316aac14b00d"],["D:/me/github/zakariyya.github.io/public/archives/2019/02/index.html","cdc172e190b56e0adb870876325baaca"],["D:/me/github/zakariyya.github.io/public/archives/2019/03/index.html","a358a912d1343f7825e0b388ddcec455"],["D:/me/github/zakariyya.github.io/public/archives/2019/05/index.html","fdc3b739c3bebba4adfc591421e3145e"],["D:/me/github/zakariyya.github.io/public/archives/2019/06/index.html","45725a90b23b13b69e08f5520ba55747"],["D:/me/github/zakariyya.github.io/public/archives/2019/10/index.html","a7e6deda8f7a7b85edfc5cb539a5cb8d"],["D:/me/github/zakariyya.github.io/public/archives/2019/11/index.html","3c26dac644548fcc722fd93cf8b2c7c2"],["D:/me/github/zakariyya.github.io/public/archives/2019/index.html","390fae508eb04046259f62bc1872c7b5"],["D:/me/github/zakariyya.github.io/public/archives/2020/01/index.html","39f30cb8106b0ca27d35531dc85e4d1a"],["D:/me/github/zakariyya.github.io/public/archives/2020/index.html","39f30cb8106b0ca27d35531dc85e4d1a"],["D:/me/github/zakariyya.github.io/public/archives/2030/08/index.html","d444015383f404309e88c0667baa443f"],["D:/me/github/zakariyya.github.io/public/archives/2030/index.html","d444015383f404309e88c0667baa443f"],["D:/me/github/zakariyya.github.io/public/archives/index.html","0a9c67068f55ee0dcb37e99b12682fe1"],["D:/me/github/zakariyya.github.io/public/categories/Program/index.html","bb403a31425c5555ac997abc22ee2bba"],["D:/me/github/zakariyya.github.io/public/categories/backEnd/index.html","a6030df673c619e1e5e23457b167e4d3"],["D:/me/github/zakariyya.github.io/public/categories/index.html","de2eb33fc1c6bb7c10b31d253654b38d"],["D:/me/github/zakariyya.github.io/public/categories/java-Program/index.html","bea370749458edad70888b52781bd199"],["D:/me/github/zakariyya.github.io/public/categories/linux/index.html","6dba88f6ce0ee46a01c1a6055a7785dd"],["D:/me/github/zakariyya.github.io/public/categories/windows电脑问题/index.html","9eda0280a037185cdff6a2d219ce00ad"],["D:/me/github/zakariyya.github.io/public/categories/搭建/index.html","6391acc17d17546b73c02c7492349130"],["D:/me/github/zakariyya.github.io/public/categories/日记本/index.html","b8c126dca98c25810cb39afca3e9aead"],["D:/me/github/zakariyya.github.io/public/categories/服务配置/index.html","4293346e32ae8eb08f276fd60a5643dd"],["D:/me/github/zakariyya.github.io/public/categories/游戏性是什么/index.html","aa49de21e0ef1ea9668d39afbc3977a1"],["D:/me/github/zakariyya.github.io/public/categories/电脑问题/index.html","7b4d2f202a201242a06ca33590fd859d"],["D:/me/github/zakariyya.github.io/public/categories/科普/index.html","cb336bb1b1037a215bc92e5bbebde2bd"],["D:/me/github/zakariyya.github.io/public/categories/系统-Linux/index.html","a6884a80766db869babd506977ee9a16"],["D:/me/github/zakariyya.github.io/public/categories/系统/index.html","a26c5294bcd9944bdf272c1a6ea70175"],["D:/me/github/zakariyya.github.io/public/categories/编程/index.html","6046be86eeefbcc0f2ad5b781aacb719"],["D:/me/github/zakariyya.github.io/public/categories/翻墙-Linux/index.html","0d563ab79feee56f30a19fc41e62dcd3"],["D:/me/github/zakariyya.github.io/public/categories/翻墙/index.html","2e2e27723483adb150d5e446bb0d4899"],["D:/me/github/zakariyya.github.io/public/categories/软件/index.html","2be55a5db4eb8f96c87fbcb87105b429"],["D:/me/github/zakariyya.github.io/public/categories/随笔/index.html","340b6ab84556b7792e71684d113a3340"],["D:/me/github/zakariyya.github.io/public/css/base.css","fcf23de323fad904dc5ceab77d2a7cf7"],["D:/me/github/zakariyya.github.io/public/css/calendar.css","702500ec322c3d9ca65d704c135a5921"],["D:/me/github/zakariyya.github.io/public/css/code.css","97f4c1dc01be1105228c1807f55b74e5"],["D:/me/github/zakariyya.github.io/public/css/footer.css","df2c454e5e4fb8631700f2e412a78940"],["D:/me/github/zakariyya.github.io/public/css/header.css","6be9e934c0161c801d5ef99623854411"],["D:/me/github/zakariyya.github.io/public/css/main.css","efe260268a251ae6cc53212b4dc671d2"],["D:/me/github/zakariyya.github.io/public/css/navbar.css","9d9c69ea1d7c4421cad056e109aa3309"],["D:/me/github/zakariyya.github.io/public/css/post.css","e84eee86b9d23ca47adfcd28817877e3"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解1.jpg","57179fc2fc54305772b9742f643d2663"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解2.jpg","967a08b249d58a816b0d8b26a386909f"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解3.jpg","3cbdca5d487b8b3d75a08bf5b6aa7e42"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解4.jpg","473dee667479517a8a1e6efc7b4778f3"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解5.jpg","440672c914d39c5fc52d7c2466502ee6"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解6.jpg","ca131ee0383864d134cbc685eed974ac"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解7.jpg","ac7cf1e379a48a638250a8a4e138a961"],["D:/me/github/zakariyya.github.io/public/file/image/idea破解8.jpg","097e39c1bb9d4a32dcb01fa58b42aabc"],["D:/me/github/zakariyya.github.io/public/index.html","24b0db50a43a9c7f1e5c08e762350d24"],["D:/me/github/zakariyya.github.io/public/js/main.js","04670d6d5af2a30bfdf379cf61e7b629"],["D:/me/github/zakariyya.github.io/public/tags/FTP-文件上传-文件下载/index.html","f40cd6f689e6d26c4d06b60c8f2d07b5"],["D:/me/github/zakariyya.github.io/public/tags/Google/index.html","55ec51a8b2464a52012d8139cb9ee47e"],["D:/me/github/zakariyya.github.io/public/tags/RabbitMQ/index.html","422c26a17f8eddd026e484ed123af664"],["D:/me/github/zakariyya.github.io/public/tags/Ubuntu/index.html","83302b3f9d14026792b00f3203ad9884"],["D:/me/github/zakariyya.github.io/public/tags/ajax-前端/index.html","2183f045ea460ed63628633290830b12"],["D:/me/github/zakariyya.github.io/public/tags/apahce/index.html","2afe525ac3640061d294da4759007d98"],["D:/me/github/zakariyya.github.io/public/tags/arch/index.html","ea9d60ffc5a6d3af57712cde21a17486"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程-rabbitMQ/index.html","5ad9e1dfc6ee3f0672f85abcf0dc1377"],["D:/me/github/zakariyya.github.io/public/tags/backEnd-编程/index.html","4cbb9924d92f29f8d5832be2b1c957e3"],["D:/me/github/zakariyya.github.io/public/tags/cloud-科普/index.html","ff3e1ce003cdb08a3c52ff26c7fac103"],["D:/me/github/zakariyya.github.io/public/tags/git-ssh/index.html","6cc30af784985ecbb82c4c4dc65dfe43"],["D:/me/github/zakariyya.github.io/public/tags/git/index.html","afc71d090161a21e8226b9a0252ed4f0"],["D:/me/github/zakariyya.github.io/public/tags/hexo-搭建/index.html","925bdf0d4d4d0529f17df544be3d74f1"],["D:/me/github/zakariyya.github.io/public/tags/index.html","f17172e62daf0b524a07be456d6c33dc"],["D:/me/github/zakariyya.github.io/public/tags/java-文件上传-文件下载-编程/index.html","3039ca590fefe19bf95fa30f82ba2bcc"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos-oracle-databases/index.html","857452b606db801c55f4a4c5fd93ac8f"],["D:/me/github/zakariyya.github.io/public/tags/linux-centos/index.html","50134f88d4e26d567d1eb78b9b721608"],["D:/me/github/zakariyya.github.io/public/tags/linux-docker-Oracle-Ubuntu/index.html","d907319405a6436c387426fe3b1e1dbf"],["D:/me/github/zakariyya.github.io/public/tags/linux-sogou/index.html","ea05f958e4ac32cb30d2f2ba3ffc3abd"],["D:/me/github/zakariyya.github.io/public/tags/linux-ssh/index.html","eb98d853be8b59674afabccb5d96e13b"],["D:/me/github/zakariyya.github.io/public/tags/linux-网络/index.html","0ada9285bee33f6ca2ebc8af3f5b3cfc"],["D:/me/github/zakariyya.github.io/public/tags/linux/index.html","d94e5931ebaa8761329497a177742e07"],["D:/me/github/zakariyya.github.io/public/tags/maven/index.html","895690fc00b34e68477453183f33e9f4"],["D:/me/github/zakariyya.github.io/public/tags/nginx/index.html","32de28950f7f4ac4229ec7e8a8aac2f0"],["D:/me/github/zakariyya.github.io/public/tags/spring-SpringCloud-Eureka/index.html","ec610465d5fd235a5172926b8624d144"],["D:/me/github/zakariyya.github.io/public/tags/spring/index.html","1d76811d25e2d6a6a044f70a7cbf5052"],["D:/me/github/zakariyya.github.io/public/tags/springboot/index.html","d6f6b64cd984c2a2a78e7ac0d387b757"],["D:/me/github/zakariyya.github.io/public/tags/teamviewer-电脑问题/index.html","e4395bc81184ef30f641d85203a8daed"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git-服务器/index.html","dbe46158ab72e5a3f2390c11450d256c"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Git/index.html","f987714b4c4cc2ef52a818e295464088"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Leanote-云-笔记-云笔记/index.html","0516ae183985ecf245e9375c7c9f70e0"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Maven/index.html","3ef30a3e1767f096afbc88d73ff0d5a1"],["D:/me/github/zakariyya.github.io/public/tags/搭建-Ubuntu-FTP/index.html","3255c4a19590672565de47d78322bf55"],["D:/me/github/zakariyya.github.io/public/tags/搭建-mysql/index.html","555c7821fcf92880f309f6863869a399"],["D:/me/github/zakariyya.github.io/public/tags/搭建-开发环境-javaweb/index.html","da71b6dd8cb8a3cd0a4580215bfc67dd"],["D:/me/github/zakariyya.github.io/public/tags/搭建-网盘-Ubuntu/index.html","178388e7856e9796dae60f30fd55b123"],["D:/me/github/zakariyya.github.io/public/tags/搭建/index.html","f21d298bb8b8ab471ffcba56339988fe"],["D:/me/github/zakariyya.github.io/public/tags/游戏/index.html","992bc1b4825230a71b5f545edd19ad82"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题-端口-占用/index.html","25ee088d98a01689008020a8f1d31a32"],["D:/me/github/zakariyya.github.io/public/tags/电脑问题/index.html","e7164ee2d10c5e6a7a2ed4c13ad4463f"],["D:/me/github/zakariyya.github.io/public/tags/碎碎-子涵/index.html","4492400f38b26802103c74e700447f11"],["D:/me/github/zakariyya.github.io/public/tags/神器/index.html","d16718f43a14d495a3cf55b4b29816d6"],["D:/me/github/zakariyya.github.io/public/tags/科普/index.html","9bf2e5d3553ec711c60a1699b88590c8"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks-arch/index.html","94b5ee964ef11132765ab9deebc12f16"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-Shadowsocks/index.html","b4530ed3ba14fe641649a21d4d392f6c"],["D:/me/github/zakariyya.github.io/public/tags/翻墙-v2ray/index.html","4c2fd3ed97216aac6eba32072f850ba4"]];
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







