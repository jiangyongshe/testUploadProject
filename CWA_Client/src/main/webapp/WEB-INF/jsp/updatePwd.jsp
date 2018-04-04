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
<script src="/js/commonRel.js"></script>
</head>

<body>
	<!-- 公用头部JS-->-
	<script src="/<spring:message code="url.language"/>/js/header.js"></script>

	<div class="width clear font14">
 		 <div class="mar-auto pos-r">
 		 	<!--左侧菜单-->
    		<script type="text/javascript" src="/<spring:message code="url.language"/>/js/left.js"></script>
 		 
		      <div class="right bg-ff">
			      <div class="clear width bg-f3 wddd">
			        <ul class="wddd-tab font16">
			          <li onclick="javascript:window.location.href='/<spring:message code="url.language"/>/forward/user/profile.do'">我的资料</li>
			          <li class="active" onclick="javascript:window.location.href='/<spring:message code="url.language"/>/forward/user/updatePwd.do'">修改密码</li>
	        		</ul>
	      		  </div>
			
				<ul class="ggtf-sc pad-t20 font14">
					<li><span class="pos-a ggtf-sc-bt">原密码</span> <input id="oldPwd"
						type="password" class="wenb03" placeholder="请输入原密码" /></li>
			
					<li><span class="pos-a ggtf-sc-bt">新密码</span> <input id="newPwd"
						type="password" class="wenb03" placeholder="请输入新密码" /></li>
			
					<li><span class="pos-a ggtf-sc-bt">确认密码</span> <input id="confirmPwd"
						type="password" class="wenb03" placeholder="请确认新密码" /></li>
			
					<li><input id="submit" type="button" value="提 交"
						class="btn btn05 bg-red font16 mar-t10" /></li>
				</ul>
		</div>
	</div>
</div>
<!-- 修改密码逻辑 -->
<script src="/js/core/updatePwd.js"></script>
<!-- 公用底部JS-->
<script type="text/javascript" src="/<spring:message code="url.language"/>/js/footer.js"></script>
</body>
</html>