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
<!-- 出金逻辑 -->
<script src="/js/core/withdraw.js"></script>
</head>
<body>
	<!-- 公用头部JS-->
	<script src="/<spring:message code="url.language"/>/js/header.js"></script>

	<div class="neiye bg-f9 bor-t">
		<div class="mar-auto pos-r">
			<!-- 左侧菜单-->
			<script src="/<spring:message code="url.language"/>/js/left.js"></script>

			<!-- 右侧内容 -->
			<div class="right bg-ff">
				<h2 class="clear font18 pad-b10 bor-b">出金</h2>

				<ul class="ggtf-sc pad-t20 font14">
					<li class=""><span class="pos-a ggtf-sc-bt">佣金类型</span> 
					<select id="commissionType" class="font14 xlb04">
					</select></li>
					
					<li><span class="pos-a ggtf-sc-bt">可出金额</span> <input
						id="allowWithdrawMoney" type="text" class="wenb03 gray" /></li>
					<li><span class="pos-a ggtf-sc-bt">出金金额</span> <input
						id="withdrawMoney" type="text" class="wenb03"
						placeholder="请输入出金金额" /></li>
					<li><input id="submit" type="button" value="提 交"
						class="btn btn05 bg-red font16 mar-t10" /></li>
				</ul>
			</div>
		</div>
	</div>
	<!-- 公用底部JS-->
	<script type="text/javascript"
		src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>