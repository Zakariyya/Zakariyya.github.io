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

var precacheConfig = [["D:/GithubRepository/zakariyya.github.io/public/2015/12/21/linux/arch-arch安装笔记/index.html","0762199fde28cfe31219c9b098184f91"],["D:/GithubRepository/zakariyya.github.io/public/2016/01/15/碎碎念/那些住在手机里的朋友/index.html","36e4ae36da5daf7734eb62fc4790e3de"],["D:/GithubRepository/zakariyya.github.io/public/2016/01/28/碎碎念/时光/index.html","0db7600735112839093ef15e58e20714"],["D:/GithubRepository/zakariyya.github.io/public/2016/02/21/电脑问题/禁止软件开机自启动的三种方法/index.html","582eb205af8bc98b7f41df6a450d3d69"],["D:/GithubRepository/zakariyya.github.io/public/2016/02/21/碎碎念/Google[x]’s-Loon，一个互联网气球/index.html","f1e103d7dff4476696655127a5be9210"],["D:/GithubRepository/zakariyya.github.io/public/2016/02/26/电脑问题/windows7-我的电脑右键-管理“该文件没有与之关联的程序来执行该操作”]/index.html","a3c939895f9f2578cb119facd439d0f2"],["D:/GithubRepository/zakariyya.github.io/public/2016/02/27/电脑问题/QQ右下角弹出新闻框/index.html","5e20ac5005306ce35efeec56b561472a"],["D:/GithubRepository/zakariyya.github.io/public/2016/02/27/电脑问题/win7隐藏IE浏览器/index.html","2ed220013b129feb8c76adc46d72131b"],["D:/GithubRepository/zakariyya.github.io/public/2016/02/28/电脑问题/禁用UEFI安全启动功能/index.html","2cc56c146da7b9e91ff93f9bfc8916b8"],["D:/GithubRepository/zakariyya.github.io/public/2016/02/29/电脑问题/说说在win7下优化软件的必要性/index.html","bfc301c3456803aa08dca824157d49d0"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/01/电脑问题/处理快捷方式小箭头/index.html","a22c474a3d884af12bd077e9d32f1257"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/02/碎碎念/一罐硬币实验的讨论——《信号与噪声》/index.html","b6c45e373b6d74b778d99dab7a9fefaf"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/02/碎碎念/十二行代码/index.html","8d6592f074b960ad3eca13a59e1ab4d6"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/04/linux/arch打包sogou/index.html","b6e32b65fd77cfec9e8ea1716547a0aa"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/06/linux/arch分swap/index.html","812cb3056fc0d3f4b6c3ccd5e6741d4c"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/06/电脑问题/定时关机-睡眠/index.html","65cc283020af06a88d036fe383c4f2cf"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/11/碎碎念/织梦/index.html","7206806aeb6379fb795acba2cc5f5a4f"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/14/碎碎念/麻雀告诉我们的故事/index.html","2b0b844c3bc461d9e2bf1fae39745d7e"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/17/碎碎念/还没有晾干的旧伞，闷在寂寞的房里/index.html","9ba1ab42e50335e40ce9e65128c9e307"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/19/电脑问题/windows下启动项菜单(Boot-Manager)问题/index.html","afa0e82ded5de7f3908e533cb08c6f30"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/20/碎碎念/春分/index.html","2820097d47654b9c16aec17ddbdedd45"],["D:/GithubRepository/zakariyya.github.io/public/2016/03/21/电脑问题/电脑文件搜索神器——Everything/index.html","dac63660d9d52bc31c517fe35bae0b6b"],["D:/GithubRepository/zakariyya.github.io/public/2016/04/01/电脑问题/f-lux和“薄暮微光”/index.html","8cafaa53b2a6e42a6cf7af8a754d43b3"],["D:/GithubRepository/zakariyya.github.io/public/2016/04/01/电脑问题/windows7,打开休眠模式/index.html","bbc1bc0f3a8e9907370c37288ac7f40d"],["D:/GithubRepository/zakariyya.github.io/public/2016/04/05/碎碎念/旧照片/index.html","d938670d1342c7e33c5bab24ebeff040"],["D:/GithubRepository/zakariyya.github.io/public/2016/04/07/linux/pppoe上网/index.html","9af01ee3bda93eefff019469b354024e"],["D:/GithubRepository/zakariyya.github.io/public/2016/04/15/碎碎念/无标题文章/index.html","c1450270d00c535036968c4a420e754a"],["D:/GithubRepository/zakariyya.github.io/public/2016/04/15/碎碎念/看几天韩剧的感想/index.html","e05353e87eb851d16c799012aca66146"],["D:/GithubRepository/zakariyya.github.io/public/2016/04/18/碎碎念/恶意代码引起的反思/index.html","60ff826ef949ca32562a45ff024e9413"],["D:/GithubRepository/zakariyya.github.io/public/2016/04/22/电脑问题/OneTab-和-轻听/index.html","cc126c23c2d938310aae57fb42a1f057"],["D:/GithubRepository/zakariyya.github.io/public/2016/05/04/碎碎念/孙悟空无姓无名的时候，阎王生死簿是怎么写的呢？/index.html","c9f35d9b9e1f0f5f4a312b812980dff9"],["D:/GithubRepository/zakariyya.github.io/public/2016/05/08/碎碎念/抠头发丝/index.html","6dc090c3623aad884f1a15ec660950ec"],["D:/GithubRepository/zakariyya.github.io/public/2016/05/08/碎碎念/百度，广告/index.html","c62dd15cf204aa2a88fc56bffb50e50a"],["D:/GithubRepository/zakariyya.github.io/public/2016/05/25/碎碎念/“hello,-os-world!-”-of-Boot-Sector/index.html","6967b971e9499bc26816910ce993d6c8"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/04/文集/游戏性是什么/游戏性是什么-游戏和身体/index.html","0396495dd94d41d59f4a3ec9ef579251"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/04/文集/游戏性是什么/游戏性是什么-游戏的设计/index.html","529fd9eaee421d325fa40d3b8e87b705"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/05/文集/游戏性是什么/游戏性是什么-游戏和视觉/index.html","ec9fb8abd96f6df3c06cf14ae8ff4e0d"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/06/文集/游戏性是什么/游戏性是什么-游戏和世界/index.html","a4b31fc04dc74edc77705796d00fc7d5"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/07/文集/游戏性是什么/游戏性是什么-游戏和触觉/index.html","66521ac2b6dc7c42491cd07fa7b6cc0e"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/08/文集/游戏性是什么/游戏性是什么-专注游戏的原因/index.html","e3abbd03b3343cab9fce1ed5ca31068a"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/10/文集/游戏性是什么/游戏性是什么-难易度平衡设计与效率预测/index.html","24a1f6e33d0c4c037a37499522cc99b4"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/11/文集/游戏性是什么/游戏性是什么-结构/index.html","c658167540f8a47ad1c7c2d2a6c2fab9"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/12/文集/游戏性是什么/游戏性是什么-叙事和Narreme/index.html","9f276a1c6133eaa9bb8d62490e4c84c1"],["D:/GithubRepository/zakariyya.github.io/public/2016/06/13/文集/游戏性是什么/游戏性是什么-记录《游戏性是什么》/index.html","2690b8d28bea2e1d96f5689d01dbe962"],["D:/GithubRepository/zakariyya.github.io/public/2016/09/07/linux/sogou输入配置/index.html","6c8709b0897b8dcf3dadffd8aeabe908"],["D:/GithubRepository/zakariyya.github.io/public/2016/09/11/linux/ubuntu修改ssh端口/index.html","670f09544e85d97e96fdb1cb46d98066"],["D:/GithubRepository/zakariyya.github.io/public/2016/10/30/碎碎念/日常20161030/index.html","e3f855f57fb44e96c3c68abe81294c4d"],["D:/GithubRepository/zakariyya.github.io/public/2016/10/31/碎碎念/日常——google涂鸦/index.html","abe58fd5a7491686d57f03d33a253149"],["D:/GithubRepository/zakariyya.github.io/public/2016/11/05/碎碎念/Google18岁了/index.html","8e59837c5128d34799c738f726ff3a47"],["D:/GithubRepository/zakariyya.github.io/public/2016/11/05/碎碎念/Many-Doors-In-My-Life/index.html","b97c1c0cbd29a1fa5d251704df78d232"],["D:/GithubRepository/zakariyya.github.io/public/2016/11/05/碎碎念/《越晚越开心》停播/index.html","400ed21058cd85e2b6602e7ff6ce453e"],["D:/GithubRepository/zakariyya.github.io/public/2016/11/05/碎碎念/分数，教育的目的/index.html","483138297dbb5e857ae9fb0e89aed347"],["D:/GithubRepository/zakariyya.github.io/public/2017/01/20/docker/docker/index.html","c341338f252a40090fc19c11be2932e4"],["D:/GithubRepository/zakariyya.github.io/public/2017/01/21/电脑问题/Tomcat提示指定的服务未安装Unable-to-open-the-service-'tomcat'/index.html","633b879330c1d30e73c0ed1d760c5517"],["D:/GithubRepository/zakariyya.github.io/public/2017/01/24/电脑问题/windows10关闭“自动更新”/index.html","c2d43dcc74ae98b38de062f61b02b4f0"],["D:/GithubRepository/zakariyya.github.io/public/2017/03/24/backEnd/服务配置/Redis/index.html","df82906abfa9a07ba76e7f5eef3f4286"],["D:/GithubRepository/zakariyya.github.io/public/2017/03/24/科普/Update与Modify两者区别/index.html","60f5a2baf782ca2500d3d853de90ef07"],["D:/GithubRepository/zakariyya.github.io/public/2017/04/23/backEnd/服务配置/apahce错误提示the-requested-operation-has-failed/index.html","f5d6590d74857b81852f810a5fcea9d3"],["D:/GithubRepository/zakariyya.github.io/public/2017/05/23/linux/解决CentOS（6和7版本），-etc-sysconfig-下没有iptables的问题/index.html","e9223e1856c01b34f63a45737baf44b8"],["D:/GithubRepository/zakariyya.github.io/public/2017/06/16/frontEnd/ajax/使用ajax()方法加载服务器数据/index.html","a799722ac263809c1e492d6aaf8fc586"],["D:/GithubRepository/zakariyya.github.io/public/2017/06/18/frontEnd/ajax/$(this)-id和$(this)-attr('id')/index.html","e58f460167c9931f522a265e76e26747"],["D:/GithubRepository/zakariyya.github.io/public/2017/08/05/电脑问题/eclipse中批量修改Java类文件中引入的package包路径/index.html","b5c0dad00b96f0ef46ee7d34ec7ce8f8"],["D:/GithubRepository/zakariyya.github.io/public/2017/08/22/backEnd/maven/maven项目jar包导入失败/index.html","803971f0fc600dbb6c615457e2e5abdf"],["D:/GithubRepository/zakariyya.github.io/public/2017/08/31/frontEnd/ajax/回调函数（callback）是什么？/index.html","a08c8e0e3b796f80f9f39a039377a27d"],["D:/GithubRepository/zakariyya.github.io/public/2018/03/14/碎碎念/我未曾见过你, 而你的光却照耀到了我/index.html","d052cc7aeabe39c8cd2a894635e4dcda"],["D:/GithubRepository/zakariyya.github.io/public/2018/03/18/backEnd/spring/tiny-spring 简介/index.html","282918e5bba0319fc38da2029a46da23"],["D:/GithubRepository/zakariyya.github.io/public/2018/03/18/backEnd/spring/tiny-spring分析/index.html","3783fb7cb2472e4996b3dd144cbb6fc9"],["D:/GithubRepository/zakariyya.github.io/public/2018/03/24/科普/视频格式/index.html","a2674c952d12634177b12ccde3fcf94c"],["D:/GithubRepository/zakariyya.github.io/public/2018/04/23/搭建笔记/翻墙/arch-开机自启动脚本/index.html","5b423883bc721e393e7c1d8f5a2c6449"],["D:/GithubRepository/zakariyya.github.io/public/2018/04/23/搭建笔记/翻墙/shadowsocks搭建过程(客户端)/index.html","37c54907ec9c0fc0e004863698d70da6"],["D:/GithubRepository/zakariyya.github.io/public/2018/04/23/搭建笔记/翻墙/shadowsocks搭建过程(服务端)/index.html","6d003a992a6be8c8f6fa8ae938558d45"],["D:/GithubRepository/zakariyya.github.io/public/2018/06/28/backEnd/spring/Spring Boot YML文件配置多环境/index.html","99a5bf37676f21ade8af7985678886f3"],["D:/GithubRepository/zakariyya.github.io/public/2018/06/28/hexo/index.html","4f7395cbc4156177fb5fdc447477f5d9"],["D:/GithubRepository/zakariyya.github.io/public/2018/07/03/科普/软件为何会有那么多权限/index.html","d6dc8db05c30ac34342b164d146e6626"],["D:/GithubRepository/zakariyya.github.io/public/2018/07/12/编程/Java调用Python/index.html","8e885b56fab9e6813badef3aee2a87f0"],["D:/GithubRepository/zakariyya.github.io/public/2018/07/19/backEnd/spring/Spring Boot多数据源整合/index.html","55e34bd220e31ac1011ad555496888bf"],["D:/GithubRepository/zakariyya.github.io/public/2018/07/21/修改形参对象值，会影响实参/index.html","f32224a305a18e70aae8143af108ae45"],["D:/GithubRepository/zakariyya.github.io/public/2018/08/01/文件上传/index.html","3e55f779df298a297055778fa6c842db"],["D:/GithubRepository/zakariyya.github.io/public/2018/08/01/科普/IaaS、SaaS 和 PaaS 的区别/index.html","0988fc4a53bc15fd032e2c53d2649ae3"],["D:/GithubRepository/zakariyya.github.io/public/2018/08/04/搭建笔记/Jib构建你的第一个java镜像/index.html","b787853fda420a1680829d187d825960"],["D:/GithubRepository/zakariyya.github.io/public/2018/08/04/搭建笔记/Maven 安装与入门/index.html","54fc13eb6fad41977d822bd866aa8f61"],["D:/GithubRepository/zakariyya.github.io/public/2018/08/04/搭建笔记/基于 Ubuntu 搭建个人网盘/index.html","d14dbd984cc1ef91ee90f62d0fa94598"],["D:/GithubRepository/zakariyya.github.io/public/2018/08/04/搭建笔记/基于Ubuntu搭建FTP/index.html","f2f01f521527e654338b26f976b7f167"],["D:/GithubRepository/zakariyya.github.io/public/2018/08/04/搭建笔记/搭建Git服务器/index.html","5c385e2c505e70a58f83ad350cb012d1"],["D:/GithubRepository/zakariyya.github.io/public/2018/08/04/搭建笔记/搭建javaweb开发环境/index.html","f15277afd06e561e9038431b1a6e80e6"],["D:/GithubRepository/zakariyya.github.io/public/2018/08/04/搭建笔记/搭建个人 Leanote 云笔记本/index.html","d624793bd5d46722471791b8c700da84"],["D:/GithubRepository/zakariyya.github.io/public/archives/2015/12/index.html","c843e32760daa0db0a4b8999a1e02fcd"],["D:/GithubRepository/zakariyya.github.io/public/archives/2015/index.html","40c77dce5d007af6f6a560c69a8f8dc0"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/01/index.html","06be613850a0809c63f11479aa2861a1"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/02/index.html","6437a71e1da7a6312f66e1d8e5be4153"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/03/index.html","8eaa8621d057655aa0ab0e4e501d7d39"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/03/page/2/index.html","fc17b4db5d3c52944b3b02bb0f6f185b"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/04/index.html","c1890d1cc13003d5977fa3808fc9d108"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/05/index.html","76574ccd6eab7e2af7767beefd27a953"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/06/index.html","0424f3c5da5faff1441c938047d42db8"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/09/index.html","370c1cbebde209e9d48e1fbab934073d"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/10/index.html","097eba2245a2e882d77606ca2e4957eb"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/11/index.html","21860f497f24bfe555bc7ac5fbd6410a"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/index.html","18f6b0498bb2b975245c26ab00ab70e9"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/page/2/index.html","128b3910d8d4a7724fa1bd8c2982fe10"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/page/3/index.html","5d8feb57b590bc4ee9761b63b062133f"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/page/4/index.html","1f476af1feb6aa09e60a909ce45da839"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/page/5/index.html","c3034163640b9380288b370f6eef2c78"],["D:/GithubRepository/zakariyya.github.io/public/archives/2016/page/6/index.html","cfafcf7708107957c37013d6772b365f"],["D:/GithubRepository/zakariyya.github.io/public/archives/2017/01/index.html","f77ea0fb9d07109f7bf5b26cb26dd6e5"],["D:/GithubRepository/zakariyya.github.io/public/archives/2017/03/index.html","375a53aea23e8a44dc6d9931ace32153"],["D:/GithubRepository/zakariyya.github.io/public/archives/2017/04/index.html","38a73c78162993c37124591c4277a092"],["D:/GithubRepository/zakariyya.github.io/public/archives/2017/05/index.html","5f0859d868e5f7767050dc208bfd7408"],["D:/GithubRepository/zakariyya.github.io/public/archives/2017/06/index.html","be43b1e431d9587319e05db3c61905ec"],["D:/GithubRepository/zakariyya.github.io/public/archives/2017/08/index.html","dfb91d37ffe22987053782a524e11795"],["D:/GithubRepository/zakariyya.github.io/public/archives/2017/index.html","43e78356c5f1b6592b6f65c0dec90020"],["D:/GithubRepository/zakariyya.github.io/public/archives/2017/page/2/index.html","4069c712e1ef01fdd3d59bac9a022cac"],["D:/GithubRepository/zakariyya.github.io/public/archives/2018/03/index.html","22c95e3fcd18e4e5cf5f16e4d3b00b28"],["D:/GithubRepository/zakariyya.github.io/public/archives/2018/04/index.html","4232da8074531d9d9ec28b91a0572476"],["D:/GithubRepository/zakariyya.github.io/public/archives/2018/06/index.html","70f565c68386f53cff39991a7083df6f"],["D:/GithubRepository/zakariyya.github.io/public/archives/2018/07/index.html","27b0fce82149bf9bbede5296c7cd856e"],["D:/GithubRepository/zakariyya.github.io/public/archives/2018/08/index.html","56a107c58799a2020785957038ee2162"],["D:/GithubRepository/zakariyya.github.io/public/archives/2018/index.html","8c676808a59a5b729acd1b3d93035da0"],["D:/GithubRepository/zakariyya.github.io/public/archives/2018/page/2/index.html","171f190af6d885dcdbee05efac1f2a22"],["D:/GithubRepository/zakariyya.github.io/public/archives/2018/page/3/index.html","621524e06ae1629fa6d11b6fb359119d"],["D:/GithubRepository/zakariyya.github.io/public/archives/index.html","eb0a5ad3d428e6690b502e42bd176673"],["D:/GithubRepository/zakariyya.github.io/public/archives/page/2/index.html","9e253d2ccd1959e5c5f5b8c32a06705a"],["D:/GithubRepository/zakariyya.github.io/public/archives/page/3/index.html","d3f2acf32f969ba8e5979c96a6c8cc14"],["D:/GithubRepository/zakariyya.github.io/public/archives/page/4/index.html","b6cd08adab67568eca37dd89e8c98cea"],["D:/GithubRepository/zakariyya.github.io/public/archives/page/5/index.html","923ddda74dde4be7ab04f407089f057f"],["D:/GithubRepository/zakariyya.github.io/public/archives/page/6/index.html","45313d64301a71ac3d5812bdc3d69ad2"],["D:/GithubRepository/zakariyya.github.io/public/archives/page/7/index.html","4ccbfbca1ada64d835ddc61caa6b3e2e"],["D:/GithubRepository/zakariyya.github.io/public/archives/page/8/index.html","856c1f80e023cf86047e34518b1af761"],["D:/GithubRepository/zakariyya.github.io/public/archives/page/9/index.html","d19f659739f9c40df1a0823ccceec01e"],["D:/GithubRepository/zakariyya.github.io/public/categories/Program/index.html","73e56303fb60b24a88f2abefa6fbd190"],["D:/GithubRepository/zakariyya.github.io/public/categories/index.html","280ae76fb13f46e2c9be55b486a346ad"],["D:/GithubRepository/zakariyya.github.io/public/categories/java-Program/index.html","a36c633bd4fb26edb24c79733ad7c196"],["D:/GithubRepository/zakariyya.github.io/public/categories/windows电脑问题/index.html","bf1b1e701a0df4c3cfdadb7f6b6051ec"],["D:/GithubRepository/zakariyya.github.io/public/categories/windows电脑问题/page/2/index.html","c8612e2b69cfe06dfc75d44e2c8d00d1"],["D:/GithubRepository/zakariyya.github.io/public/categories/日记本/index.html","fd3c43f8675998c36ac85546e14ce05c"],["D:/GithubRepository/zakariyya.github.io/public/categories/日记本/page/2/index.html","8d2d83c3943ccf9e698ece33c0e39b75"],["D:/GithubRepository/zakariyya.github.io/public/categories/服务配置/index.html","3c8c425b2508a7334a9065e888002363"],["D:/GithubRepository/zakariyya.github.io/public/categories/游戏性是什么/index.html","292168e23755a0de579905e6e56a8308"],["D:/GithubRepository/zakariyya.github.io/public/categories/科普/index.html","c0994bdc66a8fb8c9da85f2edc956f80"],["D:/GithubRepository/zakariyya.github.io/public/categories/系统-Linux/index.html","bb7b48c6d5092a3621620a0412fe6433"],["D:/GithubRepository/zakariyya.github.io/public/categories/系统/index.html","5bc0aa62d2b6b33380b0a1a0e157e396"],["D:/GithubRepository/zakariyya.github.io/public/categories/编程/index.html","8a02211604506756b88d6be5d9147918"],["D:/GithubRepository/zakariyya.github.io/public/categories/翻墙-Linux/index.html","27ae759780911589bf4cd8d983a16250"],["D:/GithubRepository/zakariyya.github.io/public/categories/翻墙/index.html","83f35a5caec36ace83b169c198490803"],["D:/GithubRepository/zakariyya.github.io/public/categories/软件/index.html","691d76c69d9091f42bfda9d148f21de0"],["D:/GithubRepository/zakariyya.github.io/public/categories/随笔/index.html","7591521b37a874012ece5efd8371ecb6"],["D:/GithubRepository/zakariyya.github.io/public/css/index.css","f75d4fa1e08a1c31522afe034fc65e7f"],["D:/GithubRepository/zakariyya.github.io/public/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["D:/GithubRepository/zakariyya.github.io/public/img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["D:/GithubRepository/zakariyya.github.io/public/img/top.jpg","5e034327988f6ab5749a7f0ed3359976"],["D:/GithubRepository/zakariyya.github.io/public/index.html","1b11153ec86bdbc2732e4031b2a25328"],["D:/GithubRepository/zakariyya.github.io/public/js/copy.js","f4607057c0513bd07a69fcac08121979"],["D:/GithubRepository/zakariyya.github.io/public/js/fancybox.js","cdef3c681834a3e5ee4de9a7ed2e0fb0"],["D:/GithubRepository/zakariyya.github.io/public/js/fireworks.js","c186e041cb64c2e7efd345b7838f6ad7"],["D:/GithubRepository/zakariyya.github.io/public/js/head.js","72dbb78b4e9c4cdf14fd4b8c9bd9828c"],["D:/GithubRepository/zakariyya.github.io/public/js/hexo-theme-melody.js","d41d8cd98f00b204e9800998ecf8427e"],["D:/GithubRepository/zakariyya.github.io/public/js/scroll.js","c1789d3ce75d3ff59ea20a6b435c2fcf"],["D:/GithubRepository/zakariyya.github.io/public/js/search/algolia.js","53160985d32d6fd66d98aa0e05b081ac"],["D:/GithubRepository/zakariyya.github.io/public/js/search/local-search.js","1565b508bd866ed6fbd724a3858af5d8"],["D:/GithubRepository/zakariyya.github.io/public/js/sidebar.js","d24db780974e661198eeb2e45f20a28f"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/reveal/head.min.js","aad121203010122e05f1766d92385214"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/reveal/highlight.min.js","44594243bec43813a16371af8fe7e105"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/reveal/markdown.min.js","7ec4cef5a7fe3f0bf0eb4dc6d7bca114"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/reveal/marked.min.js","c2a88705e206d71dc21fdc4445349127"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/reveal/math.min.js","0a278fee2e57c530ab07f7d2d9ea8d96"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/reveal/notes.min.js","89a0dfae4d706f9c75b317f686c3aa14"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/reveal/reveal.min.js","8988419d67efb5fe93e291a357e26ec9"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/reveal/zoom.min.js","9791f96e63e7d534cba2b67d4bda0419"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/velocity.min.js","64da069aba987ea0512cf610600a56d1"],["D:/GithubRepository/zakariyya.github.io/public/js/third-party/velocity.ui.min.js","c8ca438424a080620f7b2f4ee4b0fff1"],["D:/GithubRepository/zakariyya.github.io/public/js/transition.js","bd261a5dda799613501070ecc19d6e69"],["D:/GithubRepository/zakariyya.github.io/public/js/utils.js","3ff3423d966a1c351e9867813b3f6d36"],["D:/GithubRepository/zakariyya.github.io/public/page/2/index.html","ae64ca71d168f70ff576aef1f36be645"],["D:/GithubRepository/zakariyya.github.io/public/page/3/index.html","be1647dfc303d2469a14a777cee43337"],["D:/GithubRepository/zakariyya.github.io/public/page/4/index.html","200b9d9896c85f61a30b8375f83a264c"],["D:/GithubRepository/zakariyya.github.io/public/page/5/index.html","b9d227a5ef256b84e707b9b79b1b9a39"],["D:/GithubRepository/zakariyya.github.io/public/page/6/index.html","8582f597e10765166ce4109f2f75b56d"],["D:/GithubRepository/zakariyya.github.io/public/page/7/index.html","2ccf3ab4bde21e2cf309a9bf042a4d7c"],["D:/GithubRepository/zakariyya.github.io/public/page/8/index.html","5313262b6a91db4cc0de529401de720c"],["D:/GithubRepository/zakariyya.github.io/public/page/9/index.html","d1d8651d1f6824219c6510b7d110c09d"],["D:/GithubRepository/zakariyya.github.io/public/tags/Google/index.html","7dff13223cf06854d6265bc840b397be"],["D:/GithubRepository/zakariyya.github.io/public/tags/ajax-前端/index.html","90665bad8fe81b4f0b2f85de98f77d42"],["D:/GithubRepository/zakariyya.github.io/public/tags/apahce/index.html","d0d3b5d674e6f5e25a3c56d293d18857"],["D:/GithubRepository/zakariyya.github.io/public/tags/arch/index.html","e2312c41cc482e86a6857871c8b891d5"],["D:/GithubRepository/zakariyya.github.io/public/tags/docker-linux/index.html","03db6147d045f03cb64c4afd24d9dc68"],["D:/GithubRepository/zakariyya.github.io/public/tags/index.html","3d8482606b704ce03df22a99787c9fe0"],["D:/GithubRepository/zakariyya.github.io/public/tags/linux-centos/index.html","4091e8940e3026106f99637258cd5c39"],["D:/GithubRepository/zakariyya.github.io/public/tags/linux-sogou/index.html","4e71afd724d1fccf6b496c313ee21c9d"],["D:/GithubRepository/zakariyya.github.io/public/tags/linux-ssh/index.html","775f90309e4315a2f15745684a25dd98"],["D:/GithubRepository/zakariyya.github.io/public/tags/linux-网络/index.html","fdc7714ab1da12e345baaae3c7992874"],["D:/GithubRepository/zakariyya.github.io/public/tags/linux/index.html","b170f01fd19f7efc5e3a2e94ac9c9ef7"],["D:/GithubRepository/zakariyya.github.io/public/tags/maven/index.html","56e065541262419e67d9c62910b48ffc"],["D:/GithubRepository/zakariyya.github.io/public/tags/spring/index.html","6aa211ff4c3a93f55b0215aeee2f887c"],["D:/GithubRepository/zakariyya.github.io/public/tags/游戏/index.html","f678e2a15df9af939acb1a37b593633b"],["D:/GithubRepository/zakariyya.github.io/public/tags/电脑问题/index.html","f7ba5daf8a874d3b8e714132637799f1"],["D:/GithubRepository/zakariyya.github.io/public/tags/电脑问题/page/2/index.html","29722fb08119936179f3549a5636bd12"],["D:/GithubRepository/zakariyya.github.io/public/tags/碎碎-子涵/index.html","4753ee0219d6bcc119298c2619befd39"],["D:/GithubRepository/zakariyya.github.io/public/tags/神器/index.html","3cf28a9df9b5e793b38c11aae4dbfb81"],["D:/GithubRepository/zakariyya.github.io/public/tags/科普/index.html","ca604f9e56bd6b7f1f7b20964316d30d"],["D:/GithubRepository/zakariyya.github.io/public/tags/翻墙-Shadowsocks-arch/index.html","94bf718186e0797eb47d6e1fd84b6a74"],["D:/GithubRepository/zakariyya.github.io/public/tags/翻墙-Shadowsocks/index.html","d0724e900e879a8478ecfdd63f461484"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
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

var createCacheKey = function (originalUrl, paramName, paramValue,
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

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
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

var stripIgnoredUrlParameters = function (originalUrl,
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







