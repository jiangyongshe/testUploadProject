<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- 引入spring标签  --%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport" id="viewport" />
<meta name="format-detection" content="telephone=no" />
<meta name="keywords" content="">
<meta name="description" content="" />
<title>翔云播</title>
<link rel="shortcut icon" href="/<spring:message code="url.language"/>/images/logo.ico" type="image/x-icon">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/font-awesome.min.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/public.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/neiye.css">
<script src="/js/commonRel.js"></script>
<!--返回顶部-->
<script src="/js/top.js"></script>
<!-- 推荐好友逻辑 -->
<script src="/js/core/recommendFriend.js"></script>
</head>

<body>
	<!-- 公用头部JS-->
	<script src="/<spring:message code="url.language"/>/js/header.js"></script>

	<div class="neiye bg-f9 bor-t">
		<div class="mar-auto pos-r">
			<!-- 左侧菜单-->
			<div class="left">
		        <span class="menu01"><i class="fa fa-tachometer" aria-hidden="true"></i> 管理中心</span>
		        <ul class="menu02">
		         	<li class="active"><a href="/<spring:message code="url.language"/>/forward/user/recommendFriend.do">推荐好友<i class="fa fa-angle-right" aria-hidden="true"></i></a></li>
		            <li class=""><a href="/<spring:message code="url.language"/>/forward/user/profile.do">我的资料<i class="fa fa-angle-right" aria-hidden="true"></i></a></li>
		          	<li class=""><a href="/<spring:message code="url.language"/>/forward/user/updatePwd.do">修改密码<i class="fa fa-angle-right" aria-hidden="true"></i></a></li>
			  	</ul>
	        </div>
			<!-- 右侧内容 -->
    		<div class="right bg-ff font14">
      			<h2 class="clear font18 pad-b10 bor-b">推荐好友</h2>
      
      			<p class="pad-t20">
        			方法一、选中并复制下列链接给您的好友:<br>
       				<span id="recommendLocation"></span>
      			</p>
      
      			<p class="pad-t40">
       				 方法二、将下列二维码转发给好友:<br />
       				 
        			<img id="qrCodeImg"/>
      			</p>
      
      			<p class="pad-t40"><i class="fa fa-share-alt" aria-hidden="true"></i> 分享到</p>
      
      			<p class="pad-t20 share-icon">
					<a id="sinaWeibo" class="dis-in"><i class="fa fa-weibo2" aria-hidden="true"></i><br><span>新浪微博</span></a>
			        <a id="wechat" class="dis-in"><i class="fa fa-weixin2" aria-hidden="true"></i><br><span>微信</span></a>
			        <a id="qqFriend" class="dis-in"><i class="fa fa-qq2" aria-hidden="true"></i><br><span>QQ好友</span></a>
			        <a id="qqZone" class="dis-in"><i class="fa fa-kongjian" aria-hidden="true"></i><br><span>QQ空间</span></a>
				</p>
			</div>
		</div>
	</div>

	<!-- 公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>