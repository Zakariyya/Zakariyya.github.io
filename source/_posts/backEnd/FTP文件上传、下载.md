---
title: FTP文件上传、下载
date: 2018-08-17 17:25:03
tags: FTP 文件上传 文件下载
categories: backEnd
---

## 上传文件到 FTP 中
```java
// 还没写
``` 


## 从 FTP 中下载文件到本地
```java

import sun.net.ftp.FtpClient;

/**
 * connectFTP(ip,port,userName,password)
 */

public void static main(String arg[]){

	FtpClient ftp = connectFTP(ip,21,userName,password);
	List<String> list = download(filePath + fileName, ftp);//获得文件每一行的内容，并写到 list 种
	for(int i = 0; i<list.size(); i++){
	  //遍历 list 取出每一行的数据
		sout(list.get(i));
		//外部创建 File 对象后，写入到 File 对象中
		//TODO
	}
	try {
	  ftp.close();
	} catch (IOException e) {
	  e.printStackTrace();
	}
}


public static List<String> download(String ftpFile, FtpClient ftp) {
  List<String> list = new ArrayList<String>();
  String str = "";
  InputStream is = null;
  BufferedReader br = null;
  try {
      // 获取ftp上的文件
      is = ftp.getFileStream(ftpFile);
      //转为字节流
      br = new BufferedReader(new InputStreamReader(is,"GBK"));
      while((str=br.readLine())!=null){
          list.add(str);
      }
      br.close();
  }catch (FtpProtocolException e) {
      e.printStackTrace();
  } catch (FileNotFoundException e) {
      e.printStackTrace();
  } catch (IOException e) {
      e.printStackTrace();
  }
  return list;
}

```
































