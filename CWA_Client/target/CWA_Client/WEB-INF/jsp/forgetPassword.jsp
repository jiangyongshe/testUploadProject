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
	href="/<spring:message code="url.language"/>/css/index.css">
<script src="/js/commonRel.js"></script>
<!--返回顶部-->
<script src="/js/top.js"></script>
<!-- 修改密码逻辑 -->
<script src="/js/core/forgetPwd.js"></script>
<style>
.heade, menu {
	display: none;
}

footer {
	background-color: #eee;
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
				<a href="/<spring:message code="url.language"/>/html/index1.html"><img src="/<spring:message code="url.language"/>/images/logo.png" alt="翔云播" /></a>
			</div>
			<div class="dis-in pad-l20 font20">重置密码</div>

			<div class="fr pad-t40 font16">
				已有账号？ <a href="/<spring:message code="url.language"/>/exclude/forward/login.do" class="red">立即登录</a>
			</div>
		</div>
	</div>

	<div class="clear width bor-t regis01">
		<div class="mar-auto pos-r">
			<div class="regis02 bg-ff font14">
				<h2 class="regis02-bt font20 text-c">重置密码</h2>

				<div class="pos-r pad-t20">
					<span class="pos-a regis02-mc">手机号码</span> <input id="mobile"
						type="text" class="wenb02 bor" placeholder="请输入手机号" />
				</div>

				<div class="pos-r pad-t20">
					<span class="pos-a regis02-mc">验证码</span> <input type="text" id="verification"
						class="wenb02 bor" value="" placeholder="请输入手机验证码"/> <input
						id="getVerification" class="btn btn02 regis02-yzm pos-a bg-green"
						style="width: 8em;" type="button" value="获取验证码" />
				</div>

				<div class="pos-r pad-t20">
					<span class="pos-a regis02-mc">重置密码</span> <input id="resetPwd"
						type="text" class="wenb02 bor" value="" placeholder="请输入密码" onfocus="this.type='password'"/>
				</div>

				<div class="pad-t10 text-c red tishi01" id="forgetPwdTip"></div>

				<div class="pad-t20">
					<input id="submit" type="button" value="提交"
						class="btn btn01 bg-red font14 width" />
				</div>
			</div>

			<div class="fr regis03">
				<img src="/<spring:message code="url.language"/>/images/ewm2.jpg" />
			</div>
		</div>
	</div>

	<!-- 公用底部JS-->
	<script type="text/javascript"
		src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>