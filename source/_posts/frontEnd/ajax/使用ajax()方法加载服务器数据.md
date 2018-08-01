---
title: 使用ajax()方法加载服务器数据
date:  2017.06.16 21:01
tags: ajax 前端
categories: Program
---

使用**ajax()**方法是最底层、功能最强大的请求服务器数据的方法，它不仅可以获取服务器返回的数据，还能向服务器发送请求并传递数值，它的调用格式如下：

>  jQuery.ajax([settings])或$.ajax([settings])

其中参数**settings**为发送**ajax**请求时的配置对象，
在该对象中，
**url**表示服务器请求的路径，
**data**为请求时传递的数据，
**dataType**为服务器返回的数据类型，
**success**为请求成功的执行的回调函数，
**type**为发送数据请求的方式，默认为**get**。

例如，点击页面中的“加载”按钮，调用ajax()方法向服务器请求加载一个txt文件，并将返回的文件中的内容显示在页面，如下图所示：
![](http://upload-images.jianshu.io/upload_images/1171873-b519733b1067b0d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在浏览器中显示的效果：
![](http://upload-images.jianshu.io/upload_images/1171873-f303213b27973778.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
从图中可以看出，当点击“加载”按钮时，调用$.ajax()
方法请求服务器中txt文件，当请求成功时调用success回调函数，获取传回的数据，并显示在页面中。

``` 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>使用ajax()方法加载服务器数据</title>
        <script src="http://libs.baidu.com/jquery/1.9.0/jquery.js" type="text/javascript"></script>
        <link href="style.css" rel="stylesheet" type="text/css" />
    </head>    
    <body>
        <div id="divtest">
            <div class="title">
                <span class="fl">检测数字的奇偶性</span> 
                <span class="fr">
                    <input id="btnCheck" type="button" value="检测" />
                </span>
            </div>
            <ul>
               <li>请求输入一个数字 
                   <input id="txtNumber" type="text" size="12" />
               </li>
            </ul>
        </div>
        <script type="text/javascript">
            $(function () {
                $("#btnCheck").bind("click", function () {
                    $.ajax({
                        url:"http://www.imooc.com/data/check.php",
                        data: { num: $("#txtNumber").val() },
                        type:"GET",
                        success: function (data) {
                            $("ul").append("<li>你输入的<b>  "
                            + $("#txtNumber").val() + " </b>是<b> "
                            + data + " </b></li>");
                        }
                    });
                })
            });
        </script>
    </body>
</html>``` 

***
success中的"**result**"的值是服务器处理后返回的值，返回值类型在dataType中定义了
***
>success
类型：Function
请求成功后的回调函数。
参数：由服务器返回，并根据 dataType 参数进行处理后的数据；描述状态的字符串。
这是一个 Ajax 事件。

[jQuery ajax - ajax() 方法](http://www.w3school.com.cn/jquery/ajax_ajax.asp)
[慕课网——jQuery基础(五)一Ajax应用与常用插件](http://www.imooc.com/code/13474)
