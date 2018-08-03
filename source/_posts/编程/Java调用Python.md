---
title: Java调用Python
date: 2018-07-12 11:03:59
tags:
categories: 编程
---

祝，获得一项新技能
```java
package test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Java 调用 Python
 * test for chengzhan
 * @author anan
 * Created on 2018/7/12.
 */

public class InvokeByRuntime {
  /**
   * @param args
   * @throws IOException
   * @throws InterruptedException
   */
  public static void main(String[] args) throws IOException, InterruptedException {
    System.out.println("-----------------");
    String exe = "python3"; // 执行命令
    String command = "./dtcTest.py"; //执行文件
    String num1 = "1"; // 入参
    String num2 = "2"; // 入参
    System.out.println("11111111111");
    String[] cmdArr = new String[] {exe, command, num1, num2};
    Process process;

    process = Runtime.getRuntime().exec(cmdArr); // 相当于在部署机中执行了：python3 ./dtcTest.py 1 2  返回的是输出结果

    InputStream is = process.getInputStream();  //输出内容以 “流” 形式存在
    String str;

    InputStreamReader dat=new InputStreamReader(is);
    BufferedReader bin=new BufferedReader(dat);
    while((str=bin.readLine())!=null){
      System.out.println(str);
    }
    process.waitFor();
  }
}
```

