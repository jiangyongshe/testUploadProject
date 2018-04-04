<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Cache-Control" content="no-Cache" />
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport"/>
<meta name="format-detection" content="telephone=no" />
<meta name="keywords">
<meta name="description" />
<title>翔云播</title>
<script src="/js/commonRel.js"></script>
<script src="/js/core/tradeComplete.js"></script>
</head>
<body>
	<!-- 公用头部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/header.js"></script>
	<div class="width clear font14">
		<div class="mar-auto">
			<div class="width clear quan pos-r">
				<!--左侧菜单-->
				<script src="/<spring:message code="url.language"/>/js/left.js"></script>
				<!--右侧内容-->
				<div class="right bg-ff" id="content">
					<div class="clear width bg-f3 wddd">
						<h2 class="fl font16 pad-t7 pad-b5" id="title"></h2>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--公用底部JS-->
	<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>