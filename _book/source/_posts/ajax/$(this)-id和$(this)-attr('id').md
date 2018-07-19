---
title: $(this)-id和$(this)-attr('id')
date: 2017.06.18 20:39:25
tags: ajax 前端
categories: Program
---

返回元素都是**ID**，但如果元素没有**ID**，$(this).id  会返回一个空字符串，而
  $(this).attr("id")  将返回**undefined**。
```
<a class="btn btn-info  modifyuser" href="#"  id="${user.id }">
    <i class="icon-edit icon-white "></i>  
	修改                                            
</a>
```
js中：
```
$(".modifyuser").click(function(e){
	var m_id = $(this).attr('id');
	e.preventDefault();
})
```
当中的$(this).attr('id')。"this"是指为".modifyuser"所在的标签，这个标签当中的属性：id
既$(".modifyuser").getAttribute('id')。
***
参考：[this.id vs. $(this).attr('id')](https://stackoverflow.com/questions/5597317/this-id-vs-this-attrid)
