<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- 引入spring标签  --%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta
	content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no"
	name="viewport" id="viewport" />
<meta name="format-detection" content="telephone=no" />
<meta name="keywords" content="">
<meta name="description" content="" />
<title>翔云播</title>
<link rel="shortcut icon"
	href="/<spring:message code="url.language"/>/images/logo.ico"
	type="image/x-icon">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/font-awesome.min.css">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/public.css">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/neiye.css">
<script src="/js/commonRel.js"></script>
<!--返回顶部-->
<script src="/js/top.js"></script>
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
		         	<%-- <li class=""><a href="/<spring:message code="url.language"/>/forward/user/recommendFriend.do">推荐好友<i class="fa fa-angle-right" aria-hidden="true"></i></a></li> --%>
		            <li class="active"><a href="/<spring:message code="url.language"/>/forward/user/profile.do">我的资料<i class="fa fa-angle-right" aria-hidden="true"></i></a></li>
		          	<li class=""><a href="/<spring:message code="url.language"/>/forward/user/updatePwd.do">修改密码<i class="fa fa-angle-right" aria-hidden="true"></i></a></li>
			  	</ul>
	        </div>
	        <div class="right bg-ff">
      <h2 class="clear font18 pad-b10 bor-b">我的资料</h2>
      
      <div class="clear font16 pad-t20 pad-l10 pad-b10 bor-b2"><i class="fa fa-address-card-o" aria-hidden="true"></i> 基本资料<a href="#" id="updateInfo" class="fr font14"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 修改</a></div>
      
      <ul class="ggtf-sc pad-t10 font14">
        <li>
          <span class="pos-a ggtf-sc-bt">用户名</span>
          <input type="text" class="wenb03 disabled accountId" placeholder="请输入用户名" />
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt">真实姓名</span>
          <input type="text" class="wenb03 disabled userName" placeholder="请输入真实姓名" />
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt">邮箱</span>
          <input type="text" class="wenb03 disabled email" placeholder="请输入邮箱" />
        </li>
      </ul>
      
      <!--<div class="clear font16 pad-t30 pad-l10 pad-b10 bor-b2"><i class="fa fa-mobile" aria-hidden="true"></i> 手机号<a href="#" id="modifyMobile" class="fr font14"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 修改</a></div>
      
       <ul class="ggtf-sc pad-t10 font14">
        <li>
          <span class="pos-a ggtf-sc-bt">手机号码</span>
          <input type="text" class="wenb03 disabled" id="mobile" placeholder="请输入手机号" />
        </li>
        
        <li>
          <span class="pos-a ggtf-sc-bt disabled">验证码</span>
          <input type="text" class="wenb03 disabled" id="verification" placeholder="请输入短信验证码" />
          <input name="" type="button" id="verificationBtn" value="发送验证码" class="btn btn03 font14 pos-a duanxin bg-red disabled" />
        </li>
      </ul> -->
      
      <ul class="ggtf-sc font14">
      	<li>
			<div class="pad-t05 pad-l10 red tishi01 error"></div>
		</li>
        <li>
           <input name="" id="updateMobile" type="button" value="提 交" class="btn btn05 bg-red font16 mar-t10 disabled" />
        </li>
      </ul>
    </div>
		</div>
	</div>

	<!-- 公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
	<script src="/js/core/myProfile.js"></script>
</body>
</html>