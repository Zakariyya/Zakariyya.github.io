---
title: How to kill a currently using port on localhost in windows?
date:  2019.08.16 16:37:39
tags: 电脑问题 端口 占用
categories: 电脑问题
---
# How to kill a currently using port on localhost in windows?

## Step 1

Run command-line as an Administrator. Then run the below mention command. type your port number in **yourPortNumber**

> netstat -ano | findstr :**yourPortNumber**

```
C:\Users\yaokunyi>netstat -ano | findstr :35729
TCP    0.0.0.0:35729          0.0.0.0:0              LISTENING       5396
TCP    [::]:35729             [::]:0                 LISTENING       5396 
```

See the PID ? In here the port is 5396 (process identifier)

## Step 2

Then you execute this command after identify the PID.
(/F forcefully terminates the process)

> taskkill /PID **typeyourPIDhere** /F

```
C:\Users\yaokunyi>taskkill /PID 5396 /F
SUCCESS: The process with PID 5396 has been terminated.
```

P.S. Run the first command again to check if process is still available or not. You'll get empty line if process is successfully ended.

***
By [stackoverflow](https://stackoverflow.com/questions/39632667/how-to-kill-a-currently-using-port-on-localhost-in-windows#)

近期频繁使用**gitbook**，发现**gitbook**有时会出现端口被占用的问题无法启动服务，也是郁闷到底是谁占用的。







