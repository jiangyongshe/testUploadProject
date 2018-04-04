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
<title>翔云媒体</title>
<link rel="shortcut icon"
	href="/<spring:message code="url.language"/>/images/logo.ico"
	type="image/x-icon">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/font-awesome.min.css">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/public.css">
<link rel="stylesheet" href="/<spring:message code="url.language"/>/css/neiye.css">
<link rel="stylesheet"
	href="/<spring:message code="url.language"/>/css/index.css">
<script src="/js/commonRel.js"></script>
<!--返回顶部-->
<script src="/js/top.js"></script>
<!-- 登录逻辑 -->
<script src="/js/core/login.js"></script>
<style>
.heade, menu {
	display: none;
}

footer {
	background-color: #f6f6f6;
}

footer a {
	color: #333;
}
</style>
</head>

<body>
	<!--公用头部JS-->
	<script src="/<spring:message code="url.language"/>/js/header.js"></script>

	<div class="clear width">
		<div class="mar-auto pos-r">
			<div class="dis-in logo">
				<a href="/<spring:message code="url.language"/>/html/index1.html"><img src="/<spring:message code="url.language"/>/images/logo.png" alt="翔云媒体" /></a>
			</div>
			<div class="dis-in pad-l20 font20">欢迎登录</div>
		</div>
	</div>

	<div class="clear width login">
		<!--会员登录开始-->
		<div class="mar-auto hei580 pos-r">
			<div class="pos-a h-login">
				<div class="h-login-bt pad-b10 font18">账号登录</div>

				<div class="pos-r pad-t20">
					<i class="fa fa-2x fa-mobile pos-a h-login-tb"></i> <input
						type="text" class="wenb01" placeholder="请输入登录账号" id="accountId"/>
				</div>

				<div class="pos-r pad-t20">
					<i class="fa fa-2x fa-lock pos-a h-login-tb"></i> <input
						type="password" class="wenb01" placeholder="请输入密码" id="password"/>
				</div>

				<div class="pad-t10 font14 text-c red tishi01" id="loginTip"></div>

				<div class="pad-t20">
					<input type="button" value="登 录" class="btn btn01 bg-red font14 width" id="loginBtn"/>
				</div>

				<div class="text-r h-login-b col-999">
					<a href="/<spring:message code="url.language"/>/user/reg.do">免费注册</a>|<a href="/<spring:message code="url.language"/>/exclude/forward/forgetPwd.do">忘记密码</a>
				</div>
			</div>
		</div>
	</div>

	<!-- 公用底部JS-->
	<script type="text/javascript"
		src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>